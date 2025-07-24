import { useState, useEffect } from "react"
import "./styles/BrandInfo.css"


const BrandInfo = () => {
  const [startIndex, setStartIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nationalParks = [
    {
      id: 1,
      name: "Sagarmatha National Park",
      description:
        "Home to Mount Everest, this park offers breathtaking Himalayan landscapes and unique Sherpa culture.",
      imageUrl: "https://i.pinimg.com/1200x/bb/2d/cc/bb2dcc9ca5685ef21de47c97498f8b25.jpg",
      badge: "25% Discount",
      location: "Solukhumbu District",
      established: "1976",
    },
    {
      id: 2,
      name: "Chitwan National Park",
      description: "Famous for its wildlife, including one-horned rhinos, Bengal tigers, and various bird species.",
      imageUrl: "https://i.pinimg.com/1200x/4f/d2/ca/4fd2ca4ed6c192e7ddd880cbb4105831.jpg",
      badge: "Travel Package!",
      location: "Chitwan District",
      established: "1973",
    },
    // {
    //   id: 3,
    //   name: "Langtang National Park",
    //   description: "Beautiful landscapes, glaciers, and diverse flora & fauna close to Kathmandu.",
    //   imageUrl: "https://i.pinimg.com/736x/1e/07/37/1e07375628bd97d229c9ac1167ff8f9e.jpg",
    //   badge: "New!",
    //   location: "Rasuwa District",
    //   established: "1976",
    // },
    {
      id: 4,
      name: "Bardiya National Park",
      description: "A serene park with rich biodiversity and fewer tourists, ideal for wildlife spotting.",
      imageUrl: "https://i.pinimg.com/736x/f9/1c/eb/f91ceb5a8e78fd6afa8e5666c6476ef5.jpg",
      badge: "Featured",
      location: "Bardiya District",
      established: "1988",
    },
  ]

  const handleNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setStartIndex((prev) => (prev + 1) % nationalParks.length)
      setTimeout(() => setIsTransitioning(false), 300)
    }, 100)
  }

  const handlePrev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setStartIndex((prev) => (prev - 1 + nationalParks.length) % nationalParks.length)
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
      const index = (startIndex + i) % nationalParks.length
      parks.push({
        ...nationalParks[index],
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
          <h2 className="np-heading">National Parks of Nepal</h2>
          <a
            className="np-button"
            href="#"
            role="button"
            aria-label="View all national parks"
          >
            View All Parks
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
                        <span className="np-location">📍 {park.location}</span>
                        <span className="np-established">🗓️ Est. {park.established}</span>
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