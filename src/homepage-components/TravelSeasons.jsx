"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import "./styles/TravelSeasons.css"

const seasons = [
  {
    name: "Spring",
    image: "https://i.pinimg.com/736x/20/4b/7b/204b7b34290c881a13e0d347d23466f1.jpg",
    description: "Blooming trails and perfect weather for hikes.",
  },
  {
    name: "Summer",
    image: "https://i.pinimg.com/1200x/a4/8d/38/a48d38b909a472a7cf03dadcdee52a63.jpg",
    description: "Crystal clear lakes and lush green valleys.",
  },
  {
    name: "Autumn",
    image: "https://i.pinimg.com/1200x/04/1a/09/041a09f90fb85d0725a79b967a7c0fdb.jpg",
    description: "Golden forests and traditional village festivals.",
  },
  {
    name: "Winter",
    image: "https://i.pinimg.com/736x/b5/29/e9/b529e9830fbd52a1cf8911dc289d9464.jpg",
    description: "Snowy peaks and peaceful mountain retreats.",
  },
  {
    name: "Festivals",
    image: "https://i.pinimg.com/736x/b0/85/7d/b0857d75f0d95c4dd9200b7d11533e11.jpg",
    description: "Dashain, Tihar, Holi and more cultural joy.",
  },
]

const TravelSeasons = () => {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef(null)

  const scrollToIndex = useCallback((index) => {
    const container = containerRef.current
    if (!container) return
    const cardWidth = 380 + 40
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
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(scrollToNext, 3000)
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

  const handleCardMouseEnter = (index) => {
    setIsHovered(true)
    setActiveIndex(index)
  }

  const handleCardMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <>
    
    <div className="travel-season-body">
    <section className="travel-seasons">
      <div className="header-section">
       
        <h2 className="main-title">SEASONAL SPLENDOR</h2>
        <p className="description">
          Nepal comes alive with traditions, rituals, and celebrations that welcome travelers with open arms.
        </p>
      </div>

      <div className="navigation-arrows">
        <button className="nav-arrow left" onClick={scrollToPrev}>

          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

        </button>
        <button className="nav-arrow right" onClick={scrollToNext}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
          {seasons.map((season, index) => (
            <div
              key={index}
              className={`season-card-wrapper ${index === activeIndex ? "active" : ""}`}
              onMouseEnter={() => handleCardMouseEnter(index)}
              onMouseLeave={handleCardMouseLeave}
            >
              <div
                className="season-card"
                style={{ backgroundImage: `url(${season.image})` }}
              >
                <div className="card-overlay" />
                <div className="card-content">
                  <h4 className="season-name">{season.name}</h4>
                  <p className="season-description">{season.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>

    </>
  )
}

export default TravelSeasons