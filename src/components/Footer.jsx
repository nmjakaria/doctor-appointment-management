import { Stethoscope } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer className="border-t border-border/60 bg-secondary/40">
                <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-3">
                    {/* Brand Section */}
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-brand-foreground">
                                <Stethoscope className="h-5 w-5" />
                            </div>
                            <span className="font-display text-lg font-bold">DocAppoint</span>
                        </div>
                        <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                            Book trusted doctors in seconds. Manage your visits and reviews in one place.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h4 className="mb-3 text-sm font-semibold">Explore</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/" className="hover:text-foreground transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/appointments" className="hover:text-foreground transition-colors">
                                    All Appointments
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Socials & Copyright */}
                    <div>
                        <h4 className="mb-3 text-sm font-semibold">Follow us</h4>
                        <div className="flex items-center gap-3">
                            <a
                                aria-label="Facebook"
                                href="#"
                                className="grid h-9 w-9 place-items-center rounded-full bg-background border border-border hover:bg-accent transition-colors"
                            >
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M13 22v-8h3l1-4h-4V7c0-1 .5-2 2-2h2V1.5c-.5-.1-2-.5-3.5-.5C10 1 9 3 9 5v2H6v4h3v11h4z" />
                                </svg>
                            </a>
                            <a
                                aria-label="X"
                                href="#"
                                className="grid h-9 w-9 place-items-center rounded-full bg-background border border-border hover:bg-accent transition-colors"
                            >
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2H21l-6.52 7.46L22 22h-6.81l-4.74-6.2L4.8 22H2l7-8L2 2h6.91l4.27 5.64L18.244 2zm-1.19 18h1.88L7.05 4H5.07l11.984 16z" />
                                </svg>
                            </a>
                            <a
                                aria-label="LinkedIn"
                                href="#"
                                className="grid h-9 w-9 place-items-center rounded-full bg-background border border-border hover:bg-accent transition-colors"
                            >
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M4 4a2 2 0 110 4 2 2 0 010-4zm-1 6h3v11H3V10zm6 0h3v1.6c.5-.9 1.8-1.9 3.7-1.9 4 0 4.3 2.6 4.3 6V21h-3v-4.8c0-1.1 0-2.5-1.6-2.5-1.6 0-1.9 1.2-1.9 2.4V21H9V10z" />
                                </svg>
                            </a>
                        </div>
                        <p className="mt-6 text-xs text-muted-foreground">
                            © 2026 DocAppoint. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;