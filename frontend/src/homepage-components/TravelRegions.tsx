"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { apiClient } from "@/lib/api-client"

type RegionKey = "Himalayan" | "Hilly" | "Terai"

type RegionDataItem = { description: string; highlights: string[]; image: string; tag: string }

type Slide =
  | { type: "overview"; title: string; subtitle: string; description: string }
  | { type: "region"; regionKey: RegionKey; title: string; subtitle: string }

export default function TravelRegions({ onLoaded }: { onLoaded?: () => void }) {
  const [slides, setSlides] = useState<Slide[]>([])
  const [regionData, setRegionData] = useState<Record<RegionKey, RegionDataItem>>({} as any)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const data = await apiClient<any[]>("/api/sections?category=travel-regions")
        
        if (!Array.isArray(data)) {
          console.error("Travel Regions data is not an array:", data)
          return
        }

        // Separate overview and regions
        const overviewItem = data.find((item: any) => item.tag === "overview")
        const regionItems = data.filter((item: any) => item.tag === "region")

        const newSlides: Slide[] = []
        const newRegionData: any = {}

        if (overviewItem) {
          newSlides.push({
            type: "overview",
            title: overviewItem.title,
            subtitle: overviewItem.subtitle,
            description: overviewItem.content,
          })
        }

        regionItems.forEach((item: any) => {
          const key = item.metadata?.regionKey as RegionKey
          if (key) {
            newSlides.push({
              type: "region",
              regionKey: key,
              title: item.title,
              subtitle: item.subtitle,
            })
            newRegionData[key] = {
              tag: item.metadata?.tag,
              description: item.content,
              highlights: item.metadata?.highlights || [],
              image: item.mainImage,
            }
          }
        })

        setSlides(newSlides)
        setRegionData(newRegionData)
      } catch (error) {
        console.error("Error fetching travel regions:", error)
      } finally {
        setLoading(false)
        if (onLoaded) onLoaded()
      }
    }
    fetchRegions()
  }, []) // Remove onLoaded from dependency to fetch only once

  if (loading) return null;
  if (slides.length === 0) {
    console.warn("No travel regions data found - check seeding.");
    return null;
  }

  const slide = slides[currentSlide]

  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const goToPrev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative z-10 w-full min-h-screen lg:h-[800px] overflow-hidden bg-primary text-white">
      <div className="container-max h-full relative z-10 py-20 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

          {/* Content Side */}
          <div className="relative order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-xl"
              >
                <span className="text-secondary font-semibold tracking-widest uppercase text-xs mb-4 block">
                  {slide.type === "overview" ? "Nepal at a Glance" : regionData[slide.regionKey]?.tag}
                </span>
                <h1 className="font-[var(--heading-font)] text-5xl md:text-7xl font-bold mb-8 leading-tight text-white">
                  {slide.type === "overview" ? slide.subtitle : slide.title}
                </h1>

                <div className="text-lg md:text-xl text-stone-300 font-light leading-relaxed mb-10">
                  {slide.type === "overview" ? (
                    slide.description
                  ) : (
                    <>
                      <p className="mb-8">{regionData[slide.regionKey]?.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        {regionData[slide.regionKey]?.highlights.map((place, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                            <span className="text-base text-stone-200">{place}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-8">
                  <div className="flex gap-4">
                    <button onClick={goToPrev} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <ChevronLeft size={20} />
                    </button>
                    <button onClick={goToNext} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Visual Side */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-secondary/20 rounded-full blur-[100px] -z-10 scale-150" />
                <Image
                  src={slide.type === "overview" ? "/Images/SVG/nepal.svg" : regionData[slide.regionKey]?.image || "/placeholder.svg"}
                  alt={slide.type === "overview" ? "Nepal Map" : slide.title}
                  width={600}
                  height={500}
                  className="w-full max-w-[500px] h-auto object-contain filter drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <span className="text-xs font-bold text-stone-500">0{currentSlide + 1}</span>
        <div className="w-48 h-[1px] bg-white/10 relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-secondary"
            animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-xs font-bold text-stone-500">0{slides.length}</span>
      </div>
    </section>
  )
}
