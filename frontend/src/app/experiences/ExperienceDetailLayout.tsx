"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock3, Mountain, Sparkles, Trophy } from "lucide-react";
import Link from "next/link";
import Navigation from "@/header-component/Navigation";
import FooterSection from "@/footer-components/FooterSection";

interface Experience {
    slug: string;
    id?: string;
    title?: string;
    name?: string;
    subtitle?: string;
    description?: string;
    longDescription?: string[];
    highlights?: string[];
    tips?: string[];
    gallery?: string[];
    image?: string;
    accent?: string;
    duration?: string;
    difficulty?: string;
    maxAltitude?: string;
}

function sectionEntryAnimation(index = 0) {
    return {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.55, delay: index * 0.08 },
        viewport: { once: true },
    };
}

function ensureItems(values: string[] | undefined, fallback: string[]): string[] {
    if (values && values.length > 0) return values;
    return fallback;
}

const ExperienceDetailLayout = ({ experience }: { experience: Experience }) => {
    const title = experience.title || experience.name || "Untitled Experience";
    const subtitle = experience.subtitle || experience.description || "Explore curated travel experiences across Nepal.";
    const description = experience.description || "This experience combines scenic routes, local stories, and flexible planning.";
    const heroImage = experience.image || "/placeholder.svg";
    const overviewParagraphs =
        experience.longDescription && experience.longDescription.length > 0
            ? experience.longDescription
            : [description];

    const highlights = ensureItems(experience.highlights, [
        "Scenic routes with immersive viewpoints",
        "Flexible itinerary designed for comfort",
        "Cultural touchpoints led by local experts",
    ]);

    const tips = ensureItems(experience.tips, [
        "Start early for the best visibility and weather windows.",
        "Keep a light layer for changing altitude temperatures.",
        "Carry essentials and keep your itinerary adaptive.",
    ]);

    const detailSections = [
        {
            title: "Experience Highlights",
            items: highlights,
        },
        {
            title: "Travel Tips",
            items: tips,
        },
    ];

    const galleryImages =
        experience.gallery && experience.gallery.length > 0
            ? experience.gallery.slice(0, 3)
            : [heroImage, heroImage, heroImage];

    return (
        <div className="bg-stone-50 text-primary font-[var(--text-font)] min-h-screen">
            <Navigation />

            <main>
                <section className="relative min-h-[72vh] overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src={heroImage}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/45" />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-black/20 to-black/40" />
                    </div>

                    <div className="relative container-max px-6 md:px-12 py-28 md:py-36 flex min-h-[72vh] flex-col justify-end">
                        <motion.div
                            {...sectionEntryAnimation(0)}
                            className="mb-7 flex flex-wrap items-center gap-3 text-white/90"
                        >
                            <Link
                                href="/experiences"
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.25em] transition-colors hover:bg-white/20"
                            >
                                <ArrowLeft size={14} />
                                Back to Experiences
                            </Link>
                            <span className="text-[10px] uppercase tracking-[0.35em] text-white/70">Experience Detail</span>
                        </motion.div>

                        <motion.h1
                            {...sectionEntryAnimation(1)}
                            className="font-[var(--heading-font)] text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tighter"
                        >
                            {title}
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
                                Experience Overview
                            </span>
                            <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                                Discover <span className="italic font-normal">{title}</span>
                            </h2>
                        </motion.div>

                        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
                            <motion.article
                                {...sectionEntryAnimation(1)}
                                className="lg:col-span-8 rounded-[2.5rem] border border-stone-200 bg-white p-7 md:p-10 shadow-sm"
                            >
                                <p className="text-stone-700 text-base md:text-lg leading-relaxed">{overviewParagraphs[0]}</p>
                                {overviewParagraphs[1] && (
                                    <p className="mt-5 text-stone-600 text-sm md:text-base leading-relaxed">
                                        {overviewParagraphs[1]}
                                    </p>
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
                                            <p className="mt-1 text-lg font-semibold text-primary">{experience.duration || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Trophy size={18} className="text-secondary mt-1" />
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Difficulty</p>
                                            <p className="mt-1 text-lg font-semibold text-primary">{experience.difficulty || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Mountain size={18} className="text-secondary mt-1" />
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Max Altitude</p>
                                            <p className="mt-1 text-lg font-semibold text-primary">{experience.maxAltitude || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.aside>
                        </div>
                    </div>
                </section>

                <section className="py-20 md:py-24 px-6 md:px-12 bg-stone-100/60">
                    <div className="container-max">
                        <motion.div {...sectionEntryAnimation(0)} className="mb-10">
                            <span className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">
                                Highlights
                            </span>
                            <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold text-primary leading-tight">
                                Why Travelers Choose <span className="italic font-normal">This Experience</span>
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
                            <span className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">
                                Visual Story
                            </span>
                            <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold text-primary leading-tight">
                                {title} <span className="italic font-normal">Gallery</span>
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {galleryImages.map((image, index) => (
                                <motion.figure
                                    key={`${image}-${index}`}
                                    {...sectionEntryAnimation(index)}
                                    className="relative overflow-hidden rounded-[2.5rem] border border-stone-200 bg-white shadow-sm h-64 md:h-72"
                                >
                                    <Image
                                        src={image}
                                        alt={`${title} visual ${index + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                                </motion.figure>
                            ))}
                        </div>
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
                                        Discover more curated experiences and build your ideal Nepal journey.
                                    </p>
                                </div>

                                <Link
                                    href="/experiences"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.22em] text-white transition-all hover:bg-secondary"
                                >
                                    All Experiences
                                    <ArrowRight size={15} />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <FooterSection />
        </div>
    );
};

export default ExperienceDetailLayout;
