"use client";

import { motion } from "framer-motion";

const TravelDisclaimersContent = () => {
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
                    <h2 className="text-3xl font-bold text-primary mb-6">Health and Safety</h2>
                    <p className="mb-6">
                        Travel to Nepal involves certain risks. Visitors should be aware of altitude sickness, infectious diseases, and the need for appropriate vaccinations. Consult with a healthcare professional before travel.
                    </p>

                    <h2 className="text-3xl font-bold text-primary mb-6">Weather Conditions</h2>
                    <p className="mb-6">
                        Nepal&apos;s weather can be unpredictable, especially in mountainous regions. Treks and outdoor activities may be affected by weather conditions, and we reserve the right to modify itineraries accordingly.
                    </p>

                    <h2 className="text-3xl font-bold text-primary mb-6">Cultural Respect</h2>
                    <p className="mb-6">
                        Respect local customs and traditions. Dress modestly when visiting religious sites, and be mindful of photography restrictions in certain areas.
                    </p>

                    <h2 className="text-3xl font-bold text-primary mb-6">Environmental Responsibility</h2>
                    <p className="mb-6">
                        Help preserve Nepal&apos;s natural beauty by following Leave No Trace principles. Dispose of waste properly and support sustainable tourism initiatives.
                    </p>

                    <h2 className="text-3xl font-bold text-primary mb-6">Emergency Services</h2>
                    <p className="mb-6">
                        Emergency services in remote areas may be limited. Carry appropriate emergency supplies and know the location of the nearest medical facilities.
                    </p>

                    <h2 className="text-3xl font-bold text-primary mb-6">Travel Insurance</h2>
                    <p className="mb-6">
                        Comprehensive travel insurance covering medical emergencies, trip cancellations, and evacuation is mandatory for all our tours.
                    </p>

                    <p className="text-sm text-gray-500 mt-8">
                        Last updated: April 2026
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default TravelDisclaimersContent;