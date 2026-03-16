"use client";

import { motion } from "framer-motion";
import { 
    Compass, 
    Map, 
    Mountain, 
    Wind, 
    Camera, 
    ArrowRight,
    Milestone,
    Heart,
    Utensils
} from "lucide-react";
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

const ActivityCard = ({
    slug,
    title,
    icon: Icon,
    desc,
    tag,
    delay,
    color
}: {
    slug: string;
    title: string;
    icon: any;
    desc: string;
    tag: string;
    delay: number;
    color: string;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay }}
        viewport={{ once: true }}
        className="group p-10 rounded-[2.5rem] bg-white border border-stone-100 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
    >
        <Link href={`/things-to-do/${slug}`} className="block">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}/5 rounded-bl-[5rem] -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500`} />
            
            <div className={`w-16 h-16 rounded-2xl bg-${color}/10 text-${color} flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform duration-500`}>
                <Icon size={32} />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4 block">{tag}</span>
            <h3 className="text-3xl font-bold text-primary font-[var(--heading-font)] mb-4">{title}</h3>
            <p className="text-stone-600 mb-8 leading-relaxed text-sm md:text-base">{desc}</p>
            
            <div className={`flex items-center gap-2 text-${color} font-bold text-xs uppercase tracking-widest group/btn`}>
                Explore Activities
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </div>
        </Link>
    </motion.div>
);

import { activities } from "./data";

export default function ThingsToDoContent() {
    return (
        <div className="bg-stone-50 text-stone-900 font-[var(--text-font)] pb-32">
            <section className="relative py-24 px-6 md:px-12 container-max">
                <SectionHeader title="Infinite Experiences" subtitle="What to Do" />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activities.map((activity, i) => (
                        <ActivityCard 
                            key={i} 
                            slug={activity.slug}
                            title={activity.title}
                            icon={activity.icon}
                            desc={activity.description}
                            tag={activity.tag}
                            delay={0.1 * (i + 1)}
                            color={activity.color === 'secondary' ? '[#ea580c]' : activity.color}
                        />
                    ))}
                </div>
            </section>

            {/* Featured Experience Banner */}
            <section className="py-24 px-6 md:px-12 bg-primary">
                <div className="container-max relative rounded-[3rem] overflow-hidden bg-stone-900 text-white p-12 md:p-24 shadow-2xl">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070')] bg-cover bg-center" />
                    
                    <div className="relative z-10 max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-secondary/20 backdrop-blur-md px-6 py-2 rounded-full w-fit mb-8 border border-secondary/30"
                        >
                            <span className="text-secondary text-xs font-bold uppercase tracking-[0.3em]">Season Spotlight</span>
                        </motion.div>
                        
                        <h2 className="text-4xl md:text-6xl font-bold mb-8 font-[var(--heading-font)] italic">Himalayan <span className="text-secondary">Expeditions</span></h2>
                        <p className="text-lg text-white/70 mb-12 leading-relaxed font-light">
                            The peak climbing season is approaching. Whether you are aiming for Island Peak or the mighty Everest, 
                            our expert guides ensure safety and an unforgettable journey to the roof of the world.
                        </p>
                        
                        <button className="bg-secondary text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#c2410c] transition-all hover:scale-105">
                            View Expeditions
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
