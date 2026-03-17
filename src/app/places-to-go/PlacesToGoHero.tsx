"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { useRef } from "react"

export default function PlacesToGoHero() {
    const heroRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    })

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
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('https://i.pinimg.com/736x/3f/11/30/3f11304b704850cb6ad8e27e6a3a56cb.jpg')",
                        scale: imageScale,
                        y: imageY
                    }}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/90" />
            </div>

            <motion.div
                style={{
                    y: contentY,
                    opacity: contentOpacity
                }}
                className="relative z-10 text-center px-4 max-w-6xl mx-auto"
            >
                <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block text-[#ea580c] font-bold tracking-[0.35em] uppercase text-xs md:text-sm mb-8"
                >
                    Discover Nepal
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-7xl lg:text-9xl font-black text-white mb-10 leading-[0.95] tracking-tighter"
                >
                    Places to{" "}
                    <span className="text-transparent border-t-2 border-b-2 border-[#ea580c] bg-clip-text bg-gradient-to-r from-[#ea580c] to-[#f97316]">
                        Go
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl md:text-2xl text-stone-200 max-w-2xl mx-auto font-light leading-relaxed"
                >
                    From sacred valleys to frozen peaks, explore the most iconic destinations in the Himalayas.
                </motion.p>
            </motion.div>

            <motion.div
                className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 cursor-pointer"
                onClick={handleScrollDown}
            >
                <span className="text-white/70 text-[10px] uppercase tracking-[0.3em] font-bold">Explore</span>
                <ArrowDown className="text-white/70 animate-bounce" size={20} />
            </motion.div>
        </section>
    )
}
