import { jobTypes, type JobType } from "./site-config";

export type Service = {
  jobType: JobType;
  slug: string;
  title: string;
  blurb: string;
  detail: string;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const copy: Record<JobType, { title: string; blurb: string; detail: string }> = {
  "Tripped or loss of power": {
    title: "Tripped or Loss of Power",
    blurb: "Breaker won't reset, or the power's out somewhere in the building.",
    detail:
      "From a single dead outlet to a whole panel that won't hold, Hindley Electric tracks down the fault and fixes the cause — not just the symptom.",
  },
  "Replace or add lighting": {
    title: "Lighting — Replace or Add",
    blurb: "Fixtures, recessed cans, outdoor lighting, or a full room upgrade.",
    detail:
      "Swap out dated fixtures, add lighting where there isn't any, or rewire a room to code — indoors or out.",
  },
  "Replace or add ceiling fans": {
    title: "Ceiling Fans — Replace or Add",
    blurb: "New fan install or a swap-out, wired and mounted right.",
    detail:
      "Proper box and support, correct wiring, balanced install — whether it's a straight swap or a new run to a room that's never had one.",
  },
  "Add or replace outlets": {
    title: "Outlets — Add or Replace",
    blurb: "New circuits, GFCI upgrades, or replacing worn-out outlets.",
    detail:
      "More outlets where you need them, GFCI/AFCI protection where code requires it, and clean replacements for anything worn, loose, or outdated.",
  },
  "Sch job walk for remodel": {
    title: "Remodel Job Walk",
    blurb: "Planning a remodel? Schedule a walkthrough before the drywall goes up.",
    detail:
      "A full walk of the space to scope the electrical work for your remodel — new circuits, relocated fixtures, panel capacity — before anything gets closed up.",
  },
  "EV install (how far from panel)": {
    title: "EV Charger Install",
    blurb: "Home EV charger install, sized to your panel and run distance.",
    detail:
      "Tell us how far the charger location is from your panel and Hindley Electric will scope the run, breaker, and charger install — done to code, done once.",
  },
  "Panel replacement (what type of panel, and size)": {
    title: "Panel Replacement",
    blurb: "Upgrading or replacing your electrical panel.",
    detail:
      "Whether it's an old fuse box or an undersized panel, Hindley Electric sizes and installs the replacement your home or business actually needs. Have your panel type and amperage handy for the quote.",
  },
  "Solar repair (what type of system do you have)": {
    title: "Solar Repair",
    blurb: "Existing solar system down or underperforming.",
    detail:
      "Troubleshooting and repair for existing residential solar systems. Knowing your system type helps us get you an accurate quote faster.",
  },
};

export const services: Service[] = jobTypes.map((jobType) => ({
  jobType,
  slug: slugify(jobType),
  ...copy[jobType],
}));

export function serviceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
