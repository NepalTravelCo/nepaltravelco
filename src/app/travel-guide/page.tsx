"use client"

import ReachUs from '@/homepage-components/ReachUs'
import React from 'react'
import VisaInfo from './VisaInfo'
import FAQ from '@/homepage-components/FAQ'
import Navigation from '@/header-component/Navigation'
import FooterSection from '@/footer-components/FooterSection'

function page() {
  return (
   <>
   <Navigation/>
        <VisaInfo/>
        <FAQ/>
        <ReachUs/>
    <FooterSection/>
  
   </>
  )
}

export default page