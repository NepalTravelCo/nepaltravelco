// "use client"
// import { useState, useEffect, useRef, useCallback } from "react"
// import "./styles/Festivals.css"
// import Image from 'next/image';


// const sections = [
//   {
//     title: "Indra Jatra",
//     subtitle: "Festival of the Rain God",
//     images: [
//       "https://i.pinimg.com/1200x/e2/48/4a/e2484a6ffff165497573d186887f3fba.jpg",
//       "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//       "https://images.unsplash.com/photo-1609942072337-c3370e820005?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//       "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//     ],
//     mainImage: "https://i.pinimg.com/1200x/e2/48/4a/e2484a6ffff165497573d186887f3fba.jpg",
//     shortContent: `Celebrated in Kathmandu, Indra Jatra is an eight-day festival that honors Indra, the god of rain and heaven, featuring the spectacular chariot procession of the Living Goddess Kumari.`,
//     fullContent: `Indra Jatra stands as one of Nepal's most magnificent and spiritually significant festivals, celebrated annually in Kathmandu during the month of September. This eight-day extravaganza honors Indra, the revered god of rain and heaven, whose blessings are essential for the agricultural prosperity of the valley.

// The festival's most captivating highlight is the grand chariot procession of the Living Goddess Kumari, a young girl believed to be the incarnation of the goddess Taleju. Dressed in elaborate traditional attire and adorned with intricate jewelry, the Kumari is paraded through the ancient streets of Kathmandu in a beautifully decorated wooden chariot, blessing devotees and spectators who gather in thousands to witness this divine spectacle.

// The celebration begins with the ceremonial raising of the Lingo, a towering wooden pole erected at Hanuman Dhoka Durbar Square. This sacred pole, adorned with colorful prayer flags and religious symbols, serves as a beacon calling Indra to descend from the heavens and bless the valley with abundant rainfall for the coming harvest season.

// Throughout the festival, the streets come alive with mesmerizing masked dances performed by traditional dancers representing various deities and demons from Hindu and Buddhist mythology. The haunting melodies of traditional Newari music fill the air, creating an atmosphere of mystical devotion and cultural celebration.

// The festival also features the display of sacred images and the lighting of thousands of oil lamps, transforming the ancient city into a glowing tapestry of faith and tradition. Local communities prepare elaborate feasts and distribute prasad (blessed food) to visitors, embodying the spirit of unity and generosity that defines Nepalese culture.

// Indra Jatra is not merely a religious observance but a living testament to the rich cultural heritage of the Kathmandu Valley, where ancient traditions continue to thrive in the modern world.`,
//     location: "Kathmandu",
//     duration: "8 Days",
//     significance: "UNESCO Intangible Heritage",
//   },
//   {
//     title: "Bisket Jatra",
//     subtitle: "New Year Chariot Festival",
//     images: [
//       "https://i.pinimg.com/736x/bc/67/c7/bc67c743b1f012078159b0ceee13babf.jpg",
//       "https://images.unsplash.com/photo-1609942072337-c3370e820005?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//       "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//       "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//     ],
//     mainImage: "https://i.pinimg.com/736x/bc/67/c7/bc67c743b1f012078159b0ceee13babf.jpg",
//     shortContent: `This wild and vibrant festival is held in Bhaktapur during the Nepali New Year, featuring thrilling chariot tug-of-wars and symbolic rituals that bring the ancient city to life.`,
//     fullContent: `Bisket Jatra represents the most exhilarating and physically demanding festival in the Kathmandu Valley, transforming the medieval city of Bhaktapur into an arena of controlled chaos and unbridled celebration during the Nepali New Year in April.

// The festival's centerpiece is the dramatic chariot tug-of-war, where massive wooden chariots carrying the deities Bhairav and Bhadrakali are pulled through the narrow cobblestone streets by competing teams from different neighborhoods. These towering structures, some reaching heights of over 30 feet, require hundreds of participants to maneuver through the ancient city's tight alleyways, creating an atmosphere of intense excitement and friendly rivalry.

// The competition reaches its peak when the chariots must navigate the steep descent to the Khalna Tole area, where the real test of strength and coordination begins. Teams strain against thick ropes, their voices rising in unison as they chant traditional songs and battle cries, while spectators cheer from rooftops and balconies, creating an electrifying atmosphere that can be felt throughout the city.

