"use client";

import { motion } from "framer-motion";

const SafetyFirstContent = () => {
    return (
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="prose prose-lg max-w-none text-gray-700"
                >
                    <h2 className="text-3xl font-bold text-primary mb-6">Our Safety Commitment</h2>
                    <p className="mb-6">
                        At Nepal Travel Co, safety is our highest priority. We maintain rigorous safety standards and protocols to ensure every traveler&apos;s well-being throughout their journey.
                    </p>

                    <h2 className="text-3xl font-bold text-primary mb-6">Experienced Guides</h2>
                    <p className="mb-6">
                        All our guides are certified professionals with extensive knowledge of the terrain, weather conditions, and emergency procedures. They undergo regular training and safety briefings.
                    </p>

                    <h2 className="text-3xl font-bold text-primary mb-6">Equipment Standards</h2>
                    <p className="mb-6">
                        We provide high-quality, well-maintained equipment and gear. All trekking equipment is regularly inspected and replaced as needed to ensure reliability and safety.
                    </p>

                    <h2 className="text-3xl font-bold text-primary mb-6">Emergency Preparedness</h2>
                    <p className="mb-6">
                        Our teams are equipped with satellite phones, first-aid kits, and emergency communication devices. We have established protocols for various emergency scenarios.
                    </p>

                    <h2 className="text-3xl font-bold text-primary mb-6">Health and Hygiene</h2>
                    <p className="mb-6">
                        We adhere to strict hygiene standards and provide clean, safe accommodations. Health screenings and sanitization procedures are implemented throughout our operations.
                    </p>

                    <h2 className="text-3xl font-bold text-primary mb-6">Risk Assessment</h2>
                    <p className="mb-6">
                        Every trip undergoes thorough risk assessment and planning. We monitor weather conditions, political situations, and other factors that may affect safety.
                    </p>

                    <h2 className="text-3xl font-bold text-primary mb-6">24/7 Support</h2>
                    <p className="mb-6">
                        Our support team is available around the clock. Travelers can reach us anytime for assistance, and we maintain constant communication with our field teams.
                    </p>

                    <p className="text-sm text-gray-500 mt-8">
                        Last updated: April 2026
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default SafetyFirstContent;