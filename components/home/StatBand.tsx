"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { getGsap } from "@/lib/gsap-client";

const stats = [
  { value: 15, suffix: "+", label: "Years in the Electrical Trade" },
  { value: 3, suffix: "", label: "Years as a Partner Before Going Solo" },
  { value: 8, suffix: "", label: "Job Specialties Covered" },
  { value: 1, suffix: "", label: "Electrician Who Shows Up — Every Job" },
];

export default function StatBand() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top+=80",
        end: "+=220",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = { val: 0 };
        gsap.to(target, {
          val: stats[i].value,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top+=80",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            el.textContent = Math.round(target.val).toString();
          },
        });
      });

      return () => trigger.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[70vh] items-center border-y border-bone/10 bg-ground bg-grid"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-8 px-6 py-16 md:grid-cols-4 md:gap-6">
        {stats.map((stat, i) => (
          <div key={stat.label} className="text-center md:text-left">
            <div className="font-display text-5xl tabular-nums text-amber sm:text-6xl">
              <span ref={(el) => { numberRefs.current[i] = el; }}>
                {reduced ? stat.value : 0}
              </span>
              {stat.suffix}
            </div>
            <p className="mt-3 text-sm leading-snug text-bone/70">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
