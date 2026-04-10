"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { useRef } from "react"

export default function ExploreValleyHero() {
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.85, 0])

  const handleScrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <section ref={heroRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/31/c9/36/31c93670f4daddc18727c0a2d034cf29.jpg')",
            scale: imageScale,
            y: imageY,
          }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-stone-900/95" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 text-center px-4 max-w-6xl mx-auto mt-12 md:mt-16"
      >
        <motion.span
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="inline-block text-[#ea580c] font-bold tracking-[0.35em] uppercase text-xs md:text-sm mb-8"
        >
          Kathmandu Valley Guide
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-[var(--heading-font)] text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.95] tracking-tight"
        >
          Explore the{" "}
          <span className="text-transparent border-t-2 border-b-2 border-[#ea580c] bg-clip-text bg-gradient-to-r from-[#ea580c] to-[#f97316]">
            Valley
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="text-lg md:text-2xl text-stone-200 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Temples, royal squares, seasonal festivals, and short Himalayan escapes all in one living cultural basin.
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 cursor-pointer"
        onClick={handleScrollDown}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        <span className="text-white/70 text-[10px] uppercase tracking-[0.3em] font-bold">Read Guide</span>
        <ArrowDown className="text-white/70 animate-bounce" size={20} />
      </motion.div>
    </section>
  )
}
