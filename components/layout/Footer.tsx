import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/services";
import { siteConfig, telHref, mailtoHref } from "@/lib/site-config";

export default function Footer() {
  const phone = telHref();
  const mail = mailtoHref();

  return (
    <footer className="border-t border-bone/10 bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo.png"
              alt={`${siteConfig.businessName} logo`}
              width={40}
              height={36}
              className="h-9 w-auto"
            />
            <span className="font-display text-base uppercase tracking-wide text-bone">
              Hindley Electric
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {siteConfig.licenseLine}. {siteConfig.serviceArea}.
          </p>
        </div>

        <div>
          <h3 className="font-display text-xs uppercase tracking-[0.25em] text-amber">
            Services
          </h3>
          <ul className="mt-4 space-y-2.5">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services#${s.slug}`}
                  className="focus-ring text-sm text-muted transition-colors hover:text-bone"
                >
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="focus-ring text-sm text-amber transition-colors hover:text-amber-glow"
              >
                View all services →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xs uppercase tracking-[0.25em] text-amber">
            Company
          </h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/about" className="focus-ring text-sm text-muted hover:text-bone">
                About Nick
              </Link>
            </li>
            <li>
              <Link href="/contact" className="focus-ring text-sm text-muted hover:text-bone">
                Get a Free Quote
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xs uppercase tracking-[0.25em] text-amber">
            Contact
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>
              {phone ? (
                <a href={phone} className="focus-ring hover:text-bone">
                  {siteConfig.phoneDisplay}
                </a>
              ) : (
                <span className="text-muted/70">[CONFIRM PHONE]</span>
              )}
            </li>
            <li>
              {mail ? (
                <a href={mail} className="focus-ring hover:text-bone">
                  {siteConfig.email}
                </a>
              ) : (
                <span className="text-muted/70">[CONFIRM EMAIL]</span>
              )}
            </li>
            <li>{siteConfig.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-bone/10 px-6 py-6">
        <p className="mx-auto max-w-7xl text-xs text-muted/70">
          © {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
