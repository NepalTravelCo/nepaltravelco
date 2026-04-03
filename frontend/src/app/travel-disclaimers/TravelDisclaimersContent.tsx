"use client";

import { motion } from "framer-motion";
import {
  HeartPulse,
  CloudRain,
  Users,
  Leaf,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

const sections = [
  {
    icon: HeartPulse,
    title: "Health and Safety",
    content:
      "Travel to Nepal involves certain risks including altitude sickness and exposure to different climates. Travelers should consult healthcare professionals prior to departure and ensure they are physically prepared.",
  },
  {
    icon: CloudRain,
    title: "Weather Conditions",
    content:
      "Weather in Nepal, especially in mountainous regions, can change rapidly. Activities such as trekking may be impacted, and itineraries may be adjusted for safety.",
  },
  {
    icon: Users,
    title: "Cultural Respect",
    content:
      "Visitors are expected to respect local traditions, dress modestly at religious sites, and follow local customs. Photography restrictions may apply in certain locations.",
  },
  {
    icon: Leaf,
    title: "Environmental Responsibility",
    content:
      "We encourage all travelers to follow sustainable tourism practices. Please dispose of waste responsibly and respect natural environments.",
  },
  {
    icon: AlertCircle,
    title: "Emergency Services",
    content:
      "Access to emergency and medical services may be limited in remote regions. Travelers should carry necessary supplies and follow guide instructions.",
  },
  {
    icon: ShieldCheck,
    title: "Travel Insurance",
    content:
      "Comprehensive travel insurance covering medical evacuation, trip cancellation, and emergencies is strongly recommended for all travelers.",
  },
];

const TravelDisclaimersContent = () => {
  return (
    <>
    
    <div className="h-[12vh] bg-primary w-full" />
    <section className="py-24 bg-stone-50">
      <div className="container-max max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            Important Information
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-[var(--heading-font)] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary"
          >
            Travel <span className="italic font-normal">Disclaimers</span>
          </motion.h2>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {sections.map((section, index) => {
            const Icon = section.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="
                  group rounded-xl border transition-all duration-300
                  bg-white/50 border-stone-200 hover:border-secondary/20 hover:shadow-sm
                "
              >
                <div className="p-6">

                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="
                      w-10 h-10 rounded-full flex items-center justify-center
                      bg-stone-100 text-stone-400 group-hover:text-secondary
                      transition-colors
                    ">
                      <Icon size={18} />
                    </div>

                    <h3 className="font-semibold text-primary text-lg md:text-xl">
                      {section.title}
                    </h3>
                  </div>

                  {/* Content */}
                  <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-stone-500 text-sm">
            These guidelines are provided to ensure a safe and responsible travel experience in Nepal.
          </p>
          <p className="mt-2 text-xs text-stone-400">
            Last updated: April 2026
          </p>
        </motion.div>

      </div>
    </section>

    </>
  );
};

export default TravelDisclaimersContent;