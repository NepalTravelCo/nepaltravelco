"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { useRef } from "react"

export default function TravelGuideHero() {
    const heroRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    })

    // Parallax effects
    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])

    const handleScrollDown = () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        })
    }

    return (
        <section
            ref={heroRef}
            className="relative w-full h-screen flex items-center justify-center overflow-hidden snap-start"
        >
            {/* Enhanced Background with Parallax */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://i.pinimg.com/736x/c0/23/f1/c023f1bdf21774e226391b23e6312333.jpg')", // Using a placeholder for now, ideally user has a specific image
                        scale: imageScale,
                        y: imageY
                    }}
                />
                {/* Enhanced overlays */}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/90" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

                {/* Vignette */}
                <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.7)]" />
            </div>

            {/* Enhanced Content with Parallax */}
            <motion.div
                style={{
                    y: contentY,
                    opacity: contentOpacity
                }}
                className="relative z-10 text-center px-4 max-w-6xl mx-auto"
            >
                <motion.span
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.2
                    }}
                    className="inline-block text-[#ea580c] font-bold tracking-[0.35em] uppercase text-sm md:text-base mb-8 relative"
                >
                    <span className="relative z-10">Essential Knowledge</span>
                    {/* Glowing underline effect */}
                    <motion.span
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ea580c] to-transparent"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    />
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 1.2,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.4
                    }}
                    className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-10 leading-[0.95] tracking-tighter"
                    style={{
                        textShadow: "0 10px 40px rgba(0,0,0,0.5), 0 0 80px rgba(234,88,12,0.2)"
                    }}
                >
                    Travel{" "}
                    <motion.span
                        className="inline-block bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#ea580c] bg-clip-text text-transparent"
                        animate={{
                            backgroundPosition: ["0%", "100%", "0%"],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            backgroundSize: "200% 100%"
                        }}
                    >
                        Guide
                    </motion.span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.6
                    }}
                    className="text-xl md:text-2xl lg:text-3xl text-stone-200 max-w-3xl mx-auto font-light leading-relaxed tracking-wide"
                    style={{
                        textShadow: "0 2px 20px rgba(0,0,0,0.5)"
                    }}
                >
                    Navigate Nepal with confidence. Everything you need for a seamless journey to the roof of the world.
                </motion.p>

                {/* Decorative elements */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                    className="flex items-center justify-center gap-6 mt-12"
                >
                    <motion.div
                        className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#ea580c] to-[#ea580c]"
                        animate={{ scaleX: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="w-2 h-2 rounded-full bg-[#ea580c]"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="w-16 h-[2px] bg-gradient-to-l from-transparent via-[#ea580c] to-[#ea580c]"
                        animate={{ scaleX: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />
                </motion.div>
            </motion.div>

            {/* Enhanced Scroll Indicator - Perfectly Centered */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 1.5,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1]
                }}
                className="absolute inset-x-0 bottom-16 md:bottom-20 z-20 flex flex-col items-center gap-3 cursor-pointer group mx-auto w-fit"
                onClick={handleScrollDown}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.span
                    className="text-white/70 text-xs uppercase tracking-[0.3em] font-bold group-hover:text-[#ea580c] transition-colors duration-300 whitespace-nowrap"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    Scroll to Explore
                </motion.span>

                <motion.div
                    className="relative"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDown
                        className="text-white/70 group-hover:text-[#ea580c] transition-colors duration-300"
                        size={24}
                    />
                    <motion.div
                        className="absolute inset-0 blur-xl bg-[#ea580c]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>

                {/* Animated line */}
                <motion.div
                    className="w-[2px] h-12 bg-gradient-to-b from-white/20 via-[#ea580c]/50 to-transparent"
                    animate={{
                        scaleY: [0.5, 1, 0.5],
                        opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* Ambient light effects */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ea580c]/10 rounded-full blur-[120px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
        </section>
    )
}
