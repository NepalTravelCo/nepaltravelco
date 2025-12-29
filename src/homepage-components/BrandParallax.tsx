"use client"

import React, { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion"

const BrandParallax = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Simple parallax for the text content
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [0.8, 1, 0])

  return (
    <section
      ref={containerRef}
      className="sticky top-0 z-0 h-[80vh] flex items-center justify-center overflow-hidden bg-stone-50"
    >
      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-4xl px-6 text-center"
      >
        <span className="inline-block text-secondary font-semibold tracking-[0.35em] uppercase text-xs mb-6">
          Your Journey Starts Here
        </span>

        <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-primary">
          Discover Your Next <br />
          <span className="italic font-normal">Adventure</span>
        </h2>

        <p className="text-base md:text-xl text-muted mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Embark on unforgettable journeys to breathtaking destinations.
          Curated experiences crafted for explorers like you.
        </p>
      </motion.div>
    </section>
  )
}

export default BrandParallax

