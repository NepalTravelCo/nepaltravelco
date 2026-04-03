import Navigation from '@/header-component/Navigation'
import FooterSection from '@/footer-components/FooterSection'
import TermsAndConditionsContent from './TermsAndConditionsContent'
import React from 'react'

function page() {
  return (
    <div className="bg-stone-50 text-primary font-[var(--text-font)]">
      <Navigation />

      <main className="w-full relative">
        

        <div className="relative z-20">
          <TermsAndConditionsContent />
        </div>
      </main>

      <FooterSection />
    </div>
  )
}

export default page