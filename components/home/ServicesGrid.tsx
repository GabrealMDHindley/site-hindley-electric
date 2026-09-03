import Link from "next/link";
import { Reveal, RevealStagger } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { services } from "@/lib/services";

export default function ServicesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <SectionLabel>What We Handle</SectionLabel>
        <h2 className="mt-4 max-w-2xl font-display text-4xl uppercase leading-[1.05] text-bone sm:text-5xl">
          Eight jobs. One call.
        </h2>
      </Reveal>

      <RevealStagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <Reveal as="li" key={service.slug} delay={0} className="list-none">
            <Link
              href={`/contact?job=${encodeURIComponent(service.jobType)}`}
              className="focus-ring group flex h-full flex-col justify-between border border-bone/10 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber/60 hover:bg-raised"
            >
              <div>
                <span className="font-display text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg uppercase leading-tight text-bone group-hover:text-amber">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.blurb}</p>
              </div>
              <span className="mt-6 font-display text-xs uppercase tracking-wide text-amber opacity-0 transition-opacity group-hover:opacity-100">
                Request this job →
              </span>
            </Link>
          </Reveal>
        ))}
      </RevealStagger>
    </section>
  );
}
