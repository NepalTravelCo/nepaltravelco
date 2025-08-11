"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Link from "next/link"
import "../homepage-components/styles/TravelSeasons.css"
import { seasonsData, toSlug } from "../data/Seasons"  // ✅ import directly

export default function TravelSeasons() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const scrollToIndex = useCallback((index: number) => {
    const container = containerRef.current
    if (!container) return
    const cardWidth = 380 + 40 // keep in sync with your CSS layout
    const scrollLeft = index * cardWidth
    container.scrollTo({ left: scrollLeft, behavior: "smooth" })
  }, [])

  const scrollToNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % seasonsData.length
    scrollToIndex(nextIndex)
    setActiveIndex(nextIndex)
  }, [activeIndex, scrollToIndex])

  const scrollToPrev = () => {
    const prevIndex = (activeIndex - 1 + seasonsData.length) % seasonsData.length
    scrollToIndex(prevIndex)
    setActiveIndex(prevIndex)
  }

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current)
    intervalRef.current = window.setInterval(scrollToNext, 3000)
  }, [scrollToNext])

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current)
    intervalRef.current = null
  }, [])

  useEffect(() => {
    if (!isHovered) startAutoScroll()
    else stopAutoScroll()
    return () => stopAutoScroll()
  }, [isHovered, startAutoScroll, stopAutoScroll])

  const handleCardMouseEnter = (index: number) => {
    setIsHovered(true)
    setActiveIndex(index)
  }
  const handleCardMouseLeave = () => {
    setIsHovered(false)
  }

  useEffect(() => {
    const isMobile = window.innerWidth <= 768
    if (!isMobile && !isHovered) {
      startAutoScroll()
    } else {
      stopAutoScroll()
    }
    return () => stopAutoScroll()
  }, [isHovered, startAutoScroll, stopAutoScroll])

  // ✅ SEO: JSON-LD ItemList
  const itemListStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: seasonsData.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `/seasons/${s.slug}`,
      name: s.name,
      image: s.image,
      description: s.description,
    })),
  }

  return (
    <>
      <section
        id="ntc-travel-seasons"
        className="ntc-travel-seasons-section travel-seasons"
        aria-labelledby="ntc-travel-seasons-title"
      >
        <div className="header-section">
          <h2 id="ntc-travel-seasons-title" className="seasonal-main-title">
            SEASONAL SPLENDOR
          </h2>
          <p className="description">
            Nepal comes alive with traditions, rituals, and celebrations that welcome travelers with open arms.
          </p>
        </div>

        <div className="navigation-arrows" aria-label="Carousel controls">
          <button
            className="nav-arrow left"
            onClick={scrollToPrev}
            aria-label="Previous season"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="nav-arrow right"
            onClick={scrollToNext}
            aria-label="Next season"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="scroll-container" ref={containerRef}>
          <div className="cards-wrapper">
            {seasonsData.map((season, index) => (
              <article
                key={season.slug}
                className={`season-card-wrapper ${index === activeIndex ? "active" : ""}`}
                onMouseEnter={() => handleCardMouseEnter(index)}
                onMouseLeave={handleCardMouseLeave}
              >
                <Link
                  href={`/seasons/${season.slug}`}
                  className="ntc-season-link"
                  aria-label={`Explore ${season.name} in Nepal`}
                  title={`Explore ${season.name} in Nepal`}
                  style={{ display: "block", textDecoration: "none", color: "inherit" }}
                >
                  <div
                    className="season-card"
                    style={{ backgroundImage: `url(${season.image})` }}
                    role="img"
                    aria-label={`${season.name} - ${season.description}`}
                  >
                    <div className="card-overlay" />
                    <div className="card-content">
                      <h3 className="season-name">{season.name}</h3>
                      <p className="season-description">{season.description}</p>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListStructuredData) }}
      />
    </>
  )
}
