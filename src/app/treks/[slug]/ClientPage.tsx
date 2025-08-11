"use client"

import { trekkinginfo } from "../../../data/Treks"
import { AnimatedAltitude } from "../../components/animated-altitude"
import { Mountain, MapPin, Calendar, Users, Shield, ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import "./trek-details.css"

interface TrekPageProps {
  params: {
    slug: string
  }
}

export default function ClientTrekPage({ params }: TrekPageProps) {
  const trek = trekkinginfo.find((t) => t.id.toString() === params.slug)

  if (!trek) {
    notFound()
  }

  const trekIndex = trekkinginfo.findIndex((t) => t.id === trek.id)

  const getHeroTitle = (index: number) => {
    const titles = [
      { title: "Experience the highest peaks", subtitle: "Journey to the roof of the world" },
      { title: "Revolutionizing the ways we trek", subtitle: "Modern adventure meets ancient trails" },
      { title: "Discover ancient cultures", subtitle: "Walk through living history" },
      { title: "Journey through wilderness", subtitle: "Untamed beauty awaits" },
      { title: "Explore sacred valleys", subtitle: "Where spirituality meets nature" },
      { title: "Venture into mystique", subtitle: "Uncover hidden treasures" },
    ]
    return titles[index] || titles[0]
  }

  const heroContent = getHeroTitle(trekIndex)

  return (
    <div style={{ minHeight: "100vh", fontFamily: "var(--text-font)" }}>
      {/* Hero Section with Animated Altitude */}
      <div
        className="trek-hero"
        style={{
          backgroundImage: `url("${trek.imageUrl}")`,
        }}
      >
        {/* Back Button */}
        <Link href="/treks" className="back-button">
          <button className="back-button-inner">
            <ArrowLeft size={16} />
            Back to Treks
          </button>
        </Link>

        <div className="hero-container">
          <div className="row align-items-center g-4">
            {/* Animated Altitude */}
            <div className="col-lg-6 d-flex justify-content-center">
              <AnimatedAltitude altitude={trek.maxAltitude} index={trekIndex} />
            </div>

            {/* Trek Information */}
            <div className="col-lg-6 hero-content">
              <div className="altitude-info">
                <p className="altitude-text">
                  meters
                  <br />
                  maximum
                  <br />
                  altitude
                </p>
              </div>

              <div className="hero-title-section">
                <h1 className="hero-main-title">
                  {heroContent.title.split(" ").map((word, i) => (
                    <span key={i}>
                      {word}
                      {i < heroContent.title.split(" ").length - 1 && <br />}
                    </span>
                  ))}
                </h1>
                <p className="hero-subtitle">{heroContent.subtitle}</p>
              </div>

              <div className="trek-info-section">
                <h2 className="trek-name">{trek.name}</h2>
                <p className="trek-location-info">
                  <MapPin size={20} />
                  {trek.location}
                </p>
              </div>

              <p className="trek-description-hero">
                {trek.description} This incredible journey takes you through diverse landscapes, from{" "}
                {trek.altitude.split(" to ")[0]} all the way up to {trek.altitude.split(" to ")[1]}.
              </p>

              <div className="elevation-badge">Elevation: {trek.altitude}</div>

              <div className="hero-buttons">
                <button className="btn primary-button">Book This Trek</button>
                <button className="btn secondary-button">View Itinerary</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trek Details Section */}
      <div className="trek-details">
        <div className="container">
          <div className="row g-4">
            {/* Main Content */}
            <div className="col-lg-8">
              <div className="mb-5">
                <h2 className="section-title">About This Trek</h2>
                <div className="about-text">
                  <p>
                    The {trek.name} offers one of Nepal&apos;s most spectacular trekking experiences. Located in the{" "}
                    {trek.location}, this trek combines breathtaking mountain views, rich cultural encounters, and
                    diverse landscapes that will leave you with memories to last a lifetime.
                  </p>
                  <p>
                    Starting from {trek.altitude.split(" to ")[0]}, you&apos;ll gradually ascend through various climate
                    zones, experiencing everything from subtropical forests to alpine meadows, culminating at the
                    maximum altitude of {trek.maxAltitude.toLocaleString()} meters.
                  </p>
                </div>
              </div>

              {/* Features Grid */}
              <div className="row g-3">
                {[
                  {
                    icon: Mountain,
                    title: "Difficulty Level",
                    content: "Moderate to Challenging",
                    desc: "Suitable for experienced trekkers with good physical fitness",
                    color: "var(--accent-color)",
                  },
                  {
                    icon: Calendar,
                    title: "Best Season",
                    content: "March-May, September-November",
                    desc: "Clear mountain views and stable weather conditions",
                    color: "var(--secondary-color)",
                  },
                  {
                    icon: Users,
                    title: "Group Size",
                    content: "2-12 people",
                    desc: "Small groups for personalized experience",
                    color: "var(--nepal-blue)",
                  },
                  {
                    icon: Shield,
                    title: "Safety",
                    content: "Fully Guided",
                    desc: "Experienced guides and safety equipment included",
                    color: "var(--nepal-crimson)",
                  },
                ].map((feature, index) => (
                  <div key={index} className="col-md-6">
                    <div className="feature-card">
                      <div className="feature-header">
                        <feature.icon size={20} style={{ color: feature.color }} />
                        <h3 className="feature-title">{feature.title}</h3>
                      </div>
                      <p className="feature-content">{feature.content}</p>
                      <p className="feature-desc">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="sidebar-card">
                <h3 className="sidebar-title">Quick Facts</h3>
                <div>
                  {[
                    { label: "Max Altitude:", value: `${trek.maxAltitude.toLocaleString()}m` },
                    { label: "Duration:", value: "12-16 days" },
                    { label: "Distance:", value: "~150km" },
                    { label: "Accommodation:", value: "Tea Houses" },
                  ].map((fact, index) => (
                    <div key={index} className="fact-row">
                      <span className="fact-label">{fact.label}</span>
                      <span className="fact-value">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sidebar-card">
                <h3 className="sidebar-title">What's Included</h3>
                <ul className="included-list">
                  {[
                    "Experienced trekking guide",
                    "Porter service",
                    "All permits and fees",
                    "Accommodation during trek",
                    "Three meals a day",
                    "First aid kit",
                    "Transportation to/from trailhead",
                  ].map((item, index) => (
                    <li key={index} className="included-item">
                      ✓ {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-primary book-button">Book Now - $1,299</button>
                <button className="btn btn-outline-primary download-button">Download Itinerary</button>
                <button className="btn ask-button">Ask Questions</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Treks */}
      <div className="related-treks">
        <div className="container">
          <h2 className="related-title">Other Amazing Treks</h2>
          <div className="row g-4">
            {trekkinginfo
              .filter((t) => t.id !== trek.id)
              .slice(0, 3)
              .map((relatedTrek) => (
                <div key={relatedTrek.id} className="col-lg-4 col-md-6">
                  <div className="card h-100">
                    <div className="related-image">
                      <Image
                        src={relatedTrek.imageUrl || "/placeholder.svg"}
                        alt={relatedTrek.name}
                        fill
                        style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
                      />
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h3 className="related-trek-title">{relatedTrek.name}</h3>
                      <p className="related-location">{relatedTrek.location}</p>
                      <p className="related-description flex-grow-1">{relatedTrek.description}</p>
                      <Link
                        href={`/treks/${relatedTrek.id}`}
                        className="btn btn-outline-primary explore-button mt-auto"
                      >
                        Explore Trek
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
