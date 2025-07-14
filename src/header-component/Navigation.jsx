import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Scroll detection for navbar visibility and background
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setShowNavbar(false)
      } else {
        // Scrolling up
        setShowNavbar(true)
      }

      // Change background opacity based on scroll position
      setIsScrolled(currentScrollY > 50)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

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
      className={`navbar navbar-expand-lg fixed-top transition-all ${showNavbar ? "navbar-visible" : "navbar-hidden"}`}
      style={{
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        transition: "all 0.3s ease-in-out",
        transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
        zIndex: 1000,
        padding: "0.8rem 0",
      }}
    >
      <div className="container-fluid px-4">
        {/* Brand Logo */}
        <a
          id="navbar-brand"
          className="navbar-brand fw-bold"
          href="#"
          style={{
            fontFamily: "var(--heading-font)",
            fontSize: "1.8rem",
            color: isScrolled ? "var(--primary-color)" : "white",
            textShadow: isScrolled ? "none" : "2px 2px 4px rgba(0,0,0,0.7)",
            transition: "all 0.3s ease",
          }}
        >
          Nepal Travel Co
        </a>

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
              <a
                id="treks-dropdown"
                className="nav-link dropdown-toggle fw-semibold"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
                style={{
                  color: isScrolled ? "var(--text-color)" : "white",
                  textShadow: isScrolled ? "none" : "1px 1px 2px rgba(0,0,0,0.7)",
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease",
                }}
              >
                Treks
              </a>
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
                        <a href="#" className="footer-link">
                          All Trek Packages
                        </a>
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
                          <button className="explore-btn">Explore</button>
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
                  color: isScrolled ? "var(--text-color)" : "white",
                  textShadow: isScrolled ? "none" : "1px 1px 2px rgba(0,0,0,0.7)",
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
                        <a href="#" className="footer-link">
                          All Experiences
                        </a>
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
                          <img src="/placeholder.svg?height=300&width=500" alt="Adventure Experience" />
                        </div>
                        <div className="featured-text">
                          <h6>Featured: Ultimate Adventure Package</h6>
                          <button className="explore-btn">Explore</button>
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
                  color: isScrolled ? "var(--text-color)" : "white",
                  textShadow: isScrolled ? "none" : "1px 1px 2px rgba(0,0,0,0.7)",
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
                          <img src="/placeholder.svg?height=300&width=500" alt="Travel Planning" />
                        </div>
                        <div className="featured-text">
                          <h6>Featured: Complete Travel Guide</h6>
                          <button className="explore-btn">Explore</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>



            {/* Contact Us */}
            <li className="nav-item mx-3">
              <a
                id="contact-link"
                className="nav-link fw-semibold"
                href="#"
                style={{
                  color: isScrolled ? "var(--text-color)" : "white",
                  textShadow: isScrolled ? "none" : "1px 1px 2px rgba(0,0,0,0.7)",
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease",
                }}
              >
                Contact Us
                {/* <i className="fa-solid fa-phone" id="nav-contact"/> */}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        /* Navbar hover background effects */
        #main-navbar:hover{
          
          background-color: #fafafa !important;
          
        }
      
        #main-navbar:hover .nav-link{
          text-shadow: none !important;
          color: var(--text-color) !important;
          
        }

        

        #main-navbar:hover #navbar-brand{
          text-shadow: none !important;
          color: var(--primary-color) !important;
          
        }

        .nav-item {
          
          transition: all 0.3s ease;
          text-decoration: none !important;
        }


        

        .nav-link {
          font-family: var(--heading-font) !important;
          padding: 0.75rem 1rem !important;
          transition: all 0.3s ease !important;
        }

        #nav-contact{
          font-size: 1.5rem !important;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12) !important;
        }
        
        /* Finland-style Mega Menu */
        .finland-style-menu {
          position: absolute !important;
          top: 100% !important;
          left: 0 !important;
          right: 0 !important;
          width: 100vw !important;
          min-height: 60vh !important;
          background-color: #ffffff !important;
          border: none !important;
          border-radius: 0 !important;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12) !important;
          margin: 0 !important;
          padding: 0 !important;
          transform: translateY(-10px) !important;
          opacity: 0 !important;
          visibility: hidden !important;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
          z-index: 1000 !important;
        }

        .dropdown:hover .finland-style-menu,
        .dropdown.show .finland-style-menu {
          transform: translateY(0) !important;
          opacity: 1 !important;
          visibility: visible !important;
        }

        .menu-links-section {
          background-color: #f8f9fa;
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 60vh;
        }

        .menu-links-container {
          flex: 1;
        }

        .finland-menu-link {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          padding: 1.2rem 0 !important;
          text-decoration: none !important;
          color: var(--text-color) !important;
          font-family: var(--text-font) !important;
          font-size: 1.1rem !important;
          font-weight: 500 !important;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
          transition: all 0.3s ease !important;
        }

        .finland-menu-link:hover {
          color: var(--primary-color) !important;
          padding-left: 1rem !important;
        }

        .finland-menu-link:hover svg {
          color: var(--primary-color) !important;
        }

        .finland-menu-link svg {
          color: #999 !important;
          transition: all 0.3s ease !important;
        }

        .menu-footer-links {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .footer-link {
          display: block !important;
          color: var(--text-muted) !important;
          text-decoration: none !important;
          font-size: 0.9rem !important;
          margin-bottom: 0.5rem !important;
          transition: color 0.3s ease !important;
        }

        .footer-link:hover {
          color: var(--primary-color) !important;
        }

        .menu-featured-section {
          background-color: #ffffff;
          padding: 3rem 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .featured-content {
          text-align: center;
          max-width: 400px;
        }

        .featured-image {
          margin-bottom: 1.5rem;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .featured-image img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .featured-content:hover .featured-image img {
          transform: scale(1.05);
        }

        .featured-text h6 {
          font-family: var(--heading-font) !important;
          font-size: 1.2rem !important;
          font-weight: 600 !important;
          color: var(--text-color) !important;
          margin-bottom: 1rem !important;
          line-height: 1.4 !important;
        }

        .explore-btn {
          background-color: var(--primary-color) !important;
          color: white !important;
          border: none !important;
          padding: 0.75rem 2rem !important;
          font-family: var(--text-font) !important;
          font-weight: 600 !important;
          font-size: 1rem !important;
          border-radius: 6px !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
        }

        .explore-btn:hover {
          background-color: var(--button-hover) !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 15px rgba(76, 167, 113, 0.3) !important;
        }

        /* Mobile responsive adjustments */
        @media (max-width: 991.98px) {
          .finland-style-menu {
            position: static !important;
            width: 100% !important;
            min-height: auto !important;
            box-shadow: none !important;
            transform: none !important;
            opacity: 1 !important;
            visibility: visible !important;
          }

          .menu-links-section,
          .menu-featured-section {
            padding: 1.5rem !important;
            min-height: auto !important;
          }

          .featured-image img {
            height: 200px !important;
          }

          .nav-item:hover {
            background-color: rgba(76, 167, 113, 0.1) !important;
          }

          .nav-link:hover {
            background-color: rgba(76, 167, 113, 0.1) !important;
          }
        }

        @media (max-width: 576px) {
          .finland-menu-link {
            font-size: 1rem !important;
            padding: 1rem 0 !important;
          }

          .featured-image img {
            height: 150px !important;
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </nav>
  )
}

export default Navigation
