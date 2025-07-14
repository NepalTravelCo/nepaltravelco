
// import { useState } from "react"
// import "./styles/TravelTypes.css"

// function TravelTypes() {
//   const [activeCategory, setActiveCategory] = useState(0)
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   const categories = [
//     {
//       id: 0,
//       name: "ADVENTURE ACTIVITIES",
//       icon: "🧗‍♂️",
//       images: [
//         {
//           src: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//           title: "Everest Base Camp Trek",
//           description: "Challenge yourself with the ultimate mountain adventure",
//         },
//         {
//           src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//           title: "White Water Rafting",
//           description: "Experience thrilling rapids in pristine mountain rivers",
//         },
//         {
//           src: "https://images.unsplash.com/photo-1551524164-6cf2ac531fb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//           title: "Rock Climbing",
//           description: "Scale dramatic cliff faces with expert guides",
//         },
//       ],
//     },
//     {
//       id: 1,
//       name: "SCENIC FLIGHTS",
//       icon: "🚁",
//       images: [
//         {
//           src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//           title: "Everest Mountain Flight",
//           description: "Witness the world's highest peaks from above",
//         },
//         {
//           src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//           title: "Annapurna Helicopter Tour",
//           description: "Soar over the majestic Annapurna range",
//         },
//       ],
//     },
//     {
//       id: 2,
//       name: "TREKKING & NATURE",
//       icon: "🏔️",
//       images: [
//         {
//           src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//           title: "Annapurna Circuit",
//           description: "Classic trek through diverse landscapes and cultures",
//         },
//         {
//           src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//           title: "Langtang Valley Trek",
//           description: "Explore pristine valleys and traditional villages",
//         },
//         {
//           src: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//           title: "Gokyo Lakes Trek",
//           description: "Discover turquoise lakes beneath towering peaks",
//         },
//       ],
//     },
//     {
//       id: 3,
//       name: "CULTURE & HERITAGE",
//       icon: "🏛️",
//       images: [
//         {
//           src: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//           title: "Boudhanath Stupa",
//           description: "Ancient Buddhist monument and spiritual center",
//         },
//         {
//           src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//           title: "Kathmandu Durbar Square",
//           description: "Historic palace complex with intricate architecture",
//         },
//         {
//           src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//           title: "Pashupatinath Temple",
//           description: "Sacred Hindu temple on the banks of Bagmati River",
//         },
//         {
//           src: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//           title: "Bhaktapur Durbar Square",
//           description: "Medieval city with stunning temples and squares",
//         },
//       ],
//     },
//     {
//       id: 4,
//       name: "FESTIVALS & TRADITIONS",
//       icon: "🎭",
//       images: [
//         {
//           src: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//           title: "Dashain Festival",
//           description: "Nepal's biggest festival celebrating good over evil",
//         },
//         {
//           src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//           title: "Tihar Festival",
//           description: "Festival of lights honoring animals and relationships",
//         },
//       ],
//     },
//   ]

//   const currentCategory = categories[activeCategory]
//   const currentImages = currentCategory.images
//   const currentImage = currentImages[currentImageIndex]

//   const handleCategoryClick = (categoryIndex) => {
//     setActiveCategory(categoryIndex)
//     setCurrentImageIndex(0) // Reset to first image when changing category
//   }

//   const handlePrevImage = () => {
//     setCurrentImageIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1))
//   }

//   const handleNextImage = () => {
//     setCurrentImageIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1))
//   }

//   return (
//     <section className="travel-types-section">
//       <div className="travel-types-container">
//         {/* Header */}
//         <div className="travel-types-header">
//           <p className="travel-types-subtitle">Not All Journeys Are The Same.</p>
//           <h2 className="travel-types-title">THINGS TO DO</h2>
//         </div>

//         {/* Category Icons */}
//         <div className="category-icons">
//           {categories.map((category, index) => (
//             <div
//               key={category.id}
//               className={`category-item ${activeCategory === index ? "active" : ""}`}
//               onClick={() => handleCategoryClick(index)}
//             >
//               <div className="category-icon">
//                 <span className="icon-emoji">{category.icon}</span>
//               </div>
//               <p className="category-name">{category.name}</p>
//             </div>
//           ))}
//         </div>

//         {/* Image Carousel */}
//         <div className="image-carousel">
//           <div className="carousel-container">
//             <div className="image-wrapper">
//               <img src={currentImage.src || "/placeholder.svg"} alt={currentImage.title} className="carousel-image" />
//               <div className="image-overlay">
//                 <div className="image-content">
//                   <h3 className="image-title">{currentImage.title}</h3>
//                   <p className="image-description">{currentImage.description}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Navigation Arrows */}
//           <div className="carousel-navigation">
//             <button className="nav-btn nav-prev" onClick={handlePrevImage} aria-label="Previous image">
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                 <path
//                   d="M15 18L9 12L15 6"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </button>
//             <button className="nav-btn nav-next" onClick={handleNextImage} aria-label="Next image">
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                 <path
//                   d="M9 18L15 12L9 6"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Discover More Button */}
//         <div className="discover-more">
//           <button className="discover-btn">DISCOVER MORE</button>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default TravelTypes

"use client"

import { useState } from "react"
import "./styles/TravelTypes.css"

function TravelTypes() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const categories = [
    {
      id: 0,
      name: "ADVENTURE ACTIVITIES",
      icon: "🧗‍♂️",
      images: [
        {
          src: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Everest Base Camp Trek",
          description: "Challenge yourself with the ultimate mountain adventure",
        },
        {
          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "White Water Rafting",
          description: "Experience thrilling rapids in pristine mountain rivers",
        },
        {
          src: "https://images.unsplash.com/photo-1551524164-6cf2ac531fb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Rock Climbing",
          description: "Scale dramatic cliff faces with expert guides",
        },
      ],
    },
    {
      id: 1,
      name: "SCENIC FLIGHTS",
      icon: "🚁",
      images: [
        {
          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Everest Mountain Flight",
          description: "Witness the world's highest peaks from above",
        },
        {
          src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Annapurna Helicopter Tour",
          description: "Soar over the majestic Annapurna range",
        },
      ],
    },
    {
      id: 2,
      name: "TREKKING & NATURE",
      icon: "🏔️",
      images: [
        {
          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Annapurna Circuit",
          description: "Classic trek through diverse landscapes and cultures",
        },
        {
          src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Langtang Valley Trek",
          description: "Explore pristine valleys and traditional villages",
        },
        {
          src: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Gokyo Lakes Trek",
          description: "Discover turquoise lakes beneath towering peaks",
        },
      ],
    },
    {
      id: 3,
      name: "CULTURE & HERITAGE",
      icon: "🏛️",
      images: [
        {
          src: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Boudhanath Stupa",
          description: "Ancient Buddhist monument and spiritual center",
        },
        {
          src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Kathmandu Durbar Square",
          description: "Historic palace complex with intricate architecture",
        },
        {
          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Pashupatinath Temple",
          description: "Sacred Hindu temple on the banks of Bagmati River",
        },
      ],
    },
    {
      id: 4,
      name: "FESTIVALS & TRADITIONS",
      icon: "🎭",
      images: [
        {
          src: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Dashain Festival",
          description: "Nepal's biggest festival celebrating good over evil",
        },
        {
          src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
          title: "Tihar Festival",
          description: "Festival of lights honoring animals and relationships",
        },
      ],
    },
  ]

  const currentCategory = categories[activeCategory]
  const currentImages = currentCategory.images
  const currentImage = currentImages[currentImageIndex]

  const handleCategoryClick = (categoryIndex) => {
    setActiveCategory(categoryIndex)
    setCurrentImageIndex(0) // Reset to first image when changing category
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="travel-types-section">
      <div className="travel-types-container">
        {/* Header */}
        <div className="travel-types-header">
          <p className="travel-types-subtitle">Not All Journeys Are The Same.</p>
          <h2 className="travel-types-title">THINGS TO DO</h2>
        </div>

        {/* Category Icons */}
        <div className="category-icons">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`category-item ${activeCategory === index ? "active" : ""}`}
              onClick={() => handleCategoryClick(index)}
            >
              <div className="category-icon">
                <span className="icon-emoji">{category.icon}</span>
              </div>
              <p className="category-name">{category.name}</p>
            </div>
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

              let position = "center"
              if (isPrev) position = "left"
              if (isNext) position = "right"

              return (
                <div
                  key={index}
                  className={`carousel-slide ${position} ${isActive ? "active" : ""}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <div className="image-card">
                    <img src={image.src || "/placeholder.svg"} alt={image.title} className="card-image" />
                    <div className="image-overlay">
                      <h3 className="image-title">{image.title}</h3>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="carousel-navigation">
            <button className="nav-btn nav-prev" onClick={handlePrevImage} aria-label="Previous image">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="nav-btn nav-next" onClick={handleNextImage} aria-label="Next image">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Discover More Button */}
        <div className="discover-more">
          <button className="discover-btn">DISCOVER MORE</button>
        </div>
      </div>
    </section>
  )
}

export default TravelTypes
