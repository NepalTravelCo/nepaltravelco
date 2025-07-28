"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import "./Navigation.css"
import { usePathname } from "next/navigation"




const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname(); //  GET CURRENT ROUTE
  const isHomePage = pathname === "/"; //  CHECK IF HOMEPAGE

  useEffect(() => {
    if (!isHomePage) return; 

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isHomePage]);

  // Scroll detection for navbar visibility and background
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY

  //     // Show/hide navbar based on scroll direction
  //     if (currentScrollY > lastScrollY && currentScrollY > 100) {
        
  //       setShowNavbar(false)
  //     } else {
  //       // Scrolling up
  //       setShowNavbar(true)
  //     }

      
  //     setIsScrolled(currentScrollY > 50)
  //     setLastScrollY(currentScrollY)
  //   }

  //   window.addEventListener("scroll", handleScroll, { passive: true })
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [lastScrollY])

  // Initialize Bootstrap dropdowns
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
      
  //     import("bootstrap/dist/js/bootstrap.bundle.min.js").then(() => {
        
  //       const dropdownElementList = document.querySelectorAll(".dropdown-toggle")
  //       dropdownElementList.forEach((dropdownToggleEl) => {
  //         if (window.bootstrap) {
  //           new window.bootstrap.Dropdown(dropdownToggleEl)
  //         }
  //       })
  //     })
  //   }
  // }, [])

  return (
    <nav
        id="main-navbar"
        className={`navbar navbar-expand-lg fixed-top transition-all ${showNavbar ? "navbar-visible" : "navbar-hidden"} ${isScrolled ? "scrolled" : ""}`}
        style={{
          backgroundColor: isHomePage
            ? isScrolled
              ? "rgba(255, 255, 255, 0.95)"
              : "transparent"
            : "rgba(255, 255, 255, 1)", // normal background on other pages

          backdropFilter: isHomePage && isScrolled ? "blur(10px)" : "none",

          transform:
            isHomePage && !showNavbar ? "translateY(-100%)" : "translateY(0)",

          transition: "all 0.3s ease-in-out",
          zIndex: 1000,
          padding: "0.8rem 0",
        }}
      >

      <div className="container-fluid px-4">
        {/* Brand Logo */}
        <Link
          id="navbar-brand"
          className="navbar-brand fw-bold"
          href="/"
          style={{
            fontFamily: "var(--heading-font)",
            fontSize: "1.8rem",
            color: isHomePage
              ? isScrolled
                ? "var(--primary-color)"
                : "white"
              : "var(--primary-color) !important",
            textShadow: isHomePage && !isScrolled ? "2px 2px 4px rgba(0,0,0,0.7)" : "none",
            transition: "all 0.3s ease",
          }}
        >
          Nepal Travel Co
        </Link>

        {/* Mobile Toggle Button */}
        <button
          id="navbar-toggler"
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            color: isScrolled ? "var(--primary-color)" : "white",
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Menu */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul id="navbar-nav" className="navbar-nav">
            {/* Treks Dropdown */}
            <li className="nav-item dropdown position-static mx-3">
              <Link
                id="treks-dropdown"
                className="nav-link dropdown-toggle fw-semibold"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
                style={{
                  color: isHomePage
                    ? isScrolled
                      ? "var(--text-color)"
                      : "white"
                    : "var(--text-color)", //  Always readable on other pages
                  textShadow: isHomePage && !isScrolled ? "1px 1px 2px rgba(0,0,0,0.7)" : "none",
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease",
                }}

              >
                Treks
              </Link>
              <div className="dropdown-menu finland-style-menu" id="treks-submenu">
                <div className="container-fluid">
                  <div className="row h-100">
                    <div className="col-lg-5 col-md-6 menu-links-section">
                      <div className="menu-links-container">
                        <a href="#" className="finland-menu-link" id="annapurna-link">
                          <span>Annapurna Region</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </a>
                        <a href="#" className="finland-menu-link" id="everest-link">
                          <span>Everest Region</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </a>
                        <a href="#" className="finland-menu-link" id="langtang-link">
                          <span>Langtang Region</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </a>
                        <a href="#" className="finland-menu-link" id="manaslu-link">
                          <span>Manaslu Region</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </a>
                        <a href="#" className="finland-menu-link" id="mustang-link">
                          <span>Mustang Region</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </a>
                        <a href="#" className="finland-menu-link" id="dolpo-link">
                          <span>Dolpo Region</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </a>
                      </div>
                      <div className="menu-footer-links">
                        <Link href="/treks" className="footer-link">
                          All Trek Packages
                        </Link>
                        <a href="#" className="footer-link">
                          Custom Treks
                        </a>
                        <a href="#" className="footer-link">
                          Trek Calendar
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-7 col-md-6 menu-featured-section">
                      <div className="featured-content">
                        <div className="featured-image">
                          <img src="https://i.pinimg.com/1200x/ed/88/9e/ed889e427302a442d8978df9611941d4.jpg?" alt="Himalayan Trek" />
                        </div>
                        <div className="featured-text">
                          <h6>Featured: Nepal – Land of the Himalayas</h6>
                          <Link href="/treks"><button className="explore-btn" > Explore Treks </button></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* Experiences Dropdown */}
            <li className="nav-item dropdown position-static mx-3">
              <a
                id="experiences-dropdown"
                className="nav-link dropdown-toggle fw-semibold"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
                style={{
                  color: isHomePage
                    ? isScrolled
                      ? "var(--text-color)"
                      : "white"
                    : "var(--text-color)", //  Always readable on other pages
                  textShadow: isHomePage && !isScrolled ? "1px 1px 2px rgba(0,0,0,0.7)" : "none",
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease",
                }}

              >
                Experiences
              </a>
              <div className="dropdown-menu finland-style-menu" id="experiences-submenu">
                <div className="container-fluid">
                  <div className="row h-100">
                    <div className="col-lg-5 col-md-6 menu-links-section">
                      <div className="menu-links-container">
                        <a href="#" className="finland-menu-link" id="helicopter-tours-link">
                          <span>Helicopter Tours</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </a>
                        <a href="#" className="finland-menu-link" id="bike-mustang-link">
                          <span>Bike to Mustang</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </a>
                        <a href="#" className="finland-menu-link" id="adventure-sports-link">
                          <span>Adventure Sports</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </a>
                        <a href="#" className="finland-menu-link" id="cultural-tours-link">
                          <span>Cultural Tours</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </a>
                      </div>
                      <div className="menu-footer-links">
                        <Link href="/experiences" className="footer-link">
                          All Experiences
                        </Link>
                        <a href="#" className="footer-link">
                          Group Tours
                        </a>
                        <a href="#" className="footer-link">
                          Private Tours
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-7 col-md-6 menu-featured-section">
                      <div className="featured-content">
                        <div className="featured-image">
                          <img src="https://i.pinimg.com/736x/ba/aa/31/baaa31338e0f9e1df9e3079368ffbe46.jpg" alt="Adventure Experience" />
                        </div>
                        <div className="featured-text">
                          <h6>Featured: Ultimate Adventure Package</h6>
                          <Link href="/experiences"><button className="explore-btn">Explore Adventures</button></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            

            {/* Plan Your Trip Dropdown */}
            <li className="nav-item dropdown position-static mx-3">
              <a
                id="plan-trip-dropdown"
                className="nav-link dropdown-toggle fw-semibold"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
                style={{
                  color: isHomePage
                    ? isScrolled
                      ? "var(--text-color)"
                      : "white"
                    : "var(--text-color)", // Always readable on other pages
                  textShadow: isHomePage && !isScrolled ? "1px 1px 2px rgba(0,0,0,0.7)" : "none",
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease",
                }}

              >
                Plan Your Trip
              </a>
              <div className="dropdown-menu finland-style-menu" id="plan-trip-submenu">
                <div className="container-fluid">
                  <div className="row h-100">
                    <div className="col-lg-5 col-md-6 menu-links-section">
                      <div className="menu-links-container">
                        <a href="#" className="finland-menu-link" id="visa-link">
                          <span>Visa Information</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </a>
                        <a href="#" className="finland-menu-link" id="weather-link">
                          <span>Weather & Climate</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </a>
                        <a href="#" className="finland-menu-link" id="essential-facts-link">
                          <span>Essential Facts</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </a>
                        <a href="#" className="finland-menu-link" id="sustainable-travel-link">
                          <span>Sustainable Travel</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </a>
                        <a href="#" className="finland-menu-link" id="faqs-link">
                          <span>FAQs</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </a>
                      </div>
                      <div className="menu-footer-links">
                        <a href="#" className="footer-link">
                          Travel Insurance
                        </a>
                        <a href="#" className="footer-link">
                          Packing Lists
                        </a>
                        <a href="#" className="footer-link">
                          Health & Safety
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-7 col-md-6 menu-featured-section">
                      <div className="featured-content">
                        <div className="featured-image">
                          <img src="https://i.pinimg.com/736x/62/be/16/62be1628d358998fa4d41a4d3b63adb1.jpg" alt="Travel Planning" />
                        </div>
                        <div className="featured-text">
                          <h6>Featured: Complete Travel Guide</h6>
                          <Link href="/travel-guide"><button className="explore-btn">Travel Guide</button></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>



            {/* Contact Us */}
            <li className="nav-item mx-3">
              <Link
                id="contact-link"
                className="nav-link fw-semibold"
                href="/contact"
                style={{
                  color: isHomePage
                    ? isScrolled
                      ? "var(--text-color)"
                      : "white"
                    : "var(--text-color)", //  Always readable on other pages
                  textShadow: isHomePage && !isScrolled ? "1px 1px 2px rgba(0,0,0,0.7)" : "none",
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease",
                }}

              >
                Contact Us
                {/* <i className="fa-solid fa-phone" id="nav-contact"/> */}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        /* Navbar hover background effects */

        #main-navbar {
        box-shadow:  isScrolled? 0 4px 15px rgba(0, 0, 0, 0.5) !important;
        transition: all 0.3s ease !important;
        }
        #main-navbar:hover{
          
          background-color: #fafafa !important;
          
        }
      
        
      `}</style>
    </nav>
  )
}

export default Navigation
