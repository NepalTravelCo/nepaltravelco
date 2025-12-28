"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
        <AnimatePresence mode="wait">
          {heroContent.map((content, index) => (
            index === currentSlide && (
              <motion.div
                key={index}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-0 z-10"
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
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Improved Gradient Overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      {/* Text Content */}
      <div className="absolute inset-0 z-30 flex items-center justify-center px-4 text-center">
        <div className="mx-auto max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="
              mb-8
              font-[var(--heading-font)]
              text-[clamp(3rem,10vw,6rem)]
              font-bold
              text-white
              leading-[1.1]
              tracking-tight
              drop-shadow-2xl
            "
          >
            Unveil Nepal&apos;s <br />
            <span className="text-secondary">Natural Beauty</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="
              mx-auto
              max-w-2xl
              font-[var(--text-font)]
              text-[clamp(1.25rem,3vw,1.75rem)]
              font-light
              text-stone-200
              leading-relaxed
              tracking-wide
              drop-shadow-lg
            "
          >
            Explore the Spirit, Embrace the Culture, <br className="hidden md:block" />
            Live the Adventure of a Lifetime.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            className="mt-12"
          >
            <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-xl group">
              Start Your Journey
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-2">→</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-white text-xs uppercase tracking-widest opacity-60">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
