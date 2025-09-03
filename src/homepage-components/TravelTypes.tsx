"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mountain, Plane, Footprints, Landmark, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import "./styles/TravelTypes.css"

function TravelTypes() {
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

  const handleCategoryClick = (categoryIndex: number) => {
    setActiveCategory(categoryIndex)
    setCurrentImageIndex(0)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1))
  }

  // Animation variants for category items
  const categoryVariants = {
    initial: { scale: 1, y: 0 },
    active: { scale: 1.1, y: -5 },
    hover: { scale: 1.05, y: -3 },
  }

  return (
    <section className="travel-types-section">
      <div className="travel-types-container">
        {/* Header */}
        <motion.div 
          className="travel-types-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="travel-types-title">THINGS TO DO</h2>
        </motion.div>

        {/* Category Icons */}
        <div className="category-icons">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className={`category-item ${activeCategory === index ? "active" : ""}`}
              onClick={() => handleCategoryClick(index)}
              variants={categoryVariants}
              initial="initial"
              animate={activeCategory === index ? "active" : "initial"}
              
            >
              <div className="category-icon">
                {category.icon}
              </div>
              <p className="category-name">{category.name}</p>
            </motion.div>
          ))}
        </div>

        {/* Image Carousel */}
        <div className="image-carousel">
          <div className="carousel-track">
            {currentImages.map((image, index) => {
              const isActive = index === currentImageIndex
              const isPrev = index === (currentImageIndex - 1 + currentImages.length) % currentImages.length
              const isNext = index === (currentImageIndex + 1) % currentImages.length
              const isVisible = isActive || isPrev || isNext

              if (!isVisible) return null

              const position = isActive ? "center" : isPrev ? "left" : "right"

              return (
                <div
                  key={`${activeCategory}-${index}`}
                  className={`carousel-slide ${position} ${isActive ? "active" : ""}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <div className="image-card">
                    <img src={image.src || "/placeholder.svg"} alt={image.title} className="card-image" />
                    <motion.div 
                      className="image-overlay"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <h3 className="image-title">{image.title}</h3>
                      <p className="image-description">{image.description}</p>
                    </motion.div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="carousel-navigation">
            <motion.button 
              className="nav-btn nav-prev" 
              onClick={handlePrevImage} 
              aria-label="Previous image"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button 
              className="nav-btn nav-next" 
              onClick={handleNextImage} 
              aria-label="Next image"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TravelTypes