// Beyond the physical spectacle, Bisket Jatra carries deep spiritual significance, marking the triumph of good over evil and the renewal of life that comes with the new year. The festival includes various symbolic rituals, including the ceremonial erection of a tall wooden pole (lingo) and the performance of traditional masked dances that tell ancient stories of gods and demons.

// The celebration extends beyond the main chariot procession to include numerous smaller events, traditional music performances, and community feasts that bring together people from all walks of life. Local artisans display their crafts, traditional foods are prepared and shared, and the entire city becomes a living museum of Newari culture and tradition.

// What makes Bisket Jatra truly unique is its authentic, grassroots nature – this is not a festival performed for tourists but a genuine community celebration that has remained largely unchanged for centuries, offering visitors a rare glimpse into the heart of traditional Nepalese culture.`,
//     location: "Bhaktapur",
//     duration: "9 Days",
//     significance: "New Year Celebration",
//   },
//   {
//     title: "Rato Machhendranath Jatra",
//     subtitle: "Festival of the Rain Deity",
//     images: [
//       "https://i.pinimg.com/736x/49/4c/9e/494c9ef253905576cf0b43cc7fab38af.jpg",
//       "https://images.unsplash.com/photo-1609942072337-c3370e820005?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//       "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//       "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
//     ],
//     mainImage: "https://i.pinimg.com/736x/49/4c/9e/494c9ef253905576cf0b43cc7fab38af.jpg",
//     shortContent: `One of the longest and oldest festivals in the valley, this chariot festival honors Rato Machhendranath, the god of rain and harvest, bringing together people of all backgrounds.`,
//     fullContent: `Rato Machhendranath Jatra stands as the longest-running and most historically significant festival in the Kathmandu Valley, stretching over several months and representing over 1,400 years of continuous celebration in the ancient city of Patan.

// This extraordinary festival honors Rato Machhendranath, known as the god of rain and harvest, whose blessings are considered essential for agricultural prosperity and the well-being of the valley's inhabitants. The deity is revered by both Hindus and Buddhists, making this celebration a unique example of religious harmony and cultural unity.

// The festival's most impressive feature is the towering wooden chariot, standing nearly 60 feet tall and constructed entirely without nails using traditional joinery techniques passed down through generations. This magnificent structure, adorned with intricate carvings and colorful decorations, serves as a mobile temple carrying the sacred image of Rato Machhendranath through the streets of Patan.

// The chariot's journey is a community effort of extraordinary proportions, requiring hundreds of volunteers to pull the massive structure using thick ropes along a predetermined route that winds through the city's ancient neighborhoods. The procession moves slowly and deliberately, stopping at various locations for prayers, offerings, and traditional performances.

// What makes this festival particularly remarkable is its inclusive nature – people from all castes, creeds, and social backgrounds come together to participate in pulling the chariot, embodying the democratic spirit that underlies Nepalese society. The festival serves as a great equalizer, where social hierarchies temporarily dissolve in the shared effort of honoring the deity.

// The celebration includes numerous subsidiary events, including traditional music and dance performances, the preparation of special foods, and the decoration of houses and streets along the procession route. Local artisans create beautiful decorative elements, and families prepare elaborate offerings to present to the deity.

// The festival culminates with the Bhoto Jatra ceremony, where a sacred vest (bhoto) is displayed to the crowd, accompanied by the recitation of ancient legends and the performance of traditional rituals that have remained unchanged for centuries.

// Rato Machhendranath Jatra represents more than just a religious celebration – it is a living embodiment of Nepal's cultural continuity, community spirit, and the enduring power of tradition in the modern world.`,
//     location: "Patan (Lalitpur)",
//     duration: "Several Months",
//     significance: "Oldest Valley Festival",
//   },
// ]

// function Festivals() {
//   const [carouselOpen, setCarouselOpen] = useState(false)
//   const [selectedFestival, setSelectedFestival] = useState<number | null>(null)
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)
//   const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
//   const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set())

//   const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
//   const containerRef = useRef<HTMLDivElement>(null)

//   // Intersection observer for animations
// useEffect(() => {
//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
//         if (entry.isIntersecting) {
//           setVisibleSections((prev) => new Set([...prev, index]))
//         }
//       })
//     },
//     { threshold: [0.1], rootMargin: "50px" },
//   )

//   sectionRefs.current.forEach((ref) => {
//     if (ref) {
//       // Check if element is already visible on mount
//       const rect = ref.getBoundingClientRect()
//       const windowHeight = window.innerHeight || document.documentElement.clientHeight

