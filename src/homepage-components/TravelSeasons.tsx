"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { seasonsData } from "../data/Seasons"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import Image from "next/image"

export default function TravelSeasons() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const scrollToIndex = useCallback((index: number) => {
    const container = containerRef.current
    if (!container) return
    const cardWidth = 384 + 32 // Width + gap
    container.scrollTo({ left: index * cardWidth, behavior: "smooth" })
  }, [])

  const scrollToNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % seasonsData.length
    scrollToIndex(nextIndex)
    setActiveIndex(nextIndex)
  }, [activeIndex, scrollToIndex])

  const scrollToPrev = () => {
    const prevIndex = (activeIndex - 1 + seasonsData.length) % seasonsData.length
    scrollToIndex(prevIndex)
    setActiveIndex(prevIndex)
  }

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = window.setInterval(scrollToNext, 5000)
  }, [scrollToNext])

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = null
  }, [])

  useEffect(() => {
    if (!isHovered) startAutoScroll()
    else stopAutoScroll()
    return () => stopAutoScroll()
  }, [isHovered, startAutoScroll, stopAutoScroll])

  return (
    <section className="bg-stone-50 py-24 overflow-hidden">
      <div className="container-max">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-secondary font-semibold tracking-widest uppercase text-xs mb-3 block">Timing is Everything</span>
            <h2 className="font-[var(--heading-font)] text-primary text-4xl md:text-5xl font-bold">
              Seasonal <span className="italic font-normal">Splendor</span>
            </h2>
          </motion.div>

          <div className="flex gap-4">
            <button
              onClick={scrollToPrev}
              className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-md"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollToNext}
              className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-md"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory gap-8 pb-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {seasonsData.map((season, idx) => (
            <motion.article
              key={season.slug}
              className={`flex-shrink-0 w-[80vw] md:w-[400px] snap-center rounded-[2rem] overflow-hidden group relative h-[500px] shadow-lg hover:shadow-2xl transition-all duration-500`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setActiveIndex(idx)}
            >
              <Link href={`/seasons/${season.slug}`} className="block h-full">
                <Image
                  src={season.image}
                  alt={season.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Seasonal Badge */}
                <div className="absolute top-8 left-8">
                  <div className="glass px-4 py-2 rounded-full flex items-center gap-2 border border-white/20">
                    <Calendar size={14} className="text-secondary" />
                    <span className="text-white text-xs font-bold uppercase tracking-wider">
                      {season.name}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-[var(--heading-font)] text-3xl font-bold mb-3">
                    {season.name}
                  </h3>
                  <p className="text-stone-300 text-sm font-light leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                    {season.description}
                  </p>
                  <div className="flex items-center gap-2 text-white font-semibold text-sm group/btn">
                    <span>Explore Season</span>
                    <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-2" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
