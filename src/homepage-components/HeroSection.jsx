import { useEffect, useState } from "react";
import "./styles/HeroSection.css";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroContent = [
    {
      type: "video",
      src: "/Videos/hero-section.mp4",
    }
  ];

  // No need for slideshow timer if only one item
  useEffect(() => {
    if (heroContent.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.length);
    }, 8000); // Default to 8 seconds

    return () => clearInterval(timer);
  }, [currentSlide, heroContent]);

  return (
    <section className="relative overflow-hidden h-screen hero-section">
      {/* Background Content */}
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
            {content.type === "video" ? (
              <video
                src={content.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={content.src}
                alt="Hero"
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            )}
          </div>
        ))}

        {/* Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 100%)",
          }}
        />
      </div>

      {/* Text Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="hero-title mb-6">Unveil Nepal's Natural Beauty</h1>
          <p className="hero-subtitle max-w-2xl mx-auto">
            Adventure, Spirituality, and Culture — All in One Journey
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
