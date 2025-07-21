"use client"

import React, { useEffect, useRef, useState } from "react"
import "./styles/BrandParallax.css"

const BrandParallax = () => {
  const contentRef = useRef()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    )

    if (contentRef.current) observer.observe(contentRef.current)

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current)
    }
  }, [])

  return (
    <section className="brand-parallax-section">
      <div
        ref={contentRef}
        className={`brand-parallax-content ${isVisible ? "active" : ""}`}
      >
        <h2 className="parallax-title">Discover Your Next Adventure</h2>
        <p className="parallax-text">
          Embark on unforgettable journeys to breathtaking destinations. Create memories that
          will last a lifetime with our expertly curated travel experiences.
        </p>
        <button className="cta-button">
          Start Your Journey <i className="fas fa-arrow-right ms-2"></i>
        </button>
      </div>
    </section>
  )
}

export default BrandParallax
