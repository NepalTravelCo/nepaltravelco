"use client"

import { useState } from "react"
import "./styles/TravelRegions.css"

const regionData = {
  Himalayan: {
    description:
      "The Himalayan region of Nepal is home to towering peaks and legendary trekking destinations like Everest, Annapurna, and Mustang.",
    highlights: ["Mount Everest", "Annapurna Base Camp", "Upper Mustang", "Manaslu Trek"],
    image: "/Images/SVG/mountains.svg",
  },
  Hilly: {
    description:
      "The Hilly region boasts the cultural heart of Nepal, including Kathmandu, Pokhara, and historical hill towns rich in heritage.",
    highlights: ["Kathmandu Valley", "Pokhara", "Bandipur", "Palpa"],
    image: "/Images/SVG/hills.svg",
  },
  Terai: {
    description:
      "The Terai region features lush jungles, national parks, and the agricultural plains of southern Nepal.",
    highlights: ["Chitwan National Park", "Lumbini", "Bardia National Park", "Janakpur"],
    image: "/Images/SVG/terai.svg",
  },
}

const slides = [
  {
    type: "overview",
    title: "Nepal Travel Regions",
    subtitle: "From towering peaks to lush plains",
    description:
      "Planning a trip to Nepal but don't know where to start? No worries. Let us introduce you to our three major regions, or as we like to call them, the magnificent three. Keep scrolling to learn more.",
  },
  {
    type: "region",
    regionKey: "Himalayan",
    title: "Himalayan Region",
    subtitle: "Where mountains touch the sky",
  },
  {
    type: "region",
    regionKey: "Hilly",
    title: "Hilly Region",
    subtitle: "Cultural heart of Nepal",
  },
  {
    type: "region",
    regionKey: "Terai",
    title: "Terai Region",
    subtitle: "Wildlife and ancient heritage",
  },
]

const TravelRegions = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slide = slides[currentSlide]

  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const goToPrev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (

    <>
    
    <div className="travel-region-info">
    
    <div className="travel-regions-container">
      {/* Background Pattern */}
      <div className="background-pattern" />

      {/* Mountain Silhouette */}
      <div className="mountain-silhouette" />

      <div className="travel-region-body">
      <div className="main-content">
        {/* Left Panel - Content */}
        <div className="content-panel">
          <div className="content-wrapper">
            <div className="region-label">Regions in Nepal</div>

            <h1 className="main-title">{slide.type === "overview" ? slide.subtitle : slide.title}</h1>

            <div className="description-content">
              {slide.type === "overview" ? (
                slide.description
              ) : (
                <>
                  <p className="region-description">{regionData[slide.regionKey].description}</p>
                  <div className="highlights-section">
                    <p className="highlights-title">Key Highlights:</p>
                    <ul className="highlights-list">
                      {regionData[slide.regionKey].highlights.map((place, idx) => (
                        <li key={idx} className="highlight-item">
                          <div className="highlight-dot" />
                          {place}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

        {/* Right Panel - Images */}
        <div className="image-panel">
          <div className="image-container">
            <img
              src={slide.type === "overview" ? "/Images/SVG/nepal.svg" : regionData[slide.regionKey].image}
              alt={slide.type === "overview" ? "Nepal Map" : `${slide.regionKey} Region`}
              className="region-image"
            />
          </div>
        </div>
      </div>
        </div>
      {/* Navigation Controls */}
      <div className="nav-left">
        <button onClick={goToPrev} className="nav-button">
          <span className="nav-arrow">‹</span>
        </button>
      </div>

      <div className="nav-right">
        <button onClick={goToNext} className="nav-button">
          <span className="nav-arrow">›</span>
        </button>
      </div>

      {/* Slide Indicator */}
      {/* <div className="slide-counter">
        {currentSlide + 1} / {slides.length}
      </div> */}

      {/* Slide Dots */}
      <div className="slide-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`dot ${index === currentSlide ? "active" : ""}`}
          />
        ))}
      </div>
    </div>

    </div>

    </>
  )
}

export default TravelRegions
