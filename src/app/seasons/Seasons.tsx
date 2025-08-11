"use client"

import Link from "next/link"
import { seasonsData } from "../../data/Seasons"
import './styles/Seasons.css' 

export default function Season() {
  return (
    <>
    <div className="seasons-list-container">
    <main id="ntc-seasonlist-page" className="ntc-seasonlist-page" role="main">
    <nav aria-label="Breadcrumb" className="ntc-seasonlist-breadcrumbs">
        <ol className="ntc-seasonlist-breadcrumbs-list">
          <li><Link href="/" className="ntc-seasonlist-breadcrumb-link">Home</Link></li>
          <li><span className="ntc-seasonlist-breadcrumb-sep">›</span></li>
          <li aria-current="page" className="ntc-seasonlist-breadcrumb-current">Seasons</li>
        </ol>
      </nav>

    <section
      id="ntc-seasonlist-index"
      className="ntc-seasonlist-index"
      aria-labelledby="ntc-seasonlist-title"
    >
      <header className="ntc-seasonlist-header">
        <h1 id="ntc-seasonlist-title" className="ntc-seasonlist-title">
          Explore Seasons in Nepal
        </h1>
        <p className="ntc-seasonlist-subtitle">
          Browse all seasons and discover the best months, highlights, and travel tips.
        </p>
        {/* <p className="ntc-seasonlist-count">
          <strong>{seasonsData.length}</strong> seasons available
        </p> */}
      </header>

      <ul className="ntc-seasonlist-grid" role="list">
        {seasonsData.map((s) => (
          <li key={s.slug} className="ntc-seasonlist-item">
            <Link
              href={`/seasons/${s.slug}`}
              className="ntc-seasonlist-link"
              title={`Open ${s.name} season details`}
              aria-label={`Open ${s.name} season details`}
            >
              <figure className="ntc-seasonlist-figure">
                <img
                  src={s.image || "/placeholder.svg?height=220&width=360&query=season%20thumbnail"}
                  alt={`${s.name} in Nepal`}
                  className="ntc-seasonlist-img"
                  loading="lazy"
                />
                <figcaption className="ntc-seasonlist-caption">
                  <span className="ntc-seasonlist-name">{s.name}</span>
                  <span className="ntc-seasonlist-desc">{s.description}</span>
                </figcaption>
              </figure>
            </Link>
          </li>
        ))}
      </ul>
    </section>
    </main>
</div>
    </>
  )
}
