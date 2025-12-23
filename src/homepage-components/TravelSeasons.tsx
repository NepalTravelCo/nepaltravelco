"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { seasonsData } from "../data/Seasons"

export default function TravelSeasons() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const scrollToIndex = useCallback((index: number) => {
    const container = containerRef.current
    if (!container) return
    const cardWidth = 380 + 16 // Tailwind gap = 4 = 1rem
    container.scrollTo({ left: index * cardWidth, behavior: "smooth" })
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
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = window.setInterval(scrollToNext, 3000)
  }, [scrollToNext])

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
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
  const handleCardMouseLeave = () => setIsHovered(false)

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
      <section className="relative py-16 bg-gray-50">
        <div className="text-center mb-12 px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">SEASONAL SPLENDOR</h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg md:text-xl">
            Nepal comes alive with traditions, rituals, and celebrations that welcome travelers with open arms.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={scrollToPrev}
            className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full border border-primary text-primary bg-white/10 backdrop-blur-md hover:bg-accent hover:text-white transition z-20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={scrollToNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full border border-primary text-primary bg-white/10 backdrop-blur-md hover:bg-accent hover:text-white transition z-20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Scrollable Cards */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 px-4 md:px-8 pb-12"
          >
            {seasonsData.map((season, idx) => (
              <article
                key={season.slug}
                onMouseEnter={() => handleCardMouseEnter(idx)}
                onMouseLeave={handleCardMouseLeave}
                className={`flex-shrink-0 w-80 md:w-96 snap-center transition-all duration-300 ${
                  idx === activeIndex ? "md:w-[32rem]" : ""
                }`}
              >
                <Link href={`/seasons/${season.slug}`} className="block relative">
                  <div
                    className="relative h-64 md:h-80 rounded-xl bg-cover bg-center cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105"
                    style={{ backgroundImage: `url(${season.image})` }}
                    role="img"
                    aria-label={`${season.name} - ${season.description}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl md:text-2xl font-bold mb-1">{season.name}</h3>
                      <p
                        className={`transition-all duration-300 overflow-hidden ${
                          idx === activeIndex ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        {season.description}
                      </p>
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
