"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { MapPin, Mountain, ArrowRight, Compass, Calendar, Signal } from "lucide-react"
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
    AnimatePresence,
    useMotionValueEvent
} from "framer-motion"
import Link from "next/link"

interface Region {
    id: string
    name: string
    slug: string
    image: string
    trailCount: number
    altitude?: number
    description: string
}

interface Trek {
    id: string
    name: string
    slug: string
    image: string
    description: string
    altitude: number
    duration: string
    difficulty: string
    bestMonths: string[]
    location?: string
    region?: Region | null
}

interface TrekInteractionProps {
    /**
     * Data Source & Flow:
     * 1. This component receives 'treks' and 'regions' as props from the server-side 'page.tsx'.
     * 2. 'page.tsx' fetches this data directly from the PostgreSQL database using Prisma.
     * 3. The data includes relations: Treks include their parent Region, and Regions include their child Treks.
     * 4. These arrays are combined into 'allSections' locally to drive the interactive scroll experience.
     * 
     * ALL DATA IS DYNAMICALLY FETCHED FROM THE DATABASE.
     */
    treks: any[]
    regions: any[]
}

// Altimeter with scroll-linked smooth number animation
function Altimeter({ altitude }: { altitude: MotionValue<number> }) {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        // Set initial value immediately to avoid 0 flickering
        setDisplayValue(Math.round(altitude.get()))
        
        const unsubscribe = altitude.on("change", (v) => {
            setDisplayValue(Math.round(v))
        })
        return () => unsubscribe()
    }, [altitude])

    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed bottom-12 right-6 md:bottom-16 md:right-16 z-50 bg-black/90 backdrop-blur-xl px-8 py-6 rounded-[2rem] border border-[var(--admin-accent)]/30 shadow-[0_30px_80px_rgba(234,88,12,0.15)] flex flex-col items-center min-w-[180px]"
        >
            <div className="text-[11px] uppercase tracking-[0.4em] text-[var(--admin-accent)] font-black mb-2 flex items-center gap-2">
                <Mountain size={12} /> Altimeter
            </div>
            
            <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-black font-mono tracking-tighter text-white tabular-nums">
                    {displayValue.toLocaleString()}
                </span>
                <span className="text-xl font-bold text-white/40 mb-1">m</span>
            </div>
            
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[var(--admin-accent)] to-transparent mt-4 opacity-50" />
        </motion.div>
    )
}

export default function TrekInteraction({ treks, regions }: TrekInteractionProps) {
    const [showAltimeter, setShowAltimeter] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Use altitude from database
    const allSections = useMemo(() => [
        ...regions.map(r => ({ 
            ...r, 
            type: 'region' as const, 
            altitude: r.altitude || 3500
        })),
        ...treks.map(t => ({ ...t, type: 'trek' as const }))
    ], [regions, treks])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        container: typeof window !== 'undefined' ? { current: document.querySelector('main') as HTMLElement } : undefined,
        offset: ["start start", "end end"]
    })

    // Build altitude keyframes for smooth interpolation
    const altitudeKeyframes = useMemo(() => {
        if (allSections.length === 0) return { inputs: [0, 1], outputs: [3500, 3500] }
        
        const inputs: number[] = []
        const outputs: number[] = []
        
        allSections.forEach((section, i) => {
            const progress = i / Math.max(allSections.length - 1, 1)
            inputs.push(progress)
            outputs.push(section.altitude || 3500)
        })
        
        if (inputs[0] !== 0) {
            inputs.unshift(0)
            outputs.unshift(outputs[0])
        }
        
        return { inputs, outputs }
    }, [allSections])

    const rawAltitude = useTransform(
        scrollYProgress,
        altitudeKeyframes.inputs,
        altitudeKeyframes.outputs
    )
    
    // Set initial value to first altitude to prevent starting at 0
    const smoothAltitude = useSpring(rawAltitude, {
        stiffness: 40, // Slightly slower for better stability on start
        damping: 25,
        mass: 1
    })

    // Force smoothAltitude to first section value on component mount
    useEffect(() => {
        if (allSections.length > 0) {
            smoothAltitude.set(allSections[0].altitude || 3500)
        }
    }, [allSections, smoothAltitude])

    // Control altimeter visibility more robustly
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        // v = 0 is start of Annapurna
        // v = 1 is end of Everest
        if (v >= -0.01 && v <= 1.01) {
            if (!showAltimeter) setShowAltimeter(true)
        } else {
            if (showAltimeter) setShowAltimeter(false)
        }
    })

    // Initial check on mount
    useEffect(() => {
        const v = scrollYProgress.get()
        if (v >= -0.01 && v <= 1.01) {
            setShowAltimeter(true)
        }
    }, [scrollYProgress])

    return (
        <>
            {/* Fixed Altimeter outside the scroll flow */}
            <AnimatePresence>
                {showAltimeter && <Altimeter altitude={smoothAltitude} />}
            </AnimatePresence>

            {/* Sections wrapper - no height constraints so children are direct snap targets */}
            <div ref={containerRef} className="relative bg-black">
                {allSections.map((section, index) => (
                    <SectionCard
                        key={section.id}
                        item={section}
                        index={index}
                        progress={scrollYProgress}
                        totalCards={allSections.length}
                    />
                ))}
            </div>
        </>
    )
}

