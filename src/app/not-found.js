'use client';
import { Button } from "@heroui/react";
import { ArrowLeft, Stethoscope } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center px-6">

      {/* Animated icon */}
      <div className="relative mb-10">
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full border border-[var(--success)] animate-ping opacity-40" />
        <span className="absolute inset-0 rounded-full border border-[var(--success)] animate-ping opacity-20 [animation-delay:0.6s]" />

        {/* Circle */}
        <div className="relative w-28 h-28 rounded-full bg-[color-mix(in_oklab,var(--success)_10%,transparent)] border border-[color-mix(in_oklab,var(--success)_30%,transparent)] flex items-center justify-center z-10">
          {/* ECG / flatline SVG */}
          <svg
            viewBox="0 0 160 40"
            className="w-36 h-9"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M0 20 L28 20 L36 20 L42 5 L48 34 L54 10 L60 28 L66 20 L90 20 L98 20 L104 5 L110 34 L116 10 L122 28 L128 20 L160 20"
              stroke="var(--success)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="[stroke-dasharray:340] [stroke-dashoffset:340] animate-[draw_2s_ease_forwards_0.3s]"
              style={{
                strokeDasharray: 340,
                strokeDashoffset: 340,
                animation: 'draw 2s ease forwards 0.3s',
              }}
            />
          </svg>
        </div>

        {/* 404 badge */}
        <div className="absolute -bottom-2 -right-2 z-20 bg-[var(--background)] border border-[var(--border)] rounded-full px-3 py-1 text-[11px] font-medium text-[var(--muted-foreground)] tracking-widest shadow-sm">
          404
        </div>
      </div>

      {/* Divider eyeline */}
      <div className="flex items-center gap-3 w-full max-w-sm mb-5">
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--border)]" />
        <div className="flex-1 h-px bg-[var(--border)]" />
        <span className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted-foreground)] font-medium">
          Diagnosis report
        </span>
        <div className="flex-1 h-px bg-[var(--border)]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--border)]" />
      </div>

      {/* Copy */}
      <div className="space-y-3 max-w-md mb-10">
        <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.02em] text-[var(--foreground)]" style={{ fontFamily: 'var(--font-display)' }}>
          Page not found —{" "}
          <em className="italic text-[var(--success)]">no vitals detected</em>
        </h1>
        <p className="text-[var(--muted-foreground)] text-base leading-relaxed px-4">
          This record may have been moved, discharged, or never admitted.
          Please navigate back to a known ward.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">

        <Link
          href="/">
          <Button
            size="lg"
            className="bg-[var(--foreground)] text-[var(--background)] rounded-xl px-8 h-12 font-medium text-sm gap-2 group"
            startContent={
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-0.5 transition-transform duration-150"
              />
            }
          >
            Return home
          </Button>
        </Link>
        <Link
          href="/appointments"
        >
          <Button
            as={Link}
            size="lg"
            variant="outline"
            className="rounded-xl px-8 h-12 font-medium text-sm gap-2 border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)]"
            startContent={<Stethoscope size={16} />}
          >
            Find a doctor
          </Button>
        </Link>
      </div>

      {/* ECG draw animation keyframes */}
      <style>{`
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}