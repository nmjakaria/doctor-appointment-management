/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stethoscope, Sun, Moon, LogOut, Menu, X, User as UserIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";

// Centralized array configuration for all navigation items
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/appointments", label: "All Appointments" },
  { href: "/dashboard", label: "Dashboard" },
];

// Custom NavLink component matching your styling and Next.js routing
const NavLink = ({ href, label, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-foreground" : "text-muted-foreground"
        }`}
    >
      {label}
    </Link>
  );
};

export default function Navbar({
  loading,
  toggle,
}) {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('Logout successfully');
          window.location.href = '/';
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand text-brand-foreground">
            {theme === "dark" ? (
              <Image alt="log"
                src="/doctor-appoint-logo-dark.png"
                width={35}
                height={35}
              />
            ) : (
              <Image alt="log"
                src="/doctor-appoint-light-logo.png"
                width={35}
                height={35}
              />
            )}
          </div>
          <span className="font-display text-lg font-bold tracking-tight">DocAppoint</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        {/* Desktop Auth & Theme Controls */}
        <div className="hidden items-center gap-2 md:flex">
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {!loading && !user && (
            <>
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <div className="flex items-center gap-3">
              <Link href="/dashboard/my-profile" aria-label="Profile">
                <div className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-brand/30">
                  {user.image ? (
                    <img className="aspect-square h-full w-full" src={user?.image} alt={user?.name || "User"} />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium">
                      {user.name ? user.name.slice(0, 1).toUpperCase() : "U"}
                    </div>
                  )}
                </div>
              </Link>
              <button
                className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="rounded-md p-2 md:hidden hover:bg-accent"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Navigation */}
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">

            {user && (
              <Link 
                href="/dashboard/my-profile" 
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-2 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors"
              >
                <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-brand/20">
                  {user.image ? (
                    <img className="aspect-square h-full w-full" src={user?.image} alt={user?.name || "User"} />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-bold">
                      {user.name ? user.name.slice(0, 1).toUpperCase() : "U"}
                    </div>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-foreground truncate">{user.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                </div>
              </Link>
            )}

            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-3 pl-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  onClick={() => setOpen(false)}
                />
              ))}
            </div>

            {/* Mobile Controls Layer */}
            <div className="flex items-center justify-between pt-3 border-t border-border/40">
              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              
              {!user ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <button
                  className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
                  onClick={() => { handleSignOut(); setOpen(false); }}
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}