import type { Metadata } from "next";
import { getTrekBySlug, getAllTrekSlugs } from "@/data/Treks"
import { Mountain, Calendar, Users, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import "./trek-details.css"   // 👈 Import your CSS file

type TrekPageProps = {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllTrekSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: TrekPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const trek = getTrekBySlug(slug)

  if (!trek) {
    return {
      title: "Trek Not Found",
      description: "This trek does not exist in our records.",
    }
  }

  return {
    title: `${trek.name} - Nepal Treks`,
    description: trek.description,
  }
}

export default async function TrekPage({ params }: TrekPageProps) {
  const {slug} = await params;
  const trek = getTrekBySlug(slug)

  if (!trek) {
    return (
      <div className="not-found">
        ❌ Trek not found
      </div>
    )
  }

  return (
    <div className="inner-pages-container">
      {/* Hero Section */}
      <div
        className="trek-hero"
        style={{ backgroundImage: `url(${trek.image})` }}
      >
        <Link href="/treks" className="back-button">
          <div className="back-button-inner">← Back</div>
        </Link>

        <div className="hero-container">
          <div className="hero-content">
            <div className="altitude-info">
              <p className="altitude-text">
                {trek.altitude.toLocaleString()}m above sea level
              </p>
            </div>

            <div className="hero-title-section">
              <h1 className="hero-main-title">{trek.name}</h1>
              <p className="hero-subtitle">{trek.description}</p>
            </div>

            <span className="elevation-badge">
              Max Altitude: {trek.altitude}m
            </span>

            <div className="hero-buttons">
              <button className="primary-button">Book Now</button>
              <button className="secondary-button">Download Itinerary</button>
            </div>
          </div>
        </div>
      </div>

      {/* Trek Details Section */}
      <div className="trek-details">
        <div className="container">
          {/* Info Grid */}
          <div className="info-grid">
            <div className="feature-card">
              <div className="feature-header">
                <Mountain size={20} />
                <span className="feature-title">Max Altitude</span>
              </div>
              <p className="feature-content">{trek.altitude}m</p>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <Calendar size={20} />
                <span className="feature-title">Duration</span>
              </div>
              <p className="feature-content">{trek.duration}</p>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <Users size={20} />
                <span className="feature-title">Difficulty</span>
              </div>
              <p className="feature-content">{trek.difficulty}</p>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <MapPin size={20} />
                <span className="feature-title">Best Months</span>
              </div>
              <p className="feature-content">
                {trek.bestMonths.join(", ")}
              </p>
            </div>
          </div>

          {/* Long Description */}
          <div className="about-text">
            {trek.longDescription.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Highlights */}
          {trek.highlights?.length > 0 && (
            <div>
              <h2 className="section-title">Highlights</h2>
              <ul>
                {trek.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tips */}
          {trek.tips?.length > 0 && (
            <div>
              <h2 className="section-title">Tips</h2>
              <ul>
                {trek.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Itinerary */}
          {trek.itinerary.length > 0 && (
            <div>
              <h2 className="section-title">Itinerary</h2>
              <ul>
                {trek.itinerary.map((day) => (
                  <li key={day.day}>
                    <strong>Day {day.day}:</strong> {day.title} - {day.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Estimated Cost */}
          {trek.estimatedCost && (
            <div>
              <h2 className="section-title">Estimated Cost</h2>
              <p><strong>Budget:</strong> {trek.estimatedCost.budget}</p>
              <p><strong>Includes:</strong></p>
              <ul>
                {trek.estimatedCost.includes.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Permits */}
          {trek.permits.length > 0 && (
            <div>
              <h2 className="section-title">Permits Required</h2>
              <ul>
                {trek.permits.map((permit, idx) => (
                  <li key={idx}>{permit}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Gallery */}
          {trek.gallery.length > 0 && (
            <div>
              <h2 className="section-title">Gallery</h2>
              <div className="gallery-grid">
                {trek.gallery.map((img, idx) => (
                  <div key={idx} className="related-image">
                    <Image
                      src={img}
                      alt={`${trek.name} ${idx + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}




