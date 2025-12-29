"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Calendar, Mountain, ArrowRight } from "lucide-react"
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
    useMotionValue,
    animate
} from "framer-motion"

// Mock data for demonstration
const treksData = [
    {
        name: "Everest Base Camp",
        altitude: 5364,
        description: "Journey to the foot of the world's highest peak through traditional Sherpa villages and ancient monasteries.",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2671",
        slug: "everest-base-camp",
        location: "Khumbu, Nepal"
    },
    {
        name: "Annapurna Circuit",
        altitude: 5416,
        description: "Circle one of the world's most spectacular mountain ranges, crossing diverse landscapes from subtropical forests to high desert.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2670",
        slug: "annapurna-circuit",
        location: "Annapurna, Nepal"
    },
    {
        name: "Manaslu Circuit",
        altitude: 5160,
        description: "Trek around the eighth highest mountain in the world through remote villages and pristine wilderness.",
        image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=2670",
        slug: "manaslu-circuit",
        location: "Gorkha, Nepal"
    }
]

interface TrekSection {
    id: number
    name: string
    altitude: number
    description: string
    imageUrl: string
    location: string
    slug: string
}

const trekSections: TrekSection[] = treksData.map((trek, index) => ({
    id: index + 1,
    name: trek.name,
    altitude: trek.altitude,
    description: trek.description,
    imageUrl: trek.image,
    location: trek.location,
    slug: trek.slug
}))

// Enhanced Altitude Display with smooth digit animation
function AltitudeDisplay({ altitude }: { altitude: MotionValue<number> }) {
    const [displayValue, setDisplayValue] = useState(trekSections[0].altitude.toLocaleString())
    const prevAltitudeRef = useRef(trekSections[0].altitude)

    useEffect(() => {
        // Subscribe to altitude changes and animate the display
        const unsubscribe = altitude.on("change", (latest) => {
            const rounded = Math.round(latest)
            // Only update if value changed significantly
            if (Math.abs(rounded - prevAltitudeRef.current) > 5) {
                prevAltitudeRef.current = rounded
                setDisplayValue(rounded.toLocaleString())
            }
        })
        return unsubscribe
    }, [altitude])

    // Smooth scrolling digits effect using CSS counter
    const smoothValue = useTransform(altitude, (v) => Math.round(v).toLocaleString())

    return (
        <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
                delay: 0.3,
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1]
            }}
            className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-50 bg-gradient-to-br from-black/90 to-black/70 backdrop-blur-2xl px-7 py-6 rounded-3xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col items-center min-w-[160px] group hover:scale-105 transition-transform duration-300"
        >
            <motion.div 
                className="text-[10px] uppercase tracking-[0.35em] text-[#ea580c] font-black mb-3 opacity-90"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                Altimeter
            </motion.div>
            <div className="flex items-baseline gap-1.5 overflow-hidden">
                <motion.span 
                    className="text-5xl md:text-6xl font-black font-mono tracking-tighter text-white tabular-nums"
                    style={{ 
                        textShadow: "0 0 30px rgba(234, 88, 12, 0.3)",
                        letterSpacing: "-0.05em"
                    }}
                    key={displayValue}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 25
                    }}
                >
                    {smoothValue}
                </motion.span>
                <span className="text-lg md:text-xl text-white/50 font-bold mb-1">m</span>
            </div>
            <motion.div 
                className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#ea580c]/50 to-transparent mt-4"
                animate={{ 
                    scaleX: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </motion.div>
    )
}

