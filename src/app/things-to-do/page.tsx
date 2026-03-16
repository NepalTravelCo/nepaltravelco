"use client"

import Navigation from '@/header-component/Navigation'
import FooterSection from '@/footer-components/FooterSection'
import ThingsToDoHero from './ThingsToDoHero'
import ThingsToDoContent from './ThingsToDoContent'

const ThingsToDoPage = () => {
  return (
    <div className="bg-stone-50 text-stone-900 font-[var(--text-font)]">
      <Navigation />
      <main className="w-full relative">
        <ThingsToDoHero />
        <ThingsToDoContent />
      </main>
      <FooterSection />
    </div>
  )
}

export default ThingsToDoPage
