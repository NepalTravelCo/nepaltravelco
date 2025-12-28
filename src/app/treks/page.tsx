"use client"

import Navigation from "@/header-component/Navigation"
import FooterSection from "@/footer-components/FooterSection"
import TreksHero from "./TreksHero"
import TrekInteraction from "./TrekInteraction"

export default function TreksPage() {
  return (
    <div className="bg-black min-h-screen text-white font-[var(--text-font)]">
      <Navigation />

      <main>
        <TreksHero />
        <TrekInteraction />
      </main>

      <FooterSection />
    </div>
  )
}
