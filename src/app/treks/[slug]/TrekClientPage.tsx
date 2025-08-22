"use client"
import { getTrekBySlug } from "@/data/Treks"
import { Mountain, Calendar, Users, MapPin, ChevronDown, ChevronUp, Star, Clock, X, ArrowLeft } from "lucide-react"
import Link from "next/link"
import "./trek-details.css"
import React from "react"

type TrekPageProps = {
  params: { slug: string }
}

function GokyoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const gokyoData = {
    name: "Gokyo Lakes Trek",
    duration: "12-14 days",
    altitude: "5,357m",
    highlights: [
      "Six pristine turquoise lakes",
      "Gokyo Ri summit with panoramic views",
      "Less crowded alternative to EBC",
      "Views of Everest, Lhotse, Makalu, and Cho Oyu",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Fly to Lukla, trek to Phakding",
        description: "Short flight to Lukla followed by gentle trek to Phakding",
      },
      {
        day: "Day 2",
        title: "Trek to Namche Bazaar",
        description: "Cross suspension bridges and climb to the Sherpa capital",
      },
      {
        day: "Day 3",
        title: "Acclimatization in Namche",
        description: "Rest day with optional hikes for acclimatization",
      },
      { day: "Day 4", title: "Trek to Dole", description: "Leave the main EBC trail and head towards Gokyo valley" },
      { day: "Day 5", title: "Trek to Machhermo", description: "Continue up the Dudh Koshi valley" },
      { day: "Day 6", title: "Trek to Gokyo", description: "Reach the third Gokyo lake and the village" },
      { day: "Day 7", title: "Climb Gokyo Ri", description: "Early morning summit for spectacular mountain views" },
    ],
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{gokyoData.name}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-stats">
            <div className="modal-stat">
              <Mountain size={20} />
              <span>{gokyoData.altitude}</span>
            </div>
            <div className="modal-stat">
              <Calendar size={20} />
              <span>{gokyoData.duration}</span>
            </div>
          </div>

          <div className="modal-highlights">
            <h3>Highlights</h3>
            {gokyoData.highlights.map((highlight, idx) => (
              <div key={idx} className="modal-highlight">
                <Star size={16} />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          <div className="modal-itinerary">
            <h3>Sample Itinerary</h3>
            {gokyoData.itinerary.map((day, idx) => (
              <div key={idx} className="modal-day">
                <div className="modal-day-number">{day.day}</div>
                <div className="modal-day-content">
                  <h4>{day.title}</h4>
                  <p>{day.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ItineraryToggle({ itinerary }: { itinerary: any[] }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeDay, setActiveDay] = React.useState<number | null>(null)

  return (
    <div className="itinerary-section">
      <div className="section-header" onClick={() => setIsOpen(!isOpen)}>
        <h2 className="section-title">Day-by-Day Itinerary</h2>
        <button className="toggle-button">{isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}</button>
      </div>

      {isOpen && (
        <div className="itinerary-content">
          <div className="itinerary-layout">
            <div className="itinerary-map">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Evetrest%20trek-uPtS1zBSQfQxCDFqwDRasxJABsAPCC.png"
                alt="Everest Trek Route Map"
                className="trek-map"
              />
            </div>

            <div className="itinerary-list">
              {itinerary.map((day, idx) => (
                <div
                  key={day.day}
                  className={`itinerary-item ${activeDay === idx ? "active" : ""}`}
                  onClick={() => setActiveDay(activeDay === idx ? null : idx)}
                >
                  <div className="day-marker">
                    <span>{day.day}</span>
                  </div>
                  <div className="day-details">
                    <h3 className="day-title">{day.title}</h3>
                    {activeDay === idx && <p className="day-description">{day.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function TrekPage({ params }: TrekPageProps) {
  const { slug } = params
  const trek = getTrekBySlug(slug)
  const [isGokyoModalOpen, setIsGokyoModalOpen] = React.useState(false)

  if (!trek) {
    return <div className="not-found">Trek not found</div>
  }

  const showGokyoExtension = slug === "everest-base-camp"

  return (
    <div className="inner-pages-container">
      <div className="trek-hero" style={{ backgroundImage: `url(${trek.image})` }}>
        <Link href="/treks" className="back-button">
          <div className="back-button-inner">
            <ArrowLeft size={20} />
            Back
          </div>
        </Link>

        <div className="hero-container">
          <div className="hero-content">
            <div className="altitude-info">
              <p className="altitude-text">{trek.altitude.toLocaleString()}m above sea level</p>
            </div>

            <div className="hero-title-section">
              <h1 className="hero-main-title">{trek.name}</h1>
            </div>

            <div className="hero-buttons">
              <button className="primary-button">Book Now</button>
              <button className="secondary-button">Download Itinerary</button>
            </div>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="info-cards">
          <div className="info-card">
            <Calendar size={24} />
            <div>
              <span className="card-label">Duration</span>
              <span className="card-value">{trek.duration}</span>
            </div>
          </div>

          <div className="info-card">
            <Users size={24} />
            <div>
              <span className="card-label">Difficulty</span>
              <span className="card-value">{trek.difficulty}</span>
            </div>
          </div>

          <div className="info-card">
            <MapPin size={24} />
            <div>
              <span className="card-label">Best Months</span>
              <span className="card-value">{trek.bestMonths.join(", ")}</span>
            </div>
          </div>
        </div>

        {trek.highlights?.length > 0 && (
          <section className="highlights-section">
            <h2 className="section-title">Trek Highlights</h2>
            <div className="highlights-list">
              {trek.highlights.map((highlight, idx) => (
                <div key={idx} className="highlight-item">
                  <span className="highlight-dot"></span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {showGokyoExtension && (
          <section className="gokyo-section">
            <h2 className="section-title">Gokyo Lakes Extension</h2>
            <div className="gokyo-content">
              <div className="gokyo-info">
                <div className="gokyo-highlight">
                  <Star className="gokyo-icon" size={20} />
                  <span>Sacred turquoise lakes at 4,700m</span>
                </div>
                <div className="gokyo-highlight">
                  <Mountain className="gokyo-icon" size={20} />
                  <span>Gokyo Ri summit (5,357m)</span>
                </div>
                <div className="gokyo-highlight">
                  <Clock className="gokyo-icon" size={20} />
                  <span>Additional 3-4 days</span>
                </div>
              </div>
              <p className="gokyo-description">
                Extend your adventure with the pristine Gokyo Lakes, offering stunning reflections of Everest and Cho
                Oyu.
              </p>
              <button className="gokyo-button" onClick={() => setIsGokyoModalOpen(true)}>
                Explore Gokyo Trek
              </button>
            </div>
          </section>
        )}

        {trek.itinerary.length > 0 && <ItineraryToggle itinerary={trek.itinerary} />}

        {trek.tips?.length > 0 && (
          <section className="tips-section">
            <h2 className="section-title">Essential Tips</h2>
            <div className="tips-list">
              {trek.tips.map((tip, idx) => (
                <div key={idx} className="tip-item">
                  <span className="tip-dot"></span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="info-sections">
          {trek.estimatedCost && (
            <section className="cost-section">
              <h3 className="subsection-title">Estimated Cost</h3>
              <p className="cost-budget">{trek.estimatedCost.budget}</p>
              <div className="includes-list">
                {trek.estimatedCost.includes.map((item, idx) => (
                  <span key={idx} className="include-item">
                    {item}
                  </span>
                ))}
              </div>
            </section>
          )}

          {trek.permits.length > 0 && (
            <section className="permits-section">
              <h3 className="subsection-title">Permits Required</h3>
              <div className="permits-list">
                {trek.permits.map((permit, idx) => (
                  <span key={idx} className="permit-item">
                    {permit}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        <section className="booking-section">
          <div className="booking-content">
            <h2 className="booking-title">Ready for Adventure?</h2>
            <p className="booking-subtitle">Join us on this incredible journey through the Himalayas</p>
            <div className="booking-actions">
              <button className="book-button">Book This Trek</button>
              <button className="info-button">Get More Info</button>
            </div>
          </div>
        </section>
      </div>

      {showGokyoExtension && <GokyoModal isOpen={isGokyoModalOpen} onClose={() => setIsGokyoModalOpen(false)} />}
    </div>
  )
}
