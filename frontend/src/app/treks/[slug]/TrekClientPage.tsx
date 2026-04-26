"use client"

import Image from "next/image"
import { ArrowLeft, ArrowRight, Clock3, Mountain, Sparkles, Trophy } from "lucide-react"
import Link from "next/link"
import React from "react"
import { motion } from "framer-motion"
import Navigation from "@/header-component/Navigation"
import FooterSection from "@/footer-components/FooterSection"

export interface Trek {
    id: string
    name: string
    slug: string
    image: string
    description: string
    longDescription: string[]
    altitude: number
    duration: string
    difficulty: string
    bestMonths: string[]
    highlights: string[]
    tips: string[]
    gallery: string[]
    itinerary: unknown
    estimatedCost: { budget: string; includes: string[] }
    permits: string[]
    region?: { name: string } | null
}

type TrekPageProps = {
  trek: Trek
}

type ItineraryDay = {
  day: number | string
  title: string
  description: string
  image?: string
}

function sectionEntryAnimation(index = 0) {
    return {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.55, delay: index * 0.08 },
        viewport: { once: true },
    }
}

function ensureItems(values: string[] | undefined, fallback: string[]): string[] {
    if (values && values.length > 0) return values
    return fallback
}


export default function TrekClientPage({ trek }: TrekPageProps) {
    const itinerary = Array.isArray(trek.itinerary) ? (trek.itinerary as ItineraryDay[]) : []
    const longDescription = Array.isArray(trek.longDescription) ? trek.longDescription : [trek.description]
    const highlights = Array.isArray(trek.highlights) ? trek.highlights : []
    const tips = Array.isArray(trek.tips) ? trek.tips : []
    const permits = Array.isArray(trek.permits) ? trek.permits : []
    const gallery = Array.isArray(trek.gallery) ? trek.gallery : []
    const regionName = trek.region?.name || "Nepal"
    const bestMonths = Array.isArray(trek.bestMonths) ? trek.bestMonths.join(", ") : "N/A"
    const estimatedBudget = trek.estimatedCost?.budget || "Contact for pricing"
    const includes = Array.isArray(trek.estimatedCost?.includes) ? trek.estimatedCost.includes : []
    
    const subtitle = longDescription[0] || trek.description

    return (
        <div className="bg-stone-50 text-primary font-[var(--text-font)] min-h-screen">
            <Navigation />

            <main>
                {/* Hero Section */}
                <section className="relative min-h-[72vh] overflow-hidden">
                    <div className="absolute inset-0">
                        <Image src={trek.image || "/placeholder.svg"} alt={trek.name} fill className="object-cover" priority />
                        <div className="absolute inset-0 bg-black/45" />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-black/20 to-black/40" />
                    </div>

                    <div className="relative container-max px-6 md:px-12 py-28 md:py-36 flex min-h-[72vh] flex-col justify-end">
                        <motion.div
                            {...sectionEntryAnimation(0)}
                            className="mb-7 flex flex-wrap items-center gap-3 text-white/90"
                        >
                            <Link
                                href="/treks"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.25em] transition-colors hover:bg-white/20"
                            >
                                <ArrowLeft size={14} />
                                Back to Treks
                            </Link>
                            <span className="text-[10px] uppercase tracking-[0.35em] text-white/70">Trek Detail</span>
                        </motion.div>

                        <motion.h1
                            {...sectionEntryAnimation(1)}
                            className="font-[var(--heading-font)] text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tighter"
                        >
                            {trek.name}
                        </motion.h1>

                        <motion.p
                            {...sectionEntryAnimation(2)}
                            className="mt-5 max-w-3xl text-base md:text-xl text-stone-200 leading-relaxed"
                        >
                            {subtitle}
                        </motion.p>
                    </div>
                </section>

                {/* Overview Section */}
                <section className="py-20 md:py-24 px-6 md:px-12">
                    <div className="container-max">
                        <motion.div {...sectionEntryAnimation(0)} className="mb-10">
                            <span className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">
                                Trek Overview
                            </span>
                            <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                                Discover <span className="italic font-normal">{trek.name}</span>
                            </h2>
                        </motion.div>

                        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
                            <motion.article
                                {...sectionEntryAnimation(1)}
                                className="lg:col-span-8 rounded-[2.5rem] border border-stone-200 bg-white p-7 md:p-10 shadow-sm"
                            >
                                {longDescription.map((p, i) => (
                                    <p key={i} className={cn("text-stone-700 text-base md:text-lg leading-relaxed", i > 0 && "mt-5 text-stone-600 text-sm md:text-base")}>
                                        {p}
                                    </p>
                                ))}
                                {longDescription.length === 0 && <p className="text-stone-500 italic">No description available.</p>}
                            </motion.article>

                            <motion.aside
                                {...sectionEntryAnimation(2)}
                                className="lg:col-span-4 rounded-[2.5rem] border border-stone-200 bg-white p-7 md:p-8 shadow-sm"
                            >
                                <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-secondary/70 mb-6">
                                    Key Characteristics
                                </h3>
                                <div className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <Clock3 size={18} className="text-secondary mt-1" />
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Duration</p>
                                            <p className="mt-1 text-lg font-semibold text-primary">{trek.duration || "Contact us"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Trophy size={18} className="text-secondary mt-1" />
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Difficulty</p>
                                            <p className="mt-1 text-lg font-semibold text-primary">{trek.difficulty || "Moderate"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Mountain size={18} className="text-secondary mt-1" />
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Max Altitude</p>
                                            <p className="mt-1 text-lg font-semibold text-primary">{trek.altitude ? `${trek.altitude.toLocaleString()}m` : "N/A"}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Region</p>
                                        <p className="mt-1 text-lg font-semibold text-primary">{regionName}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Best Months</p>
                                        <p className="mt-1 text-lg font-semibold text-primary">{bestMonths}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Estimated Budget</p>
                                        <p className="mt-1 text-lg font-semibold text-primary">{estimatedBudget}</p>
                                    </div>
                                </div>
                            </motion.aside>
                        </div>
                    </div>
                </section>

                {/* Highlights & Tips */}
                {(highlights.length > 0 || tips.length > 0) && (
                    <section className="py-20 md:py-24 px-6 md:px-12 bg-stone-100/60">
                        <div className="container-max">
                            <motion.div {...sectionEntryAnimation(0)} className="mb-10">
                                <span className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">Essential Info</span>
                                <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold leading-tight text-primary">
                                    Trek <span className="italic font-normal">Insights</span>
                                </h2>
                            </motion.div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {highlights.length > 0 && (
                                    <motion.article {...sectionEntryAnimation(1)} className="rounded-[2rem] border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
                                        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                                            <Sparkles size={22} />
                                        </div>
                                        <h3 className="font-[var(--heading-font)] text-2xl font-bold text-primary">Highlights</h3>
                                        <ul className="mt-4 space-y-2.5 text-sm text-stone-600">
                                            {highlights.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 leading-relaxed">
                                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.article>
                                )}
                                {tips.length > 0 && (
                                    <motion.article {...sectionEntryAnimation(2)} className="rounded-[2rem] border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
                                        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                                            <Sparkles size={22} />
                                        </div>
                                        <h3 className="font-[var(--heading-font)] text-2xl font-bold text-primary">Pro Tips</h3>
                                        <ul className="mt-4 space-y-2.5 text-sm text-stone-600">
                                            {tips.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 leading-relaxed">
                                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.article>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Gallery */}
                {gallery.length > 0 && (
                    <section className="py-20 md:py-24 px-6 md:px-12">
                        <div className="container-max">
                            <motion.div {...sectionEntryAnimation(0)} className="mb-10">
                                <span className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">Visual Story</span>
                                <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold leading-tight text-primary">
                                    {trek.name} <span className="italic font-normal">Gallery</span>
                                </h2>
                            </motion.div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {gallery.map((image, index) => (
                                    <motion.figure
                                        key={index}
                                        {...sectionEntryAnimation(index)}
                                        className="relative overflow-hidden rounded-[2.5rem] border border-stone-200 bg-white shadow-sm h-64 md:h-72"
                                    >
                                        <Image
                                            src={image || "/placeholder.svg"}
                                            alt={`${trek.name} visual ${index + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                                    </motion.figure>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Itinerary & Logistics */}
                <section className="py-20 md:py-24 px-6 md:px-12 bg-stone-100/60">
                    <div className="container-max">
                        <motion.div {...sectionEntryAnimation(0)} className="mb-10">
                            <span className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">In Depth</span>
                            <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold text-primary leading-tight">
                                Plan Your <span className="italic font-normal">Trek Journey</span>
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <motion.article {...sectionEntryAnimation(1)} className="rounded-[2rem] border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
                                <h3 className="font-[var(--heading-font)] text-2xl font-bold text-primary">Cost Includes</h3>
                                <ul className="mt-4 space-y-2.5 text-sm text-stone-600">
                                    {includes.length > 0 ? includes.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 leading-relaxed">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
                                            {item}
                                        </li>
                                    )) : (
                                        <li className="text-stone-500 italic">Detailed inclusions provided during booking.</li>
                                    )}
                                </ul>
                            </motion.article>

                            <motion.article {...sectionEntryAnimation(2)} className="rounded-[2rem] border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
                                <h3 className="font-[var(--heading-font)] text-2xl font-bold text-primary">Permits Required</h3>
                                <ul className="mt-4 space-y-2.5 text-sm text-stone-600">
                                    {permits.length > 0 ? permits.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 leading-relaxed">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
                                            {item}
                                        </li>
                                    )) : (
                                        <li className="text-stone-500 italic">Standard trekking permits required.</li>
                                    )}
                                </ul>
                            </motion.article>
                        </div>

                        {itinerary.length > 0 && (
                            <motion.article
                                {...sectionEntryAnimation(3)}
                                className="rounded-[2.5rem] border border-stone-200 bg-white p-7 md:p-10 shadow-sm"
                            >
                                <h3 className="font-[var(--heading-font)] text-3xl md:text-4xl font-bold text-primary mb-6">
                                    Day-by-Day Itinerary
                                </h3>
                                <div className="space-y-4">
                                    {itinerary.map((day, idx) => (
                                        <div key={idx} className="rounded-2xl border border-stone-200 p-5 md:p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="h-10 min-w-10 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center">
                                                    D{day.day}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-[var(--heading-font)] text-xl font-bold text-primary">{day.title}</h4>
                                                    <p className="mt-2 text-sm md:text-base text-stone-600 leading-relaxed">{day.description}</p>
                                                    {day.image && (
                                                        <div className="mt-4 relative h-48 md:h-64 rounded-xl overflow-hidden border border-stone-200">
                                                            <Image src={day.image} alt={day.title} fill className="object-cover" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.article>
                        )}
                    </div>
                </section>

                <section className="py-20 md:py-24 px-6 md:px-12">
                    <div className="container-max">
                        <motion.div
                            {...sectionEntryAnimation(0)}
                            className="rounded-[2.5rem] border border-stone-200 bg-white p-8 md:p-12 shadow-sm text-center"
                        >
                            <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold text-primary leading-tight">
                                Ready for <span className="italic font-normal">Adventure?</span>
                            </h2>
                            <p className="mt-4 text-stone-600 max-w-2xl mx-auto leading-relaxed mb-8">
                                Contact our experts to customize this trek or start your booking process.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-10 py-4 text-[11px] font-black uppercase tracking-[0.22em] text-white transition-all hover:bg-secondary"
                                >
                                    Book This Trek
                                    <ArrowRight size={15} />
                                </Link>
                                <Link
                                    href="/treks"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-primary px-10 py-4 text-[11px] font-black uppercase tracking-[0.22em] text-primary transition-all hover:bg-primary hover:text-white"
                                >
                                    More Expeditions
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <FooterSection />
        </div>
    )
}

import { cn } from "@/lib/utils"
