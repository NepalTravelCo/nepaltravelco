"use client"

import { useState, useCallback, useEffect } from "react"
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

function Homepage({ onAllLoaded }: { onAllLoaded?: () => void }) {
  const [loadedComponents, setLoadedComponents] = useState<Set<string>>(new Set())
  
  // The 8 components that fetch data
  const totalNeeded = 8

  const handleLoaded = useCallback((id: string) => {
    setLoadedComponents(prev => {
        const next = new Set(prev)
        next.add(id)
        return next
    })
  }, [])

  const isAllLoaded = loadedComponents.size >= totalNeeded

  const loadFillerInfo = useCallback(() => handleLoaded('FillerInfo'), [handleLoaded])
  const loadBestSelling = useCallback(() => handleLoaded('BestSelling'), [handleLoaded])
  const loadTravelTypes = useCallback(() => handleLoaded('TravelTypes'), [handleLoaded])
  const loadBrandParallax = useCallback(() => handleLoaded('BrandParallax'), [handleLoaded])
  const loadBrandInfo = useCallback(() => handleLoaded('BrandInfo'), [handleLoaded])
  const loadTravelSeasons = useCallback(() => handleLoaded('TravelSeasons'), [handleLoaded])
  const loadFAQ = useCallback(() => handleLoaded('FAQ'), [handleLoaded])
  const loadTravelRegions = useCallback(() => handleLoaded('TravelRegions'), [handleLoaded])

  // Cascade the loaded state to the parent
  useEffect(() => {
    if (isAllLoaded && onAllLoaded) {
      onAllLoaded()
    }
  }, [isAllLoaded, onAllLoaded])

  return (
    <div>
      <div className="relative">
        <HeroSection />
        <FillerInfo onLoaded={loadFillerInfo} />
      </div>
      <BestSelling onLoaded={loadBestSelling} />
      <TravelTypes onLoaded={loadTravelTypes} />
      <div className="relative">
        <BrandParallax onLoaded={loadBrandParallax} />
        <BrandInfo onLoaded={loadBrandInfo} />
      </div>
      <TravelSeasons onLoaded={loadTravelSeasons} />
      <div className="relative">
        <FAQ onLoaded={loadFAQ} />
        <TravelRegions onLoaded={loadTravelRegions} />
      </div>
      <ReachUs />
    </div>
  )
}

export default Homepage