"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

type RegionKey = "Himalayan" | "Hilly" | "Terai"

const regionData: Record<
  RegionKey,
  { description: string; highlights: string[]; image: string }
> = {
  Himalayan: {
    description:
      "The Himalayan region of Nepal is home to towering peaks and legendary trekking destinations like Everest, Annapurna, and Mustang.",
    highlights: ["Mount Everest", "Annapurna Base Camp", "Upper Mustang", "Manaslu Trek"],
    image: "/Images/SVG/mountains.svg",
  },
  Hilly: {
    description:
      "The Hilly region boasts the cultural heart of Nepal, including Kathmandu, Pokhara, and historical hill towns rich in heritage.",
    highlights: ["Kathmandu Valley", "Pokhara", "Bandipur", "Palpa"],
    image: "/Images/SVG/hills.svg",
  },
  Terai: {
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
    title: "Nepal Travel Regions",
    subtitle: "From towering peaks to lush plains",
    description:
      "Planning a trip to Nepal but don't know where to start? No worries. Let us introduce you to our three major regions, or as we like to call them, the magnificent three. Keep scrolling to learn more.",
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
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 text-white">
      {/* Main content */}
      <motion.div
        className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center min-h-screen relative z-10 px-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Left panel - content */}
        <div className="flex-1 flex flex-col justify-center max-w-xl mb-8 lg:mb-0 lg:mr-8">
          <h1 className="text-3xl md:text-5xl font-quicksand font-bold uppercase mb-4">
            {slide.type === "overview" ? slide.subtitle : slide.title}
          </h1>
          <div className="text-base md:text-lg font-nunito leading-relaxed">
            {slide.type === "overview" ? (
              slide.description
            ) : (
              <>
                <p className="mb-4">{regionData[slide.regionKey].description}</p>
                <div>
                  <p className="font-semibold text-emerald-300 mb-2">Key Highlights:</p>
                  <ul className="flex flex-col gap-2 pl-4">
                    {regionData[slide.regionKey].highlights.map((place, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full inline-block flex-shrink-0" />
                        {place}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right panel - image */}
        <div className="flex-1 flex justify-center items-center">
          <Image
            src={slide.type === "overview" ? "/Images/SVG/nepal.svg" : regionData[slide.regionKey].image}
            alt={slide.type === "overview" ? "Nepal Map" : `${slide.regionKey} Region`}
            className="w-full max-w-md h-auto object-contain filter brightness-110 drop-shadow-xl transition-transform duration-500 hover:scale-105"
            width={350}
            height={250}
            priority={slide.type === "overview"}
          />
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrev}
        aria-label="Previous Slide"
        className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md hover:scale-110 transition-transform z-20"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        aria-label="Next Slide"
        className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md hover:scale-110 transition-transform z-20"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Slide Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              idx === currentSlide ? "bg-emerald-400" : "bg-white/30"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
