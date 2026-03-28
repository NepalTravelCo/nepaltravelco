"use client";

import { motion } from "framer-motion";
import { 
    ArrowRight, Plane, Globe, Coins, Compass, Mountain, Map, Wind, Milestone, Utensils, ArrowUpRight, Search
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const IconMap: Record<string, any> = {
    Mountain, Map, Compass, Wind, Milestone, Utensils, Globe, Plane, Coins
};

const getColorHex = (color: string) => {
    const colors: Record<string, string> = {
        secondary: "#c2410c",
        "blue-600": "#2563eb",
        "green-600": "#16a34a",
        "purple-600": "#9333ea",
        "red-600": "#dc2626",
        "amber-600": "#d97706"
    };
    return colors[color] || "#0f172a";
};

const SectionHeader = ({ title, subtitle, light = false }: { title: string; subtitle: string; light?: boolean }) => (
    <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16 px-4">
        <div className="max-w-2xl">
            <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`${light ? 'text-secondary/80' : 'text-secondary'} font-semibold tracking-[0.3em] uppercase text-xs mb-4 block`}
            >
                {subtitle}
            </motion.span>
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className={`font-[var(--heading-font)] text-4xl md:text-5xl lg:text-6xl font-bold ${light ? 'text-white' : 'text-primary'} leading-tight`}
            >
                {title.split(" ").map((word, i) => (
                    <span key={i} className={i % 2 !== 0 ? `italic font-normal ${light ? 'text-white/80' : 'text-primary/80'}` : ""}>{word} </span>
                ))}
            </motion.h2>
        </div>
    </div>
);

