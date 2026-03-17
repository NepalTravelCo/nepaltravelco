"use client";

import { motion } from "framer-motion";
import { MapPin, Info, ArrowRight } from "lucide-react";
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay }}
        viewport={{ once: true }}
        className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-stone-100 shadow-xl hover:shadow-2xl transition-all duration-500"
    >
        <Link href={`/places-to-go/${slug}`} className="block">
            <div className="aspect-[16/10] relative overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <MapPin size={14} className="text-secondary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{location}</span>
                </div>
            </div>

            <div className="p-8">
                <h3 className="text-2xl font-bold text-primary font-[var(--heading-font)] mb-4">{title}</h3>
                <p className="text-stone-600 mb-6 leading-relaxed text-sm">{desc}</p>
                <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-widest group/btn">
                    Discover More
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    </motion.div>
);

import { destinations } from "./data";

export default function PlacesToGoContent() {
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
            <section className="relative py-24 px-6 md:px-12">
                <div className="container-max grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-[3rem] overflow-hidden aspect-square shadow-2xl"
                    >
                         <Image
                            src="https://i.pinimg.com/1200x/32/0e/87/320e87726907f7ddcc925da8ad088e8c.jpg"
                            alt="Nepal Travel Insight"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </motion.div>

                    <div  >
                        <SectionHeader title="Expert Travel Insights" subtitle="Insider Tips" />
                        <p className="text-stone-600 mb-8 leading-relaxed">
                            Nepal is a land of contrasts, from the sweltering plains of the Terai to the freezing heights of the Himalayas. 
                            To make the most of your journey, we recommend planning your route according to the seasons. 
                            Autumn and Spring offer the clearest skies and best trekking conditions.
                        </p>
                        
                        <div className="space-y-6">
                            {[
                                { title: "Entry Logistics", desc: "Most travelers can obtain a Visa on Arrival at Kathmandu Airport." },
                                { title: "Local Etiquette", desc: "Always walk clockwise around Buddhist stupas and temples." },
                                { title: "Currency Info", desc: "Nepalese Rupee (NPR) is the local currency. ATMs are widely available in cities." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 text-secondary">
                                        <Info size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-1">{item.title}</h4>
                                        <p className="text-sm text-stone-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
