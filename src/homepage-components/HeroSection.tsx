"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

const HeroSection = () => {
  const heroContent = useMemo(
    () => [
      {
        type: "video",
        src: "/Videos/hero-section.mp4",
      },
    ],
    []
  );

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (heroContent.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [heroContent]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background */}
      <div className="relative h-full">
        {heroContent.map((content, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[3000ms] ease-out ${
              index === currentSlide
                ? "opacity-100 scale-100 z-20"
                : "opacity-0 scale-105 z-10"
            }`}
          >
            {content.type === "video" ? (
              <video
                src={content.src}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={content.src}
                alt="Hero"
                fill
                priority={index === 0}
                className="object-cover"
              />
            )}
          </div>
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 to-black/30" />
      </div>

      {/* Text Content */}
      <div className="absolute inset-0 z-30 flex items-center justify-center px-4 text-center">
        <div className="mx-auto max-w-4xl text-white fade-up">
          <h1
            className="
              mb-6
              font-[var(--heading-font)]
              text-[clamp(2.5rem,6vw,4.5rem)]
              md:text-[clamp(2rem,8vw,3rem)]
              font-medium
              leading-[var(--line-height)]
              tracking-[var(--letter-spacing)]
              text-[var(--overlay-color)]
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]
            "
          >
            Unveil Nepal&apos;s Natural Beauty
          </h1>

          <p
            className="
              mx-auto
              max-w-2xl
              font-[var(--text-font)]
              text-[clamp(1.1rem,2.5vw,1.5rem)]
              md:text-[clamp(1rem,4vw,1.25rem)]
              font-light
              leading-relaxed
              tracking-wide
              text-[var(--overlay-color)]
              opacity-95
              drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]
            "
          >
            Explore the Spirit, Embrace the Culture, Live the Adventure.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
