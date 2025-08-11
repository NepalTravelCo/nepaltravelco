"use client"

import { useEffect, useRef, useState } from "react"
import { trekkinginfo } from "@/data/Treks"
import { Mountain, MapPin, Calendar, Users } from "lucide-react"
import Link from "next/link"

import FAQ from "@/homepage-components/FAQ"
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

    // Dynamic duration: larger differences take longer (min 800ms, max 2500ms)
    const baseDuration = Math.min(Math.max(difference * 0.8, 800), 2500)
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
      if (isAnimatingRef.current) return

      const scrollPosition = window.scrollY + window.innerHeight / 2

      sectionRefs.current.forEach((section, index) => {
        if (!section) return

        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          if (activeSection !== index && !animatedSections.has(index)) {
            setActiveSection(index)
            const targetAltitude = sortedTreks[index]?.altitude || 0
            animateToAltitude(currentAltitude, targetAltitude, index)
          }
        }
      })
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
    <div className="inner-pages-container" style={{ paddingTop: 0 }}>
      {/* Fixed Number Display - Left Side */}
      <div
        style={{
          position: "fixed",
          left: "5%",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: "clamp(4rem, 12vw, 8rem)",
            fontFamily: "var(--heading-font)",
            fontWeight: "900",
            color: "white",
            textShadow: "0 4px 20px rgba(0,0,0,0.8)",
            lineHeight: "1",
            letterSpacing: "-0.02em",
          }}
        >
          {currentAltitude.toLocaleString()}
        </div>
        <div
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
            fontFamily: "var(--text-font)",
            color: "rgba(255,255,255,0.9)",
            textAlign: "center",
            marginTop: "0.5rem",
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          meters
        </div>
      </div>

      {/* Trek Sections with Content on Right */}
      {sortedTreks.map((trek, index) => (
        <div
          key={trek.id}
          ref={(el) => (sectionRefs.current[index] = el)}
          style={{
            height: "100vh",
            position: "relative",
            display: "flex",
            alignItems: "center",
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${trek.imageUrl}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Content positioned on the right */}
          <div
            style={{
              position: "absolute",
              right: "5%",
              top: "50%",
              transform: "translateY(-50%)",
              color: "white",
              maxWidth: "500px",
              padding: "2rem",
              backgroundColor: "rgba(0,0,0,0.3)",
              borderRadius: "var(--border-radius-large)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontFamily: "var(--heading-font)",
                fontWeight: "var(--heading-weight)",
                marginBottom: "1rem",
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              {trek.name}
            </h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "1.1rem",
                fontFamily: "var(--text-font)",
                color: "rgba(255,255,255,0.9)",
                marginBottom: "1.5rem",
                textShadow: "0 1px 5px rgba(0,0,0,0.5)",
              }}
            >
              <MapPin size={20} style={{ marginRight: "0.5rem" }} />
              {trek.location}
            </div>

            <p
              style={{
                fontSize: "1rem",
                fontFamily: "var(--text-font)",
                lineHeight: "var(--line-height)",
                color: "rgba(255,255,255,0.85)",
                textShadow: "0 1px 5px rgba(0,0,0,0.5)",
                marginBottom: "2rem",
              }}
            >
              {trek.description}
            </p>

            {/* Trek Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                <Mountain size={16} />
                <span>Max: {trek.altitude.toLocaleString()}m</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                <Calendar size={16} />
                <span>12-16 days</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                <Users size={16} />
                <span>2-12 people</span>
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                🏔️ Moderate-Hard
              </div>
            </div>

            {/* Action Button */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Link href={`/treks/${trek.id}`} style={{ textDecoration: "none" }}>
                <button
                  style={{
                    width: "100%",
                    padding: "1rem 2rem",
                    backgroundColor: "white",
                    color: "var(--primary-color)",
                    border: "none",
                    borderRadius: "var(--border-radius)",
                    fontSize: "1.1rem",
                    fontFamily: "var(--text-font)",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                >
                  Explore This Trek
                </button>
              </Link>
            </div>
          </div>

          {/* Section indicator */}
          <div
            style={{
              position: "absolute",
              top: "2rem",
              right: "2rem",
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1.1rem",
              fontFamily: "var(--text-font)",
              fontWeight: "600",
              backdropFilter: "blur(10px)",
            }}
          >
            {index + 1}
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div
        style={{
          position: "fixed",
          right: "2rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {sortedTreks.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const section = sectionRefs.current[index]
              if (section) {
                section.scrollIntoView({ behavior: "smooth" })
              }
            }}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              border: "2px solid white",
              backgroundColor: activeSection === index ? "white" : "transparent",
              cursor: "pointer",
              transition: "all 0.3s ease",
              opacity: activeSection === index ? 1 : 0.6,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"
            }}
          />
        ))}
      </div>

      {/* FAQ Section */}
      <div>
        <FAQ />
       
      </div>

      {/* ReachUs Section */}
      <div>
        <ReachUs />
      
      </div>
    </div>
  )
}