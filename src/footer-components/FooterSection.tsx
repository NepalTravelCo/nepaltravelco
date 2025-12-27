"use client"

import CopyrightSection from "@/footer-components/CopyrightSection"
import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react"

function FooterSection() {
  return (
    <>
      <footer className="relative bg-primary overflow-hidden pt-24">
        {/* Decorative Texture and Blurs */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] translate-y-1/2" />

        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

            {/* Brand Section */}
            <div className="flex flex-col items-start gap-8">
              <div className="relative w-[200px] aspect-[230/150]">
                <Image
                  src="/Images/Logo/logo-white.png"
                  alt="Nepal Travel Co."
                  fill
                  className="object-contain cursor-pointer transition-transform duration-500 hover:scale-105"
                />
              </div>
              <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
                Crafting extraordinary Himalayan journeys with passion and expertise. Discover the soul of Nepal with us.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Facebook, href: "#", color: "hover:bg-[#1877f2]" },
                  { icon: Instagram, href: "#", color: "hover:bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888]" },
                  { icon: Twitter, href: "#", color: "hover:bg-black" },
                  { icon: Youtube, href: "#", color: "hover:bg-[#ff0000]" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className={`w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white transition-all duration-500 hover:border-transparent hover:shadow-xl ${social.color}`}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-[var(--heading-font)] text-xl font-bold text-white mb-8 tracking-wide">
                Quick Explorer
              </h3>
              <ul className="grid grid-cols-1 gap-4">
                {["Home", "Places to Go", "Things to Do", "Festivals & Seasons", "About Us", "Contact"].map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(/ /g, "-")}`}
                      className="group flex items-center gap-2 text-stone-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-secondary" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust and Legal */}
            <div>
              <h3 className="font-[var(--heading-font)] text-xl font-bold text-white mb-8 tracking-wide">
                Information
              </h3>
              <ul className="grid grid-cols-1 gap-4">
                {["Privacy Policy", "Terms & Conditions", "Travel Disclaimers", "Booking Policy", "Safety First"].map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(/ /g, "-")}`}
                      className="group flex items-center gap-2 text-stone-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-secondary" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-[var(--heading-font)] text-xl font-bold text-white mb-8 tracking-wide">
                Get In Touch
              </h3>
              <div className="flex flex-col gap-6">
                {[
                  { icon: MapPin, text: "Thamel, Kathmandu, Nepal", sub: "Global Headquarters" },
                  { icon: Phone, text: "+977 1 4XXXXXX", sub: "Available 24/7" },
                  { icon: Mail, text: "info@nepaltravelco.com", sub: "Online Inquiries" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500 flex-shrink-0">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{item.text}</p>
                      <p className="text-stone-500 text-[11px] uppercase tracking-widest mt-1">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </footer>

      <CopyrightSection />
    </>
  )
}

export default FooterSection
