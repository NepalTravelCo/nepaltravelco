"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin, CheckCircle2, Info, Wind } from "lucide-react";
import Link from "next/link";
import Navigation from "@/header-component/Navigation";
import FooterSection from "@/footer-components/FooterSection";

interface DetailItem {
    slug: string;
    title: string;
    description: string;
    image: string;
    location?: string;
    highlights: string[];
    bestTime?: string;
    altitude?: string;
    tag?: string;
}

const GuideDetailLayout = ({ item, backLink, backText }: { item: DetailItem, backLink: string, backText: string }) => {
    return (
        <div className="bg-stone-50 text-stone-900 font-[var(--text-font)] min-h-screen">
            <Navigation />

            <main>
                {/* Premium Hero Section */}
                <section className="relative h-[70vh] w-full overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-transparent to-transparent" />
                    </motion.div>

                    {/* Hero Content */}
                    <div className="absolute inset-0 flex flex-col justify-end pb-12 px-6 md:px-12 lg:px-24">
                        <div className="container-max">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mb-6"
                            >
                                <Link
                                    href={backLink}
                                    className="group inline-flex items-center gap-2 text-white hover:text-secondary transition-colors"
                                >
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    <span className="text-xs uppercase tracking-widest font-bold">Back to {backText}</span>
                                </Link>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 1 }}
                                className="font-[var(--heading-font)] text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter"
                            >
                                {item.title.split(' ').map((word, i) => (
                                    <span key={i} className={i % 2 !== 0 ? "text-secondary italic font-light" : ""}>
                                        {word}{" "}
                                    </span>
                                ))}
                            </motion.h1>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-24 px-6 md:px-12 lg:px-24 bg-stone-50/30">
                    <div className="container-max">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
                            {/* Main Content */}
                            <div className="lg:col-span-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="space-y-24"
                                >
                                    {/* Description Header */}
                                    <div className="space-y-10">
                                        <div className="flex items-center gap-4">
                                            <div className="h-4 w-[2px] bg-secondary/40" />
                                            <h2 className="text-[10px] uppercase tracking-[0.6em] font-black text-secondary/60">The Narrative</h2>
                                        </div>
                                        <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-[1.5] text-stone-900 font-[var(--heading-font)] tracking-tight max-w-4xl">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Bento Grid Highlights */}
                                    <div className="space-y-12">
                                        <h3 className="text-sm uppercase tracking-widest font-bold text-stone-400">Journey Highlights</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {item.highlights.map((highlight, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    whileHover={{ y: -5 }}
                                                    className={`p-8 rounded-[2rem] bg-white border border-stone-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.05)] group transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] ${
                                                        i === 0 ? "md:col-span-2 md:row-span-1" : ""
                                                    }`}
                                                >
                                                    <div className="flex flex-col h-full justify-between gap-6">
                                                        <span className="text-4xl font-[var(--heading-font)] text-secondary/10 font-bold italic group-hover:text-secondary/20 transition-colors">
                                                            {String(i + 1).padStart(2, '0')}
                                                        </span>
                                                        <p className="text-lg text-stone-700 leading-relaxed font-light">
                                                            {highlight}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Elite Details Card */}
                                    <div className="relative group">
                                        <div className="absolute -inset-4 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        <div className="relative p-12 rounded-[3.5rem] bg-stone-900 text-white shadow-3xl overflow-hidden border border-white/5">
                                            {/* Decorative Background Elements */}
                                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                                            
                                            <div className="grid md:grid-cols-3 gap-12 relative z-10">
                                                {[
                                                    { icon: MapPin, label: "Precise Location", value: item.location },
                                                    { icon: Clock, label: "Optimal Season", value: item.bestTime },
                                                    { icon: Wind, label: "Elevation", value: item.altitude }
                                                ].map((info, idx) => info.value && (
                                                    <div key={idx} className="space-y-6">
                                                        <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary shadow-inner">
                                                            <info.icon size={24} strokeWidth={1.5} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold mb-2">{info.label}</p>
                                                            <p className="text-xl font-medium tracking-tight whitespace-pre-line">{info.value}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-16 pt-10 border-t border-white/5 flex flex-wrap items-center justify-between gap-6 relative z-10">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                                                    <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Curated Travel Intelligence</span>
                                                </div>
                                                {item.tag && (
                                                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-white/80 font-bold backdrop-blur-sm">
                                                        {item.tag}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Sidebar CTA - Concierge Style */}
                            <div className="lg:col-span-4">
                                <motion.div
                                    initial={{ opacity: 0, x: 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="sticky top-32"
                                >
                                    <div className="group relative">
                                        {/* Magnetic Hover Effect Background */}
                                        <div className="absolute -inset-1 bg-gradient-to-b from-secondary to-accent rounded-[3.5rem] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                                        
                                        <div className="relative bg-white border border-stone-100 p-12 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden">
                                            {/* Concierge Pattern */}
                                            <div className="absolute -top-24 -right-24 w-48 h-48 border-[1px] border-stone-50 rounded-full group-hover:scale-150 transition-transform duration-1000" />
                                            
                                            <div className="relative z-10">
                                                <div className="mb-10 inline-flex flex-col items-center">
                                                    <div className="text-secondary mb-4">
                                                        <MapPin size={48} strokeWidth={1} />
                                                    </div>
                                                    <div className="h-[2px] w-8 bg-secondary/30" />
                                                </div>

                                                <h3 className="text-4xl font-[var(--heading-font)] text-stone-900 mb-6 tracking-tighter">
                                                    Bespoke <br />
                                                    <span className="italic font-light">Adventures</span>
                                                </h3>
                                                
                                                <div className="space-y-8 mb-12">
                                                    <p className="text-stone-500 text-lg font-light leading-relaxed">
                                                        Our master planners specialize in translating your travel dreams into flawless realities.
                                                    </p>
                                                    
                                                    <div className="space-y-4">
                                                        {["Private Logistical Support", "Vetted Local Experts", "Premium Accommodations"].map((feat, i) => (
                                                            <div key={i} className="flex items-center gap-3 text-xs text-stone-400 font-bold uppercase tracking-widest">
                                                                <div className="w-1 h-1 rounded-full bg-secondary" />
                                                                {feat}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <Link 
                                                    href="/contact"
                                                    className="group relative flex items-center justify-between w-full p-6 bg-stone-900 text-white rounded-2xl transition-all duration-500 hover:bg-black hover:shadow-2xl overflow-hidden"
                                                >
                                                    <div className="absolute inset-0 bg-secondary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                                                    <span className="relative z-10 uppercase tracking-[0.2em] text-[10px] font-black">Begin Consultation</span>
                                                    <motion.div 
                                                        className="relative z-10"
                                                        whileHover={{ x: 5 }}
                                                    >
                                                        <ArrowLeft className="rotate-180" size={16} />
                                                    </motion.div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sub-Card: Sustainability/Community */}
                                    <motion.div 
                                        whileHover={{ scale: 1.02 }}
                                        className="mt-8 p-10 rounded-[2.5rem] bg-stone-900 border border-white/5 shadow-2xl relative overflow-hidden group"
                                    >
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full group-hover:scale-110 transition-transform" />
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-secondary border border-white/10 group-hover:text-white transition-colors">
                                                <Wind size={22} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-black mb-1">Ethical Travel</p>
                                                <p className="text-sm text-white/80 font-light leading-relaxed">
                                                    100% Carbon Neutral & <br /><span className="text-white font-bold">Local Community Led</span>
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                
            </main>

            <FooterSection />
        </div>
    );
};

export default GuideDetailLayout;
