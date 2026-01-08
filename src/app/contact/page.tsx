import Navigation from '@/header-component/Navigation'
import FooterSection from '@/footer-components/FooterSection'
import ContactHero from './ContactHero'
import FAQ from '@/homepage-components/FAQ'
import React from 'react'

function page() {
  return (
    <div className="bg-stone-50 text-primary font-[var(--text-font)]">
      <Navigation />

      <main className="w-full relative">
        <div className="relative z-10">
          <ContactHero />
        </div>

        <div className="relative">
          <FAQ />
        </div>
      </main>

      <FooterSection />
    </div>
  )
}

export default page