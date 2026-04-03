"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "Introduction",
    content: `
At Nepal Travel Co, we are committed to protecting your privacy and ensuring that your personal data is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you interact with our website, services, or representatives.

By using our services, you agree to the collection and use of information in accordance with this policy.
    `,
  },
  {
    title: "Information We Collect",
    content: `
We may collect personal information that you voluntarily provide to us when you make inquiries, bookings, or subscribe to our services. This may include your full name, email address, phone number, travel preferences, identification details, and payment-related information.

Additionally, we may collect non-personal information such as browser type, device information, IP address, and website usage data to improve our services and user experience.
    `,
  },
  {
    title: "How We Use Your Information",
    content: `
Your information is used to process bookings, manage travel arrangements, communicate updates, and provide customer support. We may also use your data to personalize your experience, improve our offerings, and send promotional content where consent has been provided.

We ensure that your data is used only for legitimate business purposes and in compliance with applicable privacy regulations.
    `,
  },
  {
    title: "Sharing of Information",
    content: `
We may share your information with trusted third-party service providers such as airlines, hotels, transportation providers, and payment processors strictly for the purpose of fulfilling your travel arrangements.

We do not sell, rent, or trade your personal information to third parties. Any sharing of data is conducted securely and only when necessary to deliver our services.
    `,
  },
  {
    title: "Data Security",
    content: `
We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. These include secure servers, encrypted transactions, and restricted access to sensitive information.

While we strive to protect your information, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
    `,
  },
  {
    title: "Data Retention",
    content: `
We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.

Once your data is no longer required, it is securely deleted or anonymized.
    `,
  },
  {
    title: "Your Rights",
    content: `
You have the right to access, update, or request deletion of your personal data. You may also opt out of receiving promotional communications at any time.

To exercise these rights, please contact us using the details provided below. We will respond to your request within a reasonable timeframe.
    `,
  },
  {
    title: "Cookies and Tracking Technologies",
    content: `
Our website may use cookies and similar technologies to enhance your browsing experience, analyze traffic, and understand user behavior. You can control or disable cookies through your browser settings.

Please note that disabling cookies may affect certain functionalities of our website.
    `,
  },
  {
    title: "Updates to This Policy",
    content: `
We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal requirements. Any updates will be posted on this page with a revised "Last updated" date.

We encourage you to review this policy periodically.
    `,
  },
  {
    title: "Contact Us",
    content: `
If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:

Email: privacy@nepaltravelco.com

We are committed to addressing your inquiries promptly and professionally.
    `,
  },
];

const PrivacyPolicyContent = () => {
  return (
    <>
    <div className="h-[12vh] bg-primary w-full" />
    
    <section className="py-24 bg-stone-50">
      <div className="w-[90%] mx-auto">

        

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <span className="text-secondary font-semibold tracking-[0.2em] uppercase text-xs block mb-4">
              Legal & Privacy
            </span>

            <h1 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold text-primary">
              Privacy Policy
            </h1>
          </motion.div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="border-b border-stone-200 pb-8"
              >
                <h2 className="text-xl md:text-2xl font-semibold text-primary mb-3">
                  {section.title}
                </h2>

                <p className="text-stone-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 text-sm text-stone-500">
            Last updated: April 2026
          </div>

        </div>
      
    </section>

    </>
  );
};

export default PrivacyPolicyContent;