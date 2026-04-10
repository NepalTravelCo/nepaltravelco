"use client"

import Navigation from "@/header-component/Navigation"
import FooterSection from "@/footer-components/FooterSection"
import ExploreValleyHero from "./ExploreValleyHero"
import ExploreValleySections from "./ExploreValleySections"
import ReachUs from "@/homepage-components/ReachUs"
import FAQ from "@/homepage-components/FAQ"

const ExploreValley = () => {
  return (
    <div className="bg-stone-50 text-stone-900 font-[var(--text-font)]">
      <Navigation />

      <main className="w-full relative">
        <ExploreValleyHero />

        <div className="mx-auto w-full max-w-[1400px] px-4 md:px-6 lg:px-8 py-16 md:py-20">
          <ExploreValleySections />
        </div>
      </main>
      
      <div className="relative">
        <FAQ />
        <ReachUs />
      </div>
        
      <FooterSection />
    </div>
  )
}

export default ExploreValley