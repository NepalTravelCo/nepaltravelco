"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const FillerInfo = () => {
  return (
    <section className="py-24 bg-stone-50 overflow-hidden">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image Side */}
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-[var(--radius-lg)] overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg"
                alt="Kathmandu Valley"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>

            {/* Decorative Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -right-8 w-48 h-48 bg-secondary/10 rounded-full blur-3xl -z-10"
            />
          </div>

          {/* Text Side */}
          <div className="lg:col-span-5 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-secondary font-semibold tracking-[0.2em] uppercase text-xs mb-4">
                The Cultural Heart
              </span>
              <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                Explore the <br />
                <span className="italic font-normal">Kathmandu</span> Valley
              </h2>
              <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                Step into a world where time stands still. Discover the cultural heart of Nepal,
                bustling with ancient temples, royal palaces, vibrant local markets,
                and the enduring spirit of Himalayan heritage.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <Link
                  href="/explore-valley"
                  className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-secondary transition-colors duration-300 shadow-lg"
                >
                  Discover More
                </Link>
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-stone-200">
                      <Image
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="User"
                        width={40}
                        height={40}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FillerInfo;
