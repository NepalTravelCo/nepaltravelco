"use client";

import { motion } from "framer-motion";
import {
  FileText,
  CreditCard,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Mail,
} from "lucide-react";

const sections = [
  {
    icon: FileText,
    title: "Acceptance of Terms",
    content:
      "By accessing or using Nepal Travel Co services, you agree to comply with these Terms and Conditions. These terms apply to all bookings, services, and interactions with our platform.",
  },
  {
    icon: CreditCard,
    title: "Bookings and Payments",
    content:
      "All bookings are subject to availability and confirmation. Payments must be completed within the specified timeframe. Failure to do so may result in cancellation.",
  },
  {
    icon: ShieldCheck,
    title: "Travel Insurance",
    content:
      "We strongly recommend purchasing comprehensive travel insurance covering medical emergencies, cancellations, and unforeseen circumstances.",
  },
  {
    icon: AlertTriangle,
    title: "Liability",
    content:
      "Nepal Travel Co acts as an intermediary for third-party providers. We are not responsible for losses, delays, or damages caused by external services or unforeseen events.",
  },
  {
    icon: RefreshCw,
    title: "Changes & Cancellations",
    content:
      "Itineraries may be modified due to operational or environmental conditions. Cancellation policies vary and will be communicated during booking.",
  },
  {
    icon: Mail,
    title: "Contact Information",
    content:
      "For inquiries regarding these terms, please contact us at legal@nepaltravelco.com.",
  },
];

const TermsAndConditionsContent = () => {
  return (
    <>
    
    <div className="h-[12vh] bg-primary w-full" />
    <section className="py-24 bg-stone-50">
      <div className="container-max w-full max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            Legal Information
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-[var(--heading-font)] text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary"
          >
            Terms <span className="italic font-normal">& Conditions</span>
          </motion.h1>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
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

                    <h2 className="font-semibold text-primary text-lg md:text-xl">
                      {section.title}
                    </h2>
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

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-stone-500 text-sm">
            These terms may be updated periodically. Continued use of our services implies acceptance of the latest version.
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

export default TermsAndConditionsContent;