"use client"

import Navigation from '@/header-component/Navigation'
import FooterSection from '@/footer-components/FooterSection'
import TravelGuideHero from './TravelGuideHero'
import TravelGuideContent from './TravelGuideContent'

const TravelGuidePage = () => {
  return (
    <div className="bg-stone-50 text-stone-900 font-[var(--text-font)]">
      <Navigation />
      <main className="w-full relative">
        <TravelGuideHero />
        <TravelGuideContent />
      </main>
      <FooterSection />
    </div>
  )
}

export default TravelGuidePage