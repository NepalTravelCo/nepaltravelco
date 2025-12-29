"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const FillerInfo = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms
  // Background text moves slowly
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Images move at different speeds to create depth
  const image1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const image2Y = useTransform(scrollYProgress, [0, 1], ["10%", "-25%"]);
  const image3Y = useTransform(scrollYProgress, [0, 1], ["-5%", "-10%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] overflow-hidden bg-[#FDFBF7] flex items-center justify-center py-24"
    >
      {/* Massive Background Text */}
      <motion.div
        style={{ y: textY }}
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none"
      >
        <div className="relative w-full text-center">
          <h2 className="text-[14vw] leading-[0.85] font-black text-stone-200 uppercase tracking-tighter mix-blend-multiply opacity-60 font-[var(--heading-font)]">
            Kathmandu
            <br />
            &nbsp;Valley
          </h2>
        </div>
      </motion.div>

      {/* Floating Images Container */}
      <div className="relative w-full max-w-[1400px] h-[800px] pointer-events-none z-10">

        {/* Image 1: Top Left - Temples */}
        <motion.div
          style={{ y: image1Y }}
          className="absolute top-[0%] left-[5%] md:left-[8%] w-[35vw] md:w-[22vw] max-w-[320px] aspect-[3/4] rounded-sm shadow-2xl overflow-hidden pointer-events-auto"
        >
          <Image
            src="https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg"
            alt="Kathmandu Durbar Square"
            fill
            className="object-cover hover:scale-110 transition-transform duration-700"
          />
        </motion.div>

        {/* Image 2: Bottom Right - Culture/People */}
        <motion.div
          style={{ y: image2Y }}
          className="absolute bottom-[5%] right-[5%] md:right-[10%] w-[40vw] md:w-[28vw] max-w-[380px] aspect-[4/3] rounded-sm shadow-2xl overflow-hidden pointer-events-auto"
        >
          <Image
            src="https://images.pexels.com/photos/5801064/pexels-photo-5801064.jpeg"
            alt="Nepali Culture"
            fill
            className="object-cover hover:scale-110 transition-transform duration-700"
          />
        </motion.div>

        {/* Central Content Call to Action */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto z-20 w-full max-w-2xl px-4">
          {/* No box background, just text */}
          <div className="mx-auto">
            <h3 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold text-primary mb-6 drop-shadow-sm">
              The Cultural <span className="italic font-normal text-secondary"> Heart </span>
            </h3>
            <p className="text-stone-700 text-lg md:text-xl mb-10 leading-relaxed font-[family-name:var(--font-poppins)] max-w-lg mx-auto">
              Step into a world where ancient traditions blend with modern life.
              Experience the spiritual energy of the Valley.
            </p>
            <Link
              href="/explore-valley"
              className="inline-block px-10 py-4 bg-primary text-white rounded-full font-medium hover:bg-secondary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-[family-name:var(--heading-font)] tracking-wide"
            >
              Start Exploring
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FillerInfo;