//       if (rect.top < windowHeight && rect.bottom > 0) {
//         setVisibleSections((prev) => new Set([...prev, Number(ref.getAttribute("data-index"))]))
//       }

//       observer.observe(ref)
//     }
//   })

//   return () => observer.disconnect()
// }, [])


//   // Open carousel
//   const openCarousel = (festivalIndex: number) => {
//     setSelectedFestival(festivalIndex)
//     setCurrentImageIndex(0)
//     setCarouselOpen(true)
//     document.body.style.overflow = "hidden"
//   }

//   // Close carousel
//   const closeCarousel = () => {
//     setCarouselOpen(false)
//     setSelectedFestival(null)
//     setCurrentImageIndex(0)
//     document.body.style.overflow = "unset"
//   }

//   // Navigate carousel
//   const navigateCarousel = (direction: "next" | "prev") => {
//     if (selectedFestival === null) return

//     const totalImages = sections[selectedFestival].images.length
//     if (direction === "next") {
//       setCurrentImageIndex((prev) => (prev + 1) % totalImages)
//     } else {
//       setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages)
//     }
//   }

//   // Toggle expanded content
//   const toggleExpanded = (index: number) => {
//     setExpandedSections((prev) => {
//       const newSet = new Set(prev)
//       if (newSet.has(index)) {
//         newSet.delete(index)
//       } else {
//         newSet.add(index)
//       }
//       return newSet
//     })
//   }

//   // Handle keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (carouselOpen) {
//         if (e.key === "Escape") {
//           closeCarousel()
//         } else if (e.key === "ArrowRight") {
//           navigateCarousel("next")
//         } else if (e.key === "ArrowLeft") {
//           navigateCarousel("prev")
//         }
//       }
//     }

//     document.addEventListener("keydown", handleKeyDown)
//     return () => document.removeEventListener("keydown", handleKeyDown)
//   }, [carouselOpen, selectedFestival])

//   return (
//     <>
//       <div ref={containerRef} className="festivals-container">
//         {/* Festival Header */}
//         <header className="festivals-header">
//           <h2>Festivals & Celebrations</h2>
//           <p className="header-subtitle">
//             Living traditions that transform ancient streets into stages of devotion and joy
//           </p>
//           {/* Festival Statistics */}

//         </header>

//         {/* Main Content */}
//         <main className="festivals-content">
//           {sections.map((section, index) => (
//             <div
//               key={index}
//               ref={(el) => {
//                 sectionRefs.current[index] = el
//               }}
//               data-index={index}
//               className={`festival-item ${visibleSections.has(index) ? "visible" : ""}`}
//               style={{ animationDelay: `${index * 0.2}s` }}
//             >
//               <div
//                 className="festival-image-wrapper"
//                 onClick={() => openCarousel(index)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <Image
//                   src={section.mainImage || "/placeholder.svg"}
//                   alt={section.title}
//                   width={600}     // adjust width & height based on your design
//                   height={400}
//                   className="festival-image"
//                   style={{ objectFit: "cover" }}
//                 />
//                 <div className="image-overlay">
//                   <span className="location-tag">{section.location}</span>
//                   <span className="duration-tag">{section.duration}</span>
//                 </div>
//               </div>

//               <div className="festival-details">
//                 <div className="festival-meta">
//                   <span className="festival-significance">{section.significance}</span>
//                 </div>
//                 <h2>{section.title}</h2>
//                 <h3>{section.subtitle}</h3>

//                 <div className="festival-description">
//                   <p className="short-content">{section.shortContent}</p>

//                   {expandedSections.has(index) && (
//                     <div className="full-content">
//                       {section.fullContent.split("\n\n").map((paragraph, pIndex) => (
//                         <p key={pIndex}>{paragraph}</p>
//                       ))}
//                     </div>
//                   )}
//                 </div>

//                 <div className="festival-actions">
//                   <button className="read-more-button" onClick={() => toggleExpanded(index)}>
//                     {expandedSections.has(index) ? "Read Less" : "Read More"}
//                   </button>

//                 </div>
//               </div>
//             </div>
//           ))}
//         </main>



//       </div>

//       {/* Image Carousel Modal */}
//       {carouselOpen && selectedFestival !== null && (
//         <div className="carousel-modal" onClick={closeCarousel}>
//           <div className="carousel-content" onClick={(e) => e.stopPropagation()}>
//             <div className="carousel-header">
//               <h3>{sections[selectedFestival].title}</h3>
//               <button className="carousel-close" onClick={closeCarousel}>
//                 ×
//               </button>
//             </div>

