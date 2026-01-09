"use client";

import { motion } from "framer-motion";
import {
    ShieldCheck,
    Plane,
    MapPin,
    Clock,
    AlertTriangle,
    Info,
    Calendar,
    Camera,
    CheckCircle2,
    Globe,
    FileText,
    Banknote,
    ArrowRight
} from "lucide-react";
import React from "react";

// --- Sub-components for better organization ---

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

const VisaRequirementCard = ({
    type,
    title,
    desc,
    benefits,
    icon: Icon,
    badge,
    color,
    delay
}: {
    type: string;
    title: string;
    desc: string;
    benefits: string[];
    icon: any;
    badge: string;
    color: string;
    delay: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay }}
        viewport={{ once: true }}
        className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-stone-100 shadow-xl hover:shadow-2xl transition-all duration-500"
    >
        <div className="p-10 relative z-10">
            <div className={`w-16 h-16 rounded-2xl ${color === 'orange' ? 'bg-[#ea580c]/10 text-[#ea580c]' : 'bg-blue-600/10 text-blue-600'} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <Icon size={32} />
            </div>

            <div className="flex items-start justify-between mb-4">
                <h3 className="text-3xl font-bold text-primary font-[var(--heading-font)]">{title}</h3>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${color === 'orange' ? 'bg-[#ea580c] text-white' : 'bg-blue-600 text-white'}`}>
                    {badge}
                </span>
            </div>

            <p className="text-stone-600 mb-8 leading-relaxed text-sm md:text-base">{desc}</p>

            <ul className="space-y-4">
                {benefits.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-stone-700 text-sm">
                        <div className={`w-6 h-6 rounded-full ${color === 'orange' ? 'bg-[#ea580c]/20 text-[#ea580c]' : 'bg-blue-600/20 text-blue-600'} flex items-center justify-center flex-shrink-0`}>
                            <CheckCircle2 size={12} />
                        </div>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    </motion.div>
);

