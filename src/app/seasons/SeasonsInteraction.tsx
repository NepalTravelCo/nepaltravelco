"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { Calendar, ArrowRight, Sun, CloudRain, Leaf, Snowflake, Sparkles } from "lucide-react"
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
    AnimatePresence,
} from "framer-motion"
import Link from "next/link"
import { seasonsData, Season } from "../../data/Seasons"

export default function SeasonsInteraction() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        container: typeof window !== 'undefined' ? { current: document.querySelector('main') as HTMLElement } : undefined,
        offset: ["start start", "end end"]
    })

    return (
        <div ref={containerRef} className="relative bg-black">
            {seasonsData.map((season, index) => (
                <SeasonSection
                    key={season.slug}
                    season={season}
                    index={index}
                    progress={scrollYProgress}
                    totalCards={seasonsData.length}
                />
            ))}
        </div>
    )
}

function SeasonSection({
    season,
    index,
    progress,
    totalCards
}: {
    season: Season
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

    // First card special handling
    const firstCardScale = useTransform(progress, [0, end], [1, 0.85]);
    const firstCardOpacity = useTransform(progress, [0, end], [1, 0.2]);

    const displayScale = isFirstCard ? firstCardScale : springScale;
    const displayOpacity = isFirstCard ? firstCardOpacity : springOpacity;

    const getIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case 'spring': return <Leaf className="text-[#ea580c] w-3 h-3" />
            case 'summer': return <CloudRain className="text-[#ea580c] w-3 h-3" />
            case 'autumn': return <Sun className="text-[#ea580c] w-3 h-3" />
            case 'winter': return <Snowflake className="text-[#ea580c] w-3 h-3" />
            case 'festivals': return <Sparkles className="text-[#ea580c] w-3 h-3" />
            default: return <Calendar className="text-[#ea580c] w-3 h-3" />
        }
    }

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
                        backgroundImage: `url("${season.image}")`,
                        scale: bgScale,
                        willChange: "transform"
                    }}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />
                <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,1)]" />
            </div>

            {/* Compact Aesthetic Card */}
            <div className="relative w-auto max-w-5xl mx-4 md:mx-6 lg:mx-auto bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="grid lg:grid-cols-2">
                    <div className="relative h-64 lg:h-full overflow-hidden group">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url("${season.image}")` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute top-6 left-6">
                            <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                                {getIcon(season.name)}
                                <span className="text-white text-[10px] uppercase font-black tracking-widest">
                                    {season.name} Experience
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 lg:p-12 flex flex-col justify-center">
                        <div className="w-14 h-1 bg-[#ea580c] mb-6 rounded-full" />
                        <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 tracking-tighter leading-[0.95]">
                            {season.name}
                        </h2>

                        <p className="text-stone-300 text-base lg:text-lg leading-relaxed mb-8 font-medium max-w-sm line-clamp-3">
                            {season.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pt-6 border-t border-white/10">
                            <div className="md:col-span-2">
                                <div className="text-[10px] uppercase font-black text-white/40 tracking-widest mb-2 flex items-center gap-1">
                                    <Sparkles size={10} className="text-[#ea580c]" /> Highlights
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {season.highlights.map((h, i) => (
                                        <span key={i} className="text-xs font-bold text-white bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                            {h}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="md:col-span-1">
                                <div className="text-[10px] uppercase font-black text-white/40 tracking-widest mb-1 flex items-center gap-1">
                                    <Calendar size={10} className="text-[#ea580c]" /> Best Months
                                </div>
                                <div className="text-xl lg:text-2xl font-black text-white">
                                    {season.bestMonths.join(', ')}
                                </div>
                            </div>
                        </div>

                        <Link href={`/seasons/${season.slug}`}>
                            <button className="w-full bg-white text-black px-8 py-5 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-between hover:bg-[#ea580c] hover:text-white transition-all duration-300 shadow-xl">
                                <span>Discover {season.name}</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}