//             <div className="carousel-main">
//               <button
//                 className="carousel-nav prev"
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   navigateCarousel("prev")
//                 }}
//               >
//                 ‹
//               </button>

//               <div
//                 className="carousel-image-container"
//                 style={{ position: "relative", width: "100%", height: "100%" }}
//               >
//                 <Image
//                   src={sections[selectedFestival].images[currentImageIndex] || "/placeholder.svg"}
//                   alt={`${sections[selectedFestival].title} - Image ${currentImageIndex + 1}`}
//                   fill
//                   style={{ objectFit: "contain" }}
//                   sizes="(max-width: 768px) 100vw, 800px"
//                   priority
//                 />
//               </div>

//               <button
//                 className="carousel-nav next"
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   navigateCarousel("next")
//                 }}
//               >
//                 ›
//               </button>
//             </div>

//             <div className="carousel-footer">
//               <div className="carousel-dots">
//                 {sections[selectedFestival].images.map((_, imageIndex) => (
//                   <button
//                     key={imageIndex}
//                     className={`carousel-dot ${currentImageIndex === imageIndex ? "active" : ""}`}
//                     onClick={() => setCurrentImageIndex(imageIndex)}
//                   />
//                 ))}
//               </div>
//               <div className="carousel-counter">
//                 {currentImageIndex + 1} / {sections[selectedFestival].images.length}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default Festivals

"use client"
import { useState, useEffect, useRef } from "react"
import "./styles/Festivals.css"
import Image from "next/image"

