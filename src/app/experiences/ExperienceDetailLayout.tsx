"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Mountain, Trophy } from "lucide-react";
import Link from "next/link";
import Navigation from "@/header-component/Navigation";
import FooterSection from "@/footer-components/FooterSection";

interface Experience {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    accent: string;
    duration: string;
    difficulty: string;
    maxAltitude: string;
}

const ExperienceDetailLayout = ({ experience }: { experience: Experience }) => {
    return (
        <div className="bg-[#050505] text-white font-[var(--text-font)] min-h-screen">
            <Navigation />

            <main>
                {/* Cinematic Hero */}
                <section className="relative h-screen w-full overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={experience.image}
                            alt={experience.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
                    </motion.div>

                    {/* Hero Content */}
                    <div className="absolute inset-0 flex flex-col justify-end pb-24 px-6 md:px-12 lg:px-24">
                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center gap-4 mb-6"
                            >
                                <Link
                                    href="/experiences"
                                    className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                                >
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    <span className="text-xs uppercase tracking-widest font-bold">Back to Experiences</span>
                                </Link>
                                <span className="h-px w-12 bg-white/20" />
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 1 }}
                                className="font-[var(--heading-font)] text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-6"
                            >
                                {experience.title.split(' ').map((word, i) => (
                                    <span key={i} className={i % 2 !== 0 ? "text-[var(--secondary)] italic font-light block" : "block"}>
                                        {word}
                                    </span>
                                ))}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 1 }}
                                className="text-xl md:text-2xl text-white/70 font-light max-w-2xl"
                            >
                                {experience.subtitle}
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Main Content */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="space-y-8"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="h-1 w-12 bg-[var(--accent)]" />
                                    <h2 className="text-sm uppercase tracking-[0.5em] font-bold text-[var(--accent)]">Overview</h2>
                                </div>
                                <p className="text-xl md:text-2xl font-light leading-relaxed text-white/90">
                                    {experience.description}
                                </p>

                                <div className="grid grid-cols-2 gap-8 pt-12">
                                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                        <h3 className="text-white/40 text-xs uppercase tracking-widest font-bold mb-4">Highlights</h3>
                                        <ul className="space-y-4">
                                            {["Breathtaking Views", "Exclusive Journey", "Local Cultural Insights"].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                                        <h3 className="text-white/40 text-xs uppercase tracking-widest font-bold mb-4">What&apos;s Included</h3>
                                        <ul className="space-y-4">
                                            {["Professional Guide", "High-End Transport", "Refreshments"].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar Stats */}
                        <div className="lg:col-span-5">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="sticky top-32 p-10 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-xl shadow-2xl"
                            >
                                <div className="space-y-10">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-[var(--accent)]">
                                            <Clock size={24} />
                                        </div>
                                        <div>
                                            <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Duration</span>
                                            <p className="text-xl font-bold">{experience.duration}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-[var(--accent)]">
                                            <Trophy size={24} />
                                        </div>
                                        <div>
                                            <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Difficulty</span>
                                            <p className="text-xl font-bold">{experience.difficulty}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-[var(--accent)]">
                                            <Mountain size={24} />
                                        </div>
                                        <div>
                                            <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Max Altitude</span>
                                            <p className="text-xl font-bold">{experience.maxAltitude}</p>
                                        </div>
                                    </div>

                                    <button className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-[var(--accent)] hover:text-white transition-all duration-500 transform hover:scale-[1.02]">
                                        Book this Experience
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <FooterSection />
        </div>
    );
};

export default ExperienceDetailLayout;
