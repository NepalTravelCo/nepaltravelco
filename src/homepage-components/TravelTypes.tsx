"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mountain, Plane, Footprints, Landmark, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function TravelTypes() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const categories = [
    {
      id: 0,
      name: "Adventure Thrills",
      icon: <Mountain size={20} />,
      images: [
        {
          src: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Everest Base Camp Trek",
          description: "Challenge yourself with the ultimate mountain adventure through breathtaking landscapes",
        },
        {
          src: "https://images.unsplash.com/photo-1533587851505-d119e1fa864a?q=80&w=2070&auto=format&fit=crop",
          title: "White Water Rafting",
          description: "Experience thrilling rapids in pristine mountain rivers with expert guides",
        },
        {
          src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop",
          title: "Mountain Biking",
          description: "Scale dramatic drops and conquer vertical challenges safely",
        },
      ],
    },
    {
      id: 1,
      name: "Scenic Flights",
      icon: <Plane size={20} />,
      images: [
        {
          src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Everest Mountain Flight",
          description: "Witness the world's highest peaks from above in luxury comfort",
        },
        {
          src: "https://images.unsplash.com/photo-1582650841021-4f108253a6a1?q=80&w=2070&auto=format&fit=crop",
          title: "Annapurna Helicopter Tour",
          description: "Soar over the majestic Annapurna range with stunning aerial views",
        },
      ],
    },
    {
      id: 2,
      name: "Trekking & Nature",
      icon: <Footprints size={20} />,
      images: [
        {
          src: "https://www.intrepidtravel.com/adventures/wp-content/uploads/2018/05/Hiker-800.jpg",
          title: "Annapurna Circuit",
          description: "Classic trek through diverse landscapes and traditional mountain cultures",
        },
        {
          src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
          title: "Langtang Valley Trek",
          description: "Explore pristine valleys and encounter authentic Himalayan communities",
        },
      ],
    },
    {
      id: 3,
      name: "Culture & Heritage",
      icon: <Landmark size={20} />,
      images: [
        {
          src: "https://www.atishahotel.com/wp-content/uploads/2024/05/Bouddhanath-Stupa-amazing-vieww.jpg",
          title: "Boudhanath Stupa",
          description: "Ancient Buddhist monument and spiritual center of Tibetan culture",
        },
        {
          src: "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?q=80&w=2070&auto=format&fit=crop",
          title: "Kathmandu Durbar Square",
          description: "Historic palace complex showcasing intricate Newari architecture",
        },
      ],
    },
    {
      id: 4,
      name: "Festivals & Traditions",
      icon: <Sparkles size={20} />,
      images: [
        {
          src: "https://images.unsplash.com/photo-1590490359854-dfba19688d70?q=80&w=1974&auto=format&fit=crop",
          title: "Dashain",
          description: "Nepal's biggest celebration of victory of good over evil with family gatherings",
        },
        {
          src: "https://images.unsplash.com/photo-1545639535-c3359d997232?q=80&w=2070&auto=format&fit=crop",
          title: "Holi",
          description: "Festival of colors celebrating victory over evil and the arrival of spring",
        },
      ],
    },
  ]

  const currentCategory = categories[activeCategory]
  const currentImages = currentCategory.images

  const handleCategoryClick = (index: number) => {
    setActiveCategory(index)
    setCurrentImageIndex(0)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="bg-stone-50 py-24 overflow-hidden">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-secondary font-semibold tracking-widest uppercase text-xs mb-3 block">Infinite Possibilities</span>
            <h2 className="font-[var(--heading-font)] text-primary text-4xl md:text-5xl font-bold">
              Things to <span className="italic font-normal">Do</span>
            </h2>
          </motion.div>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(idx)}
              className={`
                flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300
                ${activeCategory === idx
                  ? "bg-primary text-white shadow-xl scale-105"
                  : "bg-white text-stone-500 hover:bg-stone-100 shadow-sm"}
              `}
            >
              <span className={activeCategory === idx ? "text-white" : "text-stone-400"}>
                {cat.icon}
              </span>
              <span className="text-sm font-semibold whitespace-nowrap">
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        {/* Carousel Section */}
        <div className="relative max-w-7xl mx-auto">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${currentImageIndex}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={currentImages[currentImageIndex].src}
                  alt={currentImages[currentImageIndex].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <h3 className="text-white font-[var(--heading-font)] text-3xl md:text-4xl font-bold mb-4">
                      {currentImages[currentImageIndex].title}
                    </h3>
                    <p className="text-stone-200 text-lg font-light leading-relaxed">
                      {currentImages[currentImageIndex].description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-12 right-12 flex gap-4 z-20">
              <button
                onClick={handlePrevImage}
                className="w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNextImage}
                className="w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 shadow-lg"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Counter */}
            <div className="absolute top-12 right-12 glass px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
              <span className="text-white text-sm font-bold tracking-tighter">
                0{currentImageIndex + 1} / 0{currentImages.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
