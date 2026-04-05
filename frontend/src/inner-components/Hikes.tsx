"use client"
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react"
import "./styles/Hikes.css"
import Image from "next/image"

function Hikes() {
  const [sections, setSections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [carouselOpen, setCarouselOpen] = useState(false)
  const [selectedHike, setSelectedHike] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set())

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/sections?category=explore-valley&tag=hike`)
        const data = await response.json()
        
        const mappedData = data.map((item: any) => ({
          title: item.title,
          subtitle: item.subtitle,
          images: item.gallery,
          mainImage: item.mainImage,
          shortContent: item.shortText,
          fullContent: item.content,
          location: item.metadata?.location,
          duration: item.metadata?.duration,
          difficulty: item.metadata?.difficulty
        }))
        
        setSections(mappedData)
      } catch (error) {
        console.error("Error fetching hikes:", error)
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

  // Fallback
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (visibleSections.size === 0 && sections.length > 0) {
        setVisibleSections(new Set(sections.map((_, i) => i)))
      }
    }, 300)

    return () => clearTimeout(fallbackTimer)
  }, [visibleSections.size, sections])

  // Intersection observer
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

  const openCarousel = (hikeIndex: number) => {
    setSelectedHike(hikeIndex)
    setCurrentImageIndex(0)
    setCarouselOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeCarousel = useCallback(() => {
    setCarouselOpen(false)
    setSelectedHike(null)
    setCurrentImageIndex(0)
    document.body.style.overflow = "unset"
  }, [])

  const navigateCarousel = useCallback((direction: "next" | "prev") => {
    if (selectedHike === null) return
    const totalImages = sections[selectedHike].images.length
    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages)
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages)
    }
  }, [selectedHike, sections])

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
  }, [carouselOpen, closeCarousel, navigateCarousel])

  if (loading) {
    return <div className="loading-container">Loading hikes...</div>
  }

  return (
    <div className="hikes-main">
      <div ref={containerRef} className="hikes-container">
        <header className="hikes-header">
          <h2>Short Hikes & Adventures</h2>
          <p className="header-subtitle">
            Escape the city and discover nature&apos;s tranquility just beyond Kathmandu&apos;s borders
          </p>
          <div className="header-line"></div>
        </header>

        <main className="hikes-content">
          {sections.map((section, index) => (
            <div
              key={index}
              ref={(el) => {
                sectionRefs.current[index] = el
              }}
              data-index={index}
              className={`hike-item ${visibleSections.has(index) ? "visible" : ""}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="hike-image-wrapper" onClick={() => openCarousel(index)} style={{ cursor: "pointer" }}>
                <Image
                  src={section.mainImage || "/placeholder.svg"}
                  alt={section.title}
                  width={600}
                  height={400}
                  className="hike-image"
                  style={{ objectFit: "cover" }}
                />
                <div className="image-overlay">
                  <span className="location-tag">{section.location}</span>
                  <span className="difficulty-tag">{section.difficulty}</span>
                </div>
              </div>

              <div className="hike-details">
                <div className="hike-meta">
                  <span className="hike-duration">{section.duration}</span>
                </div>
                <h2>{section.title}</h2>
                <h3>{section.subtitle}</h3>

                <div className="hike-description">
                  <p className="short-content">{section.shortContent}</p>
                  {expandedSections.has(index) && (
                    <div className="full-content">
                      {section.fullContent.split("\n\n").map((paragraph: string, pIndex: number) => (
                        <p key={pIndex}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="hike-actions">
                  <button className="hike-read-more-button" onClick={() => toggleExpanded(index)}>
                    {expandedSections.has(index) ? "Read Less" : "Read More"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>

      {carouselOpen && selectedHike !== null && (
        <div className="carousel-modal" onClick={closeCarousel}>
          <div className="carousel-content" onClick={(e) => e.stopPropagation()}>
            <div className="carousel-header">
              <h3>{sections[selectedHike].title}</h3>
              <button className="carousel-close" onClick={closeCarousel}>×</button>
            </div>
            <div className="carousel-main">
              <button className="carousel-nav prev" onClick={(e) => { e.stopPropagation(); navigateCarousel("prev"); }}>‹</button>
              <div className="carousel-image-container" style={{ position: "relative", width: "100%", height: "100%" }}>
                <Image
                  src={sections[selectedHike].images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${sections[selectedHike].title} - Image ${currentImageIndex + 1}`}
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
                {sections[selectedHike].images.map((_: any, imageIndex: number) => (
                  <button
                    key={imageIndex}
                    className={`carousel-dot ${currentImageIndex === imageIndex ? "active" : ""}`}
                    onClick={() => setCurrentImageIndex(imageIndex)}
                  />
                ))}
              </div>
              <div className="carousel-counter">
                {currentImageIndex + 1} / {sections[selectedHike].images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Hikes
