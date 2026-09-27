// Single source of truth for contact facts. All are `null` until the client
// confirms them — flip a value here and every tel:/mailto:/JSON-LD reference on
// the site updates at once. See clients/hindley-electric/status.md "Needs-me list".

export const siteConfig = {
  businessName: "Hindley Electric",
  ownerName: "Nick Hindley",
  tagline: "Licensed. Direct. No Runaround.",
  phone: null as string | null, // e.g. "+1-555-123-4567"
  phoneDisplay: null as string | null, // e.g. "(555) 123-4567"
  email: null as string | null, // e.g. "nick@hindleyelectric.com"
  address: null as string | null, // street address, if a physical office exists
  city: null as string | null,
  state: null as string | null,
  zip: null as string | null,
  serviceArea: "Serving the entire Central Coast — and anywhere else needed.",
  hours: "Mon–Fri, 7am–3:30pm — open 24/7 for emergency calls",
  licenseLine: "Licensed, bonded & insured — license # [CONFIRM]",
  yearsExperience: 20,
  yearsAsPartner: 5,
  siteUrl: "https://site-hindley-electric.vercel.app",
} as const;

export const jobTypes = [
  "Tripped or loss of power",
  "Replace or add lighting",
  "Full home lighting upgrade",
  "Replace or add ceiling fans",
  "Add or replace outlets",
  "Sch job walk for remodel",
  "EV install (how far from panel)",
  "Panel replacement (what type of panel, and size)",
  "Solar repair (what type of system do you have)",
  "Smart home / low-voltage & data wiring",
  "New construction (home, commercial, or winery)",
] as const;

export type JobType = (typeof jobTypes)[number];

export function telHref(): string | null {
  return siteConfig.phone ? `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}` : null;
}

export function mailtoHref(): string | null {
  return siteConfig.email ? `mailto:${siteConfig.email}` : null;
}