const ActivityCard = ({
    slug,
    title,
    icon: IconName,
    desc,
    tag,
    image,
    delay,
    color,
    colSpan,
    rowSpan
}: {
    slug: string;
    title: string;
    icon: string;
    desc: string;
    tag: string;
    image: string;
    delay: number;
    color: string;
    colSpan: string;
    rowSpan: string;
}) => {
    const accentColor = getColorHex(color);
    const Icon = IconMap[IconName] || Compass;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
            className={`${colSpan} ${rowSpan} relative group overflow-hidden rounded-[2.5rem] bg-stone-900 border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-700`}
        >
            <Link href={`/things-to-do/${slug}`} className="block h-full w-full relative">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                    />
                    {/* Dynamic Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                    
                    {/* Accent Color Gradient Overlay */}
                    <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-1000 z-10"
                        style={{ background: `linear-gradient(45deg, ${accentColor} 0%, transparent 100%)` }}
                    />
                </div>

                {/* Content Container */}
                <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end overflow-hidden">
                    <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 bg-white/10">
                        <ArrowUpRight size={20} className="text-white" />
                    </div>

                    <div className="max-w-md">
                        <div className="flex items-center gap-3 mb-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                            <Icon size={14} className="text-white/60" />
                            <span className="text-white/50 text-[10px] uppercase tracking-[0.4em] font-bold block">
                                {tag}
                            </span>
                        </div>

                        <h3 className="font-[var(--heading-font)] text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0 group-hover:mb-4 leading-tight transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-[0.22, 1, 0.36, 1]">
                            {title}
                        </h3>

                        <p className="text-white/80 line-clamp-2 text-sm font-light h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 mb-0 group-hover:mb-6 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                            {desc}
                        </p>

                        <div className={`inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-[0.2em] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200`}>
                            Explore Activity
                            <ArrowRight size={14} className="text-secondary transition-transform" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default function ThingsToDoContent() {
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/activities`);
                if (response.ok) {
                    const data = await response.json();
                    setActivities(data);
                }
            } catch (error) {
                console.error("Error fetching activities:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchActivities();
    }, []);

    return (
        <div className="bg-stone-50 text-stone-900 font-[var(--text-font)]">
            <section className="relative py-24 bg-stone-50 overflow-hidden">
                <div className="container-max relative z-10 px-4 md:px-0">
                    <SectionHeader title="Infinite Experiences" subtitle="What to Do" light={false} />
 
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 auto-rows-[400px] min-h-[800px]">
                        {loading ? (
                            <div className="col-span-full h-96 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
                            </div>
                        ) : (
                            activities.map((activity, i) => {
                                let colSpan = "lg:col-span-4";
                                let rowSpan = "row-span-1";

                                if (i === 0) {
                                    colSpan = "lg:col-span-8";
                                    rowSpan = "row-span-2";
                                } else if (i === 1) {
                                    colSpan = "lg:col-span-4";
                                    rowSpan = "row-span-2";
                                } else if (i === 2) {
                                    colSpan = "lg:col-span-5";
                                    rowSpan = "row-span-1";
                                } else if (i === 3) {
                                    colSpan = "lg:col-span-7";
                                    rowSpan = "row-span-1";
                                } else if (i === 4) {
                                    colSpan = "lg:col-span-7";
                                    rowSpan = "row-span-1";
                                } else if (i === 5) {
                                    colSpan = "lg:col-span-5";
                                    rowSpan = "row-span-1";
                                }

                                return (
                                    <ActivityCard 
                                        key={i} 
                                        slug={activity.slug}
                                        title={activity.name}
                                        icon={activity.icon}
                                        desc={activity.description}
                                        tag={activity.tag}
                                        image={activity.image}
                                        delay={0.1 * (i + 1)}
                                        color={activity.color || 'secondary'}
                                        colSpan={colSpan}
                                        rowSpan={rowSpan}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
            </section>

            {/* 2-Column Activity Insight - Image Free */}
            <section className="relative py-32 bg-stone-50 overflow-hidden border-t border-stone-200/50">
                <div className="container-max relative z-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-20 items-start">
                    {/* Left Column: Heading & Intro */}
                    <div className="flex flex-col items-start text-left lg:sticky lg:top-32">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-10 shadow-lg border border-secondary/20"
                        >
                            <Compass size={32} className="animate-spin-slow" />
                        </motion.div>

                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block"
                        >
                            Expert Activity Guidance
                        </motion.span>
                        
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="font-[var(--heading-font)] text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-8"
                        >
                            Professional <br />
                            <span className="italic font-normal opacity-80">Insights</span>
                        </motion.h2>
                        
                        <p className="text-stone-600 leading-relaxed text-lg font-light">
                            Preparation is the foundation of adventure. Our expert guides have compiled these essential strategies to ensure your Himalayan experiences are safe, respectful, and truly unforgettable.
                        </p>
                    </div>
                    
                    {/* Right Column: Roadmap List */}
                    <div className="relative pl-12">
                        {/* Vertical Path Line */}
                        <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-gradient-to-b from-secondary via-secondary/20 to-transparent" />
                        
                        <div className="space-y-20">
                            {[
                                { title: "Safety Infrastructure", desc: "Acclimatization isn't just a suggestion; it's a science. Always check daily weather briefings and ensure your guides are certified by the Nepal Mountaineering Association.", icon: Mountain },
                                { title: "Sustainable Footprint", desc: "The Himalayas are a fragile ecosystem. Carry out all waste, use established trails, and support local tea houses that practice eco-friendly operations.", icon: Globe },
                                { title: "Technical Readiness", desc: "Altitude changes rapidly in Nepal. Layering with high-performance moisture-wicking gear is essential to manage micro-climates from sunrise to summit.", icon: Wind }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: i * 0.15 }}
                                    viewport={{ once: true }}
                                    className="relative flex flex-col group"
                                >
                                    {/* Indicator Dot */}
                                    <div className="absolute -left-[54px] top-3 w-5 h-5 rounded-full bg-white border-4 border-secondary z-20 shadow-xl group-hover:scale-125 transition-transform" />
                                    
                                    <div className="flex flex-col gap-6 max-w-2xl">
                                        <div className="w-14 h-14 rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-secondary group-hover:border-secondary transition-all shadow-md group-hover:shadow-secondary/20">
                                            <item.icon size={24} />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <h4 className="font-bold text-primary text-2xl group-hover:text-secondary transition-colors">{item.title}</h4>
                                            <p className="text-stone-500 leading-relaxed font-light text-lg">{item.desc}</p>
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