const sections = [
  {
    title: "Indra Jatra",
    subtitle: "Festival of the Rain God",
    images: [
      "https://i.pinimg.com/1200x/e2/48/4a/e2484a6ffff165497573d186887f3fba.jpg",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1609942072337-c3370e820005?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    mainImage: "https://i.pinimg.com/1200x/e2/48/4a/e2484a6ffff165497573d186887f3fba.jpg",
    shortContent: `Celebrated in Kathmandu, Indra Jatra is an eight-day festival that honors Indra, the god of rain and heaven, featuring the spectacular chariot procession of the Living Goddess Kumari.`,
    fullContent: `Indra Jatra stands as one of Nepal's most magnificent and spiritually significant festivals, celebrated annually in Kathmandu during the month of September. This eight-day extravaganza honors Indra, the revered god of rain and heaven, whose blessings are essential for the agricultural prosperity of the valley.

The festival's most captivating highlight is the grand chariot procession of the Living Goddess Kumari, a young girl believed to be the incarnation of the goddess Taleju. Dressed in elaborate traditional attire and adorned with intricate jewelry, the Kumari is paraded through the ancient streets of Kathmandu in a beautifully decorated wooden chariot, blessing devotees and spectators who gather in thousands to witness this divine spectacle.

The celebration begins with the ceremonial raising of the Lingo, a towering wooden pole erected at Hanuman Dhoka Durbar Square. This sacred pole, adorned with colorful prayer flags and religious symbols, serves as a beacon calling Indra to descend from the heavens and bless the valley with abundant rainfall for the coming harvest season.

Throughout the festival, the streets come alive with mesmerizing masked dances performed by traditional dancers representing various deities and demons from Hindu and Buddhist mythology. The haunting melodies of traditional Newari music fill the air, creating an atmosphere of mystical devotion and cultural celebration.

The festival also features the display of sacred images and the lighting of thousands of oil lamps, transforming the ancient city into a glowing tapestry of faith and tradition. Local communities prepare elaborate feasts and distribute prasad (blessed food) to visitors, embodying the spirit of unity and generosity that defines Nepalese culture.

Indra Jatra is not merely a religious observance but a living testament to the rich cultural heritage of the Kathmandu Valley, where ancient traditions continue to thrive in the modern world.`,
    location: "Kathmandu",
    duration: "8 Days",
    significance: "UNESCO Intangible Heritage",
  },
  {
    title: "Bisket Jatra",
    subtitle: "New Year Chariot Festival",
    images: [
      "https://i.pinimg.com/736x/bc/67/c7/bc67c743b1f012078159b0ceee13babf.jpg",
      "https://images.unsplash.com/photo-1609942072337-c3370e820005?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    mainImage: "https://i.pinimg.com/736x/bc/67/c7/bc67c743b1f012078159b0ceee13babf.jpg",
    shortContent: `This wild and vibrant festival is held in Bhaktapur during the Nepali New Year, featuring thrilling chariot tug-of-wars and symbolic rituals that bring the ancient city to life.`,
    fullContent: `Bisket Jatra represents the most exhilarating and physically demanding festival in the Kathmandu Valley, transforming the medieval city of Bhaktapur into an arena of controlled chaos and unbridled celebration during the Nepali New Year in April.

The festival's centerpiece is the dramatic chariot tug-of-war, where massive wooden chariots carrying the deities Bhairav and Bhadrakali are pulled through the narrow cobblestone streets by competing teams from different neighborhoods. These towering structures, some reaching heights of over 30 feet, require hundreds of participants to maneuver through the ancient city's tight alleyways, creating an atmosphere of intense excitement and friendly rivalry.

The competition reaches its peak when the chariots must navigate the steep descent to the Khalna Tole area, where the real test of strength and coordination begins. Teams strain against thick ropes, their voices rising in unison as they chant traditional songs and battle cries, while spectators cheer from rooftops and balconies, creating an electrifying atmosphere that can be felt throughout the city.

Beyond the physical spectacle, Bisket Jatra carries deep spiritual significance, marking the triumph of good over evil and the renewal of life that comes with the new year. The festival includes various symbolic rituals, including the ceremonial erection of a tall wooden pole (lingo) and the performance of traditional masked dances that tell ancient stories of gods and demons.

The celebration extends beyond the main chariot procession to include numerous smaller events, traditional music performances, and community feasts that bring together people from all walks of life. Local artisans display their crafts, traditional foods are prepared and shared, and the entire city becomes a living museum of Newari culture and tradition.

What makes Bisket Jatra truly unique is its authentic, grassroots nature – this is not a festival performed for tourists but a genuine community celebration that has remained largely unchanged for centuries, offering visitors a rare glimpse into the heart of traditional Nepalese culture.`,
    location: "Bhaktapur",
    duration: "9 Days",
    significance: "New Year Celebration",
  },
  {
    title: "Rato Machhendranath Jatra",
    subtitle: "Festival of the Rain Deity",
    images: [
      "https://i.pinimg.com/736x/49/4c/9e/494c9ef253905576cf0b43cc7fab38af.jpg",
      "https://images.unsplash.com/photo-1609942072337-c3370e820005?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    mainImage: "https://i.pinimg.com/736x/49/4c/9e/494c9ef253905576cf0b43cc7fab38af.jpg",
    shortContent: `One of the longest and oldest festivals in the valley, this chariot festival honors Rato Machhendranath, the god of rain and harvest, bringing together people of all backgrounds.`,
    fullContent: `Rato Machhendranath Jatra stands as the longest-running and most historically significant festival in the Kathmandu Valley, stretching over several months and representing over 1,400 years of continuous celebration in the ancient city of Patan.

This extraordinary festival honors Rato Machhendranath, known as the god of rain and harvest, whose blessings are considered essential for agricultural prosperity and the well-being of the valley's inhabitants. The deity is revered by both Hindus and Buddhists, making this celebration a unique example of religious harmony and cultural unity.

The festival's most impressive feature is the towering wooden chariot, standing nearly 60 feet tall and constructed entirely without nails using traditional joinery techniques passed down through generations. This magnificent structure, adorned with intricate carvings and colorful decorations, serves as a mobile temple carrying the sacred image of Rato Machhendranath through the streets of Patan.

The chariot's journey is a community effort of extraordinary proportions, requiring hundreds of volunteers to pull the massive structure using thick ropes along a predetermined route that winds through the city's ancient neighborhoods. The procession moves slowly and deliberately, stopping at various locations for prayers, offerings, and traditional performances.

What makes this festival particularly remarkable is its inclusive nature – people from all castes, creeds, and social backgrounds come together to participate in pulling the chariot, embodying the democratic spirit that underlies Nepalese society. The festival serves as a great equalizer, where social hierarchies temporarily dissolve in the shared effort of honoring the deity.

The celebration includes numerous subsidiary events, including traditional music and dance performances, the preparation of special foods, and the decoration of houses and streets along the procession route. Local artisans create beautiful decorative elements, and families prepare elaborate offerings to present to the deity.

The festival culminates with the Bhoto Jatra ceremony, where a sacred vest (bhoto) is displayed to the crowd, accompanied by the recitation of ancient legends and the performance of traditional rituals that have remained unchanged for centuries.

Rato Machhendranath Jatra represents more than just a religious celebration – it is a living embodiment of Nepal's cultural continuity, community spirit, and the enduring power of tradition in the modern world.`,
    location: "Patan (Lalitpur)",
    duration: "Several Months",
    significance: "Oldest Valley Festival",
  },
]

function Festivals() {
  const [carouselOpen, setCarouselOpen] = useState(false)
  const [selectedFestival, setSelectedFestival] = useState<number | null>(null)
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

    // More robust initial visibility check with multiple attempts
    const checkInitialVisibility = () => {
      const visibleOnMount = new Set<number>()
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect()
          const windowHeight = window.innerHeight || document.documentElement.clientHeight

          if (rect.top < windowHeight && rect.bottom > 0) {
            visibleOnMount.add(index)
          }
          observer.observe(ref)
        }
      })

      if (visibleOnMount.size > 0) {
        setVisibleSections((prev) => new Set([...prev, ...visibleOnMount]))
      }
    }

    // Try multiple times to ensure DOM is ready
    const timeouts = [0, 50, 100, 200]
    timeouts.forEach((delay) => {
      setTimeout(checkInitialVisibility, delay)
    })

    return () => observer.disconnect()
  }, [])

  // Open carousel
  const openCarousel = (festivalIndex: number) => {
    setSelectedFestival(festivalIndex)
    setCurrentImageIndex(0)
    setCarouselOpen(true)
    document.body.style.overflow = "hidden"
  }

  // Close carousel
  const closeCarousel = () => {
    setCarouselOpen(false)
    setSelectedFestival(null)
    setCurrentImageIndex(0)
    document.body.style.overflow = "unset"
  }

  // Navigate carousel
  const navigateCarousel = (direction: "next" | "prev") => {
    if (selectedFestival === null) return

    const totalImages = sections[selectedFestival].images.length
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
  }, [carouselOpen, selectedFestival])

  return (
    <>
      <div ref={containerRef} className="festivals-container">
        {/* Festival Header */}
        <header className="festivals-header">
          <h2>Festivals & Celebrations</h2>
          <p className="header-subtitle">
            Living traditions that transform ancient streets into stages of devotion and joy
          </p>
          {/* Festival Statistics */}
        </header>

        {/* Main Content */}
        <main className="festivals-content">
          {sections.map((section, index) => (
            <div
              key={index}
              ref={(el) => {
                sectionRefs.current[index] = el
              }}
              data-index={index}
              className={`festival-item ${visibleSections.has(index) ? "visible" : ""}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="festival-image-wrapper" onClick={() => openCarousel(index)} style={{ cursor: "pointer" }}>
                <Image
                  src={section.mainImage || "/placeholder.svg"}
                  alt={section.title}
                  width={600} // adjust width & height based on your design
                  height={400}
                  className="festival-image"
                  style={{ objectFit: "cover" }}
                />
                <div className="image-overlay">
                  <span className="location-tag">{section.location}</span>
                  <span className="duration-tag">{section.duration}</span>
                </div>
              </div>

              <div className="festival-details">
                <div className="festival-meta">
                  <span className="festival-significance">{section.significance}</span>
                </div>
                <h2>{section.title}</h2>
                <h3>{section.subtitle}</h3>

                <div className="festival-description">
                  <p className="short-content">{section.shortContent}</p>

                  {expandedSections.has(index) && (
                    <div className="full-content">
                      {section.fullContent.split("\n\n").map((paragraph, pIndex) => (
                        <p key={pIndex}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="festival-actions">
                  <button className="read-more-button" onClick={() => toggleExpanded(index)}>
                    {expandedSections.has(index) ? "Read Less" : "Read More"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* Image Carousel Modal */}
      {carouselOpen && selectedFestival !== null && (
        <div className="carousel-modal" onClick={closeCarousel}>
          <div className="carousel-content" onClick={(e) => e.stopPropagation()}>
            <div className="carousel-header">
              <h3>{sections[selectedFestival].title}</h3>
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
                  src={sections[selectedFestival].images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${sections[selectedFestival].title} - Image ${currentImageIndex + 1}`}
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
                {sections[selectedFestival].images.map((_, imageIndex) => (
                  <button
                    key={imageIndex}
                    className={`carousel-dot ${currentImageIndex === imageIndex ? "active" : ""}`}
                    onClick={() => setCurrentImageIndex(imageIndex)}
                  />
                ))}
              </div>
              <div className="carousel-counter">
                {currentImageIndex + 1} / {sections[selectedFestival].images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Festivals


