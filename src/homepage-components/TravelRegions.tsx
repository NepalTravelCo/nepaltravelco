"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

type RegionKey = "Himalayan" | "Hilly" | "Terai"

const regionData: Record<
  RegionKey,
  { description: string; highlights: string[]; image: string; tag: string }
> = {
  Himalayan: {
    tag: "The Roof of the World",
    description:
      "The Himalayan region of Nepal is home to towering peaks and legendary trekking destinations like Everest, Annapurna, and Mustang.",
    highlights: ["Mount Everest", "Annapurna Base Camp", "Upper Mustang", "Manaslu Trek"],
    image: "/Images/SVG/mountains.svg",
  },
  Hilly: {
    tag: "The Cultural Heartland",
    description:
      "The Hilly region boasts the cultural heart of Nepal, including Kathmandu, Pokhara, and historical hill towns rich in heritage.",
    highlights: ["Kathmandu Valley", "Pokhara", "Bandipur", "Palpa"],
    image: "/Images/SVG/hills.svg",
  },
  Terai: {
    tag: "The Tropical Lowlands",
    description:
      "The Terai region features lush jungles, national parks, and the agricultural plains of southern Nepal.",
    highlights: ["Chitwan National Park", "Lumbini", "Bardia National Park", "Janakpur"],
    image: "/Images/SVG/terai.svg",
  },
}

type Slide =
  | { type: "overview"; title: string; subtitle: string; description: string }
  | { type: "region"; regionKey: RegionKey; title: string; subtitle: string }

const slides: Slide[] = [
  {
    type: "overview",
    title: "Diverse Landscapes",
    subtitle: "The Magnificent Three",
    description:
      "Planning a trip to Nepal but don't know where to start? Let us introduce you to our three major regions—from towering peaks to lush jungles.",
  },
  { type: "region", regionKey: "Himalayan", title: "Himalayan Region", subtitle: "Where mountains touch the sky" },
  { type: "region", regionKey: "Hilly", title: "Hilly Region", subtitle: "Cultural heart of Nepal" },
  { type: "region", regionKey: "Terai", title: "Terai Region", subtitle: "Wildlife and ancient heritage" },
]

export default function TravelRegions() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slide = slides[currentSlide]

  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const goToPrev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative z-10 w-full min-h-screen lg:h-[800px] overflow-hidden bg-primary text-white">
      {/* Background Decorative Elements */}
      {/* <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent rounded-full blur-[120px]" />
      </div> */}

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
                  {slide.type === "overview" ? "Nepal at a Glance" : regionData[slide.regionKey].tag}
                </span>
                <h1 className="font-[var(--heading-font)] text-5xl md:text-7xl font-bold mb-8 leading-tight text-white">
                  {slide.type === "overview" ? slide.subtitle : slide.title}
                </h1>

                <div className="text-lg md:text-xl text-stone-300 font-light leading-relaxed mb-10">
                  {slide.type === "overview" ? (
                    slide.description
                  ) : (
                    <>
                      <p className="mb-8">{regionData[slide.regionKey].description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        {regionData[slide.regionKey].highlights.map((place, idx) => (
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
                  {/* <button className="flex items-center gap-3 group text-white font-semibold">
                    <span>Learn More</span>
                    <ArrowRight size={20} className="transition-transform group-hover:translate-x-2 text-secondary" />
                  </button> */}

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
                  src={slide.type === "overview" ? "/Images/SVG/nepal.svg" : regionData[slide.regionKey].image}
                  alt={slide.title}
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
