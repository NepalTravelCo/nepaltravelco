"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By booking with Nepal Travel Co, you agree to be bound by these terms and conditions. Please read them carefully before making your reservation.",
  },
  {
    title: "Bookings and Payments",
    content:
      "All bookings are subject to availability and confirmation. Deposits and full payments must be made according to our payment schedule. Cancellations are subject to our cancellation policy.",
  },
  {
    title: "Travel Insurance",
    content:
      "We strongly recommend that all travelers purchase comprehensive travel insurance to cover medical emergencies, trip cancellations, and other unforeseen circumstances.",
  },
  {
    title: "Liability",
    content:
      "Nepal Travel Co acts as an agent for various service providers. While we strive to ensure high-quality services, we are not liable for acts of third parties or circumstances beyond our control.",
  },
  {
    title: "Changes and Cancellations",
    content:
      "We reserve the right to make changes to itineraries due to weather, political situations, or other factors. Cancellation policies vary by service and will be provided at booking.",
  },
  {
    title: "Contact Information",
    content:
      "For any questions regarding these terms, please contact us at legal@nepaltravelco.com.",
  },
];

const TermsAndConditionsContent = () => {
  return (
    <section className="py-20 bg-white">
      <div className="w-[90%] mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Please review our terms carefully before making any bookings.
          </p>
        </motion.div>

        {/* Content */}
        <div className="max-w-3xl space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="border-b border-gray-100 pb-8"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-3">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-sm text-gray-500"
        >
          Last updated: April 2026
        </motion.div>
      </div>
    </section>
  );
};

export default TermsAndConditionsContent;