"use client";

import { motion } from "framer-motion";

const PrivacyPolicyContent = () => {
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
                    <h2 className="text-3xl font-bold text-primary mb-6">Introduction</h2>
                    <p className="mb-6">
                        At Nepal Travel Co, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
                    </p>

                    <h2 className="text-3xl font-bold text-primary mb-6">Information We Collect</h2>
                    <p className="mb-6">
                        We may collect personal information such as your name, email address, phone number, and travel preferences when you contact us, make a booking, or subscribe to our newsletter.
                    </p>

                    <h2 className="text-3xl font-bold text-primary mb-6">How We Use Your Information</h2>
                    <p className="mb-6">
                        Your information is used to provide travel services, communicate with you about your bookings, send promotional materials (with your consent), and improve our services.
                    </p>

                    <h2 className="text-3xl font-bold text-primary mb-6">Data Security</h2>
                    <p className="mb-6">
                        We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                    </p>

                    <h2 className="text-3xl font-bold text-primary mb-6">Contact Us</h2>
                    <p className="mb-6">
                        If you have any questions about this Privacy Policy, please contact us at privacy@nepaltravelco.com.
                    </p>

                    <p className="text-sm text-gray-500 mt-8">
                        Last updated: April 2026
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default PrivacyPolicyContent;