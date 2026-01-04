"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { MapPin, Mountain, ArrowRight, Compass } from "lucide-react"
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
    AnimatePresence,
    animate
} from "framer-motion"
import Link from "next/link"

interface Region {
    id: string
    name: string
    slug: string
    image: string
    trailCount: number
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
    location?: string
    region?: Region | null
}

interface TrekInteractionProps {
    treks: any[]
    regions: any[]
}

// Approximate basecamp/max altitudes for key regions if not provided
const getRegionAltitude = (slug: string) => {
    const altitudes: Record<string, number> = {
        'annapurna': 4130, // ABC
        'everest': 5364,   // EBC
        'langtang': 3870,  // Kyanjin Gompa
        'manaslu': 5160,   // Larkya La
        'mustang': 3840,   // Lo Manthang
        'dolpo': 3640,     // Phoksundo
    }
    return altitudes[slug] || 3500
}

function NumberCounter({ value }: { value: number }) {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const prevValue = useRef(value);

    // Whenever value changes, we animate to it
    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        // Animate from previous value to new value
        const controls = animate(prevValue.current, value, {
            duration: 1.2,
            ease: "circOut",
            onUpdate(v) {
                node.textContent = Math.round(v).toLocaleString();
            },
        });
        
        prevValue.current = value;
        return () => controls.stop();
    }, [value]);

    return <span ref={nodeRef} className="text-5xl md:text-6xl font-black font-mono tracking-tighter text-white tabular-nums">{value.toLocaleString()}</span>;
}

// Altimeter that receives the specific target altitude of the current section
function Altimeter({ altitude }: { altitude: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.8 }}
            className="fixed bottom-12 right-6 md:bottom-16 md:right-16 z-50 bg-black/90 backdrop-blur-xl px-8 py-6 rounded-[2rem] border border-[#ea580c]/30 shadow-[0_30px_80px_rgba(234,88,12,0.15)] flex flex-col items-center min-w-[180px]"
        >
            <div className="text-[11px] uppercase tracking-[0.4em] text-[#ea580c] font-black mb-2 flex items-center gap-2">
                <Mountain size={12} /> Altimeter
            </div>
            
            <div className="flex items-baseline gap-2">
                <NumberCounter value={altitude} />
                <span className="text-xl font-bold text-white/40 mb-1">m</span>
            </div>
            
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#ea580c] to-transparent mt-4 opacity-50" />
        </motion.div>
    )
}

