"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft, Compass, Mountain } from "lucide-react"
import Link from "next/link"
import { treksData } from "@/data/Treks"

const BrandInfo = () => {
  const [startIndex, setStartIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

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
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setStartIndex((prev) => (prev + 1) % trekkinginfo.length)
      setTimeout(() => setIsTransitioning(false), 300)
    }, 100)
  }

  const handlePrev = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setStartIndex((prev) => (prev - 1 + trekkinginfo.length) % trekkinginfo.length)
      setTimeout(() => setIsTransitioning(false), 300)
    }, 100)
  }

  useEffect(() => {
    const interval = setInterval(handleNext, 3000)
    return () => clearInterval(interval)
  }, [isTransitioning])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const visibleParks = [0, 1, 2].map((i) => {
    const index = (startIndex + i) % trekkinginfo.length
    return {
      ...trekkinginfo[index],
      position: i === 0 ? "left" : i === 1 ? "center" : "right",
    }
  })

  return (
    <motion.section
      role="region"
      aria-label="Trekking Gems of Nepal"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative py-20 bg-gradient-to-br from-primary via-emerald-900 to-slate-800"
    >
      {/* Pattern */}
      <div className="absolute inset-0 bg-[url('/Images/SVG/tortoise-shell.svg')] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 items-center">

        {/* LEFT */}
        <div className="text-center lg:text-left">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-6">
            Trekking Gems of Nepal
          </h2>

          <Link
            href="/treks"
            className="inline-flex items-center gap-2 uppercase tracking-wide text-white font-semibold relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full"
          >
            View All Trails <ArrowRight size={18} />
          </Link>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center items-center">

          {/* Carousel */}
          <div className="relative flex items-center gap-1 pb-12">

            {visibleParks.map((park) => {
              const base =
                "relative rounded-xl overflow-hidden transition-all duration-500 cursor-pointer group"

              const positionStyles =
                park.position === "center"
                  ? "w-[250px] h-[400px] z-30 shadow-xl scale-100"
                  : "w-[225px] h-[400px] opacity-80 scale-90 z-10"

              const transform =
                park.position === "left"
                  ? "-translate-x-2 -rotate-2"
                  : park.position === "right"
                  ? "translate-x-2 rotate-2"
                  : ""

              return (
                <div
                  key={park.id}
                  className={`${base} ${positionStyles} ${transform} ${
                    isTransitioning ? "transition-all" : ""
                  } hidden md:block`}
                >
                  <img
                    src={park.imageUrl}
                    alt={park.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />

                  {/* Title */}
                  <div className="absolute bottom-6 inset-x-4 text-center text-white font-heading font-semibold text-lg group-hover:opacity-0 transition-opacity">
                    {park.name}
                  </div>

                  {/* Hover content */}
                  <div className="absolute inset-0 bg-emerald-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <div className="text-white text-center px-4">
                      <div className="flex flex-col gap-1 text-sm mb-2">
                        <span className="flex justify-center gap-1">
                          <Compass size={14} /> {park.location}
                        </span>
                        <span className="flex justify-center gap-1">
                          <Mountain size={14} /> {park.altitude}
                        </span>
                      </div>

                      <p className="text-xs line-clamp-3 mb-3">
                        {park.description}
                      </p>

                      <Link
                        href={`/treks/${park.slug}`}
                        className="inline-flex items-center gap-1 bg-accent px-3 py-1 rounded-lg text-xs font-semibold hover:bg-button-hover"
                      >
                        Explore <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Mobile card */}
            <div className="md:hidden w-full max-w-sm h-[360px] rounded-xl overflow-hidden shadow-lg relative">
              <img
                src={visibleParks[1].imageUrl}
                alt={visibleParks[1].name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Nav buttons */}
            <button
              onClick={handlePrev}
              disabled={isTransitioning}
              className="absolute -left-6 md:left-[18rem] top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full w-12 h-12 flex items-center justify-center hover:bg-accent disabled:opacity-50"
            >
              <ArrowLeft />
            </button>

            <button
              onClick={handleNext}
              disabled={isTransitioning}
              className="absolute -right-6 md:right-[18rem] top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full w-12 h-12 flex items-center justify-center hover:bg-accent disabled:opacity-50"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default BrandInfo
