"use client"

import React, { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import "./styles/BrandParallax.css"

const BrandParallax = () => {
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    )

    const currentRef = contentRef.current
    if (currentRef) observer.observe(currentRef)

    return () => {
      if (currentRef) observer.unobserve(currentRef)
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
          Start Your Journey <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
        </button>
      </div>
    </section>
  )
}

export default BrandParallax
