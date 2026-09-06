import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { siteConfig, telHref, mailtoHref } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description:
    "Request electrical work from Hindley Electric — tell us the job and Nick will get back to you directly.",
};

export default function ContactPage() {
  const phone = telHref();
  const mail = mailtoHref();

  return (
    <div className="bg-ground bg-grid pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel>Get In Touch</SectionLabel>
          <h1 className="mt-4 max-w-2xl font-display text-5xl uppercase leading-[1.02] text-bone sm:text-6xl">
            Tell us what&rsquo;s going on.
          </h1>
          <p className="mt-5 max-w-xl text-bone/70">
            Fill this out with as much detail as you can — Nick reviews every request
            personally and calls back to scope the job.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_360px]">
          <Reveal delay={0.05}>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </Reveal>

          <Reveal delay={0.1} className="space-y-8">
            <div className="border border-bone/10 bg-surface p-6">
              <h2 className="font-display text-xs uppercase tracking-[0.25em] text-red">
                Direct
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-muted">Phone</dt>
                  <dd className="mt-0.5 text-bone">
                    {phone ? (
                      <a href={phone} className="focus-ring hover:text-red">
                        {siteConfig.phoneDisplay}
                      </a>
                    ) : (
                      "[CONFIRM PHONE]"
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Email</dt>
                  <dd className="mt-0.5 text-bone">
                    {mail ? (
                      <a href={mail} className="focus-ring hover:text-red">
                        {siteConfig.email}
                      </a>
                    ) : (
                      "[CONFIRM EMAIL]"
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Hours</dt>
                  <dd className="mt-0.5 text-bone">{siteConfig.hours}</dd>
                </div>
                <div>
                  <dt className="text-muted">Service Area</dt>
                  <dd className="mt-0.5 text-bone">{siteConfig.serviceArea}</dd>
                </div>
              </dl>
            </div>

            <div className="border border-red/30 bg-surface p-6">
              <h2 className="font-display text-xs uppercase tracking-[0.25em] text-red">
                What Happens Next
              </h2>
              <ol className="mt-4 space-y-2 text-sm text-bone/80">
                <li>1. Your request comes straight to Nick.</li>
                <li>2. He calls or emails to confirm the details.</li>
                <li>3. You get a straight quote — no surprises.</li>
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
