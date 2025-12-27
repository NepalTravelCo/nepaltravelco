"use client"

import { motion } from "framer-motion"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"

function ReachUs() {
  return (
    <section className="relative pt-24 bg-primary overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

      {/* Decorative Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[100%] bg-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container-max relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-secondary font-semibold tracking-[0.4em] uppercase text-xs mb-8 block">Ready to Begin?</span>
            <h2 className="font-[var(--heading-font)] text-white text-5xl md:text-7xl lg:text-8xl font-bold mb-10 leading-[1.1]">
              Your Adventure Starts <br />
              <span className="italic font-normal">With a Conversation</span>
            </h2>
            <p className="text-stone-300 text-lg md:text-xl font-light leading-relaxed mb-16 max-w-3xl mx-auto">
              Our dedicated travel curators are ready to help you craft the perfect Himalayan journey. Connect with us for a personalized consultation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="flex flex-col items-center gap-4 group cursor-pointer p-8 rounded-2xl hover:bg-white/5 transition-colors border border-white/5">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                  <Mail size={24} />
                </div>
                <div className="text-center">
                  <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">Email Us</p>
                  <p className="text-white font-semibold">info@nepaltravel.co</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 group cursor-pointer p-8 rounded-2xl hover:bg-white/5 transition-colors border border-white/5">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                  <Phone size={24} />
                </div>
                <div className="text-center">
                  <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">Call Us</p>
                  <p className="text-white font-semibold">+977 1 4XXXXXX</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 group cursor-pointer p-8 rounded-2xl hover:bg-white/5 transition-colors border border-white/5">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                  <MapPin size={24} />
                </div>
                <div className="text-center">
                  <p className="text-stone-400 text-xs uppercase tracking-widest mb-1">Visit Us</p>
                  <p className="text-white font-semibold">Kathmandu, Nepal</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-8">
              <button className="group relative overflow-hidden inline-flex items-center gap-6 bg-white text-primary px-14 py-6 rounded-full font-bold uppercase tracking-[0.3em] text-sm shadow-2xl transition-all duration-500 hover:bg-secondary hover:text-white hover:-translate-y-2">
                Contact Our Experts
                <ArrowRight size={22} className="transition-transform group-hover:translate-x-3" />
              </button>

              <div className="w-px h-24 bg-gradient-to-b from-secondary to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ReachUs
