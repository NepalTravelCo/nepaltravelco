"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

const PlaneIcon = ({ rotation = 0 }: { rotation?: number }) => (
    <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        className="text-primary"
        fill="currentColor"
        style={{ transform: `rotate(${rotation}deg)` }}
    >
        <path d="M21,16L21,14L13,9L13,3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5L10,9L2,14L2,16L10,13.5L10,19L8,20.5L8,22L11.5,21L15,22L15,20.5L13,19L13,13.5L21,16Z" />
    </svg>
)

const ExperienceInfoSection = () => {
    const containerRef = useRef<HTMLElement>(null);

    // Mouse tracking
    const mouseX = useMotionValue(0.5)
    const mouseY = useMotionValue(0.5)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return
        const { clientX, clientY } = e
        const { left, top, width, height } = containerRef.current.getBoundingClientRect()
        mouseX.set((clientX - left) / width)
        mouseY.set((clientY - top) / height)
    }

    // Scroll tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Smooth scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Smooth mouse progress
    const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 20 })
    const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 20 })

    // Layer Parallax (Scroll + Mouse)
    const layer1X = useTransform(smoothMouseX, [0, 1], ["-3%", "3%"])
    const layer1Y = useTransform(smoothProgress, [0, 1], ["-6%", "6%"])

    const layer2X = useTransform(smoothMouseX, [0, 1], ["6%", "-6%"])
    const layer2Y = useTransform(smoothProgress, [0, 1], ["-10%", "10%"])

    const layer3X = useTransform(smoothMouseX, [0, 1], ["-9%", "9%"])
    const layer3Y = useTransform(smoothProgress, [0, 1], ["-14%", "14%"])

    const contentY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 1, 0]);

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="sticky top-0 z-0 h-[80vh] flex items-center justify-center bg-[#faf9f6] overflow-hidden py-24"
        >
            {/* Flight Path Background Layers */}
            <div className="absolute inset-0 w-full h-full pointer-events-none select-none">

                {/* Layer 1 - Deep Background Paths */}
                <motion.div
                    style={{ x: layer1X, y: layer1Y }}
                    className="absolute inset-x-[-30%] inset-y-[-30%] w-[160%] h-[160%] opacity-[0.08]"
                >
                    <svg viewBox="0 0 1000 1000" className="w-full h-full text-primary" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8">
                        <path d="M-50,200 C150,50 400,300 600,100 S900,300 1100,150" />
                        <path d="M200,1100 Q400,800 150,500 T300,-100" />
                        <path d="M800,-100 Q950,200 750,500 T850,1100" />
                        <path d="M-100,600 Q200,800 500,600 S800,400 1100,600" />
                    </svg>
                    <div className="absolute top-[10%] left-[20%]"><PlaneIcon rotation={45} /></div>
                    <div className="absolute top-[15%] left-[60%]"><PlaneIcon rotation={45} /></div>
                    <div className="absolute top-[80%] left-[80%]"><PlaneIcon rotation={160} /></div>
                    <div className="absolute top-[40%] left-[15%]"><PlaneIcon rotation={-30} /></div>
                    <div className="absolute top-[90%] left-[30%]"><PlaneIcon rotation={200} /></div>
                </motion.div>

                {/* Layer 2 - Midground Paths */}
                <motion.div
                    style={{ x: layer2X, y: layer2Y }}
                    className="absolute inset-x-[-40%] inset-y-[-40%] w-[180%] h-[180%] opacity-[0.12]"
                >
                    <svg viewBox="0 0 1000 1000" className="w-full h-full text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 10">
                        <path d="M-100,400 C150,250 450,550 750,350 S1000,500 1200,300" />
                        <path d="M1100,700 Q800,900 400,750 T-100,850" />
                        <path d="M300,-100 Q500,200 200,500 T400,1100" />
                        <path d="M600,-200 Q400,100 700,400 S900,1000 600,1200" />
                    </svg>
                    <div className="absolute top-[35%] left-[75%]"><PlaneIcon rotation={-20} /></div>
                    <div className="absolute top-[75%] left-[20%]"><PlaneIcon rotation={135} /></div>
                    <div className="absolute top-[20%] left-[40%]"><PlaneIcon rotation={200} /></div>
                    <div className="absolute top-[5%] left-[10%]"><PlaneIcon rotation={80} /></div>
                    <div className="absolute top-[85%] left-[90%]"><PlaneIcon rotation={250} /></div>
                </motion.div>

                {/* Layer 3 - Foreground Paths */}
                <motion.div
                    style={{ x: layer3X, y: layer3Y }}
                    className="absolute inset-x-[-50%] inset-y-[-50%] w-[200%] h-[200%] opacity-[0.18]"
                >
                    <svg viewBox="0 0 1000 1000" className="w-full h-full text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 12">
                        <path d="M-200,600 C0,450 300,700 500,550 S800,400 1000,500" />
                        <path d="M500,-200 Q700,100 400,400 S100,700 300,1200" />
                        <path d="M800,1200 L400,-200" />
                    </svg>
                    <div className="absolute top-[55%] left-[45%]"><PlaneIcon rotation={10} /></div>
                    <div className="absolute top-[10%] left-[85%]"><PlaneIcon rotation={-120} /></div>
                    <div className="absolute top-[85%] left-[10%]"><PlaneIcon rotation={45} /></div>
                    <div className="absolute top-[30%] left-[30%]"><PlaneIcon rotation={150} /></div>
                    <div className="absolute top-[70%] left-[70%]"><PlaneIcon rotation={-45} /></div>
                </motion.div>
            </div>

            <motion.div
                style={{ y: contentY, opacity: contentOpacity }}
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
