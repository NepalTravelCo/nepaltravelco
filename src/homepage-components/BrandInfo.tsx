"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, Compass, Mountain } from "lucide-react"
import Link from "next/link"
import { treksData } from "@/data/Treks"
import "./styles/BrandInfo.css"

const BrandInfo = () => {
  const [startIndex, setStartIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Select first 6 treks for carousel
  const trekkinginfo = treksData.slice(0, 6).map((trek) => ({
    id: trek.slug,
    name: trek.name,
    description: trek.description,
    imageUrl: trek.image,
    location: trek.highlights[0] || "Nepal",
    altitude: `${trek.altitude} m`,
    slug: trek.slug,
  }))

  const handleNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setStartIndex((prev) => (prev + 1) % trekkinginfo.length)
      setTimeout(() => setIsTransitioning(false), 300)
    }, 100)
  }

  const handlePrev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setStartIndex((prev) => (prev - 1 + trekkinginfo.length) % trekkinginfo.length)
      setTimeout(() => setIsTransitioning(false), 300)
    }, 100)
  }

  // Autoplay
  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      handleNext()
    }, 3000)
    return () => clearInterval(autoplayInterval)
  }, [isTransitioning])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") handlePrev()
      else if (event.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Get 3 visible parks for carousel
  const getVisibleParks = () => {
    const parks = []
    for (let i = 0; i < 3; i++) {
      const index = (startIndex + i) % trekkinginfo.length
      parks.push({
        ...trekkinginfo[index],
        position: i === 0 ? "left" : i === 1 ? "center" : "right",
      })
    }
    return parks
  }

  const visibleParks = getVisibleParks()

  return (
    <motion.section
      id="np-brand-info-section"
      className="np-brand-info-section"
      role="region"
      aria-label="Trekking Gems of Nepal"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="np-background-image"></div>
      <div className="np-content-wrapper">
        <div className="np-left-section">
          <h2 className="np-heading">Trekking Gems of Nepal</h2>

          <Link href="/treks" className="np-button" aria-label="View all treks">
            View All Trails
            <span className="np-button-icon" aria-hidden="true">
              <ArrowRight size={18} />
            </span>
          </Link>
        </div>

        <div className="np-right-section">
          <div className={`np-carousel-container ${isTransitioning ? "transitioning" : ""}`}>
            {visibleParks.map((park, index) => (
              <div
                key={`${park.id}-${startIndex}-${index}`}
                className={`np-card ${park.position} ${isTransitioning ? "transitioning" : ""}`}
                data-position={park.position}
              >
                <div className="np-card-image-container">
                  <img
                    src={park.imageUrl || "/placeholder.svg"}
                    alt={`Beautiful landscape of ${park.name}`}
                    className="np-card-image"
                    loading="lazy"
                  />
                  <div className="np-card-overlay"></div>
                  <div className="np-card-title-overlay">
                    <h3 className="np-card-title">{park.name}</h3>
                  </div>
                  <div className="np-card-hover-content">
                    <div className="np-card-info">
                      <div className="np-card-meta">
                        <span className="np-location">
                          <Compass size={16} className="inline-block mr-1" /> {park.location}
                        </span>
                        <span className="np-altitude">
                          <Mountain size={16} className="inline-block mr-1" /> {park.altitude}
                        </span>
                      </div>
                      <p className="np-card-description">{park.description}</p>
                      <Link
                        href={`/treks/${park.slug}`}
                        className="np-view-offer-link"
                        aria-label={`View details about ${park.name}`}
                      >
                        Explore Region <ArrowRight size={18} className="inline-block ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              className="np-nav-button np-nav-left"
              onClick={handlePrev}
              aria-label="Previous trek"
              disabled={isTransitioning}
            >
              <ArrowLeft size={20} />
            </button>
            <button
              className="np-nav-button np-nav-right"
              onClick={handleNext}
              aria-label="Next trek"
              disabled={isTransitioning}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default BrandInfo