export default function TrekInteraction() {
    const [activeSection, setActiveSection] = useState(0)
    const [showAltimeter, setShowAltimeter] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Track scroll progress relative to the container within the scrollable parent
    const { scrollYProgress } = useScroll({
        target: containerRef,
        container: typeof window !== 'undefined' ? { current: document.querySelector('main') as HTMLElement } : undefined,
        offset: ["start start", "end end"]
    })

    // Smoother altitude mapping with easing
    const altitudes = trekSections.map(t => t.altitude)
    const inputRanges = trekSections.map((_, i) => i / (trekSections.length - 1))
    const currentAltitude = useTransform(
        scrollYProgress, 
        inputRanges, 
        altitudes,
        { ease: (t) => t * t * (3 - 2 * t) } // Smoothstep interpolation
    )

    // Ultra-smooth spring animation for altitude
    const springAltitude = useSpring(currentAltitude, {
        stiffness: 80,
        damping: 30,
        mass: 0.5,
        restDelta: 0.1
    })

    useEffect(() => {
        const handleScroll = () => {
            const progress = scrollYProgress.get()
            
            // Show altimeter once user starts scrolling into this section
            if (progress > 0.01 && !showAltimeter) {
                setShowAltimeter(true)
            } else if (progress < 0.01 && showAltimeter) {
                setShowAltimeter(false)
            }
            
            const index = Math.min(
                Math.floor(progress * trekSections.length + 0.3), 
                trekSections.length - 1
            )
            if (index !== activeSection && index >= 0) {
                setActiveSection(index)
            }
        }

        const unsubscribe = scrollYProgress.on("change", handleScroll)
        return () => unsubscribe()
    }, [scrollYProgress, activeSection, showAltimeter])

    return (
        <div ref={containerRef} className="relative bg-black">
            {showAltimeter && <AltitudeDisplay altitude={springAltitude} />}

            {trekSections.map((trek, index) => (
                <TrekCard
                    key={trek.id}
                    trek={trek}
                    index={index}
                    isActive={activeSection === index}
                    progress={scrollYProgress}
                    totalCards={trekSections.length}
                />
            ))}
        </div>
    )
}

