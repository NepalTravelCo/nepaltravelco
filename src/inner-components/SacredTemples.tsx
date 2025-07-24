"use client"
import { useState, useEffect, useRef } from "react"
import "./styles/SacredTemples.css"

const sections = [
  {
    title: "Swayambhunath",
    subtitle: "The Monkey Temple",
    images: [
      "https://i.pinimg.com/1200x/fd/f0/9d/fdf09d787c84b6d7783b711dc63c56c9.jpg",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1609942072337-c3370e820005?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    mainImage: "https://i.pinimg.com/1200x/fd/f0/9d/fdf09d787c84b6d7783b711dc63c56c9.jpg",
    shortContent: `Perched atop a hill overlooking the Kathmandu Valley, Swayambhunath stands as one of Nepal's most ancient and revered religious sites.`,
    fullContent: `Swayambhunath, affectionately known as the Monkey Temple, is a magnificent ancient religious complex that crowns a hill in the Kathmandu Valley. Dating back over 2,000 years, this sacred site represents the harmonious coexistence of Hindu and Buddhist traditions in Nepal.

The journey to the temple involves climbing 365 stone steps, each step bringing visitors closer to both physical elevation and spiritual enlightenment. The iconic white dome and golden spire, adorned with the all-seeing eyes of Buddha, watch over the valley below, offering protection and wisdom to all who seek it.

The temple complex is home to numerous smaller shrines, prayer wheels, and colorful prayer flags that flutter in the mountain breeze. The resident monkeys, considered sacred, add a playful element to the spiritual atmosphere, though visitors are advised to secure their belongings.

From the temple grounds, panoramic views of Kathmandu stretch out in all directions, providing a breathtaking backdrop for meditation and reflection. The site is particularly magical during sunrise and sunset, when the golden light illuminates both the ancient structures and the modern city below.`,
    location: "Kathmandu Valley",
    established: "5th Century AD",
    significance: "UNESCO World Heritage Site",
  },
  {
    title: "Boudhanath",
    subtitle: "The Great Stupa",
    images: [
      "https://i.pinimg.com/1200x/67/36/15/673615da882896e76b7949f693d2b154.jpg",
      "https://images.unsplash.com/photo-1609942072337-c3370e820005?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    mainImage: "https://i.pinimg.com/1200x/67/36/15/673615da882896e76b7949f693d2b154.jpg",
    shortContent: `Boudhanath Stupa stands as one of the largest Buddhist stupas in the world, serving as the spiritual heart of Nepal's Tibetan Buddhist community.`,
    fullContent: `Boudhanath Stupa, one of the largest Buddhist stupas in the world, serves as the beating heart of Tibetan Buddhism in Nepal. This magnificent white dome, crowned with a golden spire and the penetrating eyes of Buddha, has been a place of pilgrimage and meditation for over 1,400 years.

The stupa's massive mandala design represents the Buddhist cosmos, with its white dome symbolizing the earth, the square base representing the four elements, and the thirteen-tiered spire pointing toward enlightenment. The structure rises 36 meters into the sky, creating an imposing yet peaceful presence in the bustling Kathmandu Valley.

Surrounding the stupa, pilgrims and visitors engage in the ancient practice of "kora" – walking clockwise around the monument while spinning prayer wheels and chanting mantras. This meditative circumambulation is believed to accumulate merit and bring spiritual benefits to practitioners.

The area around Boudhanath has evolved into a vibrant Tibetan quarter, filled with monasteries, meditation centers, and traditional shops selling prayer flags, singing bowls, and handcrafted artifacts. Rooftop cafes offer stunning views of the stupa while serving traditional Tibetan cuisine, including momos and butter tea.

The stupa is particularly enchanting during festival times, when thousands of butter lamps illuminate the structure, creating a golden glow that can be seen from miles away. The sound of chanting monks and the gentle tinkling of prayer bells create an atmosphere of profound peace and spirituality.`,
    location: "Kathmandu",
    established: "6th Century AD",
    significance: "UNESCO World Heritage Site",
  },
  {
    title: "Pashupatinath",
    subtitle: "Sacred Abode of Lord Shiva",
    images: [
      "https://i.pinimg.com/736x/74/49/8d/74498d4277e8f60dbef2ebf76d32de6f.jpg",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1609942072337-c3370e820005?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    mainImage: "https://i.pinimg.com/736x/74/49/8d/74498d4277e8f60dbef2ebf76d32de6f.jpg",
    shortContent: `Pashupatinath Temple stands as one of the most sacred Hindu temples in the world, dedicated to Lord Shiva in his form as Pashupati, the lord of all living beings.`,
    fullContent: `Pashupatinath Temple, one of the most sacred Hindu temples in the world, stands majestically on the banks of the holy Bagmati River. Dedicated to Lord Shiva in his manifestation as Pashupati – the lord and protector of all living beings – this ancient temple complex has been a center of faith and devotion for over 1,500 years.

The main temple, with its distinctive pagoda-style architecture and golden roof, houses a sacred lingam that is believed to be self-manifested (swayambhu). The temple's four main doors are adorned with intricate silver work, and the entire structure represents the pinnacle of Nepalese craftsmanship and spiritual architecture.

The temple complex extends along both sides of the Bagmati River, connected by ancient stone bridges. The eastern bank houses the main temple and is reserved for Hindu worship, while the western bank offers viewing areas for visitors of all faiths. The sacred river itself plays a crucial role in Hindu rituals, with devotees believing that bathing in its waters can wash away sins and bring spiritual purification.

Throughout the day, the temple resonates with the sounds of devotional music, chanting, and the ringing of temple bells. Sadhus (holy men) in colorful robes can be seen meditating along the riverbanks, their presence adding to the mystical atmosphere of this sacred space.

The temple is particularly significant during the festival of Maha Shivaratri, when hundreds of thousands of pilgrims from across South Asia gather to pay homage to Lord Shiva. The entire complex becomes a sea of devotion, with continuous prayers, rituals, and celebrations that last throughout the night.

Evening aarti ceremonies at Pashupatinath are deeply moving experiences, as priests perform ancient rituals with fire, incense, and sacred chants while the sun sets over the Himalayas in the distance.`,
    location: "Kathmandu",
    established: "400 AD",
    significance: "UNESCO World Heritage Site",
  },
]

function SacredTemples() {
  const [carouselOpen, setCarouselOpen] = useState(false)
  const [selectedTemple, setSelectedTemple] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set())

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: [0.1], rootMargin: "50px" },
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  // Open carousel
  const openCarousel = (templeIndex: number) => {
    setSelectedTemple(templeIndex)
    setCurrentImageIndex(0)
    setCarouselOpen(true)
    document.body.style.overflow = "hidden"
  }

  // Close carousel
  const closeCarousel = () => {
    setCarouselOpen(false)
    setSelectedTemple(null)
    setCurrentImageIndex(0)
    document.body.style.overflow = "unset"
  }

  // Navigate carousel
  const navigateCarousel = (direction: "next" | "prev") => {
    if (selectedTemple === null) return

    const totalImages = sections[selectedTemple].images.length
    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages)
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages)
    }
  }

  // Toggle expanded content
  const toggleExpanded = (index: number) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (carouselOpen) {
        if (e.key === "Escape") {
          closeCarousel()
        } else if (e.key === "ArrowRight") {
          navigateCarousel("next")
        } else if (e.key === "ArrowLeft") {
          navigateCarousel("prev")
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [carouselOpen, selectedTemple])

  return (
    <>
      <div ref={containerRef} className="minimalist-container">
        {/* Minimal Header */}
        <header className="minimalist-header">
          <h2>Sacred Temples of The Valley</h2>
          <p className="header-subtitle">A journey through ancient spirituality and timeless devotion</p>
          <div className="header-line"></div>
        </header>

        {/* Main Content */}
        <main className="minimalist-content">
          {sections.map((section, index) => (
            <div
              key={index}
              ref={(el) => {
                  sectionRefs.current[index] = el
                }}
              data-index={index}
              className={`temple-item ${visibleSections.has(index) ? "visible" : ""}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="temple-image-wrapper">
                <img
                  src={section.mainImage || "/placeholder.svg"}
                  alt={section.title}
                  className="temple-image"
                  onClick={() => openCarousel(index)}
                />
                <div className="image-overlay">
                  <span className="location-tag">{section.location}</span>
                  <span className="established-tag">{section.established}</span>
                </div>
              </div>

              <div className="temple-details">
                <div className="temple-meta">
                  <span className="temple-significance">{section.significance}</span>
                </div>
                <h2>{section.title}</h2>
                <h3>{section.subtitle}</h3>

                <div className="temple-description">
                  <p className="short-content">{section.shortContent}</p>

                  {expandedSections.has(index) && (
                    <div className="full-content">
                      {section.fullContent.split("\n\n").map((paragraph, pIndex) => (
                        <p key={pIndex}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="temple-actions">
                  <button className="read-more-button" onClick={() => toggleExpanded(index)}>
                    {expandedSections.has(index) ? "Read Less" : "Read More"}
                  </button>
                  {/* <button className="view-button" onClick={() => openCarousel(index)}>
                    View Gallery
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </main>

      
      </div>

      {/* Image Carousel Modal */}
      {carouselOpen && selectedTemple !== null && (
        <div className="carousel-modal" onClick={closeCarousel}>
          <div className="carousel-content" onClick={(e) => e.stopPropagation()}>
            <div className="carousel-header">
              <h3>{sections[selectedTemple].title}</h3>
              <button className="carousel-close" onClick={closeCarousel}>
                ×
              </button>
            </div>

            <div className="carousel-main">
              <button
                className="carousel-nav prev"
                onClick={(e) => {
                  e.stopPropagation()
                  navigateCarousel("prev")
                }}
              >
                ‹
              </button>

              <div className="carousel-image-container">
                <img
                  src={sections[selectedTemple].images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${sections[selectedTemple].title} - Image ${currentImageIndex + 1}`}
                  className="carousel-image"
                />
              </div>

              <button
                className="carousel-nav next"
                onClick={(e) => {
                  e.stopPropagation()
                  navigateCarousel("next")
                }}
              >
                ›
              </button>
            </div>

            <div className="carousel-footer">
              <div className="carousel-dots">
                {sections[selectedTemple].images.map((_, imageIndex) => (
                  <button
                    key={imageIndex}
                    className={`carousel-dot ${currentImageIndex === imageIndex ? "active" : ""}`}
                    onClick={() => setCurrentImageIndex(imageIndex)}
                  />
                ))}
              </div>
              <div className="carousel-counter">
                {currentImageIndex + 1} / {sections[selectedTemple].images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SacredTemples
