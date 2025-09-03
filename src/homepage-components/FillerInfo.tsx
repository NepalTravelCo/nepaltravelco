"use client";
import "./styles/FillerInfo.css";
import Link from "next/link";
import { motion } from "framer-motion";

const FillerInfo = () => {
  return (
    <div id="filler-info-body">
      <div className="filler-info-container">
        <motion.section
          id="filler-kathmandu"
          className="container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="filler-wrapper">
            {/* Image wrapper to preserve layout */}
            <div className="filler-img">
              <motion.div
                className="filler-img-inner"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage:
                    "url('https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "8px",
                }}
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              />
            </div>

            {/* Floating text box (leaflet) */}
            <motion.div
              className="filler-text"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="filler-title">Explore The Valley</h2>
              <p className="filler-desc">
                Discover the cultural heart of Nepal, bustling with ancient
                temples, royal palaces, vibrant local markets, and the spirit of
                Himalayan heritage.
              </p>
              <Link
                href="/explore-valley"
                className="btn btn-light"
                id="explore-btn"
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
