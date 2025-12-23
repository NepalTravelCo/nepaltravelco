"use client"

import React, { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

const BrandParallax = () => {
  const contentRef = useRef<HTMLDivElement | null>(null)
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
    <section
      className="
        relative min-h-[600px] flex items-center justify-center text-center text-white
        bg-[url('https://i.pinimg.com/1200x/85/d0/46/85d046c783675bd85a6a4ebc60d6718e.jpg')]
        bg-cover bg-center bg-no-repeat
        md:bg-fixed
        py-32 px-4
      "
    >
      {/* Overlay (optional – improves text contrast) */}
      <div className="absolute inset-0 bg-black/40" />

      <div
        ref={contentRef}
        className={`
          relative z-10 max-w-3xl px-4
          transition-all duration-1000 ease-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 leading-tight drop-shadow-md">
          Discover Your Next Adventure
        </h2>

        <p className="font-body text-base sm:text-lg md:text-xl text-white/90 mb-8 leading-relaxed drop-shadow">
          Embark on unforgettable journeys to breathtaking destinations. Create memories that
          will last a lifetime with our expertly curated travel experiences.
        </p>

        <button
          className="
            relative overflow-hidden inline-flex items-center gap-2
            font-heading uppercase tracking-wide
            bg-accent text-white
            px-9 py-4 rounded-xl
            font-medium
            shadow-[0_4px_15px_rgba(217,79,48,0.3)]
            transition-all duration-300
            hover:-translate-y-1 hover:bg-button-hover
            hover:shadow-[0_6px_20px_rgba(0,99,107,0.4)]
            active:translate-y-0
          "
        >
          {/* Shine effect */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent hover:translate-x-full transition-transform duration-500" />

          <span className="relative z-10 flex items-center gap-2">
            Start Your Journey
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </button>
      </div>
    </section>
  )
}

export default BrandParallax
