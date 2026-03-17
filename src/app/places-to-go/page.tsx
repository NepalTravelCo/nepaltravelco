"use client"

import Navigation from '@/header-component/Navigation'
import FooterSection from '@/footer-components/FooterSection'
import PlacesToGoHero from './PlacesToGoHero'
import PlacesToGoContent from './PlacesToGoContent'
import FAQ from '@/homepage-components/FAQ'
import ReachUs from '@/homepage-components/ReachUs'

const PlacesToGoPage = () => {
  return (
    <div className="bg-stone-50 text-stone-900 font-[var(--text-font)]">
      <Navigation />
      <main className="w-full relative">
        <PlacesToGoHero />
        <PlacesToGoContent />
      </main>
      <div className="relative">
      <FAQ />
      <ReachUs /> 
      </div>
      <FooterSection />
    </div>
  )
}

export default PlacesToGoPage
