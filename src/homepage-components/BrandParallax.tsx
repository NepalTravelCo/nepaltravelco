"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"

const BrandParallax = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1.1, 1])

  return (
    <section
      ref={containerRef}
      className="relative h-[700px] md:h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Background with Parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <div
          className="w-full h-[100%] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://i.pinimg.com/736x/1c/29/39/1c29391ff02d48e24470a10839a4decb.jpg')" }}
        />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-4xl px-6 text-center text-white"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-6"
        >
          Your Journey Starts Here
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-[var(--heading-font)] text-4xl md:text-6xl font-bold mb-8 leading-tight drop-shadow-2xl text-white"
        >
          Discover Your Next <br />
          <span className="italic font-normal">Adventure</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-[var(--text-font)] text-base md:text-xl text-stone-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Embark on unforgettable journeys to breathtaking destinations. Create memories that
          will last a lifetime with our expertly curated travel experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <button
            className="
              group relative overflow-hidden inline-flex items-center gap-3
              bg-white text-primary px-10 py-4 rounded-full
              font-bold text-sm uppercase tracking-widest
              shadow-2xl transition-all duration-300
              hover:bg-secondary hover:text-white hover:-translate-y-1
            "
          >
            Start Your Journey
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
          </button>
        </motion.div>
      </motion.div>

      {/* Decorative Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
    </section>
  )
}

export default BrandParallax
