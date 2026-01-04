"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Search, ArrowRight, Star } from "lucide-react"
import { experiences } from "@/app/experiences/data"

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)

  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show/Hide behavior
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false)
      } else {
        setShowNavbar(true)
      }

      setIsScrolled(currentScrollY > 60)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveMegaMenu(null)
  }, [pathname])

  const navLinks = [
    { name: "Treks", href: "/treks", hasMega: true },
    { name: "Experiences", href: "/experiences", hasMega: true },
    { name: "Plan Your Trip", href: "/travel-guide" },
    { name: "Contact Us", href: "/contact" },
  ]

  const trekkingRegions = [
    { name: "Annapurna Region", count: "12 Trails" },
    { name: "Everest Region", count: "8 Trails" },
    { name: "Langtang Region", count: "5 Trails" },
    { name: "Manaslu Region", count: "4 Trails" },
    { name: "Mustang Region", count: "6 Trails" },
    { name: "Dolpo Region", count: "3 Trails" },
  ]

  return (
    <>
      <nav
        className={`
          fixed top-0 inset-x-0 z-[100] transition-all duration-500
          ${showNavbar ? "translate-y-0" : "-translate-y-full"}
          ${isScrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-black/5 py-4 shadow-sm"
            : "bg-transparent py-6"}
        `}
      >
        <div className="container-max flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative w-48 h-12 flex items-center">
            <Image
              src={isScrolled ? "/Images/Logo/logo-black.png" : "/Images/Logo/logo-white.png"}
              alt="Nepal Travel Co."
              fill
              className="object-contain transition-all duration-500"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => (
                <li
                  key={link.name}
                  className="relative group py-2"
                  onMouseEnter={() => link.hasMega && setActiveMegaMenu(link.name)}
                  onMouseLeave={() => link.hasMega && setActiveMegaMenu(null)}
                >
                  <Link
                    href={link.href}
                    className={`
                      text-xs uppercase tracking-[0.2em] font-bold transition-colors flex items-center gap-1.5
                      ${isScrolled ? "text-primary hover:text-secondary" : "text-white hover:text-secondary"}
                    `}
                  >
                    {link.name}
                    {link.hasMega && <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />}
                  </Link>

                  {/* Mega Menu */}
                  {link.hasMega && (
                    <AnimatePresence>
                      {activeMegaMenu === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 0 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="fixed top-full left-0 w-full pt-0 pointer-events-auto"
                        >
                          <div className="bg-white shadow-2xl border-t border-black/5">
                            <div className="container-max grid grid-cols-12 min-h-[450px]">
                              {/* Menu Left (Conditional Content) */}
                              <div className="col-span-4 py-12 pr-12 border-r border-black/5">
                                <h3 className="font-[var(--heading-font)] text-2xl font-bold text-primary mb-8">
                                  {link.name === "Treks" ? "Trekking Regions" : "Our Experiences"}
                                </h3>
                                <div className="grid grid-cols-1 gap-2">
                                  {link.name === "Treks" ? (
                                    trekkingRegions.map((region) => (
                                      <a
                                        key={region.name}
                                        href={`/treks#${region.name.toLowerCase().replace(' ', '-')}`}
                                        className="group/item flex items-center justify-between py-3 px-4 rounded-xl hover:bg-stone-50 transition-all duration-300"
                                      >
                                        <div>
                                          <p className="text-sm font-bold text-primary group-hover/item:text-secondary transition-colors">{region.name}</p>
                                          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">{region.count}</p>
                                        </div>
                                        <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-secondary" />
                                      </a>
                                    ))
                                  ) : (
                                    experiences.map((exp) => (
                                      <Link
                                        key={exp.slug}
                                        href={`/experiences/${exp.slug}`}
                                        className="group/item flex items-center justify-between py-3 px-4 rounded-xl hover:bg-stone-50 transition-all duration-300"
                                      >
                                        <div>
                                          <p className="text-sm font-bold text-primary group-hover/item:text-secondary transition-colors">{exp.title}</p>
                                          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-0.5">{exp.difficulty} · {exp.duration}</p>
                                        </div>
                                        <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-secondary" />
                                      </Link>
                                    ))
                                  )}
                                </div>
                              </div>

                              {/* Menu Right (Conditional Content) */}
                              <div className="col-span-8 p-12 flex items-center gap-12 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                                {link.name === "Treks" ? (
                                  <>
                                    <div className="flex-1">
                                      <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Recommended Journey</span>
                                      <h3 className="font-[var(--heading-font)] text-4xl font-bold text-primary mb-6">Everest Base Camp</h3>
                                      <p className="text-stone-500 text-sm leading-relaxed mb-8 max-w-sm">
                                        Journey to the base of the world&apos;s highest peak through legendary Sherpa villages and ancient monasteries. Experience the pinnacle of Himalayan adventure.
                                      </p>
                                      <Link
                                        href="/treks"
                                        className="inline-flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-widest hover:text-secondary transition-colors"
                                      >
                                        Explore all adventures <ArrowRight size={16} />
                                      </Link>
                                    </div>

                                    <div className="flex-1 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                                      <Image
                                        src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070"
                                        alt="Everest Base Camp"
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-110"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                      <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex justify-between items-end">
                                          <div>
                                            <p className="text-white text-xl font-bold mb-1">Everest Base Camp</p>
                                            <p className="text-white/70 text-xs font-medium uppercase tracking-widest">14 Days · Khumbu Region</p>
                                          </div>
                                          <div className="bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                                            Best Seller
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="flex-1">
                                      <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">Featured Experience</span>
                                      <h3 className="font-[var(--heading-font)] text-4xl font-bold text-primary mb-6">{experiences[0].title}</h3>
                                      <p className="text-stone-500 text-sm leading-relaxed mb-8 max-w-sm">
                                        {experiences[0].description}
                                      </p>
                                      <Link
                                        href="/experiences"
                                        className="inline-flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-widest hover:text-secondary transition-colors"
                                      >
                                        Discover all experiences <ArrowRight size={16} />
                                      </Link>
                                    </div>

                                    <div className="flex-1 relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                                      <Image
                                        src={experiences[0].image}
                                        alt={experiences[0].title}
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-110"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                      <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex justify-between items-end">
                                          <div>
                                            <p className="text-white text-xl font-bold mb-1">{experiences[0].title}</p>
                                            <p className="text-white/70 text-xs font-medium uppercase tracking-widest">{experiences[0].subtitle}</p>
                                          </div>
                                          <div className="bg-[var(--accent)] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                                            Handpicked
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-6 border-l border-current/10 pl-10 ml-2">
              <button
                className={`p-2 transition-colors ${isScrolled ? "text-primary" : "text-white"} hover:text-secondary`}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              {/* <Link
                href="/contact"
                className={`
                  px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all
                  ${isScrolled
                    ? "bg-primary text-white hover:bg-secondary shadow-md"
                    : "bg-white text-primary hover:bg-secondary hover:text-white shadow-xl"}
                `}
              >
                Plan A Trip
              </Link> */}
            </div>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all ${isScrolled ? "text-primary border-black/5" : "text-white border-white/10"
                }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[150] bg-white lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col min-h-full">
              {/* Mobile Header */}
              <div className="p-6 flex items-center justify-between border-b border-black/5">
                <div className="relative w-40 h-10">
                  <Image src="/Images/Logo/logo-black.png" alt="Logo" fill className="object-contain" />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-stone-100 text-primary"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex-1 p-10 space-y-12">
                <div className="space-y-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Navigation</p>
                  <ul className="space-y-6">
                    {navLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-4xl font-[var(--heading-font)] font-bold text-primary flex items-center justify-between"
                        >
                          {link.name}
                          <ArrowRight size={24} className="text-secondary" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Exclusive Experiences</p>
                  <div className="grid grid-cols-1 gap-4">
                    {experiences.slice(0, 3).map((exp) => (
                      <Link
                        key={exp.slug}
                        href={`/experiences/${exp.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-4 bg-stone-50 p-6 rounded-3xl">
                          <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center overflow-hidden relative">
                            <Image src={exp.image} alt={exp.title} fill className="object-cover opacity-50" />
                            <Star size={20} className="relative z-10" />
                          </div>
                          <div>
                            <p className="font-bold text-primary">{exp.title}</p>
                            <p className="text-xs text-stone-400 mt-0.5">{exp.subtitle}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                    <Link
                      href="/experiences"
                      className="text-center py-4 text-xs font-bold uppercase tracking-widest text-secondary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      View All Experiences
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="p-10 bg-primary">
                <p className="text-white/50 text-sm mb-6">Ready for your adventure?</p>
                <Link
                  href="/contact"
                  className="block w-full text-center bg-secondary text-white py-6 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact An Expert
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
