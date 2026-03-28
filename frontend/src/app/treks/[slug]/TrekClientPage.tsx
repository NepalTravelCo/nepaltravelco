"use client"

import { Mountain, Calendar, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"
import "./trek-details.css"
import React from "react"
import { motion } from "framer-motion"

export interface Trek {
    id: string
    name: string
    slug: string
    image: string
    description: string
    longDescription: string[]
    altitude: number
    duration: string
    difficulty: string
    bestMonths: string[]
    highlights: string[]
    tips: string[]
    gallery: string[]
    itinerary: unknown
    estimatedCost: { budget: string; includes: string[] }
    permits: string[]
    region?: { name: string } | null
}

type TrekPageProps = {
  trek: Trek
}

type ItineraryDay = {
  day: number | string
  title: string
  description: string
}

export default function TrekClientPage({ trek }: TrekPageProps) {
    const itinerary = (trek.itinerary as ItineraryDay[]) || []

    return (
        <div className="minimal-container">
            {/* Immersive Hero Section */}
            <section className="trek-hero" style={{ backgroundImage: `url(${trek.image})` }}>
                <Link href="/treks" className="back-button">
                    <div className="back-button-inner">
                        <ArrowLeft size={18} />
                        <span>All Expeditions</span>
                    </div>
                </Link>

                <div className="hero-container">
                    <div className="hero-content">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="elevation-badge"
                        >
                            Max Elevation: {trek.altitude.toLocaleString()}m
                        </motion.div>
                        
                        <div className="hero-title-section">
                            <motion.h1 
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="hero-main-title"
                            >
                                {trek.name}
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="hero-subtitle"
                            >
                                {trek.description}
                            </motion.p>
                        </div>

                        <div className="hero-buttons">
                            <button className="primary-button">Book Expedition</button>
                            <button className="secondary-button">Download PDF</button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="inner-pages-container">
                <div className="content-wrapper">
                    {/* Quick Stats Grid */}
                    <div className="info-cards">
                        <div className="info-card">
                            <Calendar size={24} />
                            <div>
                                <span className="card-label">Duration</span>
                                <span className="card-value">{trek.duration}</span>
                            </div>
                        </div>
                        <div className="info-card">
                            <Mountain size={24} />
                            <div>
                                <span className="card-label">Difficulty</span>
                                <span className="card-value">{trek.difficulty}</span>
                            </div>
                        </div>
                        <div className="info-card">
                            <Users size={24} />
                            <div>
                                <span className="card-label">Best Seasons</span>
                                <span className="card-value">{trek.bestMonths?.join(", ")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Content */}
                    <div className="main-details-grid">
                        <div className="details-main-column">
                            <section className="highlights-section">
                                <h2 className="trek-section-title">Expedition Highlights</h2>
                                <div className="highlights-list">
                                    {trek.highlights?.map((highlight, idx) => (
                                        <div key={idx} className="highlight-item">
                                            <div className="highlight-dot" />
                                            <p>{highlight}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="itinerary-section">
                                <h2 className="trek-section-title">The Journey</h2>
                                <div className="itinerary-list">
                                    {itinerary.map((day, idx) => (
                                        <div key={idx} className="itinerary-item">
                                            <div className="day-marker">D{day.day}</div>
                                            <div className="day-details">
                                                <h3 className="day-title">{day.title}</h3>
                                                <p className="day-description">{day.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final Booking Section */}
            <section className="final-booking-section">
                <div className="booking-content-inner">
                    <h2>Ready for the adventure of a lifetime?</h2>
                    <p>Spaces are limited for the upcoming season. Reserve your slot today.</p>
                    <button className="final-cta-btn">Start Your Application</button>
                </div>
            </section>
        </div>
    )
}