function TrekCard({
    trek,
    index,
    isActive,
    progress,
    totalCards
}: {
    trek: TrekSection
    index: number
    isActive: boolean
    progress: MotionValue<number>
    totalCards: number
}) {
    const cardRef = useRef<HTMLDivElement>(null)
    const isLastCard = index === totalCards - 1
    
    // Calculate individual card progress for smoother animations
    const start = index / totalCards
    const end = (index + 1) / totalCards
    
    const cardProgress = useTransform(progress, [start, end], [0, 1])
    
    // Smooth scale animation based on scroll position
    // Last card shouldn't scale down at the end
    const scale = useTransform(
        cardProgress,
        isLastCard ? [0, 0.5] : [0, 0.5, 1],
        isLastCard ? [0.9, 1] : [0.9, 1, 0.9]
    )
    
    // Last card stays fully visible, others fade in/out
    const opacity = useTransform(
        cardProgress,
        isLastCard ? [0, 0.3] : [0, 0.3, 0.7, 1],
        isLastCard ? [0.5, 1] : [0.5, 1, 1, 0.5]
    )

    // Background image parallax effect
    const imageScale = useTransform(
        cardProgress,
        [0, 0.5, 1],
        [1.2, 1.05, 1.2]
    )

    const imageY = useTransform(
        cardProgress,
        [0, 0.5, 1],
        ["-10%", "0%", "10%"]
    )

    return (
        <motion.div
            ref={cardRef}
            style={{ 
                scale,
                opacity
            }}
            className="relative h-screen min-h-screen w-full flex items-center justify-center overflow-hidden snap-start"
        >
            {/* Enhanced Dynamic Background with Parallax */}
            <div className="absolute inset-0 select-none pointer-events-none">
                <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url("${trek.imageUrl}")`,
                        scale: imageScale,
                        y: imageY
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                />
                {/* Enhanced gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
                
                {/* Vignette effect */}
                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.6)]" />
            </div>

            {/* Enhanced Content Card */}
            <motion.div
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-100px", amount: 0.3 }}
                transition={{ 
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1],
                    opacity: { duration: 0.6 }
                }}
                className="
                    relative z-20 
                    w-full max-w-6xl 
                    mx-4 md:mx-8
                    bg-gradient-to-br from-white/[0.15] to-white/[0.05] 
                    backdrop-blur-2xl
                    border border-white/20
                    rounded-3xl
                    overflow-hidden
                    shadow-[0_30px_80px_rgba(0,0,0,0.6)]
                    hover:shadow-[0_40px_100px_rgba(234,88,12,0.2)]
                    transition-shadow duration-700
                "
            >
                <div className="grid md:grid-cols-2">
                    {/* Left: Enhanced Image */}
                    <div className="relative h-80 md:h-auto min-h-[400px] overflow-hidden group">
                        <motion.div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url("${trek.imageUrl}")` }}
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        />
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-[#ea580c]/20"
                            whileHover={{ opacity: 0.5 }}
                            transition={{ duration: 0.5 }}
                        />

                        {/* Animated Location Badge */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="absolute top-6 left-6 bg-black/80 backdrop-blur-xl px-6 py-3.5 rounded-full border border-white/30 hover:border-[#ea580c]/50 transition-all duration-300 hover:scale-105"
                        >
                            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.15em] text-white">
                                <MapPin size={15} className="text-[#ea580c] animate-pulse" />
                                {trek.location}
                            </div>
                        </motion.div>

                        {/* Corner accent */}
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#ea580c]/20 to-transparent pointer-events-none" />
                    </div>

                    {/* Right: Enhanced Details */}
                    <div className="p-8 md:p-12 flex flex-col justify-center relative">
                        {/* Decorative line */}
                        <motion.div 
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute top-0 left-0 h-1 w-20 bg-gradient-to-r from-[#ea580c] to-transparent origin-left"
                        />

                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white leading-[1.1] font-bold tracking-tight"
                        >
                            {trek.name}
                        </motion.h2>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-stone-300 leading-relaxed mb-10 text-base md:text-lg opacity-90 font-light"
                        >
                            {trek.description}
                        </motion.p>

                        {/* Enhanced Stats Grid */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="grid grid-cols-2 gap-6 mb-12"
                        >
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-4 bg-gradient-to-br from-white/5 to-transparent p-4 rounded-2xl border border-white/10 hover:border-[#ea580c]/30 transition-all duration-300"
                            >
                                <div className="bg-[#ea580c]/20 p-3.5 rounded-xl border border-[#ea580c]/40 shadow-lg shadow-[#ea580c]/10">
                                    <Mountain size={22} className="text-[#ea580c]" />
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-1.5">Altitude</div>
                                    <div className="font-black text-white text-xl tabular-nums">{trek.altitude.toLocaleString()}m</div>
                                </div>
                            </motion.div>
                            
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-4 bg-gradient-to-br from-white/5 to-transparent p-4 rounded-2xl border border-white/10 hover:border-[#ea580c]/30 transition-all duration-300"
                            >
                                <div className="bg-[#ea580c]/20 p-3.5 rounded-xl border border-[#ea580c]/40 shadow-lg shadow-[#ea580c]/10">
                                    <Calendar size={22} className="text-[#ea580c]" />
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-1.5">Duration</div>
                                    <div className="font-black text-white text-xl">12-16d</div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Enhanced CTA Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="
                                group inline-flex items-center justify-between
                                bg-gradient-to-r from-white to-stone-100 text-black 
                                px-8 py-5 
                                rounded-2xl
                                font-bold uppercase tracking-[0.1em] text-sm
                                hover:from-[#ea580c] hover:to-[#dc2626] hover:text-white 
                                transition-all duration-500
                                shadow-[0_10px_40px_rgba(255,255,255,0.1)] 
                                hover:shadow-[0_20px_60px_rgba(234,88,12,0.4)]
                                border border-white/20 hover:border-[#ea580c]
                                relative overflow-hidden
                            "
                        >
                            <span className="relative z-10">View Itinerary</span>
                            <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500 relative z-10" />
                            
                            {/* Button shine effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.6 }}
                            />
                        </motion.button>
                    </div>
                </div>

                {/* Card bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ea580c]/50 to-transparent" />
            </motion.div>
        </motion.div>
    )
}