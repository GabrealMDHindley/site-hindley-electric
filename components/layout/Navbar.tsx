"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig, telHref } from "@/lib/site-config";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const phone = telHref();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ground/90 backdrop-blur-md border-b border-bone/10" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4" aria-label="Primary">
        <Link href="/" className="focus-ring flex items-center gap-3">
          <Image
            src="/brand/logo.png"
            alt={`${siteConfig.businessName} logo`}
            width={44}
            height={40}
            priority
            className="h-10 w-auto"
          />
          <span className="font-display text-lg uppercase tracking-wide text-bone">
            Hindley <span className="text-red">Electric</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`focus-ring font-display text-sm uppercase tracking-wide transition-colors ${
                pathname === link.href ? "text-red" : "text-bone/80 hover:text-red"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button href={phone ?? "/contact"} variant="primary" className="px-5 py-2.5 text-xs">
            {phone ? "Call Now" : "Get a Quote"}
          </Button>
        </div>

        <button
          type="button"
          className="focus-ring flex flex-col gap-1.5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-0.5 w-7 bg-bone transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-7 bg-bone transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-7 bg-bone transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-bone/10 bg-ground md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`focus-ring py-3 font-display text-base uppercase tracking-wide ${
                  pathname === link.href ? "text-red" : "text-bone/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button href={phone ?? "/contact"} variant="primary" className="mt-2 w-full">
              {phone ? "Call Now" : "Get a Quote"}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
