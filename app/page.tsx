import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import StatBand from "@/components/home/StatBand";
import ServicesGrid from "@/components/home/ServicesGrid";
import MeetNickTeaser from "@/components/home/MeetNickTeaser";
import CtaBand from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Licensed Electrician",
  description:
    "Hindley Electric — licensed residential and commercial electrical work. Panels, EV chargers, lighting, outlets, ceiling fans, solar repair, and remodel wiring.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <StatBand />
      <ServicesGrid />
      <MeetNickTeaser />
      <CtaBand />
    </>
  );
}
