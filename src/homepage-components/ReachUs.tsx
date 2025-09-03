"use client"
import { motion } from "framer-motion"
import "./styles/ReachUs.css"

function ReachUs() {
  return (
    <section className="reach-us-section">
      <motion.div
        className="reach-us-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }} // animate only once, trigger slightly early
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="reach-us-content">
          <h3 className="reach-us-title">Still have questions?</h3>
          <p className="reach-us-description">Get in touch with our travel experts</p>
          <button className="contact-btn">CONTACT US</button>
        </div>
      </motion.div>
    </section>
  )
}

export default ReachUs
