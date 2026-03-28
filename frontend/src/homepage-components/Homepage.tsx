"use client"

import HeroSection from './HeroSection'
import FillerInfo from './FillerInfo'
import BestSelling from './BestSelling'
import TravelTypes from './TravelTypes'
import TravelRegions from './TravelRegions'
import TravelSeasons from './TravelSeasons'
import BrandInfo from './BrandInfo'
import FAQ from './FAQ'
import ReachUs from './ReachUs'
import BrandParallax from './BrandParallax'

function Homepage() {
  return (
    <div>
      <div className="relative">
        <HeroSection />
        <FillerInfo />
      </div>
      <BestSelling />
      <TravelTypes />
      <div className="relative">
        <BrandParallax />
        <BrandInfo />
      </div>
      <TravelSeasons />
      <div className="relative">
        <FAQ />
        <TravelRegions />
      </div>
      <ReachUs />
    </div>
  )
}

export default Homepage