export default function TrekInteraction({ treks, regions }: TrekInteractionProps) {
    const [activeSection, setActiveSection] = useState(0)
    const [showAltimeter, setShowAltimeter] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const allSections = useMemo(() => [
        ...regions.map(r => ({ 
            ...r, 
            type: 'region' as const, 
            altitude: getRegionAltitude(r.slug) 
        })),
        ...treks.map(t => ({ ...t, type: 'trek' as const }))
    ], [regions, treks])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        container: typeof window !== 'undefined' ? { current: document.querySelector('main') as HTMLElement } : undefined,
        offset: ["start start", "end end"]
    })

    // Update active section based on scroll
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (v) => {
            if (v > 0.02 && !showAltimeter) setShowAltimeter(true)
            if (v <= 0.02 && showAltimeter) setShowAltimeter(false)
            
            // Calculate active index more precisely
            const total = allSections.length
            const index = Math.min(
                Math.floor(v * total + 0.1), 
                total - 1
            )
            
            if (index !== activeSection && index >= 0) {
                setActiveSection(index)
            }
        })
        return () => unsubscribe()
    }, [scrollYProgress, activeSection, showAltimeter, allSections.length])

    return (
        <div ref={containerRef} className="relative bg-black">
            <AnimatePresence>
                {showAltimeter && (
                    <Altimeter altitude={allSections[activeSection]?.altitude || 0} />
                )}
            </AnimatePresence>

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
    
    // Updated Visibility Logic:
    // We want a very dramatic "faded -> pop -> faded" effect
    // Fades in LATER and fades out EARLIER to create separation
    const cardProgress = useTransform(progress, [start - 0.25, start, end, end + 0.25], [0, 1, 1, 0])
    
    // Scale Logic:
    // Starts small (0.85), Pops up to 1.05 at entrance, settles to 1.0, shrinks to 0.85
    const scale = useTransform(progress, 
        [start - 0.2, start, (start+end)/2, end, end + 0.2], 
        [0.85, 1.05, 1, 0.95, 0.85]
    )
    
    // Opacity Logic:
    // Distinct fade in/out constraints to ensure inactive cards are truly faded
    const opacity = useTransform(progress, 
        [start - 0.25, start - 0.05, end + 0.05, end + 0.25], 
        [0, 1, 1, 0]
    )
    
    const bgScale = useTransform(progress, [start, end], [1.1, 1])
    
    // Initial state handling for first card
    const displayScale = isFirstCard ? useTransform(progress, [0, end], [1, 0.9]) : scale
    const displayOpacity = isFirstCard ? useTransform(progress, [0, end], [1, 0]) : opacity

    return (
        <motion.div
            style={{ 
                scale: displayScale,
                opacity: displayOpacity,
                willChange: "transform, opacity",
                zIndex: 10
            }}
            className="relative h-screen min-h-screen w-full flex items-center justify-center overflow-hidden snap-start"
        >
            {/* Richer Background */}
            <div className="absolute inset-0 pointer-events-none -z-10">
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
                {/* Vignette */}
                <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />
            </div>

            {/* Smaller, More Aesthetic Card */}
            <motion.div
                className="relative w-full max-w-5xl mx-auto bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl"
                style={{ willChange: "transform" }}
            >
                <div className="grid lg:grid-cols-2">
                    <div className="relative h-64 lg:h-[500px] overflow-hidden group">
                        <motion.div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url("${item.image}")` }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 1.5 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute top-6 left-6">
                            <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                                {item.type === 'region' ? <Compass className="text-[#ea580c] w-3 h-3" /> : <MapPin className="text-[#ea580c] w-3 h-3" />}
                                <span className="text-white text-[10px] uppercase font-black tracking-widest">
                                    {item.type === 'region' ? 'Himalayan Territory' : item.location || item.region?.name || 'Nepal'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="w-16 h-1 bg-[#ea580c] mb-8 rounded-full" />
                        <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 tracking-tighter leading-[0.95]">
                            {item.name}
                        </h2>
                        {item.type === 'region' && (
                            <p className="text-[#ea580c] text-lg font-black uppercase tracking-widest mb-8 flex items-center gap-2">
                                <span className="text-3xl">{item.trailCount}</span> Premier Trails
                            </p>
                        )}
                        <p className="text-stone-300 text-base lg:text-lg leading-relaxed mb-10 font-medium max-w-sm line-clamp-4">
                            {item.description}
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-10 pt-8 border-t border-white/10">
                            <div>
                                <div className="text-[10px] uppercase font-black text-white/40 tracking-widest mb-1">
                                    {item.type === 'region' ? 'Landscape' : 'Max Elevation'}
                                </div>
                                <div className="text-xl lg:text-2xl font-black text-white">
                                    {item.type === 'region' ? 'Wilderness' : `${item.altitude}m`}
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] uppercase font-black text-white/40 tracking-widest mb-1">
                                    {item.type === 'region' ? 'Difficulty' : 'Duration'}
                                </div>
                                <div className="text-xl lg:text-2xl font-black text-white">
                                    {item.type === 'region' ? 'Varied' : item.duration}
                                </div>
                            </div>
                        </div>

                        <Link href={item.type === 'region' ? `/treks?region=${item.slug}` : `/treks/${item.slug}`}>
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "#ea580c", color: "white" }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-white text-black px-8 py-5 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-between transition-all duration-300 shadow-xl"
                            >
                                <span>{item.type === 'region' ? 'Explore Region' : 'View Itinerary'}</span>
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}