"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import "./styles/ExploreDurbars.css"
import Image from 'next/image';


const sections = [
  {
    title: "Kathmandu Durbar Square",
    subtitle: "Royal Palace of the Malla Kings",
    images: [
      "https://i.pinimg.com/1200x/3a/e6/11/3ae61135291ed9e10306ae0c56e8333d.jpg",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1609942072337-c3370e820005?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    mainImage: "https://i.pinimg.com/1200x/3a/e6/11/3ae61135291ed9e10306ae0c56e8333d.jpg",
    shortContent: `Located at the heart of the old city, Kathmandu Durbar Square is a vibrant testament to the architectural brilliance of the Malla dynasty.`,
    fullContent: `Kathmandu Durbar Square stands as the beating heart of Nepal's ancient capital, where centuries of royal history unfold through magnificent palaces, courtyards, and temples. This UNESCO World Heritage Site served as the royal residence of the Malla kings and later the Shah dynasty, making it the political and cultural epicenter of the Kathmandu Valley.

The square is dominated by the Hanuman Dhoka Palace complex, named after the monkey deity Hanuman whose statue guards the main entrance. The palace's intricate wooden architecture showcases the pinnacle of Newari craftsmanship, with elaborately carved windows, doors, and struts that have withstood the test of time.

One of the most fascinating aspects of Kathmandu Durbar Square is the Kumari Ghar, the residence of the Living Goddess Kumari. This young girl, believed to be the incarnation of the goddess Taleju, occasionally appears at her window to bless devotees and visitors. The tradition of the Living Goddess is unique to Nepal and represents the deep spiritual beliefs that permeate daily life.

The square houses numerous temples, including the Taleju Temple, Kal Bhairav Temple, and the Jagannath Temple, each with its own architectural style and religious significance. The Kasthamandap, a wooden pavilion that gave Kathmandu its name, once stood here as a testament to the city's woodworking heritage.

Despite suffering damage during the 2015 earthquake, ongoing restoration efforts continue to preserve this invaluable cultural treasure. The square remains a living museum where traditional festivals, religious ceremonies, and daily life intersect, offering visitors an authentic glimpse into Nepal's rich cultural tapestry.`,
    location: "Kathmandu",
    established: "12th Century",
    significance: "UNESCO World Heritage Site",
  },
  {
    title: "Patan Durbar Square",
    subtitle: "City of Fine Arts",
    images: [
      "https://i.pinimg.com/736x/f8/8f/dd/f88fdda5ff8241bb3967c942169fa6d1.jpg",
      "https://images.unsplash.com/photo-1609942072337-c3370e820005?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    mainImage: "https://i.pinimg.com/736x/f8/8f/dd/f88fdda5ff8241bb3967c942169fa6d1.jpg",
    shortContent: `Patan Durbar Square, also known as Lalitpur, represents the pinnacle of Newari architecture and artistic achievement in the Kathmandu Valley.`,
    fullContent: `Patan Durbar Square, located in the ancient city of Lalitpur, stands as perhaps the most artistically refined of the three royal squares in the Kathmandu Valley. Known as the "City of Fine Arts," Patan has been a center of Buddhist learning and artistic excellence for over a millennium.

The square is renowned for its extraordinary collection of temples, palaces, and courtyards that showcase the finest examples of Newari architecture. The red-brick structures, adorned with intricate wood and stone carvings, create a harmonious ensemble that has inspired artists and architects for generations.

The Patan Museum, housed in a beautifully restored section of the old royal palace, contains one of the finest collections of religious art in Asia. The museum's exhibits include bronze sculptures, stone carvings, and ritual objects that span over a thousand years of artistic tradition, providing insight into the spiritual and cultural life of the Newar people.

The square is dominated by the Krishna Mandir, a unique stone temple dedicated to Lord Krishna, which stands out among the predominantly wooden and brick structures. Built in the 17th century, this temple represents a fusion of Indian and Nepalese architectural styles and is considered one of the finest examples of stone architecture in Nepal.

Patan's numerous courtyards, known as "bahals" and "bahis," served as Buddhist monasteries and continue to be centers of religious and community life. These peaceful spaces, with their ancient stupas and prayer wheels, offer visitors a glimpse into the contemplative side of Nepalese Buddhism.

The city's living tradition of metalworking, particularly bronze casting, continues to thrive in the workshops surrounding the square. Skilled artisans still create religious statues and ritual objects using techniques passed down through generations, maintaining Patan's reputation as a center of artistic excellence.`,
    location: "Lalitpur",
    established: "3rd Century BC",
    significance: "UNESCO World Heritage Site",
  },
  {
    title: "Bhaktapur Durbar Square",
    subtitle: "The Living Medieval City",
    images: [
      "https://i.pinimg.com/736x/55/13/68/551368b3616f86d61d8348f83be1b6c9.jpg",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1609942072337-c3370e820005?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    mainImage: "https://i.pinimg.com/736x/55/13/68/551368b3616f86d61d8348f83be1b6c9.jpg",
    shortContent: `Bhaktapur Durbar Square offers visitors a journey back in time, where medieval life continues unchanged in one of Nepal's best-preserved ancient cities.`,
    fullContent: `Bhaktapur Durbar Square represents the most authentic medieval experience in the Kathmandu Valley, where time seems to have stood still for centuries. This remarkably well-preserved city offers visitors an unparalleled glimpse into traditional Nepalese life, where ancient customs and crafts continue to flourish in their original setting.

The centerpiece of the square is the magnificent 55-Window Palace, built during the reign of King Bhupatindra Malla in the 17th century. This architectural masterpiece showcases the pinnacle of Newari woodcarving, with each of its 55 intricately carved windows telling a story of royal grandeur and artistic excellence. The palace now houses the National Art Gallery, displaying an impressive collection of traditional paintings and manuscripts.

The Golden Gate (Sun Dhoka) serves as the entrance to the main courtyard and is considered one of the most beautiful and richly molded specimens of its kind in the entire world. This gilded doorway, adorned with images of various Hindu deities, represents the perfect fusion of religious devotion and artistic mastery that characterizes Bhaktapur's architectural heritage.

Bhaktapur's living traditions are perhaps most evident in Pottery Square, where generations of artisans continue to shape clay using techniques unchanged for centuries. Visitors can witness the entire pottery-making process, from the preparation of clay to the firing of finished pieces in traditional kilns. This craft has been passed down through families for generations and remains an integral part of the city's economy and cultural identity.

The city is also famous for its traditional festivals, particularly the Bisket Jatra, which marks the Nepalese New Year. During this vibrant celebration, massive chariots are pulled through the narrow streets, and the entire community participates in rituals that have been performed for over a thousand years.

Bhaktapur's commitment to preserving its heritage extends beyond architecture to include traditional foods, crafts, and social customs. The city's yogurt (juju dhau), considered the finest in Nepal, is still made using traditional methods, while local artisans continue to create woodcarvings, metalwork, and textiles using ancestral techniques.

Walking through Bhaktapur's cobblestone streets, past ancient temples and traditional houses, visitors experience not just a historical site but a living, breathing medieval city where the past and present coexist in perfect harmony.`,
    location: "Bhaktapur",
    established: "9th Century",
    significance: "UNESCO World Heritage Site",
  },
]

function DurbarSquares() {
  const [carouselOpen, setCarouselOpen] = useState(false)
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set())

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const statElements = document.querySelectorAll(".stat-number")
    let hasAnimated = false

    const animateCount = (el: Element, target: number) => {
      const start = 0
      const duration = 1500
      const startTime = performance.now()

      const step = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3) // smooth ease-out
        const current = Math.floor(start + (target - start) * easeOut)
        el.textContent = current.toString()
        if (progress < 1) requestAnimationFrame(step)
      }

      requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true
            statElements.forEach((el) => {
              const target = parseInt(el.getAttribute("data-target") || "0", 10)
              animateCount(el, target)
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    const statsContainer = document.querySelector(".heritage-stats")
    if (statsContainer) observer.observe(statsContainer)

    return () => observer.disconnect()
  }, [])

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
  const openCarousel = (squareIndex: number) => {
    setSelectedSquare(squareIndex)
    setCurrentImageIndex(0)
    setCarouselOpen(true)
    document.body.style.overflow = "hidden"
  }

  // Close carousel
  const closeCarousel = () => {
    setCarouselOpen(false)
    setSelectedSquare(null)
    setCurrentImageIndex(0)
    document.body.style.overflow = "unset"
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
  const navigateCarousel = useCallback((direction: "next" | "prev") => {
    if (selectedSquare === null) return;

    const totalImages = sections[selectedSquare].images.length;
    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  }, [selectedSquare]);


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
  }, [carouselOpen, navigateCarousel]) // ✅ include navigateCarousel





  return (
    <div className="durbar-squares-main">
      {/* Main Container */}
      <div ref={containerRef} className="durbar-container">
        {/* Section Header */}
        <header className="durbar-header">
          <h2>Historic Durbar Squares</h2>
          <p className="header-subtitle">Royal palaces and ancient courtyards that shaped Nepal&apos;s cultural heritage</p>
          <div className="header-line"></div>
          {/* Statistics Section */}
          <div className="heritage-stats">
            <div className="stat-item">
              <span className="stat-number" data-target="50">0</span>
              <span className="stat-label">Temples</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number" data-target="200">0</span>
              <span className="stat-label">Monuments</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number" data-target="800">0</span>
              <span className="stat-label">Years of History</span>
            </div>
          </div>


        </header>

        {/* Main Content */}
        <main className="durbar-content">
          {sections.map((section, index) => (
            <div
              key={index}
              ref={(el) => {
                sectionRefs.current[index] = el
              }}



              data-index={index}
              className={`durbar-item ${visibleSections.has(index) ? "visible" : ""}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div
                className="durbar-image-wrapper"
                onClick={() => openCarousel(index)}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={section.mainImage || "/placeholder.svg"}
                  alt={section.title}
                  width={600}   // adjust to your design
                  height={400}
                  className="durbar-image"
                  style={{ objectFit: "cover" }}
                />
                <div className="image-overlay">
                  <span className="location-tag">{section.location}</span>
                  <span className="established-tag">{section.established}</span>
                </div>
              </div>

              <div className="durbar-details">
                <div className="durbar-meta">
                  <span className="durbar-significance">{section.significance}</span>
                </div>
                <h2>{section.title}</h2>
                <h3>{section.subtitle}</h3>

                <div className="durbar-description">
                  <p className="short-content">{section.shortContent}</p>

                  {expandedSections.has(index) && (
                    <div className="full-content">
                      {section.fullContent.split("\n\n").map((paragraph, pIndex) => (
                        <p key={pIndex}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="durbar-actions">
                  <button className="dub-read-more-button" onClick={() => toggleExpanded(index)}>
                    {expandedSections.has(index) ? "Read Less" : "Read More"}
                  </button>

                </div>
              </div>
            </div>
          ))}
        </main>


      </div>

      {/* Image Carousel Modal */}
      {carouselOpen && selectedSquare !== null && (
        <div className="carousel-modal" onClick={closeCarousel}>
          <div className="carousel-content" onClick={(e) => e.stopPropagation()}>
            <div className="carousel-header">
              <h3>{sections[selectedSquare].title}</h3>
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

              <div
                className="carousel-image-container"
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <Image
                  src={sections[selectedSquare].images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${sections[selectedSquare].title} - Image ${currentImageIndex + 1}`}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
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
                {sections[selectedSquare].images.map((_, imageIndex) => (
                  <button
                    key={imageIndex}
                    className={`carousel-dot ${currentImageIndex === imageIndex ? "active" : ""}`}
                    onClick={() => setCurrentImageIndex(imageIndex)}
                  />
                ))}
              </div>
              <div className="carousel-counter">
                {currentImageIndex + 1} / {sections[selectedSquare].images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DurbarSquares