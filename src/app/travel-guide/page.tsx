"use client"

import BrandInfo from '@/homepage-components/BrandInfo'
import ReachUs from '@/homepage-components/ReachUs'
import React from 'react'
import VisaInfo from './VisaInfo'
import FAQ from '@/homepage-components/FAQ'

function page() {
  return (
   <>
   <div className="inner-pages-container">
        <VisaInfo/>
        <FAQ/>
        <ReachUs/>
    </div>
   </>
  )
}

export default page