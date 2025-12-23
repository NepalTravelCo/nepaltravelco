"use client"
import { motion } from "framer-motion"

function ReachUs() {
  return (
    <section className="text-center py-16 relative bg-gray-50">
      <motion.div
        className="max-w-2xl mx-auto px-5"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="mt-4">
          <h3 className="font-quicksand text-2xl md:text-3xl font-semibold text-primary uppercase tracking-tight mb-3">
            Still have questions?
          </h3>
          <p className="font-nunito text-base md:text-lg text-gray-500 mb-8">
            Get in touch with our travel experts
          </p>
          <button className="relative overflow-hidden rounded-lg border-2 border-primary bg-white text-primary font-quicksand font-medium text-sm md:text-base uppercase tracking-wider px-6 py-2 md:px-8 md:py-3 shadow-md transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:bg-accent hover:text-white hover:border-accent hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-all before:duration-600 hover:before:left-full">
            Contact Us
          </button>
        </div>
      </motion.div>
    </section>
  )
}

export default ReachUs
