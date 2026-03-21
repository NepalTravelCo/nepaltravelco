"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mountain, Plane, Footprints, Landmark, Sparkles, Compass } from "lucide-react"
import Image from "next/image"

interface TravelImage {
  src: string
  title: string
  description: string
  meta?: string
  coords?: string
}

interface Category {
  id: number
  name: string
  icon: JSX.Element
  images: TravelImage[]
}

export default function TravelTypes() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const categories: Category[] = [
    {
      id: 0,
      name: "Trekking",
      icon: <Footprints size={14} />,
      images: [
        {
          src: "https://i.pinimg.com/736x/a7/bf/1e/a7bf1e89e823fa7d73995f86b62826b6.jpg",
          title: "Everest Base Camp",
          description: "A legendary journey through the Khumbu Valley to the foot of the world's highest peak.",
          meta: "5,364m Altitude",
          coords: "28.00°N / 86.85°E"
        },
        {
          src: "https://i.pinimg.com/1200x/be/a6/d5/bea6d530c1db57a39a053315cd7963c0.jpg",
          title: "Annapurna Circuit",
          description: "One of the most diverse treks in the world, crossing the Thorong La Pass.",
          meta: "High Mountain Pass",
          coords: "28.59°N / 83.84°E"
        },
        {
          src: "https://i.pinimg.com/1200x/af/be/09/afbe09490d1b0fe08080205eaabf907a.jpg",
          title: "Langtang Valley",
          description: "The valley of glaciers, offering authentic Tamang culture and stunning vistas.",
          meta: "Glacial Valley",
          coords: "28.21°N / 85.51°E"
        }
      ],
    },
    {
      id: 1,
      name: "Adrenaline",
      icon: <Sparkles size={14} />,
      images: [
        {
          src: "https://i.pinimg.com/736x/21/9f/b1/219fb1ed3977a900b75c831f0132c09b.jpg",
          title: "The Last Resort Bungee",
          description: "One of the world's most spectacular jumps over the Bhote Koshi River.",
          meta: "160m Freefall",
          coords: "27.87°N / 85.89°E"
        },
        {
          src: "https://i.pinimg.com/736x/a8/35/b2/a835b2a7308707b408b323d465d57a2f.jpg",
          title: "Pokhara Paragliding",
          description: "Soar with the eagles while overlooking the Phewa Lake and Annapurna range.",
          meta: "Aerial Adventure",
          coords: "28.21°N / 83.96°E"
        },
        {
          src: "https://i.pinimg.com/736x/65/8b/7b/658b7bc03c2602481445af3b4047312b.jpg",
          title: "Trishuli White Water",
          description: "Experience the thrill of Grade IV rapids in the heart of the Himalayas.",
          meta: "River Expedition",
          coords: "27.82°N / 84.81°E"
        }
      ],
    },
    {
      id: 2,
      name: "Spiritual",
      icon: <Landmark size={14} />,
      images: [
        {
          src: "https://i.pinimg.com/736x/65/8b/7b/658b7bc03c2602481445af3b4047312b.jpg",
          title: "Boudhanath Stupa",
          description: "The center of Tibetan Buddhism in Nepal, surrounded by vibrant monasteries.",
          meta: "UNESCO Heritage",
          coords: "27.72°N / 85.36°E"
        },
        {
          src: "https://i.pinimg.com/736x/d7/73/53/d7735375c9f6ca6afe8a3681cfbfbdcb.jpg",
          title: "Birthplace of Buddha",
          description: "Follow the footsteps of Siddhartha Gautama in the sacred gardens of Lumbini.",
          meta: "Sacred Site",
          coords: "27.48°N / 83.27°E"
        },
        {
          src: "https://i.pinimg.com/736x/8d/e8/0e/8de80efb0939c721f3379f311cd8e5f7.jpg",
          title: "Pashupatinath Temple",
          description: "The most sacred Hindu temple in Nepal, a place of profound tradition.",
          meta: "Cultural Landmark",
          coords: "27.71°N / 85.34°E"
        }
      ],
    },
    {
      id: 3,
      name: "Luxury",
      icon: <Plane size={14} />,
      images: [
        {
          src: "https://i.pinimg.com/736x/a5/b3/d6/a5b3d69b34ddab883efe8fae9c545081.jpg",
          title: "Himalayan Heli Tour",
          description: "Breakfast at the Everest View Hotel with panoramic views of the giants.",
          meta: "VIP Experience",
          coords: "Above Khumbu"
        },
        {
          src: "https://i.pinimg.com/736x/67/58/41/675841252ea3f17c6208950446d0d830.jpg",
          title: "Dwarika's Heritage",
          description: "Stay in a living museum that preserves the finest Newari architecture.",
          meta: "Cultural Stay",
          coords: "27.70°N / 85.34°E"
        },
        {
          src: "https://i.pinimg.com/736x/76/02/8f/76028f432460c40d50eac15fad6ae448.jpg",
          title: "Mountain Air Expedition",
          description: "A private flight covering all eight 8,000m peaks of Nepal in one morning.",
          meta: "Exclusive Journey",
          coords: "Panoramic Route"
        }
      ],
    },
    {
      id: 4,
      name: "Culture",
      icon: <Mountain size={14} />,
      images: [
        {
          src: "https://i.pinimg.com/736x/00/31/2e/00312e7cdff1bfa307d51c0bd5df365c.jpg",
          title: "Kathmandu Durbar Square",
          description: "The historic heart of the city, home to the Living Goddess Kumari.",
          meta: "Royal Heritage",
          coords: "27.70°N / 85.30°E"
        },
        {
          src: "https://i.pinimg.com/736x/fe/6d/7a/fe6d7aba6565aa703344665ad54855f6.jpg",
          title: "Bhaktapur Pottery",
          description: "Witness age-old traditions in the best-preserved medieval city of the valley.",
          meta: "Ancient Craft",
          coords: "27.67°N / 85.42°E"
        },
        {
          src: "https://i.pinimg.com/736x/e3/8b/10/e38b10e1f2c1297ba494d0acfae21255.jpg",
          title: "Patan Art & Metalwork",
          description: "Explore the City of Fine Arts and its incredible metal crafting heritage.",
          meta: "Artisan Soul",
          coords: "27.67°N / 8 Patan"
        }
      ],
    },
  ]

  const currentCategory = categories[activeCategory]
  const currentImages = currentCategory.images

  return (
    <section className="bg-stone-50 py-24 md:py-32 overflow-hidden">
      <div className="container-max">
        
        {/* Minimalist Header & Navigation */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16 border-b border-stone-200 pb-8">
          <div className="max-w-xl">
            <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px] mb-3 block">Experiences</span>
            <h2 className="font-[var(--heading-font)] text-primary text-4xl md:text-5xl font-bold tracking-tight">
              Things to <span className="italic font-normal">do.</span>
            </h2>
          </div>

          <nav className="flex items-center gap-6 md:gap-10">
            {categories.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(idx)
                  setCurrentImageIndex(0)
                }}
                className="relative group py-2"
              >
                <div className="flex items-center gap-2">
                  <span className={`transition-transform duration-500 ${activeCategory === idx ? "scale-110 text-secondary" : "text-stone-300 group-hover:text-stone-400"}`}>
                    {cat.icon}
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                    activeCategory === idx ? "text-primary" : "text-stone-400 group-hover:text-primary"
                  }`}>
                    {cat.name}
                  </span>
                </div>
                {activeCategory === idx && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-8 left-0 right-0 h-0.5 bg-secondary"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Blended Collage Display */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Main Stage (7-8 cols) */}
            <div className="md:col-span-8 relative">
              <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-[3rem] md:rounded-[4rem] overflow-hidden bg-stone-200 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] group/main">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCategory}-${currentImageIndex}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentImages[currentImageIndex].src}
                      alt={currentImages[currentImageIndex].title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover/main:scale-110"
                      priority
                    />
                    
                    {/* Subtle Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                    
                    {/* Floating Content */}
                    <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-end pointer-events-none">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                           <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                           <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.4em]">{currentImages[currentImageIndex].meta}</span>
                        </div>
                        <h3 className="text-white font-[var(--heading-font)] text-4xl md:text-6xl font-bold mb-4 tracking-tighter leading-tight drop-shadow-sm">
                          {currentImages[currentImageIndex].title}
                        </h3>
                        <p className="text-white/80 text-sm md:text-base font-light leading-relaxed max-w-md">
                          {currentImages[currentImageIndex].description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Coordinates - Top Right */}
                    <div className="absolute top-10 right-10 flex flex-col items-end pointer-events-none opacity-40">
                       <span className="text-white text-[9px] font-bold uppercase tracking-[0.2em]">{currentImages[currentImageIndex].coords}</span>
                       <div className="w-12 h-px bg-white/30 mt-2" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Collage Accents (4-5 cols) */}
            <div className="md:col-span-4 flex flex-col gap-8 md:gap-12 relative">
               {/* Decorative Background Element */}
               <div className="absolute -inset-10 bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

               {currentImages.map((img, i) => (
                 i !== currentImageIndex && (
                   <motion.button
                     key={i}
                     layoutId={`collage-${i}`}
                     onClick={() => setCurrentImageIndex(i)}
                     className={`group relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 ${
                       i % 2 === 0 ? "self-start w-3/4 md:w-[70%] aspect-square translate-x-4" : "self-end w-3/4 md:w-[70%] aspect-square -translate-x-4"
                     }`}
                     style={{ zIndex: 10 + i }}
                   >
                      <Image
                        src={img.src}
                        alt={img.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500" />
                      
                      {/* Very Minimal Label on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                         <div className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center">
                            <Compass size={16} className="text-secondary" />
                         </div>
                      </div>

                      {/* Small Caption */}
                      <div className="absolute bottom-6 left-8 right-8">
                        <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">{img.title}</span>
                      </div>
                   </motion.button>
                 )
               ))}
            </div>

          </div>

          {/* Simple Page Indicator */}
          <div className="hidden md:flex justify-start mt-16 gap-4">
             {currentImages.map((_, i) => (
               <button 
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className={`transition-all duration-500 ${currentImageIndex === i ? "w-16 h-1 bg-secondary" : "w-8 h-1 bg-stone-200 hover:bg-stone-300"}`}
               />
             ))}
          </div>
        </div>
      </div>
    </section>
  )
}
