"use client"

import React, { useRef } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity
} from "framer-motion"
import { ArrowRight } from "lucide-react"

const BrandParallax = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  /** Smooth base scroll */
  const smoothScrollY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001
  })

  /** Scroll velocity → glitch trigger */
  const velocity = useVelocity(scrollYProgress)

  /** PARALLAX (shorter, sharper range) */
  const y = useTransform(smoothScrollY, [0, 1], ["-6%", "6%"])
  const scale = useTransform(smoothScrollY, [0, 1], [1.08, 1.02])

  /** CONTENT FADE */
  const opacity = useTransform(
    smoothScrollY,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  )

  /** GLITCH EFFECTS */
  const glitchX = useTransform(velocity, [-0.6, 0.6], [-6, 6])
  const glitchOpacity = useTransform(velocity, [-0.6, 0.6], [0.96, 1])

  return (
    <section
      ref={containerRef}
      className="relative h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        {/* Base Image (CRISP) */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/1c/29/39/1c29391ff02d48e24470a10839a4decb.jpg')"
          }}
        />

        {/* Contrast overlay (instead of blur) */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

        {/* Grain / Film noise */}
        <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />
      </motion.div>

      {/* Glitch RGB layer */}
      <motion.div
        style={{
          x: glitchX,
          opacity: glitchOpacity
        }}
        className="absolute inset-0 z-[1] pointer-events-none mix-blend-screen"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/1c/29/39/1c29391ff02d48e24470a10839a4decb.jpg')"
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-4xl px-6 text-center text-white"
      >
        <span className="inline-block text-white font-semibold tracking-[0.35em] uppercase text-xs mb-6">
          Your Journey Starts Here
        </span>

        <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight drop-shadow-2xl text-stone-50">
          Discover Your Next <br />
          <span className="italic font-normal">Adventure</span>
        </h2>

        <p className="text-base md:text-xl text-stone-200 mb-10 max-w-2xl mx-auto font-light">
          Embark on unforgettable journeys to breathtaking destinations.
          Curated experiences crafted for explorers like you.
        </p>

        <button
          className="
            group inline-flex items-center gap-3
            bg-white text-primary px-10 py-4 rounded-full
            font-bold text-sm uppercase tracking-widest
            shadow-2xl transition-all duration-300
            hover:bg-secondary hover:text-white hover:-translate-y-1
          "
        >
          Start Your Journey
          <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </motion.div>
    </section>
  )
}

export default BrandParallax
