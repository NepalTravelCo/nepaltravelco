"use client";

import Navigation from "@/header-component/Navigation";
import FooterSection from "@/footer-components/FooterSection";
import ExperiencesHero from "./ExperiencesHero";
import ExperienceInfoSection from "./ExperienceInfoSection";
import ExperienceGrid from "./ExperienceGrid";
import ReachUs from "@/homepage-components/ReachUs";

export default function ExperiencesPage() {
  return (
    <div className="bg-stone-50 text-primary font-[var(--text-font)]">
      <Navigation />

      <main className="w-full relative">
        <div className="relative z-10">
          <ExperiencesHero />
        </div>

        <div className="relative">
          <ExperienceInfoSection />
          <ExperienceGrid />
        </div>
      </main>
      <ReachUs />
      <FooterSection />
    </div>
  );
}