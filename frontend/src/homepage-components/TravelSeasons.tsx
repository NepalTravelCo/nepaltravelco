"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"
import { getPublicBackendBaseUrl } from "@/lib/backend-url"

interface Season {
  slug: string
  name: string
  image: string
  bestMonths: string[]
  description: string
}

export default function TravelSeasons({ onLoaded }: { onLoaded?: () => void }) {
  const [seasons, setSeasons] = useState<Season[]>([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // ✅ FETCH DATA (SAFE)
  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await fetch(`${getPublicBackendBaseUrl()}/api/seasons`)

        const data = await response.json()
        console.log("Seasons API:", data)

        if (Array.isArray(data)) {
          setSeasons(data)
        } else if (data?.seasons) {
          setSeasons(data.seasons)
        } else {
          console.warn("Unexpected API format")
        }
      } catch (error) {
        console.error("Error fetching seasons:", error)
      } finally {
        setLoading(false)
        onLoaded?.()
      }
    }

    fetchSeasons()
  }, [])

  // ✅ MOBILE DETECTION
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // ✅ LOADING STATE (IMPORTANT FIX)
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading seasons...
      </div>
    )
  }

  // ✅ EMPTY STATE (IMPORTANT FIX)
  if (seasons.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No seasons data found
      </div>
    )
  }

  return (
    <section className="bg-stone-50 py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center relative">

      {/* HEADER */}
      <div className="w-full mb-16 md:mb-24 px-4 text-center">
        <span className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">
          Timing is Everything
        </span>

        <h2 className="text-4xl md:text-7xl font-bold text-primary leading-tight">
          Seasonal <br />
          <span className="italic font-normal">Splendor of Nepal</span>
        </h2>
      </div>

      {/* CARD CONTAINER */}
      <div
        ref={containerRef}
        className="relative w-full max-w-7xl h-[450px] md:h-[600px] flex items-center justify-center"
      >
        <div className="relative w-full h-full flex items-center justify-center">

          {seasons.map((season, idx) => {
            const total = seasons.length
            const center = (total - 1) / 2
            const distance = idx - center

            const xOffset = distance * (isMobile ? 80 : 180)
            const rotation = distance * (isMobile ? 8 : 12)
            const yOffset = Math.abs(distance) * (isMobile ? 20 : 50)
            const zIndex = 20 - Math.abs(distance)

            return (
              <motion.div
                key={season.slug}
                className="absolute origin-bottom"
                style={{ zIndex: hoveredIndex === idx ? 60 : zIndex }}

                // ✅ FIX: ALWAYS ANIMATE (removed isInView bug)
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                animate={{
                  x: xOffset,
                  y: yOffset,
                  rotate: hoveredIndex === idx ? 0 : rotation,
                  opacity: 1,
                  scale: hoveredIndex === idx ? 1.1 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 15,
                  delay: idx * 0.1,
                }}

                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link href={`/seasons/${season.slug}`}>

                  <div className="w-[220px] h-[340px] md:w-[320px] md:h-[480px] rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl bg-black/10 group relative">

                    {/* BORDER */}
                    <div className="absolute inset-0 border border-white/20 rounded-[40px] md:rounded-[60px] z-30 pointer-events-none" />

                    {/* ✅ IMAGE FIX (use <img> to avoid Next issues) */}
                    <img
                      src={season.image}
                      alt={season.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                    {/* TOP TAG */}
                    <div className="absolute top-6 left-6 z-20">
                      <div className="px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/30 backdrop-blur-md bg-white/10 text-secondary">
                        <Calendar size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                          {season.name}
                        </span>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="absolute bottom-0 p-6 text-white z-10">
                      <span className="text-xs uppercase tracking-widest text-secondary">
                        {season.bestMonths.join(", ")}
                      </span>

                      <h3 className="text-2xl md:text-3xl font-bold text-stone-50">
                        {season.name}
                      </h3>

                      <p className="text-xs md:text-sm mt-2 line-clamp-3 text-stone-50/80">
                        {season.description}
                      </p>

                      <div className="mt-4">
                          <button className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 text-white text-xs uppercase tracking-wider overflow-hidden transition-all duration-300">

                            {/* Background hover effect */}
                            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300" />

                            {/* Text */}
                            <span className="relative z-10">Explore</span>

                            {/* Arrow animation */}
                            <ArrowRight
                              size={14}
                              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                            />

                          </button>
                        </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* BACKGROUND EFFECT */}
      <div className="absolute top-1/2 left-1/2 w-full h-[120%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0%,transparent_70%)] pointer-events-none" />

    </section>
  )
}