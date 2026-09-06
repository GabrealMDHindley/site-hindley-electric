"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(spanRef, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const count = useMotionValue(0);

  useEffect(() => {
    if (!inView || !spanRef.current) return;

    if (reduced) {
      spanRef.current.textContent = `${to}${suffix}`;
      return;
    }

    const controls = animate(count, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        if (spanRef.current) {
          spanRef.current.textContent = `${Math.round(value)}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [inView, reduced, to, suffix, count]);

  return <span ref={spanRef}>{reduced ? `${to}${suffix}` : "0"}</span>;
}

export default function StatBand() {
  return (
    <section className="border-y border-bone/10 bg-ground bg-grid py-20 md:py-28">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 text-center md:flex-row md:items-center md:gap-14 md:text-left lg:gap-20">
        <div className="shrink-0">
          <div className="font-display text-7xl tabular-nums leading-none text-red sm:text-8xl md:text-9xl">
            <Counter to={15} suffix="+" />
          </div>
          <p className="mt-3 font-display text-sm uppercase tracking-[0.25em] text-bone/70 md:text-base">
            Years Of Experience
          </p>
        </div>
        <div className="hidden h-20 w-px shrink-0 bg-bone/15 md:block" aria-hidden />
        <p className="max-w-md text-base leading-relaxed text-bone/70 md:text-lg">
          Nick Hindley has spent over 15 years turning wrenches and running wire on
          real jobs — hands-on experience you can count on, not sales talk.
        </p>
      </div>
    </section>
  );
}
