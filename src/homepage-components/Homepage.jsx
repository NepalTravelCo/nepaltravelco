import React from 'react'
import HeroSection from './HeroSection'
import FillerInfo from './FillerInfo'
import BestSelling from './BestSelling'
import TravelTypes from './TravelTypes'
import TravelRegions from './TravelRegions'
import TravelSeasons from './TravelSeasons'
import BrandInfo from './BrandInfo'
import FAQ from './FAQ'
import ReachUs from './ReachUs'

function Homepage() {
  return (
    <div>
        <HeroSection />
        <FillerInfo />
        <BestSelling />
        <TravelTypes />
        <TravelRegions />
        <TravelSeasons />
        <BrandInfo />
        <FAQ />
        <ReachUs/>
    </div>
  )
}

export default Homepage