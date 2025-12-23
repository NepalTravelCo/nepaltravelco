"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const FillerInfo = () => {
  return (
    <div className="py-[var(--padding)] bg-[var(--background-color)]">
      <div className="w-[90%] mx-auto">
        <motion.section
          className="relative font-[var(--text-font)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="relative max-w-full">
            {/* Image */}
            <div className="w-[80%] h-[480px] rounded-lg overflow-hidden z-[1] md:w-full">
              <motion.div
                className="w-full h-full bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage:
                    "url('https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg')",
                }}
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              />
            </div>

            {/* Floating Text Box */}
            <motion.div
              className="
                absolute right-0 top-1/2 -translate-y-1/2
                bg-white w-[500px] h-[220px]
                p-6 rounded-lg shadow-xl z-[2]
                flex flex-col justify-center
                md:relative md:top-0 md:translate-y-0
                md:w-full md:h-auto md:mt-[-2rem] md:rounded-none
              "
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="
                font-[var(--heading-font)]
                text-[1.5rem]
                font-semibold
                uppercase
                tracking-[var(--letter-spacing)]
                text-[var(--primary-color)]
                mb-3
              ">
                Explore The Valley
              </h2>

              <p className="
                text-[1rem]
                font-[var(--text-font)]
                text-[var(--text-color)]
                mb-4
              ">
                Discover the cultural heart of Nepal, bustling with ancient
                temples, royal palaces, vibrant local markets, and the spirit of
                Himalayan heritage.
              </p>

              <Link
                href="/explore-valley"
                className="
                  relative inline-block self-start
                  font-[var(--heading-font)]
                  text-[0.8rem] font-semibold uppercase tracking-wider
                  px-4 py-2
                  border border-[var(--primary-color)]
                  text-[var(--primary-color)]
                  rounded-lg
                  transition-all duration-300
                  shadow-lg
                  hover:bg-[var(--accent-color)]
                  hover:border-[var(--accent-color)]
                  hover:text-white
                  hover:-translate-y-1
                  hover:shadow-[0_8px_30px_rgba(217,79,48,0.4)]
                  active:translate-y-[-1px]
                  overflow-hidden
                "
              >
                Explore More
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default FillerInfo;
