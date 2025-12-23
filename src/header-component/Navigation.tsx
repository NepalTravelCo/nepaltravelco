"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    if (!isHomePage) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false)
      } else {
        setShowNavbar(true)
      }

      setIsScrolled(currentScrollY > 50)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, isHomePage])

  const logoSrc = isHomePage
    ? isScrolled || isHovered
      ? "/Images/Logo/logo-black.png"
      : "/Images/Logo/logo-white.png"
    : "/Images/Logo/logo-black.png"

  return (
    <nav
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        fixed top-0 inset-x-0 z-50
        transition-all duration-300 ease-in-out
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}
        ${isHomePage
          ? isScrolled || isHovered
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
          : "bg-white shadow-lg"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="relative w-[200px] h-[60px]">
          <Image
            src={logoSrc}
            alt="Nepal Travel Logo"
            fill
            className="object-contain scale-110 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-10 font-semibold">

          {/* Treks */}
          <li className="relative group">
            <span
              className={`cursor-pointer transition-colors duration-300
                ${isHomePage && !isScrolled && !isHovered ? "text-white" : "text-gray-800"}
                group-hover:text-primary`}
            >
              Treks
            </span>

            {/* Mega Menu */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[100vw] max-w-5xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="bg-white shadow-xl rounded-xl overflow-hidden grid grid-cols-12">

                {/* Left */}
                <div className="col-span-5 bg-gray-50 p-8 space-y-4">
                  {[
                    "Annapurna Region",
                    "Everest Region",
                    "Langtang Region",
                    "Manaslu Region",
                    "Mustang Region",
                    "Dolpo Region",
                  ].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="flex justify-between items-center border-b border-gray-300 pb-3 hover:text-primary transition-all text-gray-700 font-medium"
                    >
                      {item}
                      <span>→</span>
                    </a>
                  ))}
                </div>

                {/* Right */}
                <div className="col-span-7 flex items-center justify-center p-8">
                  <div className="text-center max-w-md">
                    <img
                      src="https://i.pinimg.com/1200x/ed/88/9e/ed889e427302a442d8978df9611941d4.jpg"
                      className="rounded-xl shadow-lg mb-6 h-[250px] w-full object-cover"
                      alt="Nepal Himalayas"
                    />
                    <h6 className="font-semibold mb-4 text-gray-800 text-lg">
                      Nepal – Land of the Himalayas
                    </h6>
                    <Link href="/treks">
                      <button className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-accent transition">
                        Explore Treks
                      </button>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </li>

          {/* Experiences */}
          <li>
            <Link
              href="/experiences"
              className={`${isHomePage && !isScrolled && !isHovered ? "text-white" : "text-gray-800"} hover:text-primary transition-colors duration-300`}
            >
              Experiences
            </Link>
          </li>

          {/* Plan */}
          <li>
            <Link
              href="/travel-guide"
              className={`${isHomePage && !isScrolled && !isHovered ? "text-white" : "text-gray-800"} hover:text-primary transition-colors duration-300`}
            >
              Plan Your Trip
            </Link>
          </li>

          {/* Contact */}
          <li>
            <Link
              href="/contact"
              className={`${isHomePage && !isScrolled && !isHovered ? "text-white" : "text-gray-800"} hover:text-primary transition-colors duration-300`}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-2xl text-gray-800">
          ☰
        </button>
      </div>
    </nav>
  )
}

export default Navigation
