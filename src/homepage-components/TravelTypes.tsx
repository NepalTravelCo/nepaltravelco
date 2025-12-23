"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mountain, Plane, Footprints, Landmark, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"

export default function TravelTypes() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const categories = [
    {
      id: 0,
      name: "ADVENTURE THRILLS",
      icon: <Mountain size={24} />,
      images: [
        {
          src: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Everest Base Camp Trek",
          description: "Challenge yourself with the ultimate mountain adventure through breathtaking landscapes",
        },
        {
          src: "https://i.pinimg.com/736x/c4/8c/a5/c48ca537f340ef1cbf6f744f6f29f524.jpg",
          title: "White Water Rafting",
          description: "Experience thrilling rapids in pristine mountain rivers with expert guides",
        },
        {
          src: "https://i.pinimg.com/1200x/b7/98/0a/b7980a3ec7ad2618b12eb1280131b5f1.jpg",
          title: "Bungee",
          description: "Scale dramatic drops and conquer vertical challenges safely",
        },
      ],
    },
    {
      id: 1,
      name: "SCENIC FLIGHTS",
      icon: <Plane size={24} />,
      images: [
        {
          src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Everest Mountain Flight",
          description: "Witness the world's highest peaks from above in luxury comfort",
        },
        {
          src: "https://i.pinimg.com/736x/f8/40/69/f840694596a6a4b2842a489960f42226.jpg",
          title: "Annapurna Helicopter Tour",
          description: "Soar over the majestic Annapurna range with stunning aerial views",
        },
        {
          src: "https://i.pinimg.com/1200x/56/03/8e/56038ed01cd337e0001d82392259ff22.jpg",
          title: "Tilicho Lake Helicopter Tour",
          description: "Fly to the Tilicho Lake with stunning views",
        },
      ],
    },
    {
      id: 2,
      name: "TREKKING & NATURE",
      icon: <Footprints size={24} />,
      images: [
        {
          src: "https://www.intrepidtravel.com/adventures/wp-content/uploads/2018/05/Hiker-800.jpg",
          title: "Annapurna Circuit",
          description: "Classic trek through diverse landscapes and traditional mountain cultures",
        },
        {
          src: "https://i.pinimg.com/1200x/af/be/09/afbe09490d1b0fe08080205eaabf907a.jpg",
          title: "Langtang Valley Trek",
          description: "Explore pristine valleys and encounter authentic Himalayan communities",
        },
        {
          src: "https://i.pinimg.com/1200x/9b/e9/fe/9be9fe0a7a869f7fa75c5928b0b8cb6d.jpg",
          title: "Gokyo Lake Trek",
          description: "Discover turquoise alpine lakes beneath towering snow-capped peaks",
        },
      ],
    },
    {
      id: 3,
      name: "CULTURE & HERITAGE",
      icon: <Landmark size={24} />,
      images: [
        {
          src: "https://www.atishahotel.com/wp-content/uploads/2024/05/Bouddhanath-Stupa-amazing-vieww.jpg",
          title: "Boudhanath Stupa",
          description: "Ancient Buddhist monument and spiritual center of Tibetan culture",
        },
        {
          src: "https://media.app.himalayantrekkingpath.com/uploads/fullbanner/darbar-square.webp",
          title: "Kathmandu Durbar Square",
          description: "Historic palace complex showcasing intricate Newari architecture",
        },
        {
          src: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/dc/b0/a4.jpg",
          title: "Pashupatinath Temple",
          description: "Sacred Hindu temple complex on the holy banks of Bagmati River",
        },
      ],
    },
    {
      id: 4,
      name: "FESTIVALS & TRADITIONS",
      icon: <Sparkles size={24} />,
      images: [
        {
          src: "https://i.pinimg.com/1200x/af/07/00/af07000df2711a6032369d41c92ea6f5.jpg",
          title: "Dashain",
          description: "Nepal's biggest celebration of victory of good over evil with family gatherings",
        },
        {
          src: "https://i.pinimg.com/736x/aa/bb/dd/aabbdd2996ede2d29ad41153c25e2309.jpg",
          title: "Tihar",
          description: "Festival of lights honoring animals, relationships and divine connections",
        },
        {
          src: "https://i.pinimg.com/1200x/fc/6c/ff/fc6cffeb39d1669b73efcb9168c47ddc.jpg",
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
    <section className="bg-gray-50 py-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-primary uppercase">Things to Do</h2>
        </motion.div>

        {/* Category Icons */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              className={`flex flex-col items-center cursor-pointer transition transform rounded-lg p-2 
                          ${activeCategory === idx ? "scale-105" : "scale-100"}`}
              onClick={() => handleCategoryClick(idx)}
              whileHover={{ scale: 1.1 }}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 
                              ${activeCategory === idx ? "bg-accent" : "bg-primary"} shadow-lg`}>
                {cat.icon}
              </div>
              <p className={`text-sm font-semibold text-center uppercase transition-colors 
                             ${activeCategory === idx ? "text-primary" : "text-gray-700"}`}>
                {cat.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Image Carousel */}
        <div className="relative flex justify-center items-center min-h-[450px] mt-8">
          {currentImages.map((image, index) => {
            const isActive = index === currentImageIndex
            const isPrev = index === (currentImageIndex - 1 + currentImages.length) % currentImages.length
            const isNext = index === (currentImageIndex + 1) % currentImages.length
            if (!(isActive || isPrev || isNext)) return null

            const xPosition = isActive ? 0 : isPrev ? -40 : 40
            const zIndex = isActive ? 30 : 20
            const scale = isActive ? 1 : 0.85
            const opacity = isActive ? 1 : 0.6
            const blur = isActive ? "blur(0px)" : "blur(2px)"

            return (
              <motion.div
                key={index}
                className="absolute w-full max-w-[700px] px-4"
                initial={false}
                animate={{
                  x: `${xPosition}%`,
                  scale,
                  opacity,
                  zIndex,
                  filter: blur
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer group">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
                    <motion.h3
                      className="text-2xl md:text-3xl font-bold text-white mb-2"
                      animate={{ y: isActive ? 0 : 20 }}
                    >
                      {image.title}
                    </motion.h3>
                    <motion.p
                      className="text-white/90 text-sm md:text-base max-w-md"
                      animate={{ opacity: isActive ? 1 : 0 }}
                    >
                      {image.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            )
          })}

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 -left-4 -right-4 flex items-center justify-between pointer-events-none z-40">
            <button
              onClick={handlePrevImage}
              aria-label="Previous image"
              className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-primary flex items-center justify-center shadow-xl hover:bg-primary hover:text-white transition-all pointer-events-auto"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNextImage}
              aria-label="Next image"
              className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 text-primary flex items-center justify-center shadow-xl hover:bg-primary hover:text-white transition-all pointer-events-auto"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
