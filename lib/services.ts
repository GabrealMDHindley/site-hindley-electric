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
  "Full home lighting upgrade": {
    title: "Full Home Lighting Upgrade",
    blurb: "Rewiring and upgrading lighting through the whole house, room by room.",
    detail:
      "A coordinated lighting upgrade across the entire home — new circuits, fixtures, and switching planned together instead of room by room.",
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
    blurb: "Existing solar system down, underperforming, or due for a true-up.",
    detail:
      "Troubleshooting and repair for existing residential solar systems, including true-up service. Knowing your system type helps us get you an accurate quote faster.",
  },
  "Smart home / low-voltage & data wiring": {
    title: "Smart Home & Low-Voltage Wiring",
    blurb: "Smart home setups, low-voltage runs, and data wiring.",
    detail:
      "From a first smart-home setup to low-voltage and data wiring for a full build, Hindley Electric plans and installs the run — set up a quote to talk through what you're after.",
  },
  "New construction (home, commercial, or winery)": {
    title: "New Construction",
    blurb: "New homes, commercial projects, and wineries — wired from the ground up.",
    detail:
      "Electrical for new-construction projects of any size — homes, commercial buildings, and wineries — scoped and wired from the ground up.",
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
