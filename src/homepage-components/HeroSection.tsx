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
    <section className="sticky top-0 z-0 h-screen overflow-hidden">
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
                transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
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
        
        {/* Dynamic Multi-layered Overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/40 via-transparent to-[var(--primary)]/60" />
        <div className="absolute inset-0 z-20 bg-black/30" />
      </div>

      {/* Main Content - Centered Layout */}
      <div className="absolute inset-0 z-40 h-full flex flex-col items-center justify-center px-6">
        <div className="max-w-5xl w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="h-px w-8 bg-[var(--accent)]" />
            <span className="text-[var(--accent)] text-xs md:text-sm uppercase tracking-[0.5em] font-bold">
              Legacy of Discovery
            </span>
            <span className="h-px w-8 bg-[var(--accent)]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="
              font-[var(--heading-font)]
              text-[clamp(2.8rem,9vw,6.5rem)]
              font-extrabold
              text-white
              leading-[0.95]
              tracking-tighter
              text-center
              mb-10
            "
          >
            Unbound <br />
            <span className="text-[var(--secondary)] italic font-light px-4">Elegance.</span> <br />
            Pure <span className="text-white relative">
              Nepal.
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.5, duration: 1.2 }}
                className="absolute -bottom-2 left-0 h-1 md:h-2 bg-[var(--accent)]/60 -z-10"
              />
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-12"
          >
            <p className="max-w-2xl text-white/80 text-lg md:text-xl font-light leading-relaxed text-center">
              Curating extraordinary journeys through the heart of the Himalayas. 
              Witness the majesty of nature through a lens of refined luxury.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sidebar Navigation - Refined & Subtle Liveliness */}
      <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-10">
        <motion.span 
          animate={{ 
            opacity: [0.3, 0.7, 0.3],
            y: [0, -4, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="[writing-mode:vertical-lr] text-white/80 text-[10px] uppercase tracking-[0.5em] font-medium rotate-180 select-none pointer-events-none"
        >
          Scroll to Explore
        </motion.span>
        
        <div className="relative w-px h-32 bg-white/10 rounded-full overflow-hidden">
          {/* Subtle moving accent segment */}
          <motion.div 
            animate={{ 
              y: ["-20%", "120%"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: [0.45, 0, 0.55, 1],
            }}
            className="absolute top-0 left-[-0.5px] w-[2px] h-12 bg-gradient-to-b from-transparent via-[var(--secondary)] to-transparent"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;