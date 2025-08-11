"use client"

import { trekkinginfo } from "../../../data/Treks"
import { AnimatedAltitude } from "../../components/animated-altitude"
import { Mountain, MapPin, Calendar, Users, Shield, ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

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
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${trek.imageUrl}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Back Button */}
        <Link
          href="/treks"
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            zIndex: 10,
            textDecoration: "none",
          }}
        >
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "var(--border-radius)",
              fontSize: "0.875rem",
              fontFamily: "var(--text-font)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"
            }}
          >
            <ArrowLeft size={16} />
            Back to Treks
          </button>
        </Link>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", width: "100%" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            {/* Animated Altitude */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <AnimatedAltitude altitude={trek.maxAltitude} index={trekIndex} />
            </div>

            {/* Trek Information */}
            <div style={{ color: "white" }}>
              <div style={{ marginBottom: "2rem" }}>
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontFamily: "var(--text-font)",
                    lineHeight: "1.3",
                    opacity: "0.9",
                  }}
                >
                  meters
                  <br />
                  maximum
                  <br />
                  altitude
                </p>
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <h1
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 4rem)",
                    fontFamily: "var(--heading-font)",
                    fontWeight: "var(--heading-weight)",
                    lineHeight: "1.1",
                    marginBottom: "1rem",
                  }}
                >
                  {heroContent.title.split(" ").map((word, i) => (
                    <span key={i}>
                      {word}
                      {i < heroContent.title.split(" ").length - 1 && <br />}
                    </span>
                  ))}
                </h1>
                <p
                  style={{
                    fontSize: "1.25rem",
                    opacity: "0.8",
                    fontFamily: "var(--text-font)",
                  }}
                >
                  {heroContent.subtitle}
                </p>
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <h2
                  style={{
                    fontSize: "2rem",
                    fontFamily: "var(--heading-font)",
                    fontWeight: "var(--heading-weight)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {trek.name}
                </h2>
                <p
                  style={{
                    fontSize: "1.1rem",
                    opacity: "0.75",
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "var(--text-font)",
                  }}
                >
                  <MapPin size={20} style={{ marginRight: "0.5rem" }} />
                  {trek.location}
                </p>
              </div>

              <p
                style={{
                  fontSize: "var(--text-size)",
                  lineHeight: "var(--line-height)",
                  maxWidth: "500px",
                  opacity: "0.9",
                  marginBottom: "2rem",
                  fontFamily: "var(--text-font)",
                }}
              >
                {trek.description} This incredible journey takes you through diverse landscapes, from{" "}
                {trek.altitude.split(" to ")[0]} all the way up to {trek.altitude.split(" to ")[1]}.
              </p>

              <div style={{ marginBottom: "2rem" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    fontFamily: "var(--text-font)",
                  }}
                >
                  Elevation: {trek.altitude}
                </span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <button
                  style={{
                    padding: "1rem 2rem",
                    backgroundColor: "white",
                    color: "var(--primary-color)",
                    border: "none",
                    borderRadius: "var(--border-radius-large)",
                    fontSize: "1.1rem",
                    fontFamily: "var(--text-font)",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow = "var(--shadow-medium)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "none"
                  }}
                >
                  Book This Trek
                </button>
                <button
                  style={{
                    padding: "1rem 2rem",
                    backgroundColor: "transparent",
                    color: "white",
                    border: "2px solid white",
                    borderRadius: "var(--border-radius-large)",
                    fontSize: "1.1rem",
                    fontFamily: "var(--text-font)",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "white"
                    e.currentTarget.style.color = "var(--primary-color)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent"
                    e.currentTarget.style.color = "white"
                  }}
                >
                  View Itinerary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trek Details Section */}
      <div style={{ padding: "5rem 0", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--container-padding)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "3rem",
              "@media (max-width: 768px)": {
                gridTemplateColumns: "1fr",
              },
            }}
          >
            {/* Main Content */}
            <div>
              <div style={{ marginBottom: "3rem" }}>
                <h2
                  style={{
                    fontSize: "2rem",
                    fontFamily: "var(--heading-font)",
                    fontWeight: "var(--heading-weight)",
                    color: "var(--primary-color)",
                    marginBottom: "1.5rem",
                  }}
                >
                  About This Trek
                </h2>
                <div
                  style={{ fontSize: "var(--text-size)", lineHeight: "var(--line-height)", color: "var(--text-color)" }}
                >
                  <p style={{ marginBottom: "1rem" }}>
                    The {trek.name} offers one of Nepal's most spectacular trekking experiences. Located in the{" "}
                    {trek.location}, this trek combines breathtaking mountain views, rich cultural encounters, and
                    diverse landscapes that will leave you with memories to last a lifetime.
                  </p>
                  <p>
                    Starting from {trek.altitude.split(" to ")[0]}, you'll gradually ascend through various climate
                    zones, experiencing everything from subtropical forests to alpine meadows, culminating at the
                    maximum altitude of {trek.maxAltitude.toLocaleString()} meters.
                  </p>
                </div>
              </div>

              {/* Features Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1.5rem",
                }}
              >
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
                  <div
                    key={index}
                    style={{
                      backgroundColor: "white",
                      padding: "var(--card-padding)",
                      borderRadius: "var(--border-radius)",
                      boxShadow: "var(--shadow-soft)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                      <feature.icon size={20} style={{ marginRight: "0.5rem", color: feature.color }} />
                      <h3
                        style={{
                          fontSize: "1.1rem",
                          fontFamily: "var(--heading-font)",
                          fontWeight: "600",
                          color: "var(--primary-color)",
                        }}
                      >
                        {feature.title}
                      </h3>
                    </div>
                    <p style={{ fontWeight: "600", marginBottom: "0.5rem", color: "var(--text-color)" }}>
                      {feature.content}
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: "1.4" }}>
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "var(--card-padding)",
                  borderRadius: "var(--border-radius)",
                  boxShadow: "var(--shadow-medium)",
                  marginBottom: "2rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontFamily: "var(--heading-font)",
                    fontWeight: "600",
                    color: "var(--primary-color)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Quick Facts
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[
                    { label: "Max Altitude:", value: `${trek.maxAltitude.toLocaleString()}m` },
                    { label: "Duration:", value: "12-16 days" },
                    { label: "Distance:", value: "~150km" },
                    { label: "Accommodation:", value: "Tea Houses" },
                  ].map((fact, index) => (
                    <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: "500", color: "var(--text-color)" }}>{fact.label}</span>
                      <span style={{ color: "var(--text-muted)" }}>{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "white",
                  padding: "var(--card-padding)",
                  borderRadius: "var(--border-radius)",
                  boxShadow: "var(--shadow-medium)",
                  marginBottom: "2rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontFamily: "var(--heading-font)",
                    fontWeight: "600",
                    color: "var(--primary-color)",
                    marginBottom: "1.5rem",
                  }}
                >
                  What's Included
                </h3>
                <ul style={{ listStyle: "none", padding: 0, fontSize: "0.875rem", lineHeight: "1.6" }}>
                  {[
                    "Experienced trekking guide",
                    "Porter service",
                    "All permits and fees",
                    "Accommodation during trek",
                    "Three meals a day",
                    "First aid kit",
                    "Transportation to/from trailhead",
                  ].map((item, index) => (
                    <li key={index} style={{ marginBottom: "0.5rem", color: "var(--text-color)" }}>
                      ✓ {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <button
                  style={{
                    width: "100%",
                    padding: "1rem",
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                    border: "none",
                    borderRadius: "var(--border-radius)",
                    fontSize: "1.1rem",
                    fontFamily: "var(--text-font)",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--button-hover)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--primary-color)"
                  }}
                >
                  Book Now - $1,299
                </button>
                <button
                  style={{
                    width: "100%",
                    padding: "1rem",
                    backgroundColor: "transparent",
                    color: "var(--primary-color)",
                    border: "2px solid var(--primary-color)",
                    borderRadius: "var(--border-radius)",
                    fontSize: "1rem",
                    fontFamily: "var(--text-font)",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--primary-color)"
                    e.currentTarget.style.color = "white"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent"
                    e.currentTarget.style.color = "var(--primary-color)"
                  }}
                >
                  Download Itinerary
                </button>
                <button
                  style={{
                    width: "100%",
                    padding: "1rem",
                    backgroundColor: "transparent",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "var(--border-radius)",
                    fontSize: "1rem",
                    fontFamily: "var(--text-font)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--overlay-color)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent"
                  }}
                >
                  Ask Questions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Treks */}
      <div style={{ padding: "5rem 0", backgroundColor: "var(--background-color)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--container-padding)" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontFamily: "var(--heading-font)",
              fontWeight: "var(--heading-weight)",
              color: "var(--primary-color)",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            Other Amazing Treks
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {trekkinginfo
              .filter((t) => t.id !== trek.id)
              .slice(0, 3)
              .map((relatedTrek) => (
                <div
                  key={relatedTrek.id}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "var(--border-radius)",
                    boxShadow: "var(--shadow-soft)",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "var(--shadow-medium)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "var(--shadow-soft)"
                  }}
                >
                  <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                    <Image
                      src={relatedTrek.imageUrl || "/placeholder.svg"}
                      alt={relatedTrek.name}
                      fill
                      style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
                    />
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontFamily: "var(--heading-font)",
                        fontWeight: "600",
                        color: "var(--primary-color)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {relatedTrek.name}
                    </h3>
                    <p style={{ color: "var(--text-muted)", marginBottom: "1rem", fontSize: "0.875rem" }}>
                      {relatedTrek.location}
                    </p>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--text-color)",
                        lineHeight: "1.5",
                        marginBottom: "1.5rem",
                      }}
                    >
                      {relatedTrek.description}
                    </p>
                    <Link href={`/treks/${relatedTrek.id}`} style={{ textDecoration: "none" }}>
                      <button
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          backgroundColor: "transparent",
                          color: "var(--primary-color)",
                          border: "2px solid var(--primary-color)",
                          borderRadius: "var(--border-radius)",
                          fontSize: "0.875rem",
                          fontFamily: "var(--text-font)",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "var(--primary-color)"
                          e.currentTarget.style.color = "white"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent"
                          e.currentTarget.style.color = "var(--primary-color)"
                        }}
                      >
                        Explore Trek
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
