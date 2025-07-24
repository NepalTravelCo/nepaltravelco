"use client"
import { useState, useEffect, useLayoutEffect, useRef } from "react"
import "./styles/Hikes.css"
import Image from "next/image"

const sections = [
  {
    title: "Nagarjun Hill",
    subtitle: "Jamacho Forest Sanctuary",
    images: [
      "https://i.pinimg.com/1200x/51/f8/81/51f881d9c2ac251438e975a3c4861ee5.jpg",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1609942072337-c3370e820005?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    mainImage: "https://i.pinimg.com/1200x/51/f8/81/51f881d9c2ac251438e975a3c4861ee5.jpg",
    shortContent: `Just a short drive from central Kathmandu, Nagarjun Hill offers a peaceful forest hike through the Shivapuri-Nagarjun National Park with panoramic valley views.`,
    fullContent: `Nagarjun Hill, also known as Jamacho, stands as one of the most accessible and rewarding day hikes from Kathmandu, offering urban dwellers and travelers alike a perfect escape into pristine nature without venturing far from the city center.

Located within the protected boundaries of Shivapuri-Nagarjun National Park, this moderate 3-4 hour uphill trek winds through dense, undisturbed forest that serves as a green lung for the Kathmandu Valley. The trail begins at the park entrance, where visitors are immediately immersed in a world of towering rhododendron trees, ancient oaks, and diverse flora that changes dramatically with the seasons.

The forest ecosystem here is remarkably rich, home to over 300 species of birds including colorful pheasants, woodpeckers, and various songbirds that create a natural symphony throughout the hike. Wildlife enthusiasts might spot langur monkeys swinging through the canopy, while the more elusive leopards and deer inhabit the deeper forest areas.

As hikers ascend the well-maintained trail, they encounter numerous prayer flags fluttering in the mountain breeze, creating a spiritual atmosphere that reflects the sacred nature of this hill in local Buddhist and Hindu traditions. These colorful flags, inscribed with mantras and prayers, are believed to carry blessings across the landscape with each gust of wind.

The summit rewards hikers with breathtaking 360-degree panoramic views of the entire Kathmandu Valley, stretching from the bustling city below to the terraced hillsides and distant mountain ranges. On exceptionally clear days, the snow-capped peaks of the Himalayas create a stunning backdrop to this natural viewpoint.

At the peak, visitors discover a small but significant monastery where monks and local devotees come to meditate and pray. This peaceful sanctuary offers a moment of reflection and spiritual connection, making the physical journey also a contemplative experience.

The descent provides different perspectives of the valley and forest, with numerous spots perfect for rest, photography, or simply absorbing the tranquil atmosphere that makes Nagarjun Hill a beloved retreat for both locals and visitors seeking natural beauty and inner peace.`,
    location: "Shivapuri-Nagarjun National Park",
    duration: "3-4 Hours",
    difficulty: "Moderate",
  },
  {
    title: "Champadevi Hike",
    subtitle: "Southern Ridge Adventure",
    images: [
      "https://i.pinimg.com/1200x/06/04/d4/0604d48fa06c119f4212d33daf195563.jpg",
      "https://images.unsplash.com/photo-1609942072337-c3370e820005?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    mainImage: "https://i.pinimg.com/1200x/06/04/d4/0604d48fa06c119f4212d33daf195563.jpg",
    shortContent: `This moderate hike takes you to one of the southern ridges of the valley, passing through pine forests and traditional villages with stunning Himalayan views.`,
    fullContent: `Champadevi Hill represents one of the most culturally immersive and scenically diverse hiking experiences in the Kathmandu Valley, offering adventurers a perfect blend of natural beauty, traditional village life, and spiritual significance.

The journey typically begins from either Pharping, a town rich in Buddhist heritage, or the serene Taudaha Lake, both serving as gateways to this remarkable southern ridge adventure. The choice of starting point allows hikers to customize their experience, with Pharping offering more cultural sites and Taudaha providing a peaceful lakeside beginning.

The trail winds through pristine pine forests that fill the air with their distinctive fragrance, creating a natural aromatherapy experience as hikers ascend through varying elevations. These forests are home to diverse wildlife, including various bird species, butterflies, and small mammals that add life and movement to the peaceful woodland setting.

One of the most enchanting aspects of the Champadevi hike is the passage through traditional Newar villages, where time seems to have slowed down and ancient ways of life continue unchanged. Hikers encounter terraced fields where local farmers cultivate crops using methods passed down through generations, stone houses with intricately carved windows, and friendly villagers who often greet travelers with warm smiles and curious glances.

The cultural immersion deepens as the trail passes by small temples and shrines dedicated to local deities, where villagers come to pray and make offerings. These sacred spaces, often adorned with prayer flags and marigold garlands, provide insight into the deep spiritual connection between the local people and their natural environment.

As hikers approach the summit, the landscape opens up to reveal breathtaking panoramic views of the entire Kathmandu Valley spread out below like a living map. The urban sprawl of Kathmandu and Lalitpur contrasts beautifully with the green hills and agricultural terraces that surround the cities.

The summit itself is crowned with a beautiful white stupa, a Buddhist monument that serves as both a spiritual landmark and a perfect vantage point for photography. On exceptionally clear days, the northern horizon reveals glimpses of the majestic Himalayan range, including distant peaks that seem to touch the sky.

The descent offers different perspectives and often includes stops at local tea houses where hikers can enjoy traditional Nepali tea and snacks while interacting with locals, making the Champadevi hike not just a physical journey but a cultural adventure that provides authentic insights into rural Nepalese life.`,
    location: "Southern Valley Ridge",
    duration: "4-5 Hours",
    difficulty: "Moderate",
  },
  {
    title: "Namobuddha",
    subtitle: "Sacred Buddhist Pilgrimage",
    images: [
      "https://i.pinimg.com/1200x/b7/5a/d4/b75ad43575f0b71fd5943766facfa450.jpg",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1609942072337-c3370e820005?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    mainImage: "https://i.pinimg.com/1200x/b7/5a/d4/b75ad43575f0b71fd5943766facfa450.jpg",
    shortContent: `A sacred Buddhist site featuring a large monastery and serene atmosphere, accessible through gentle hikes from Panauti or Dhulikhel through terraced fields.`,
    fullContent: `Namobuddha stands as one of the most sacred Buddhist pilgrimage sites in Nepal, representing a perfect fusion of spiritual significance, natural beauty, and cultural immersion that attracts both devout pilgrims and adventure-seeking travelers from around the world.

Located approximately two hours by road from Kathmandu, this holy site holds profound meaning in Buddhist tradition as one of the places where the Buddha, in a previous incarnation as Prince Mahasattva, demonstrated the ultimate act of compassion by offering his body to feed a starving tigress and her cubs. This legendary act of selfless sacrifice has made Namobuddha a powerful symbol of compassion and spiritual awakening.

The approach to Namobuddha can be undertaken as a gentle hiking adventure from the historic towns of Panauti or Dhulikhel, both offering unique cultural experiences before the trek begins. The trail from Panauti winds through ancient settlements where traditional Newari architecture and customs remain beautifully preserved, while the route from Dhulikhel provides stunning mountain vistas and terraced landscape views.

The hiking path meanders through a patchwork of terraced fields that showcase the agricultural ingenuity of Nepalese farmers, who have transformed steep hillsides into productive farmland over centuries. These terraces, planted with rice, wheat, mustard, and vegetables depending on the season, create a stunning geometric pattern across the landscape that changes colors throughout the year.

Small traditional villages dot the route, where hikers can observe daily rural life largely unchanged by modern influences. Stone houses with thatched roofs, women spinning wool on traditional wheels, children playing in courtyards, and elderly villagers sharing stories create authentic cultural encounters that provide deep insights into traditional Nepalese life.

The magnificent Thrangu Tashi Yangtse Monastery dominates the hilltop at Namobuddha, its golden roofs and white walls creating a striking contrast against the green hills and blue sky. This impressive complex houses hundreds of monks who maintain ancient Buddhist traditions through daily prayers, meditation, and study, creating an atmosphere of profound peace and spiritual energy.

Visitors can participate in morning and evening prayer sessions, where the deep resonance of Tibetan horns, the rhythmic chanting of mantras, and the gentle tinkling of prayer bells create a transcendent auditory experience. The monastery also offers meditation sessions and dharma talks for those seeking deeper spiritual engagement.

The site includes several important monuments, including the original stupa marking the location of Prince Mahasattva's sacrifice, surrounded by prayer wheels and colorful prayer flags that flutter constantly in the mountain breeze. The peaceful environment, combined with panoramic views of the Himalayas on clear days, makes Namobuddha an ideal destination for those seeking spiritual renewal, cultural understanding, and natural beauty in a single, transformative experience.`,
    location: "Kavrepalanchok District",
    duration: "Full Day",
    difficulty: "Easy to Moderate",
  },
]

function Hikes() {
  const [carouselOpen, setCarouselOpen] = useState(false)
  const [selectedHike, setSelectedHike] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set())

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // Use useLayoutEffect for immediate execution before paint
  useLayoutEffect(() => {
    // Immediately check what's visible and set it
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
  }, [])

  // Fallback: ensure all items are visible after a short delay
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      // If no items are visible after 300ms, make all visible
      if (visibleSections.size === 0) {
        setVisibleSections(new Set([0, 1, 2]))
      }
    }, 300)

    return () => clearTimeout(fallbackTimer)
  }, [visibleSections.size])

  // Set up intersection observer for future scroll events
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
  const openCarousel = (hikeIndex: number) => {
    setSelectedHike(hikeIndex)
    setCurrentImageIndex(0)
    setCarouselOpen(true)
    document.body.style.overflow = "hidden"
  }

  // Close carousel
  const closeCarousel = () => {
    setCarouselOpen(false)
    setSelectedHike(null)
    setCurrentImageIndex(0)
    document.body.style.overflow = "unset"
  }

  // Navigate carousel
  const navigateCarousel = (direction: "next" | "prev") => {
    if (selectedHike === null) return

    const totalImages = sections[selectedHike].images.length
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
  }, [carouselOpen, selectedHike])

  return (
    <div className="hikes-main">
      {/* Hikes Container */}
      <div ref={containerRef} className="hikes-container">
        {/* Hikes Header */}
        <header className="hikes-header">
          <h2>Short Hikes & Adventures</h2>
          <p className="header-subtitle">
            Escape the city and discover nature&apos;s tranquility just beyond Kathmandu&apos;s borders
          </p>

          <div className="header-line"></div>
        </header>

        {/* Main Content */}
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
                      {section.fullContent.split("\n\n").map((paragraph, pIndex) => (
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

      {/* Image Carousel Modal */}
      {carouselOpen && selectedHike !== null && (
        <div className="carousel-modal" onClick={closeCarousel}>
          <div className="carousel-content" onClick={(e) => e.stopPropagation()}>
            <div className="carousel-header">
              <h3>{sections[selectedHike].title}</h3>
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
                {sections[selectedHike].images.map((_, imageIndex) => (
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
