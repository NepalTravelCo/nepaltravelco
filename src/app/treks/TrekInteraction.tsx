"use client"

import { useEffect, useRef, useState } from "react"
import { Trek, treksData } from "@/data/Treks"
import { MapPin, Calendar, Users, Mountain, ArrowRight } from "lucide-react"
import Link from "next/link"
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
    animate
} from "framer-motion"

// --- Types ---
interface TrekSection {
    id: number
    name: string
    altitude: number
    description: string
    imageUrl: string
    location: string
    fullTrek: Trek
}

const trekSections: TrekSection[] = treksData.map((trek, index) => ({
    id: index + 1,
    name: trek.name,
    altitude: trek.altitude,
    description: trek.description,
    imageUrl: trek.image,
    location: trek.slug.replace(/-/g, " "),
    fullTrek: trek,
}))

// --- Altitude Ruler Component ---
function AltitudeRuler({ currentAltitude }: { currentAltitude: number }) {
    // We'll create a visual "ruler" that scrolls based on altitude.
    // Max altitude in typical treks ~5500m (EBC/Annapurna), some high passes ~6000m.
    // Let's create a scale from 0 to 6000.

    const springAltitude = useSpring(currentAltitude, {
        stiffness: 60,
        damping: 20,
        mass: 0.5
    })

    const displayValue = useTransform(springAltitude, (v) => Math.round(v).toLocaleString())

    // Transform altitude to Y position (scrolling the ruler)
    // 1 meter = 0.5px (adjust scaling factor)
    // We want the current altitude to be centered.
    const y = useTransform(springAltitude, (v) => -v * 0.2)

    useEffect(() => {
        springAltitude.set(currentAltitude)
    }, [currentAltitude, springAltitude])

    return (
        <div className="fixed left-0 top-0 bottom-0 w-24 md:w-32 z-40 pointer-events-none hidden lg:flex flex-col justify-center items-end pr-4 mix-blend-difference text-white">
            <div className="relative h-64 overflow-hidden w-full border-r border-white/30">
                {/* Ruler Ticks */}
                <motion.div
                    style={{ y }}
                    className="absolute top-1/2 right-0 w-full"
                >
                    {Array.from({ length: 70 }).map((_, i) => {
                        const tickAlt = i * 100; // Tick every 100m
                        const isMajor = tickAlt % 1000 === 0;
                        const isMedium = tickAlt % 500 === 0;

                        return (
                            <div
                                key={i}
                                className="absolute right-0 flex items-center justify-end gap-2"
                                style={{
                                    bottom: `${tickAlt * 0.2}px`, // Match the scaling factor above
                                    height: '1px'
                                }}
                            >
                                {isMajor && (
                                    <span className="text-[10px] font-mono opacity-50 mr-1">{tickAlt}</span>
                                )}
                                <div
                                    className={`bg-white/80 ${isMajor ? 'w-6 h-[2px]' : isMedium ? 'w-4 h-[1px]' : 'w-2 h-[1px] opacity-50'}`}
                                />
                            </div>
                        )
                    })}
                </motion.div>

                {/* Current Indicator */}
                <div className="absolute top-1/2 right-0 w-8 h-[2px] bg-secondary shadow-[0_0_10px_rgba(255,200,0,0.8)] z-10 translate-x-[1px]" />
            </div>

            {/* Number Display */}
            <div className="mt-2 text-right">
                <div className="font-[var(--heading-font)] text-4xl font-bold tracking-tighter">
                    <motion.span>{displayValue}</motion.span>
                    <span className="text-base text-white/50 ml-1">m</span>
                </div>
            </div>
        </div>
    )
}

export default function TrekInteraction() {
    const [activeSection, setActiveSection] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Detect active section based on scroll progress or intersection
    // Since we are mapping multiple full-screen sections, simple intersection observer is often best
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const handleScroll = () => {
            // Find the section closest to center
            let closestIndex = 0
            let maxIntersectionRatio = 0

            sectionRefs.current.forEach((section, index) => {
                if (!section) return
                const rect = section.getBoundingClientRect()

                // Calculate intersection ratio roughly
                const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
                const ratio = Math.max(0, visibleHeight / window.innerHeight)

                if (ratio > maxIntersectionRatio && ratio > 0.3) {
                    maxIntersectionRatio = ratio
                    closestIndex = index
                }
            })

            setActiveSection(closestIndex)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div ref={containerRef} className="relative">

            <AltitudeRuler currentAltitude={trekSections[activeSection]?.altitude || 0} />

            {trekSections.map((trek, index) => (
                <TrekCard
                    key={trek.id}
                    trek={trek}
                    index={index}
                    isActive={activeSection === index}
                    setRef={(el) => (sectionRefs.current[index] = el)}
                />
            ))}
        </div>
    )
}

function TrekCard({
    trek,
    index,
    isActive,
    setRef
}: {
    trek: TrekSection;
    index: number;
    isActive: boolean;
    setRef: (el: HTMLDivElement | null) => void;
}) {
    return (
        <div
            ref={setRef}
            className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden sticky top-0"
        >
            {/* Dynamic Background */}
            <div className="absolute inset-0 select-none pointer-events-none">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out grayscale-[20%] brightness-[0.4]"
                    style={{
                        backgroundImage: `url("${trek.imageUrl}")`,
                        transform: isActive ? 'scale(1.1)' : 'scale(1)'
                    }}
                />
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
            </div>

            {/* Content Content - "Floating" Card Design */}
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="
                relative z-20 
                w-full max-w-4xl 
                mx-4
                bg-white/5 backdrop-blur-xl
                border border-white/10
                rounded-3xl
                overflow-hidden
                shadow-[0_20px_60px_rgba(0,0,0,0.5)]
            "
            >
                <div className="grid md:grid-cols-2">
                    {/* Left: Image/Overview */}
                    <div className="relative h-64 md:h-auto min-h-[300px]">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                            style={{ backgroundImage: `url("${trek.imageUrl}")` }}
                        />
                        <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors duration-500" />

                        <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white">
                                <MapPin size={14} className="text-secondary" />
                                {trek.location}
                            </div>
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <h2 className="font-[var(--heading-font)] text-4xl mb-4 text-white leading-tight">
                            {trek.name}
                        </h2>
                        <p className="text-stone-300 font-[var(--text-font)] leading-relaxed mb-8 text-sm md:text-base opacity-90">
                            {trek.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/10 p-2 rounded-lg"><Mountain size={18} className="text-secondary" /></div>
                                <div>
                                    <div className="text-[10px] uppercase tracking-wider text-white/50">Alt</div>
                                    <div className="font-semibold text-white">{trek.altitude.toLocaleString()}m</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-white/10 p-2 rounded-lg"><Calendar size={18} className="text-secondary" /></div>
                                <div>
                                    <div className="text-[10px] uppercase tracking-wider text-white/50">Days</div>
                                    <div className="font-semibold text-white">12-16</div>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={`/treks/${trek.fullTrek.slug}`}
                            className="
                            group inline-flex items-center justify-between
                            bg-white text-black 
                            px-6 py-4 
                            rounded-xl
                            font-bold uppercase tracking-wider text-xs
                            hover:bg-secondary hover:text-white 
                            transition-all duration-300
                        "
                        >
                            <span>View Itinerary</span>
                            <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
