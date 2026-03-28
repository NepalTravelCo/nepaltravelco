"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight, Plane, Globe, Coins } from "lucide-react";
import React from "react";
import Image from "next/image";

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16 px-4">
        <div className="max-w-2xl">
            <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block"
            >
                {subtitle}
            </motion.span>
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="font-[var(--heading-font)] text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight"
            >
                {title.split(" ").map((word, i) => (
                    <span key={i} className={i % 2 !== 0 ? "italic font-normal text-primary/80" : ""}>{word} </span>
                ))}
            </motion.h2>
        </div>
    </div>
);

import Link from "next/link";

const DestinationCard = ({
    slug,
    title,
    location,
    desc,
    image,
    delay
}: {
    slug: string;
    title: string;
    location: string;
    desc: string;
    image: string;
    delay: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-white/5 border border-white/10"
    >
        <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
            <div className="glass px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                <MapPin size={12} className="text-secondary" />
                <span className="text-white text-[10px] font-bold uppercase tracking-wider">{location}</span>
            </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 inset-x-0 p-8">
            <h3 className="font-[var(--heading-font)] text-2xl font-bold text-white mb-4">
                {title}
            </h3>
            <p className="text-stone-300 text-sm line-clamp-2 opacity-0 h-0 mb-0 group-hover:h-auto group-hover:mb-6 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                {desc}
            </p>
            <Link
                href={`/places-to-go/${slug}`}
                className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-[0.2em] group/btn"
            >
                View Details
                <ArrowRight size={14} className="text-secondary transition-transform group-hover/btn:translate-x-2" />
            </Link>
        </div>
    </motion.div>
);

import { useEffect, useState } from "react";

// import { destinations } from "./data"; // No longer needed after API migration

export default function PlacesToGoContent() {
    const [destinations, setDestinations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/destinations`);
                if (response.ok) {
                    const data = await response.json();
                    setDestinations(data);
                }
            } catch (error) {
                console.error("Error fetching destinations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDestinations();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
            </div>
        );
    }

    return (
        <div className="bg-stone-50 text-stone-900 font-[var(--text-font)]">
            <section className="relative py-24 px-6 md:px-12 container-max">
                <SectionHeader title="Iconic Destinations" subtitle="Where to Wander" />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinations.map((dest, i) => (
                        <DestinationCard 
                            key={i} 
                            slug={dest.slug}
                            title={dest.title}
                            location={dest.location}
                            desc={dest.description}
                            image={dest.image}
                            delay={0.1 * (i + 1)}
                        />
                    ))}
                </div>
            </section>

            {/* Travel Insight */}
            <section className="relative py-32 bg-stone-50 overflow-hidden">
                <div className="container-max relative z-10 grid lg:grid-cols-[1.2fr_1fr] gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                         <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-stone-200 group">
                             <Image
                                src="https://i.pinimg.com/736x/89/cf/e7/89cfe72b774488007cd2cdd96aa76375.jpg"
                                alt="Nepal Travel Insight"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                         </div>
                    </motion.div>

                    <div className="flex flex-col gap-10">
                        <div className="max-w-2xl">
                             <motion.span
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block"
                            >
                                Insider Tips
                            </motion.span>
                             <motion.h2
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="font-[var(--heading-font)] text-4xl md:text-5xl lg:text-7xl font-bold text-primary leading-tight"
                            >
                                Expert Travel <br />
                                <span className="italic font-normal opacity-80">Insights</span>
                             </motion.h2>
                        </div>
                        
                        <p className="text-stone-600 leading-relaxed text-lg font-light max-w-xl">
                            Nepal is a land of contrasts, from the sweltering plains of the Terai to the freezing heights of the Himalayas. 
                            To make the most of your journey, we recommend planning your route according to the seasons. 
                        </p>
                        
                        <div className="relative pl-12 space-y-12">
                            {/* Vertical Path Line */}
                            <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-secondary via-secondary/20 to-transparent" />
                            
                            {[
                                { title: "Entry Logistics", desc: "Most travelers can obtain a Visa on Arrival at Kathmandu Airport.", icon: Plane },
                                { title: "Local Etiquette", desc: "Always walk clockwise around Buddhist stupas and temples.", icon: Globe },
                                { title: "Currency Info", desc: "Nepalese Rupee (NPR) is the local currency. ATMs are widely available across cities.", icon: Coins }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group relative"
                                >
                                    {/* Indicator Dot */}
                                    <div className="absolute -left-[53px] top-1.5 w-4 h-4 rounded-full bg-stone-50 border-2 border-secondary group-hover:scale-125 group-hover:bg-secondary transition-all duration-300 shadow-[0_0_15px_rgba(194,65,12,0.3)]" />
                                    
                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center flex-shrink-0 text-secondary group-hover:border-secondary transition-colors">
                                            <item.icon size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="font-bold text-primary text-xl mb-2 group-hover:text-secondary transition-colors">{item.title}</h4>
                                            <p className="text-stone-500 leading-relaxed font-light">{item.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
