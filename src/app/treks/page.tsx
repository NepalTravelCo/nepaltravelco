"use client"

import Navigation from "@/header-component/Navigation"
import FooterSection from "@/footer-components/FooterSection"
import TreksHero from "./TreksHero"
import TrekInteraction from "./TrekInteraction"

export default function TreksPage() {
  return (
    <div className="bg-black text-white font-[var(--text-font)] h-screen overflow-hidden">
      <Navigation />

      <main className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth">
        <TreksHero />
        <TrekInteraction />
        <div className="snap-start">
          <FooterSection />
        </div>
      </main>
    </div>
  )
}