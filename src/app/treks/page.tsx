"use client"

import { useEffect, useRef, useState } from "react"
import { Trek, treksData } from "@/data/Treks"
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
  fullTrek: Trek
}

const trekSections: TrekSection[] = treksData.map((trek, index) => ({
  id: index + 1,
  name: trek.name,
  altitude: trek.altitude,
  description: trek.description,
  imageUrl: trek.image,
  location: trek.slug.replace(/-/g, " "), // simple placeholder (you can add real location field later)
  fullTrek: trek,
}))


export default function TreksPage() {
  const [currentAltitude, setCurrentAltitude] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [showAltitude, setShowAltitude] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const animationRef = useRef<number | null>(null)
  const isAnimatingRef = useRef(false)

  const easeOutQuart = (t: number): number => {
    return 1 - Math.pow(1 - t, 4)
  }

  const animateToAltitude = (fromAltitude: number, toAltitude: number) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    if (fromAltitude === toAltitude) return

    isAnimatingRef.current = true
    const difference = Math.abs(fromAltitude - toAltitude)

    const baseDuration = Math.min(Math.max(difference * 0.8, 600), 1500)
    const startTime = Date.now()
    const startValue = fromAltitude

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / baseDuration, 1)
      const easedProgress = easeOutQuart(progress)

      const currentValue = Math.round(startValue + (toAltitude - startValue) * easedProgress)
      setCurrentAltitude(currentValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        isAnimatingRef.current = false
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  const calculateInitialActiveSection = (): number => {
    const scrollPosition = window.scrollY + window.innerHeight / 2

    for (let index = 0; index < sectionRefs.current.length; index++) {
      const section = sectionRefs.current[index]
      if (!section) continue

      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top + window.scrollY
      const sectionBottom = sectionTop + rect.height

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        return index
      }
    }

    return 0
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      const bottomThreshold = documentHeight - windowHeight * 1.2
      setShowAltitude(window.scrollY < bottomThreshold)

      let newActiveSection = 0

      sectionRefs.current.forEach((section, index) => {
        if (!section) return

        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        const sectionBottom = sectionTop + rect.height

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          newActiveSection = index
        }
      })

      if (newActiveSection !== activeSection && !isAnimatingRef.current) {
        setActiveSection(newActiveSection)
        const targetAltitude = trekSections[newActiveSection]?.altitude || 0
        animateToAltitude(currentAltitude, targetAltitude)
      }
    }

    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    const initializeComponent = () => {
      setTimeout(() => {
        const initialActiveSection = calculateInitialActiveSection()
        const initialAltitude =
          trekSections[initialActiveSection]?.altitude || trekSections[0]?.altitude || 0

        setActiveSection(initialActiveSection)
        setCurrentAltitude(initialAltitude)
        setIsInitialized(true)

        handleScroll()
      }, 100)
    }

    window.addEventListener("scroll", throttledHandleScroll, { passive: true })
    initializeComponent()

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isInitialized) return

    const targetAltitude = trekSections[activeSection]?.altitude || 0
    if (targetAltitude !== currentAltitude && !isAnimatingRef.current) {
      animateToAltitude(currentAltitude, targetAltitude)
    }
  }, [activeSection, isInitialized])

  return (
    <div className="inner-pages-container">
      {/* Fixed Altitude Display */}
      <div className={`fixed-altitude-display ${showAltitude ? "visible" : ""}`}>
        <div className="altitude-number">{currentAltitude.toLocaleString()}</div>
        <div className="altitude-label">meters</div>
      </div>

      {/* Trek Sections */}
      {trekSections.map((trek, index) => (
        <div
          key={trek.id}
          ref={(el) => {
              sectionRefs.current[index] = el
            }}
          className="trek-section"
          style={{
            backgroundImage: `url("${trek.imageUrl}")`,
          }}
        >
          <div className="trek-content">
            <h2 className="trek-title">{trek.name}</h2>

            <div className="trek-location">
              <MapPin size={24} />
              {trek.location}
            </div>

            <p className="trek-description">{trek.description}</p>

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
              <Link href={`/treks/${trek.fullTrek.slug}`} className="trek-button">
                Explore This Trek
              </Link>

            </div>
          </div>

          <div className="section-indicator">{index + 1}</div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="nav-dots">
        {trekSections.map((_, index) => (
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

      <ReachUs />
    </div>
  )
}
