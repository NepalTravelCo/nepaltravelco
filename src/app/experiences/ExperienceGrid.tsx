"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { experiences } from "./data";
import { ArrowUpRight } from "lucide-react";

const ExperienceGrid = () => {
    return (
        <section className="relative z-20 py-32 px-6 bg-primary overflow-hidden ">
            {/* Decorative Elements from BrandInfo */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] translate-y-1/2" />

            <div className="container-max relative z-10">
                {/* Brand-Consistent Header */}
                <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-16 px-4">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block"
                        >
                            Nepal&apos;s Finest
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="font-[var(--heading-font)] text-4xl md:text-6xl font-bold text-white leading-tight"
                        >
                            Unforgettable <br />
                            <span className="italic font-normal text-white/90">Curated Experiences</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="hidden md:flex items-center gap-4"
                    >
                        <div className="w-12 h-px bg-white/20" />
                        <span className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-bold">Scroll to Explore</span>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 auto-rows-[400px]">
                    {experiences.map((exp, index) => {
                        // Create an asymmetrical layout pattern
                        let colSpan = "lg:col-span-4";
                        let rowSpan = "row-span-1";

                        if (index === 0) {
                            colSpan = "lg:col-span-8";
                            rowSpan = "row-span-2";
                        } else if (index === 1) {
                            colSpan = "lg:col-span-4";
                            rowSpan = "row-span-2";
                        } else if (index === 2) {
                            colSpan = "lg:col-span-5";
                            rowSpan = "row-span-1";
                        } else if (index === 3) {
                            colSpan = "lg:col-span-7";
                            rowSpan = "row-span-1";
                        } else {
                            colSpan = "lg:col-span-12";
                            rowSpan = "row-span-1";
                        }

                        return (
                            <motion.div
                                key={exp.slug}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                                className={`${colSpan} ${rowSpan} relative group overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-700`}
                            >
                                <Link href={`/experiences/${exp.slug}`} className="block h-full w-full relative">
                                    {/* Background Image */}
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src={exp.image}
                                            alt={exp.title}
                                            fill
                                            className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                                        />
                                        {/* Dynamic Overlays */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-1000 z-10"
                                            style={{ background: `linear-gradient(45deg, ${exp.accent} 0%, transparent 100%)` }}
                                        />
                                    </div>

                                    {/* Content Container */}
                                    <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end overflow-hidden">
                                        {/* Floating Badge */}
                                        <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 bg-white/10">
                                            <ArrowUpRight size={20} className="text-white" />
                                        </div>

                                        <div className="max-w-md">
                                            <span className="text-white/50 text-[10px] uppercase tracking-[0.4em] font-bold mb-2 block transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                                                Exclusive Experience
                                            </span>

                                            <h3 className="font-[var(--heading-font)] text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-0 group-hover:mb-4 leading-none transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-[0.22, 1, 0.36, 1]">
                                                {exp.title}
                                            </h3>

                                            <p className="text-white/80 line-clamp-2 text-sm md:text-base font-light h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 mb-0 group-hover:mb-6 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                                                {exp.description}
                                            </p>

                                            <div className="flex items-center gap-8 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-200">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase text-white/40 tracking-widest font-bold">Duration</span>
                                                    <span className="text-sm font-bold text-white">{exp.duration}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase text-white/40 tracking-widest font-bold">Altitude</span>
                                                    <span className="text-sm font-bold text-white">{exp.maxAltitude}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ExperienceGrid;
