"use client"

import VisaInfo from '@/app/travel-guide/VisaInfo'
import React from 'react'
import FooterSection from '@/footer-components/FooterSection'
import Navigation from '@/header-component/Navigation'
function page() {
  return (
    <>
    <Navigation/>
    <div className="inner-pages-container">
        <VisaInfo/>
    </div>
    <FooterSection/>
    </>
  )
}

export default page