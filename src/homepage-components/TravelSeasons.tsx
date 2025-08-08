"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Link from "next/link"
import "../homepage-components/styles/TravelSeasons.css"
import { toSlug } from "../data/Seasons"

type SeasonCard = {
  name: string
  image: string
  description: string
}

const seasons: SeasonCard[] = [
  {
    name: "Spring",
    image:
      "https://i.pinimg.com/736x/20/4b/7b/204b7b34290c881a13e0d347d23466f1.jpg",
    description: "Blooming trails and perfect weather for hikes.",
  },
  {
    name: "Summer",
    image:
      "https://i.pinimg.com/1200x/a4/8d/38/a48d38b909a472a7cf03dadcdee52a63.jpg",
    description: "Crystal clear lakes and lush green valleys.",
  },
  {
    name: "Autumn",
    image:
      "https://i.pinimg.com/1200x/04/1a/09/041a09f90fb85d0725a79b967a7c0fdb.jpg",
    description: "Golden forests and traditional village festivals.",
  },
  {
    name: "Winter",
    image:
      "https://i.pinimg.com/736x/b5/29/e9/b529e9830fbd52a1cf8911dc289d9464.jpg",
    description: "Snowy peaks and peaceful mountain retreats.",
  },
  {
    name: "Festivals",
    image:
      "https://i.pinimg.com/736x/b0/85/7d/b0857d75f0d95c4dd9200b7d11533e11.jpg",
    description: "Dashain, Tihar, Holi and more cultural joy.",
  },
]

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
    const nextIndex = (activeIndex + 1) % seasons.length
    scrollToIndex(nextIndex)
    setActiveIndex(nextIndex)
  }, [activeIndex, scrollToIndex])

  const scrollToPrev = () => {
    const prevIndex = (activeIndex - 1 + seasons.length) % seasons.length
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

  // SEO: JSON-LD ItemList for the seasons carousel
  const itemListStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: seasons.map((s, idx) => {
      const slug = toSlug(s.name)
      return {
        "@type": "ListItem",
        position: idx + 1,
        url: `/seasons/${slug}`,
        name: s.name,
        image: s.image,
        description: s.description,
      }
    }),
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
            {seasons.map((season, index) => {
              const slug = toSlug(season.name)
              return (
                <article
                  key={slug}
                  className={`season-card-wrapper ${index === activeIndex ? "active" : ""}`}
                  onMouseEnter={() => handleCardMouseEnter(index)}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <Link
                    href={`/seasons/${slug}`}
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
              )
            })}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListStructuredData) }}
      />
    </>
  )
}
