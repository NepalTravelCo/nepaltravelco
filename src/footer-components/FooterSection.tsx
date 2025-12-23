"use client"
import CopyrightSection from "@/footer-components/CopyrightSection"
import Image from "next/image"

function FooterSection() {
  return (
    <>
      <footer className="relative bg-cover bg-center bg-fixed min-h-[600px]" style={{ backgroundImage: 'url("/Images/Footer/footer.jpg")' }}>
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 max-w-[1200px] mx-auto w-[95%] flex flex-wrap justify-between py-12 gap-8">

          {/* Brand Section */}
          <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col items-start md:items-start text-white">
            <div className="relative w-[230px] h-[150px] mb-4">
              <Image src="/Images/Logo/logo-white.png" alt="Nepal Travel Co." fill className="object-cover cursor-pointer transition-transform duration-300 hover:scale-105" />
            </div>
            <div className="text-sm mb-3">Follow us on our Social Media</div>
            <div className="flex flex-wrap gap-4">
              {/* Social Icons */}
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1877f2] hover:scale-110 hover:shadow-lg transition-transform duration-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] hover:scale-110 hover:shadow-lg transition-transform duration-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-black hover:scale-110 hover:shadow-lg transition-transform duration-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-black hover:scale-110 hover:shadow-lg transition-transform duration-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M4.22 3h5.12l4.16 5.79L17.85 3h2.7l-6.55 8.9L21.8 21h-5.1l-4.26-5.97L7.27 21H4.5l6.75-9.18L4.22 3zm2.07 1.58l5.04 6.86L6.52 20h1.6l5.12-7.13L18 20h1.68l-5.19-7.24L19.78 4.6h-1.6l-4.8 6.68L7.8 4.6H6.29z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/2 lg:w-1/4 text-white">
            <h3 className="text-xl font-semibold mb-4 text-center lg:text-left">Quick Links</h3>
            <ul className="flex flex-col items-center lg:items-start gap-3">
              {["Home", "Places to Go", "Things to Do", "Festivals & Seasons", "About Us", "Contact"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/ /g, "")}`} className="text-gray-300 hover:text-white hover:translate-x-1 transition-transform duration-300">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust and Legal */}
          <div className="w-full md:w-1/2 lg:w-1/4 text-white">
            <h3 className="text-xl font-semibold mb-4 text-center lg:text-left">Trust and Legal</h3>
            <ul className="flex flex-col items-center lg:items-start gap-3">
              {["Privacy Policy", "Terms & Conditions", "Travel Disclaimers"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(/ /g, "")}`} className="text-gray-300 hover:text-white hover:translate-x-1 transition-transform duration-300">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/2 lg:w-1/4 text-white">
            <h3 className="text-xl font-semibold mb-4 text-center lg:text-left">Contact Info</h3>
            <div className="flex flex-col gap-3 items-center lg:items-start">
              <div className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-300">
                <svg className="w-5 h-5 flex-shrink-0" fill="white" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" /></svg>
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-300">
                <svg className="w-5 h-5 flex-shrink-0" fill="white" viewBox="0 0 24 24"><path d="M6.62 10.79a15.466 15.466 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.39 21 3 13.61 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.24.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                <span>+977-1-4567890</span>
              </div>
              <div className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-300">
                <svg className="w-5 h-5 flex-shrink-0" fill="white" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 1.99 2H20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                <span>info@nepaltravelco.com</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <CopyrightSection />
    </>
  )
}

export default FooterSection
