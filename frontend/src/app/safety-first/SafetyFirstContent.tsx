"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "Our Safety Commitment",
    content:
      "Safety is at the core of everything we do. We maintain strict standards to ensure every journey is secure and well-managed.",
  },
  {
    title: "Experienced Guides",
    content:
      "Our certified guides are trained in terrain navigation, safety protocols, and emergency response procedures.",
  },
  {
    title: "Emergency Preparedness",
    content:
      "We equip our teams with satellite communication, medical kits, and structured emergency plans.",
  },
  {
    title: "Health and Hygiene",
    content:
      "Strict hygiene practices are followed to ensure safe accommodations and healthy travel conditions.",
  },
  {
    title: "Risk Assessment",
    content:
      "We continuously monitor weather, terrain, and political conditions to minimize risks.",
  },
  {
    title: "24/7 Support",
    content:
      "Our team is available around the clock to support travelers at every stage of their journey.",
  },
];

const SafetyFirstContent = () => {
  return (

    <>
    <div className="h-[12vh] bg-primary w-full" />
    
    <section className="py-24 bg-stone-50">
      <div className="w-[90%] max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs block mb-4"
          >
            Safety First
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold text-primary"
          >
            Your Safety <span className="italic font-normal">Matters</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6 }}
            className="origin-left w-24 h-[1.5px] bg-secondary/40 mx-auto mt-6"
          />
        </div>

        {/* Sections */}
        <div className="space-y-24">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-10 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >

              {/* Number */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Main number */}
                <div className="text-7xl md:text-8xl font-bold text-secondary">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Soft depth duplicate */}
                <div className="
                  absolute top-1 left-1
                  text-7xl md:text-8xl font-bold
                  text-secondary/10
                  -z-10
                ">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative max-w-md"
              >

                {/* Accent line */}
                <div className="w-12 h-[2px] bg-secondary mb-4" />

                <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-3">
                  {section.title}
                </h3>

                <p className="text-stone-600 leading-relaxed">
                  {section.content}
                </p>
              </motion.div>

            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-24 text-center text-sm text-stone-500"
        >
          Last updated: April 2026
        </motion.div>

      </div>
    </section>

    </>
  );
};

export default SafetyFirstContent;