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
    const highlights = ensureItems(trek.highlights, [
        "Panoramic Himalayan viewpoints across varied terrain",
        "Authentic cultural interactions with local communities",
        "Balanced route planning with acclimatization in mind",
    ])
    const tips = ensureItems(trek.tips, [
        "Start days early for weather stability and clear views",
        "Layer clothing to adapt to altitude and temperature shifts",
        "Hydrate consistently and pace yourself for acclimatization",
    ])
    const permits = ensureItems(trek.permits, ["Permit details available during booking consultation"])
    const gallery = Array.isArray(trek.gallery) && trek.gallery.length > 0 ? trek.gallery.slice(0, 3) : [trek.image, trek.image, trek.image]
    const itineraryList = itinerary.length > 0
        ? itinerary
        : [{ day: 1, title: "Custom Itinerary", description: "Detailed day-wise route will be shared during consultation." }]
    const regionName = trek.region?.name || "Nepal"
    const bestMonths = Array.isArray(trek.bestMonths) && trek.bestMonths.length > 0 ? trek.bestMonths.join(", ") : "Spring, Autumn"
    const estimatedBudget = trek.estimatedCost?.budget || "Contact for quote"
    const includes = Array.isArray(trek.estimatedCost?.includes) ? trek.estimatedCost.includes : []
    const subtitle = longDescription[0] || trek.description
    const detailSections = [
        {
            title: "Trek Highlights",
            items: highlights,
        },
        {
            title: "Trail Tips",
            items: tips,
        },
    ]
    const heroImage = trek.image || "/placeholder.svg"

    return (
        <div className="bg-stone-50 text-primary font-[var(--text-font)] min-h-screen">
            <Navigation />

            <main>
                <section className="relative min-h-[72vh] overflow-hidden">
                    <div className="absolute inset-0">
                        <Image src={heroImage} alt={trek.name} fill className="object-cover" priority />
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
                            <p className="text-stone-700 text-base md:text-lg leading-relaxed">{longDescription[0]}</p>
                            {longDescription[1] && (
                                <p className="mt-5 text-stone-600 text-sm md:text-base leading-relaxed">{longDescription[1]}</p>
                            )}
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
                                        <p className="mt-1 text-lg font-semibold text-primary">{trek.duration || "N/A"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Trophy size={18} className="text-secondary mt-1" />
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Difficulty</p>
                                        <p className="mt-1 text-lg font-semibold text-primary">{trek.difficulty || "N/A"}</p>
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

                <section className="py-20 md:py-24 px-6 md:px-12 bg-stone-100/60">
                    <div className="container-max">
                        <motion.div {...sectionEntryAnimation(0)} className="mb-10">
                            <span className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">Highlights</span>
                            <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold leading-tight text-primary">
                                Why Travelers Choose <span className="italic font-normal">This Trek</span>
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {detailSections.map((section, index) => (
                                <motion.article
                                    key={section.title}
                                    {...sectionEntryAnimation(index)}
                                    className="rounded-[2rem] border border-stone-200 bg-white p-6 md:p-8 shadow-sm"
                                >
                                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                                        <Sparkles size={22} />
                                    </div>
                                    <h3 className="font-[var(--heading-font)] text-2xl font-bold text-primary">
                                        {section.title}
                                    </h3>
                                    <ul className="mt-4 space-y-2.5 text-sm text-stone-600">
                                        {section.items.map((item) => (
                                            <li key={item} className="flex items-start gap-3 leading-relaxed">
                                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>

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
                                    key={`${image}-${index}`}
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

                <section className="py-20 md:py-24 px-6 md:px-12 bg-stone-100/60">
                    <div className="container-max">
                        <motion.div {...sectionEntryAnimation(0)} className="mb-10">
                            <span className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">In Depth</span>
                            <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold text-primary leading-tight">
                                Plan Your <span className="italic font-normal">Trek Journey</span>
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <motion.article
                                {...sectionEntryAnimation(1)}
                                className="rounded-[2rem] border border-stone-200 bg-white p-6 md:p-8 shadow-sm"
                            >
                                <h3 className="font-[var(--heading-font)] text-2xl font-bold text-primary">Cost Includes</h3>
                                <ul className="mt-4 space-y-2.5 text-sm text-stone-600">
                                    {includes.length > 0 ? includes.map((item) => (
                                        <li key={item} className="flex items-start gap-3 leading-relaxed">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
                                            {item}
                                        </li>
                                    )) : (
                                        <li className="text-stone-500">Inclusions will be provided during booking consultation.</li>
                                    )}
                                </ul>
                            </motion.article>

                            <motion.article
                                {...sectionEntryAnimation(2)}
                                className="rounded-[2rem] border border-stone-200 bg-white p-6 md:p-8 shadow-sm"
                            >
                                <h3 className="font-[var(--heading-font)] text-2xl font-bold text-primary">Permits Required</h3>
                                <ul className="mt-4 space-y-2.5 text-sm text-stone-600">
                                    {permits.map((item) => (
                                        <li key={item} className="flex items-start gap-3 leading-relaxed">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.article>
                        </div>

                        <motion.article
                            {...sectionEntryAnimation(3)}
                            className="rounded-[2.5rem] border border-stone-200 bg-white p-7 md:p-10 shadow-sm"
                        >
                            <h3 className="font-[var(--heading-font)] text-3xl md:text-4xl font-bold text-primary mb-6">
                                Day-by-Day Itinerary
                            </h3>
                            <div className="space-y-4">
                                {itineraryList.map((day, idx) => (
                                    <div key={`${day.day}-${idx}`} className="rounded-2xl border border-stone-200 p-5 md:p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="h-10 min-w-10 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center">
                                                D{day.day}
                                            </div>
                                            <div>
                                                <h4 className="font-[var(--heading-font)] text-xl font-bold text-primary">{day.title}</h4>
                                                <p className="mt-2 text-sm md:text-base text-stone-600 leading-relaxed">{day.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.article>
                    </div>
                </section>

                <section className="py-20 md:py-24 px-6 md:px-12">
                    <div className="container-max">
                        <motion.div
                            {...sectionEntryAnimation(0)}
                            className="rounded-[2.5rem] border border-stone-200 bg-white p-8 md:p-12 shadow-sm"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                                <div>
                                    <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold text-primary leading-tight">
                                        Continue Exploring
                                    </h2>
                                    <p className="mt-4 text-stone-600 max-w-2xl leading-relaxed">
                                        Explore more legendary trails and compare routes by altitude, duration, and style.
                                    </p>
                                </div>

                                <Link
                                    href="/treks"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.22em] text-white transition-all hover:bg-secondary"
                                >
                                    All Treks
                                    <ArrowRight size={15} />
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
