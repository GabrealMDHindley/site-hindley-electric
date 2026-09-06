import { Reveal, RevealStagger } from "@/components/ui/Reveal";

const items = [
  "Licensed, Bonded & Insured*",
  "15+ Years in the Trade",
  "Owner-Operated",
  "Free Written Quotes",
];

export default function TrustBar() {
  return (
    <section className="border-y border-bone/10 bg-surface">
      <RevealStagger className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4 md:gap-4">
        {items.map((item) => (
          <Reveal as="div" key={item} className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red" aria-hidden />
            <span className="font-display text-xs uppercase tracking-wide text-bone/90 sm:text-sm">
              {item}
            </span>
          </Reveal>
        ))}
      </RevealStagger>
      <p className="mx-auto max-w-7xl px-6 pb-4 text-xs text-muted/70">
        *License number available on request — pending confirmation for display.
      </p>
    </section>
  );
}
