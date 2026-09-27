import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Electrical services from Hindley Electric: panel replacement, EV charger install, lighting, ceiling fans, outlets, remodel wiring, solar repair, smart home & low-voltage wiring, and new construction.",
};

export default function ServicesPage() {
  return (
    <div className="bg-ground bg-grid pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>Services</SectionLabel>
          <h1 className="mt-4 max-w-2xl font-display text-5xl uppercase leading-[1.02] text-bone sm:text-6xl">
            What we handle.
          </h1>
          <p className="mt-5 max-w-xl text-bone/70">
            Commercial, industrial, residential, solar repair, and low-voltage/data —
            we do it all. No job too small or too big, scoped and quoted directly by
            Nick Hindley. Don&rsquo;t see your job listed? Send it through the contact
            form anyway.
          </p>
        </Reveal>

        <div className="mt-16 space-y-4">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.03}>
              <div
                id={service.slug}
                className="scroll-mt-28 border border-bone/10 bg-surface p-8 transition-colors hover:border-red/40 md:p-10"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-2xl">
                    <span className="font-display text-xs text-red">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(services.length).padStart(2, "0")}
                    </span>
                    <h2 className="mt-2 font-display text-2xl uppercase text-bone sm:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mt-3 leading-relaxed text-bone/70">{service.detail}</p>
                  </div>
                  <Button
                    href={`/contact?job=${encodeURIComponent(service.jobType)}`}
                    variant="ghost"
                    className="shrink-0"
                  >
                    Request This Job
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 border border-red/30 bg-surface p-8 text-center md:p-12">
          <h2 className="font-display text-2xl uppercase text-bone sm:text-3xl">
            Not sure which one fits?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-bone/70">
            Describe the problem in the contact form and Nick will figure out the
            right fix.
          </p>
          <Link
            href="/contact"
            className="focus-ring mt-6 inline-flex items-center justify-center bg-red px-7 py-3.5 font-display text-sm uppercase tracking-wide text-ground transition-colors hover:bg-red-glow"
          >
            Get a Free Quote
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
