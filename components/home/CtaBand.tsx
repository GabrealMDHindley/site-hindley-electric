import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { telHref } from "@/lib/site-config";

export default function CtaBand() {
  const phone = telHref();

  return (
    <section className="relative overflow-hidden bg-ground bg-grid py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red/60 to-transparent" />
      <Reveal className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl uppercase leading-tight text-bone sm:text-6xl">
          Power problem? <span className="text-red">Let&rsquo;s fix it.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-bone/70">
          Tell us what's going on and Nick will get back to you directly — no call
          center, no dispatch runaround.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button href="/contact">Get a Free Quote</Button>
          <Button href={phone ?? "/contact"} variant="ghost">
            {phone ? "Call Now" : "See Contact Info"}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
