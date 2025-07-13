

import { useState, useEffect } from "react"
import "./styles/HeroSection.css"

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroContent = [
    {
      type: "image",
      src: "https://i.pinimg.com/736x/c6/78/c5/c678c516469daa480e35c9233099eda4.jpg",
      duration: 6000,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/60/9a/a4/609aa47b224a06fe665a87be2cab7464.jpg",
      duration: 6000,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/1200x/4f/7c/ad/4f7cad101467bf5df0afb8131be77353.jpg",
      duration: 6000,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.length)
    }, heroContent[currentSlide].duration)

    return () => clearInterval(timer)
  }, [currentSlide, heroContent])

  return (
    <section className="relative overflow-hidden h-screen">
      {/* Image Carousel */}
      <div className="relative h-full">
        {heroContent.map((content, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[3000ms] ease-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            style={{
              zIndex: index === currentSlide ? 2 : 1,
            }}
          >
            <img
              src={content.src || "/placeholder.svg"}
              alt="Nepal landscape"
              className="hero-image w-full h-full object-cover transition-transform duration-[3000ms] ease-out"
              style={{
                transform: index === currentSlide ? "scale(1)" : "scale(1.05)",
              }}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* Subtle Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="hero-title mb-6">Unveil Nepal's Natural Beauty</h1>
          <p className="hero-subtitle max-w-2xl mx-auto">Adventure, Spirituality, and Culture — All in One Journey</p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

