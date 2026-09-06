import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export default function MeetNickTeaser() {
  return (
    <section className="relative overflow-hidden border-y border-bone/10 bg-surface">
      <Image
        src="/brand/logo.png"
        alt=""
        aria-hidden
        width={900}
        height={822}
        className="pointer-events-none absolute -right-32 top-1/2 h-[140%] w-auto -translate-y-1/2 opacity-[0.04]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        <Reveal>
          <SectionLabel>Meet The Owner</SectionLabel>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[1.05] text-bone sm:text-5xl">
            Nick Hindley
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-bone/80">
            15+ years hands-on in the electrical trade, including 3 years as a partner
            at another electrical company before he put his own name on the door.
            Hindley Electric is owner-operated — Nick shows up, scopes the job, and
            does the work. No subcontractors, no runaround.
          </p>
          <Link
            href="/about"
            className="focus-ring mt-6 inline-block font-display text-sm uppercase tracking-wide text-red hover:text-red-glow"
          >
            Read the full story →
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex aspect-[4/5] items-center justify-center border border-bone/10 bg-ground">
            <span className="px-8 text-center font-display text-xs uppercase tracking-[0.3em] text-muted">
              [Confirm — owner headshot]
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
