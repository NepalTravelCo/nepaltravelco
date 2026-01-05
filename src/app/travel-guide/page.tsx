"use client"

import Navigation from '@/header-component/Navigation'
import FooterSection from '@/footer-components/FooterSection'
import VisaInfo from './VisaInfo'
import ReachUs from '@/homepage-components/ReachUs'

const TravelGuidePage = () => {
  return (
    <div className="bg-stone-50 text-primary font-[var(--text-font)]">
      <Navigation />
      <main className="w-full relative">
        <VisaInfo />
        <ReachUs />
      </main>
      <FooterSection />
    </div>
  )
}

export default TravelGuidePage