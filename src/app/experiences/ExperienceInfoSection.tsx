"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ExperienceInfoSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 1, 0]);

    return (
        <section
            ref={containerRef}
            className="sticky top-0 z-0 h-[80vh] flex items-center justify-center bg-stone-50 overflow-hidden py-24"
        >
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 max-w-4xl mx-auto px-6 text-center"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-8"
                >
                    <div className="flex items-center justify-center gap-4">
                        <span className="h-px w-12 bg-secondary" />
                        <span className="text-secondary text-xs md:text-sm uppercase tracking-[0.4em] font-bold">
                            Crafted Journeys
                        </span>
                        <span className="h-px w-12 bg-secondary" />
                    </div>

                    <h2 className="font-[var(--heading-font)] text-4xl md:text-6xl font-bold leading-tight text-primary">
                        Discover the <span className="text-secondary italic font-light">Soul of Nepal</span> <br />
                        Through curated adventures
                    </h2>

                    <p className="text-stone-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                        At Nepal Travel Co, we believe that true discovery happens when you step off the beaten path.
                        Our experiences are designed to immerse you in the raw beauty and vibrant culture of the Himalayas.
                    </p>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                        className="h-px w-24 bg-stone-200"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default ExperienceInfoSection;
