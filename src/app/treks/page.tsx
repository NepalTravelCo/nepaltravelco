"use client"

import { useEffect, useRef, useState } from "react"
import { trekkinginfo } from "@/data/Treks"
import { Mountain, MapPin, Calendar, Users } from "lucide-react"
import Link from "next/link"
import "./treks.css"
import ReachUs from "@/homepage-components/ReachUs"

interface TrekSection {
  id: number
  name: string
  altitude: number
  description: string
  imageUrl: string
  location: string
  fullTrek: any
}

// Sort treks by altitude (highest first) for the animation sequence
const sortedTreks: TrekSection[] = trekkinginfo
  .map((trek) => ({
    id: trek.id,
    name: trek.name,
    altitude: trek.maxAltitude,
    description: trek.description,
    imageUrl: trek.imageUrl,
    location: trek.location,
    fullTrek: trek,
  }))
  .sort((a, b) => b.altitude - a.altitude)

export default function TreksPage() {
  const [currentAltitude, setCurrentAltitude] = useState(sortedTreks[0]?.altitude || 0)
  const [activeSection, setActiveSection] = useState(0)
  const [animatedSections, setAnimatedSections] = useState(new Set<number>())
  const [showAltitude, setShowAltitude] = useState(true)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const animationRef = useRef<number>()
  const isAnimatingRef = useRef(false)

  // Easing function for smooth animation
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3)
  }

  // Animate number with dynamic duration based on difference
  const animateToAltitude = (fromAltitude: number, toAltitude: number, sectionIndex: number) => {
    if (isAnimatingRef.current) return

    isAnimatingRef.current = true
    const difference = Math.abs(fromAltitude - toAltitude)

    // Dynamic duration: larger differences take longer (min 1000ms, max 3000ms)
    const baseDuration = Math.min(Math.max(difference * 1.2, 1000), 3000)
    const duration = baseDuration

    const startTime = Date.now()
    const startValue = fromAltitude

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)

      const currentValue = Math.round(startValue + (toAltitude - startValue) * easedProgress)
      setCurrentAltitude(currentValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        isAnimatingRef.current = false
        setAnimatedSections((prev) => new Set([...prev, sectionIndex]))
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Hide altitude number when near the bottom (last 20% of page)
      const bottomThreshold = documentHeight - windowHeight * 1.2
      setShowAltitude(window.scrollY < bottomThreshold)

      if (isAnimatingRef.current) return

      let currentSectionIndex = -1

      sectionRefs.current.forEach((section, index) => {
        if (!section) return

        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSectionIndex = index
        }
      })

      if (currentSectionIndex !== -1 && currentSectionIndex !== activeSection) {
        setActiveSection(currentSectionIndex)
        if (!animatedSections.has(currentSectionIndex)) {
          const targetAltitude = sortedTreks[currentSectionIndex]?.altitude || 0
          animateToAltitude(currentAltitude, targetAltitude, currentSectionIndex)
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [currentAltitude, activeSection, animatedSections])

  return (
    <div className="inner-pages-container">
      {/* Fixed Altitude Display - Only show during trek sections */}
      <div className={`fixed-altitude-display ${showAltitude ? "visible" : ""}`}>
        <div className="altitude-number">{currentAltitude.toLocaleString()}</div>
        <div className="altitude-label">meters</div>
      </div>

      {/* Trek Sections */}
      {sortedTreks.map((trek, index) => (
        <div
          key={trek.id}
          ref={(el) => (sectionRefs.current[index] = el)}
          className="trek-section"
          style={{
            backgroundImage: `url("${trek.imageUrl}")`,
          }}
        >
          {/* Modern Content Layout */}
          <div className="trek-content">
            <h2 className="trek-title">{trek.name}</h2>

            <div className="trek-location">
              <MapPin size={24} />
              {trek.location}
            </div>

            <p className="trek-description">{trek.description}</p>

            {/* Trek Stats */}
            <div className="trek-stats">
              <div className="trek-stat">
                <Mountain size={18} />
                <span>Max: {trek.altitude.toLocaleString()}m</span>
              </div>
              <div className="trek-stat">
                <Calendar size={18} />
                <span>12-16 days</span>
              </div>
              <div className="trek-stat">
                <Users size={18} />
                <span>2-12 people</span>
              </div>
              <div className="trek-stat-text">🏔️ Moderate-Hard</div>
            </div>

            {/* Action Button */}
            <div className="d-flex flex-column">
              <Link href={`/treks/${trek.id}`} className="trek-button">
                Explore This Trek
              </Link>
            </div>
          </div>

          {/* Section indicator */}
          <div className="section-indicator">{index + 1}</div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="nav-dots">
        {sortedTreks.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const section = sectionRefs.current[index]
              if (section) {
                section.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className={`nav-dot ${activeSection === index ? "active" : ""}`}
          />
        ))}
      </div>

     

      {/* ReachUs Section */}
      <ReachUs/>
    </div>
  )
}
