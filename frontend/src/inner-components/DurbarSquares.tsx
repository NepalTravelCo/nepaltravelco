"use client"
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react"
import "./styles/ExploreDurbars.css"
import Image from "next/image"
import { getPublicBackendBaseUrl } from "@/lib/backend-url"

function DurbarSquares() {
  const [sections, setSections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [carouselOpen, setCarouselOpen] = useState(false)
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set())
  const [statsAnimated, setStatsAnimated] = useState(false)

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(`${getPublicBackendBaseUrl()}/api/sections?category=explore-valley&tag=durbar-square`)
        const data = await response.json()
        
        const mappedData = data.map((item: any) => ({
          title: item.title,
          subtitle: item.subtitle,
          images: item.gallery,
          mainImage: item.mainImage,
          shortContent: item.shortText,
          fullContent: item.content,
          location: item.metadata?.location,
          established: item.metadata?.established,
          significance: item.metadata?.significance
        }))
        
        setSections(mappedData)
      } catch (error) {
        console.error("Error fetching durbar squares:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSections()
  }, [])

  // Use useLayoutEffect for immediate execution before paint
  useLayoutEffect(() => {
    if (sections.length === 0) return

    const checkVisibility = () => {
      const visibleOnMount = new Set<number>()
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          const windowHeight = window.innerHeight || document.documentElement.clientHeight
          if (rect.top < windowHeight && rect.bottom > 0) {
            visibleOnMount.add(index)
          }
        }
      })
      if (visibleOnMount.size > 0) {
        setVisibleSections(visibleOnMount)
      }
    }

    checkVisibility()
  }, [sections])

  // Fallback: ensure all items are visible after a short delay
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (visibleSections.size === 0 && sections.length > 0) {
        setVisibleSections(new Set(sections.map((_, i) => i)))
      }
    }, 300)

    return () => clearTimeout(fallbackTimer)
  }, [visibleSections.size, sections])

  // Set up intersection observer for future scroll events
  useEffect(() => {
    if (sections.length === 0) return

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
  }, [sections])

  // Counter animation function
  const animateCounter = (element: HTMLElement, target: number, duration = 2000) => {
    const start = 0
    const increment = target / (duration / 16)
    let current = start

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      element.textContent = Math.floor(current).toString()
    }, 16)
  }

  // Stats intersection observer
  useEffect(() => {
    if (!statsRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true)
            const statNumbers = entry.target.querySelectorAll(".stat-number")
            statNumbers.forEach((element) => {
              const target = Number.parseInt(element.getAttribute("data-target") || "0")
              animateCounter(element as HTMLElement, target)
            })
          }
        })
      },
      { threshold: 0.5 },
    )

    observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [statsAnimated])

  const openCarousel = (squareIndex: number) => {
    setSelectedSquare(squareIndex)
    setCurrentImageIndex(0)
    setCarouselOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeCarousel = () => {
    setCarouselOpen(false)
    setSelectedSquare(null)
    setCurrentImageIndex(0)
    document.body.style.overflow = "unset"
  }

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

  const navigateCarousel = useCallback(
    (direction: "next" | "prev") => {
      if (selectedSquare === null) return
      const totalImages = sections[selectedSquare].images.length
      if (direction === "next") {
        setCurrentImageIndex((prev) => (prev + 1) % totalImages)
      } else {
        setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages)
      }
    },
    [selectedSquare, sections],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (carouselOpen) {
        if (e.key === "Escape") closeCarousel()
        else if (e.key === "ArrowRight") navigateCarousel("next")
        else if (e.key === "ArrowLeft") navigateCarousel("prev")
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [carouselOpen, navigateCarousel])

  if (loading) {
    return <div className="loading-container">Loading Durbar squares...</div>
  }

  return (
    <div className="durbar-squares-main">
      <div ref={containerRef} className="durbar-container">
        <header className="durbar-header">
          <h2>Historic Durbar Squares</h2>
          <p className="header-subtitle">
            Royal palaces and ancient courtyards that shaped Nepal&apos;s cultural heritage
          </p>
          <div className="header-line"></div>
          <div className="heritage-stats" ref={statsRef}>
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
              <div className="durbar-image-wrapper" onClick={() => openCarousel(index)} style={{ cursor: "pointer" }}>
                <Image
                  src={section.mainImage || "/placeholder.svg"}
                  alt={section.title}
                  width={600}
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
                      {section.fullContent.split("\n\n").map((paragraph: string, pIndex: number) => (
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

      {carouselOpen && selectedSquare !== null && (
        <div className="carousel-modal" onClick={closeCarousel}>
          <div className="carousel-content" onClick={(e) => e.stopPropagation()}>
            <div className="carousel-header">
              <h3>{sections[selectedSquare].title}</h3>
              <button className="carousel-close" onClick={closeCarousel}>×</button>
            </div>
            <div className="carousel-main">
              <button className="carousel-nav prev" onClick={(e) => { e.stopPropagation(); navigateCarousel("prev"); }}>‹</button>
              <div className="carousel-image-container" style={{ position: "relative", width: "100%", height: "100%" }}>
                <Image
                  src={sections[selectedSquare].images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${sections[selectedSquare].title} - Image ${currentImageIndex + 1}`}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </div>
              <button className="carousel-nav next" onClick={(e) => { e.stopPropagation(); navigateCarousel("next"); }}>›</button>
            </div>
            <div className="carousel-footer">
              <div className="carousel-dots">
                {sections[selectedSquare].images.map((_: any, imageIndex: number) => (
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