function SectionCard({
    item,
    index,
    progress,
    totalCards
}: {
    item: any
    index: number
    progress: MotionValue<number>
    totalCards: number
}) {
    const isFirstCard = index === 0
    
    const start = index / totalCards
    const end = (index + 1) / totalCards
    const mid = (start + end) / 2
    
    // Animation keyframes
    const scale = useTransform(progress, 
        [start - 0.2, start, mid, end, end + 0.2], 
        [0.85, 1.02, 1, 1, 0.85]
    )
    
    const opacity = useTransform(progress, 
        [start - 0.2, start, end, end + 0.2], 
        [0.2, 1, 1, 0.2]
    )
    
    const bgScale = useTransform(progress, [start, end], [1.1, 1])
    
    // Apply spring physics
    const springScale = useSpring(scale, { stiffness: 120, damping: 25 })
    const springOpacity = useSpring(opacity, { stiffness: 120, damping: 25 })
    
    // First card special handling - stay at scale 1 if at very top
    const displayScale = isFirstCard ? useTransform(progress, [0, end], [1, 0.85]) : springScale
    const displayOpacity = isFirstCard ? useTransform(progress, [0, end], [1, 0.2]) : springOpacity

    return (
        <motion.section
            style={{ 
                scale: displayScale,
                opacity: displayOpacity,
                willChange: "transform, opacity"
            }}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden snap-start snap-always"
        >
            {/* Background with Parallax */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url("${item.image}")`,
                        scale: bgScale,
                        willChange: "transform"
                    }}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />
                <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,1)]" />
            </div>

            {/* Compact Aesthetic Card */}
            <div className="relative w-full max-w-5xl mx-4 md:mx-6 lg:mx-auto bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="grid lg:grid-cols-2">
                    <div className="relative h-64 lg:h-[480px] overflow-hidden group">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url("${item.image}")` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute top-6 left-6">
                            <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                                {item.type === 'region' ? <Compass className="text-[var(--admin-accent)] w-3 h-3" /> : <MapPin className="text-[var(--admin-accent)] w-3 h-3" />}
                                <span className="text-white text-[10px] uppercase font-black tracking-widest">
                                    {item.type === 'region' ? 'Himalayan Territory' : item.location || item.region?.name || 'Nepal'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 lg:p-12 flex flex-col justify-center">
                        <div className="w-14 h-1 bg-[var(--admin-accent)] mb-6 rounded-full" />
                        <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 tracking-tighter leading-[0.95]">
                            {item.name}
                        </h2>
                        {item.type === 'region' && (
                            <p className="text-[var(--admin-accent)] text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                <span className="text-3xl">{item.trailCount}</span> Premier Trails
                            </p>
                        )}
                        <p className="text-stone-300 text-base lg:text-lg leading-relaxed mb-8 font-medium max-w-sm line-clamp-3">
                            {item.description}
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-8 pt-6 border-t border-white/10">
                            <div>
                                <div className="text-[10px] uppercase font-black text-white/40 tracking-widest mb-1 flex items-center gap-1">
                                   <Signal size={10} className="text-[var(--admin-accent)]" /> Difficulty
                                </div>
                                <div className="text-xl lg:text-2xl font-black text-white">
                                    {item.type === 'region' ? 'Varied' : item.difficulty}
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] uppercase font-black text-white/40 tracking-widest mb-1 flex items-center gap-1">
                                   <Calendar size={10} className="text-[var(--admin-accent)]" /> Best Season
                                </div>
                                <div className="text-xl lg:text-2xl font-black text-white truncate">
                                    {item.type === 'region' ? 'Spring/Autumn' : (item.bestMonths?.slice(0, 2).join(', ') || 'Spring')}
                                </div>
                            </div>
                        </div>

                        <Link href={item.type === 'region' ? `/treks?region=${item.slug}` : `/treks/${item.slug}`}>
                            <button className="w-full bg-white text-black px-8 py-5 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-between hover:bg-[var(--admin-accent)] hover:text-white transition-all duration-300 shadow-xl">
                                <span>{item.type === 'region' ? 'Explore Region' : 'View Itinerary'}</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}