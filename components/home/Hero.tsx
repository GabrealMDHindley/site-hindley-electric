"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import HeroFallback from "@/components/three/HeroFallback";
import { siteConfig, telHref } from "@/lib/site-config";

const Hero3D = dynamic(() => import("@/components/three/Hero3D"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export default function Hero() {
  const reduced = useReducedMotion();
  const phone = telHref();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ground bg-grid pt-24">
      <Hero3D />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ground via-ground/40 to-ground/70" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <motion.p
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-xs uppercase tracking-[0.4em] text-red"
        >
          {siteConfig.businessName} — Residential, Commercial &amp; Industrial
        </motion.p>

        <motion.h1
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 max-w-4xl font-display text-[13vw] uppercase leading-[0.92] tracking-tight text-bone sm:text-[9vw] lg:text-[6.5vw]"
        >
          Licensed.
          <br />
          Direct.
          <br />
          <span className="text-red">No Runaround.</span>
        </motion.h1>

        <motion.p
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-xl text-lg text-bone/80"
        >
          Nick Hindley — 20+ years in the electrical trade, now running his own shop.
          Residential, commercial, industrial, solar repair, low-voltage &amp; data —
          no job too small or too big. One licensed electrician, every job.
        </motion.p>

        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <Button href="/contact">Get a Free Quote</Button>
          <Button href={phone ?? "/contact"} variant="ghost">
            {phone ? "Call Now" : "See Contact Info"}
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted md:flex">
        <span className="font-display text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-bone/30" />
      </div>
    </section>
  );
}
