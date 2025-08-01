"use client"
import { useState, useEffect } from "react"
import "./styles/BrandInfo.css"


const BrandInfo = () => {
  const [startIndex, setStartIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const trekkinginfo = [
    {
      id: 1,
      name: "Annapurna Region",
      description: "A diverse trek with mountain views, Gurung villages, and the iconic Thorong La Pass.",
      imageUrl: "https://i.pinimg.com/1200x/1f/07/61/1f0761fe50b6f7065295facdabbc3888.jpg",
      location: "Annapurna Zone",
      altitude: "800m to 5,416m",
    },
    {
      id: 2,
      name: "Everest Region",
      description: "Follow legendary trails to Everest, passing Sherpa villages and dramatic peaks.",
      imageUrl: "https://i.pinimg.com/736x/f6/07/c2/f607c258d0496fc99679b72ddc950f74.jpg",
      location: "Solukhumbu District",
      altitude: "2,800m to 5,545m",
    },
    {
      id: 3,
      name: "Langtang Region",
      description: "A peaceful trek near Kathmandu with forests, glaciers, and Tamang culture.",
      imageUrl: "https://i.pinimg.com/1200x/48/8c/c9/488cc9fe4e540b5227ba7e11b64434e0.jpg",
      location: "Rasuwa District",
      altitude: "1,470m to 4,984m",
    },
    {
      id: 4,
      name: "Manaslu Region",
      description: "A remote circuit with views of Manaslu and Tibetan-influenced villages.",
      imageUrl: "https://i.pinimg.com/1200x/ca/66/19/ca6619121c189c63b7e4fa1cee8b48eb.jpg",
      location: "Gorkha District",
      altitude: "700m to 5,160m ",
    },
    {
      id: 5,
      name: "Mustang Region",
      description: "Explore arid valleys, ancient caves, and the walled city of Lo Manthang.",
      imageUrl: "https://i.pinimg.com/736x/07/2b/e9/072be96a4e88c546dc538ae0b0fb4c93.jpg",
      location: "Upper Mustang",
      altitude: "2,800m to 4,200m",
    },
    {
      id: 6,
      name: "Dolpo Region",
      description: "A mystical trail through rugged landscapes and remote Buddhist villages.",
      imageUrl: "https://i.pinimg.com/1200x/97/2b/b5/972bb5eb9b13d680aa743c59db1797f7.jpg",
      location: "Dolpa District",
      altitude: "2,500m to 5,190m",
    },
  ]

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

  // Autoplay functionality
  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      handleNext()
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(autoplayInterval) // Cleanup on unmount
  }, [isTransitioning])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrev()
      } else if (event.key === "ArrowRight") {
        handleNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Get 3 visible parks for the carousel
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
    <section
      id="np-brand-info-section"
      className="np-brand-info-section"
      role="region"
      aria-label="National Parks of Nepal"
    >
      <div className="np-background-image"></div>
      <div className="np-content-wrapper">
        <div className="np-left-section">
          <h2 className="np-heading">Trekking Gems of Nepal</h2>

          <a
            className="np-button"
            href="#"
            role="button"
            aria-label="View all national parks"
          >
            View All Trails
            <span className="np-button-icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </a>
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
                        <span className="np-location">🗺 {park.location}</span>
                        <span className="np-altitude">⛰ {park.altitude}</span>

                      </div>
                      <p className="np-card-description">{park.description}</p>
                      <a href="#" className="np-view-offer-link" aria-label={`View details about ${park.name}`}>
                        Explore Park
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M15 3h6v6" />
                          <path d="M10 14 21 3" />
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              className="np-nav-button np-nav-left"
              onClick={handlePrev}
              aria-label="Previous park"
              disabled={isTransitioning}
            >
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
            <button
              className="np-nav-button np-nav-right"
              onClick={handleNext}
              aria-label="Next park"
              disabled={isTransitioning}
            >
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
        </div>
      </div>
    </section>
  )
}

export default BrandInfo