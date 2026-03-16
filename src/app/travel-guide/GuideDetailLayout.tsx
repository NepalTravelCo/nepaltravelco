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
                <section className="py-24 px-6 md:px-12 lg:px-24">
                    <div className="container-max">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            {/* Main Content */}
                            <div className="lg:col-span-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="space-y-12"
                                >
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <span className="h-1 w-12 bg-secondary" />
                                            <h2 className="text-sm uppercase tracking-[0.4em] font-bold text-secondary">Discovery</h2>
                                        </div>
                                        <p className="text-xl md:text-2xl font-light leading-relaxed text-stone-600">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-12 pt-8">
                                        <div className="p-10 rounded-[2.5rem] bg-white border border-stone-100 shadow-xl">
                                            <h3 className="text-primary text-lg font-bold mb-8 flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                                                    <CheckCircle2 size={18} />
                                                </div>
                                                Highlights
                                            </h3>
                                            <ul className="space-y-5">
                                                {item.highlights.map((highlight, i) => (
                                                    <li key={i} className="flex items-start gap-4 text-stone-600 text-sm md:text-base leading-relaxed">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0" />
                                                        {highlight}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="p-10 rounded-[2.5rem] bg-stone-900 text-white shadow-xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[5rem] -translate-y-8 translate-x-8" />
                                            <h3 className="text-white text-lg font-bold mb-8 relative z-10 flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-secondary">
                                                    <Info size={18} />
                                                </div>
                                                Essential Info
                                            </h3>
                                            <div className="space-y-8 relative z-10">
                                                {item.location && (
                                                    <div className="flex items-center gap-4">
                                                        <MapPin className="text-secondary" size={20} />
                                                        <div>
                                                            <p className="text-[10px] uppercase tracking-widest text-white/40">Location</p>
                                                            <p className="font-bold">{item.location}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {item.bestTime && (
                                                    <div className="flex items-center gap-4">
                                                        <Clock className="text-secondary" size={20} />
                                                        <div>
                                                            <p className="text-[10px] uppercase tracking-widest text-white/40">Best Time to Visit</p>
                                                            <p className="font-bold">{item.bestTime}</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {item.altitude && (
                                                    <div className="flex items-center gap-4">
                                                        <motion.div 
                                                            animate={{ y: [0, -5, 0] }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                        >
                                                            <Wind className="text-secondary" size={20} />
                                                        </motion.div>
                                                        <div>
                                                            <p className="text-[10px] uppercase tracking-widest text-white/40">Avg. Altitude</p>
                                                            <p className="font-bold">{item.altitude}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Sidebar CTA */}
                            <div className="lg:col-span-4">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="sticky top-32 p-10 rounded-[3rem] bg-white border border-stone-100 shadow-2xl"
                                >
                                    <div className="text-center">
                                        <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mx-auto mb-6">
                                            <motion.div
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 4, repeat: Infinity }}
                                            >
                                                <MapPin size={32} />
                                            </motion.div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-primary mb-4 font-[var(--heading-font)]">Plan Your Journey</h3>
                                        <p className="text-stone-500 text-sm mb-8 leading-relaxed">
                                            Ready to explore {item.title}? Our travel experts can help you create the perfect itinerary tailored to your preferences.
                                        </p>
                                        <Link 
                                            href="/contact"
                                            className="block w-full py-5 bg-secondary text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-[#c2410c] transition-all transform hover:scale-[1.02] shadow-xl text-xs"
                                        >
                                            Consult an Expert
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bottom Banner */}
                <section className="py-24 px-6 md:px-12 bg-stone-900 overflow-hidden relative">
                    <div className="container-max relative z-10 text-center">
                         <h2 className="text-white text-3xl md:text-5xl font-bold mb-8 font-[var(--heading-font)]">Discover the <span className="text-secondary italic">Untamed</span> Soul of Nepal</h2>
                         <p className="text-white/60 max-w-2xl mx-auto mb-12 font-light">
                            Beyond the photos and guides lies a world of raw beauty and ancient wisdom. Let us take you there.
                         </p>
                         <div className="flex flex-wrap justify-center gap-6">
                            <Link href="/treks" className="px-8 py-4 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">View Treks</Link>
                            <Link href="/experiences" className="px-8 py-4 rounded-full bg-secondary text-white text-xs font-bold uppercase tracking-widest hover:bg-[#c2410c] transition-colors shadow-lg">Our Experiences</Link>
                         </div>
                    </div>
                    {/* Decorative Blurs */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
                </section>
            </main>

            <FooterSection />
        </div>
    );
};

export default GuideDetailLayout;