const FeeCard = ({ days, fee, tag, popular, icon: Icon }: any) => (
    <motion.div
        whileHover={{ y: -10 }}
        className={`relative p-8 rounded-[2rem] border transition-all duration-300 ${popular ? 'bg-[#ea580c] border-transparent shadow-2xl shadow-orange-500/20' : 'bg-white border-stone-100 hover:border-[#ea580c]/50 shadow-lg'}`}
    >
        {popular && <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white">Most Popular</div>}

        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${popular ? 'bg-white/20' : 'bg-[#ea580c]/10'}`}>
            <Icon size={20} className={popular ? 'text-white' : 'text-[#ea580c]'} />
        </div>

        <h4 className={`text-xs font-bold tracking-[0.3em] uppercase mb-4 ${popular ? 'text-white/80' : 'text-stone-400'}`}>{tag}</h4>

        <div className="flex items-baseline gap-2 mb-8">
            <span className={`text-6xl font-black ${popular ? 'text-white' : 'text-gray-900'}`}>{days}</span>
            <span className={`text-lg font-light ${popular ? 'text-white/60' : 'text-stone-500'}`}>Days</span>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <span className={`text-3xl font-bold ${popular ? 'text-white' : 'text-[#ea580c]'}`}>${fee}</span>
            <Info size={16} className={popular ? 'text-white/20' : 'text-stone-300'} />
        </div>
    </motion.div>
)

const CheckpointList = () => (
    <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-stone-100 p-8 rounded-[2rem] shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#ea580c]/20 flex items-center justify-center">
                    <Plane className="text-[#ea580c]" size={20} />
                </div>
                <h4 className="text-xl font-bold text-primary">Air Hubs</h4>
            </div>
            <ul className="space-y-4">
                {[
                    "Tribhuvan Int'l (Kathmandu)",
                    "Gautam Buddha Int'l (Bhairahawa)",
                    "Pokhara Regional Int'l"
                ].map((a, i) => (
                    <li key={i} className="flex items-center gap-3 text-stone-600 text-sm">
                        <MapPin size={14} className="text-[#ea580c]" /> {a}
                    </li>
                ))}
            </ul>
        </div>
        <div className="bg-white border border-stone-100 p-8 rounded-[2rem] shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <Globe className="text-blue-600" size={20} />
                </div>
                <h4 className="text-xl font-bold text-primary">Land Borders</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <span className="text-[10px] font-bold uppercase text-stone-400 tracking-widest block mb-3">From India</span>
                    <ul className="space-y-2">
                        {["Belahiya", "Birgunj", "Kakarbhitta", "Nepalgunj"].map((l, i) => (
                            <li key={i} className="text-xs text-stone-600">• {l}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <span className="text-[10px] font-bold uppercase text-stone-400 tracking-widest block mb-3">From China</span>
                    <ul className="space-y-2">
                        {["Rasuwa Gadhi", "Kodari"].map((l, i) => (
                            <li key={i} className="text-xs text-stone-600">• {l}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
)

export default function TravelGuideContent() {
    return (
        <div className="bg-stone-50 text-stone-900 font-[var(--text-font)] pb-32">
            {/* 1. Requirements Section */}
            <section className="relative py-24 px-6 md:px-12 container-max">
                <SectionHeader title="Visa Requirements" subtitle="Entry Protocols" />

                <div className="grid md:grid-cols-2 gap-8">
                    <VisaRequirementCard
                        type="exempt"
                        title="Visa Exempt"
                        desc="Indian nationals enjoy strict-free movement between the two nations, honoring a centuries-old bond."
                        benefits={["Unrestricted entry & exit", "No visa fees required", "Valid ID (Voter ID/Passport) mandatory"]}
                        icon={ShieldCheck}
                        badge="Indian Citizens"
                        color="orange"
                        delay={0.2}
                    />
                    <VisaRequirementCard
                        type="required"
                        title="Visa Required"
                        desc="Travelers from most other nations can obtain a visa on arrival or apply online for a seamless entry."
                        benefits={["On-Arrival at major entry points", "Online Application (recommended)", "Tourist & Business categories"]}
                        icon={FileText}
                        badge="Global Travelers"
                        color="blue"
                        delay={0.4}
                    />
                </div>
            </section>

            {/* 2. Fees Section */}
            <section className="relative py-24 px-6 md:px-12">
                <div className="container-max">
                    <SectionHeader title="Visa Fees" subtitle="Investment in Adventure" />

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeeCard days={15} fee={30} tag="Short Stay" icon={Clock} />
                        <FeeCard days={30} fee={50} tag="Standard" popular icon={Calendar} />
                        <FeeCard days={90} fee={125} tag="Extended" icon={MapPin} />
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-stone-400 text-xs">
                        <Info size={14} />
                        <span>Fees are subject to change. Please carry exact USD cash for on-arrival payments.</span>
                    </div>
                </div>
            </section>

            {/* 3. Checkpoints & Quick Info Combined */}
            <section className="relative py-24 px-6 md:px-12 container-max">
                <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7">
                        <SectionHeader title="Entry Checkpoints" subtitle="Access Points" />
                        <CheckpointList />
                    </div>
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <div className="bg-[#ea580c] rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/20 transition-colors" />

                            <h3 className="text-2xl font-bold mb-6 relative z-10">Essential Documents</h3>
                            <ul className="space-y-6 relative z-10">
                                {[
                                    { text: "Passport with 6 months validity", icon: Globe },
                                    { text: "Two recent passport-sized photos", icon: Camera },
                                    { text: "Completed Visa Application Form", icon: FileText },
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                            <item.icon size={18} />
                                        </div>
                                        <span className="font-medium text-sm md:text-base">{item.text}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-10 pt-8 border-t border-white/20">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="flex-shrink-0 animate-pulse" />
                                    <p className="text-xs md:text-sm font-medium leading-relaxed opacity-90">
                                        Always verify current requirements with your local Nepalese embassy before travel, as regulations can change.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Final CTA */}
            <section className="py-24 px-6 md:px-12">
                <div className="container-max">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative rounded-[3rem] overflow-hidden bg-stone-900 text-white p-12 md:p-24 text-center shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-primary" />

                        <div className="relative z-10 max-w-4xl mx-auto">
                            <h2 className="text-stone-50 text-4xl md:text-6xl font-bold mb-8 font-[var(--heading-font)]">Start Your <span className="text-[#ea580c] italic font-light">Journey</span></h2>
                            <p className="text-lg md:text-xl text-white/60 mb-12 font-light leading-relaxed">
                                Ready to apply? Visit the official immigration portal for the most up-to-date forms and procedures.
                            </p>

                            <a
                                href="https://www.immigration.gov.np"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-4 bg-[#ea580c] text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:bg-[#c2410c] transition-all hover:scale-105 group"
                            >
                                Official Portal
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
