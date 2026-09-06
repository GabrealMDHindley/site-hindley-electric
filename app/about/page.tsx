import type { Metadata } from "next";
import { Reveal, RevealStagger } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Nick Hindley",
  description:
    "Nick Hindley has 15+ years in the electrical trade, including 3 years as a partner at another electrical company, before founding Hindley Electric.",
};

const timeline = [
  {
    years: "15+ yrs ago",
    title: "Started in the trade",
    body: "Nick began working as an electrician, learning the work from the ground up — panels, service calls, new construction, and everything in between.",
  },
  {
    years: "3 yrs",
    title: "Partner, another electrical company",
    body: "Before starting his own shop, Nick spent three years as a partner at another electrical company — running jobs, managing crews, and seeing the business side of the trade up close.",
  },
  {
    years: "Today",
    title: "Owner-operator, Hindley Electric",
    body: "Now Nick runs Hindley Electric on his own terms: one licensed electrician, direct communication, and no subcontractor runaround.",
  },
];

const values = [
  {
    title: "Direct",
    body: "You talk to Nick, not a call center. He scopes the job and gives you a straight answer.",
  },
  {
    title: "Experienced",
    body: "15+ years in the trade plus hands-on ownership experience — panels, power, lighting, EV, and solar all fall inside that.",
  },
  {
    title: "No Runaround",
    body: "One electrician runs your job start to finish. No mystery subcontractors, no bait-and-switch pricing.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-ground bg-grid pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <SectionLabel>About</SectionLabel>
            <h1 className="mt-4 font-display text-5xl uppercase leading-[1.02] text-bone sm:text-6xl">
              Nick Hindley
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-bone/80">
              15+ years in the electrical trade. 3 years as a partner at another
              electrical company. Now the owner of Hindley Electric — a shop built on
              showing up, doing the work right, and skipping the runaround.
            </p>
            <div className="mt-8">
              <Button href="/contact">Get a Free Quote</Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex aspect-square items-center justify-center border border-bone/10 bg-surface">
              <span className="px-8 text-center font-display text-xs uppercase tracking-[0.3em] text-muted">
                [Confirm — owner headshot]
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-28">
          <Reveal>
            <SectionLabel>The Path Here</SectionLabel>
          </Reveal>
          <RevealStagger className="mt-8 space-y-0 border-t border-bone/10">
            {timeline.map((step) => (
              <Reveal
                as="div"
                key={step.title}
                className="grid gap-2 border-b border-bone/10 py-8 md:grid-cols-[140px_1fr] md:gap-8"
              >
                <span className="font-display text-sm uppercase tracking-wide text-red">
                  {step.years}
                </span>
                <div>
                  <h3 className="font-display text-xl uppercase text-bone">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-bone/70">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </RevealStagger>
        </div>

        <div className="mt-28">
          <Reveal>
            <SectionLabel>How Nick Works</SectionLabel>
          </Reveal>
          <RevealStagger className="mt-8 grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <Reveal
                as="div"
                key={value.title}
                className="border border-bone/10 bg-surface p-7"
              >
                <h3 className="font-display text-lg uppercase text-red">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/70">{value.body}</p>
              </Reveal>
            ))}
          </RevealStagger>
        </div>
      </div>
    </div>
  );
}
