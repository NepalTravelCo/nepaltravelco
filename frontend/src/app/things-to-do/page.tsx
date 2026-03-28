"use client"

import Navigation from '@/header-component/Navigation'
import FooterSection from '@/footer-components/FooterSection'
import ThingsToDoHero from './ThingsToDoHero'
import ThingsToDoContent from './ThingsToDoContent'
import FAQ from '@/homepage-components/FAQ'
import ReachUs from '@/homepage-components/ReachUs'
import BrandParallax from '@/homepage-components/BrandParallax'

const ThingsToDoPage = () => {
  return (
    <div className="bg-stone-50 text-stone-900 font-[var(--text-font)]">
      <Navigation />
      <main className="w-full relative">
        <ThingsToDoHero />
        <ThingsToDoContent />
      </main>
      <div className="relative">
        <BrandParallax />
      {/* <FAQ /> */}
      <ReachUs /> 
      </div>
      <FooterSection />
    </div>
  )
}

export default ThingsToDoPage
