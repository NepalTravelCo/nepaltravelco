"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, Compass, Mountain, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { treksData } from "@/data/Treks"

const BrandInfo = () => {
  const [startIndex, setStartIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const trekkinginfo = treksData.slice(0, 6).map((trek) => ({
    id: trek.slug,
    name: trek.name,
    description: trek.description,
    imageUrl: trek.image,
    location: trek.highlights[0] || "Nepal",
    altitude: `${trek.altitude} m`,
    slug: trek.slug,
  }))

  const handleNext = () => {
    setDirection(1)
    setStartIndex((prev) => (prev + 1) % trekkinginfo.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setStartIndex((prev) => (prev - 1 + trekkinginfo.length) % trekkinginfo.length)
  }

  useEffect(() => {
    const interval = setInterval(handleNext, 6000)
    return () => clearInterval(interval)
  }, [])

  const getVisibleItems = () => {
    const items = []
    for (let i = 0; i < 3; i++) {
      items.push(trekkinginfo[(startIndex + i) % trekkinginfo.length])
    }
    return items
  }

  return (
    <section className="relative z-10 py-24 bg-primary overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2" />

      <div className="container-max relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block"
            >
              Beyond the Ordinary
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="font-[var(--heading-font)] text-4xl md:text-6xl font-bold text-white leading-tight"
            >
              Trekking Gems <br />
              <span className="italic font-normal">of the Himalayas</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <Link
              href="/treks"
              className="group flex items-center gap-3 text-white font-semibold uppercase tracking-widest text-xs border-b border-white/20 pb-2 hover:border-secondary transition-colors"
            >
              Explore All Trails
              <ArrowRight size={16} className="text-secondary transition-transform group-hover:translate-x-2" />
            </Link>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="wait" initial={false}>
              {getVisibleItems().map((trek, idx) => (
                <motion.div
                  key={`${trek.id}-${startIndex}-${idx}`}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-white/5 border border-white/10"
                >
                  <Image
                    src={trek.imageUrl}
                    alt={trek.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className="glass px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/20">
                      <Compass size={12} className="text-secondary" />
                      <span className="text-white text-[10px] font-bold uppercase tracking-wider">{trek.location}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 inset-x-0 p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Mountain size={14} className="text-secondary" />
                      <span className="text-white/60 text-[10px] uppercase tracking-widest font-bold">Max Altitude: {trek.altitude}</span>
                    </div>
                    <h3 className="font-[var(--heading-font)] text-2xl font-bold text-white mb-4">
                      {trek.name}
                    </h3>
                    <p className="text-stone-300 text-sm line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {trek.description}
                    </p>
                    <Link
                      href={`/treks/${trek.slug}`}
                      className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-[0.2em] group/btn"
                    >
                      View Details
                      <ChevronRight size={14} className="text-secondary transition-transform group-hover/btn:translate-x-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center mt-12 gap-6">
            <button
              onClick={handlePrev}
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all duration-500 shadow-xl"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all duration-500 shadow-xl"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrandInfo
