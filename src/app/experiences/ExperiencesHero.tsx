"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ExperiencesHero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://i.pinimg.com/736x/80/bb/ac/80bbac0f2981e85796dffaf11b100e15.jpg"
                    alt="Experiences in Nepal"
                    fill
                    priority
                    className="object-cover"
                />
                {/* Overlays */}
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex items-center justify-center gap-4 mb-4"
                >
                    <span className="h-px w-8 bg-[var(--accent)]" />
                    <span className="text-[var(--accent)] text-xs md:text-sm uppercase tracking-[0.4em] font-bold">
                        Beyond the Peaks
                    </span>
                    <span className="h-px w-8 bg-[var(--accent)]" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="font-[var(--heading-font)] text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold text-white leading-tight tracking-tighter"
                >
                    Unforgettable <span className="text-[var(--secondary)] italic font-light">Experiences</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="mt-6 max-w-2xl mx-auto text-white/90 text-lg md:text-xl font-light leading-relaxed"
                >
                    From the deepest gorges to the highest skies, discover Nepal's most thrilling and exclusive journeys.
                </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <span className="text-white/60 text-[10px] uppercase tracking-[0.3em]">Explore More</span>
                <div className="w-px h-12 bg-gradient-to-b from-[var(--accent)] to-transparent" />
            </motion.div>
        </section>
    );
};

export default ExperiencesHero;
