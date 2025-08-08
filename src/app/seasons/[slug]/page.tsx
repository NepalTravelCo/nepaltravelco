import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getSeasonBySlug, getAllSeasonSlugs } from "../../../data/Seasons"
import "./styles/SeasonDetails.css"
import ReachUs from "@/homepage-components/ReachUs"
import FAQ from "@/homepage-components/FAQ"

// Pre-render all known season pages for performance and SEO
// App Router dynamic routes and pre-rendering are supported via generateStaticParams. [^3]
export async function generateStaticParams() {
  return getAllSeasonSlugs().map((slug) => ({ slug }))
}

// Page-level SEO with dynamic metadata based on slug. [^3]
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const season = getSeasonBySlug(params.slug)
  if (!season) {
    return {
      title: "Season Not Found | Nepal Travel Co.",
      description: "The requested season could not be found.",
      robots: { index: false, follow: false },
    }
  }
  const title = `${season.name} in Nepal: Travel Guide, Best Months & Highlights`
  const description = season.description
  const canonical = `https://www.example.com/seasons/${season.slug}` // Replace domain when deploying

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: season.image ? [{ url: season.image, alt: `${season.name} in Nepal` }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: season.image ? [season.image] : [],
    },
  }
}

export default function SeasonPage({ params }: { params: { slug: string } }) {
  const season = getSeasonBySlug(params.slug)
  if (!season) return notFound()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `${season.name} in Nepal`,
    description: season.description,
    image: season.image,
    url: `/seasons/${season.slug}`,
  }

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Seasons",
        item: "/seasons",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: season.name,
        item: `/seasons/${season.slug}`,
      },
    ],
  }

  return (

    <>
    
    
    <div className="inner-pages-container">
    <div className="season-details-body">
    
    <main id="ntc-season-page" className="ntc-season-page" role="main">
      <nav aria-label="Breadcrumb" className="ntc-breadcrumbs">
        <ol className="ntc-breadcrumbs-list">
          <li><Link href="/" className="ntc-breadcrumb-link">Home</Link></li>
          <li><span className="ntc-breadcrumb-sep">›</span></li>
          <li><Link href="/seasons" className="ntc-breadcrumb-link">Seasons</Link></li>
          <li><span className="ntc-breadcrumb-sep">›</span></li>
          <li aria-current="page" className="ntc-breadcrumb-current">{season.name}</li>
        </ol>
      </nav>

      <header className="ntc-season-hero">
        <figure className="ntc-season-figure">
          <img
            src={season.image || "/placeholder.svg"}
            alt={`${season.name} in Nepal`}
            className="ntc-season-hero-img"
            loading="eager"
          />
          {/* <figcaption className="ntc-hero-caption">
            {season.name}: {season.description}
          </figcaption> */}
        </figure>
        <div className="ntc-hero-text">
          <h1 className="ntc-season-title">{season.name} in Nepal</h1>
          <p className="ntc-season-subtitle">{season.description}</p>
        </div>
      </header>

      <section className="ntc-season-content" aria-labelledby="ntc-overview-title">
        <h2 id="ntc-overview-title" className="ntc-section-title">Overview</h2>
        {season.longDescription.map((para, i) => (
          <p key={i} className="ntc-paragraph">{para}</p>
        ))}
      </section>

      <section className="ntc-season-panels">
        <article className="ntc-panel months">
          <h2 className="ntc-panel-title">
            📅 Best Months
          </h2>
          <ul className="ntc-list">
            {season.bestMonths.map((m) => (
              <li key={m} className="ntc-list-item">{m}</li>
            ))}
          </ul>
        </article>

        <article className="ntc-panel highlights">
          <h2 className="ntc-panel-title">
            🌟 Highlights
          </h2>
          <ul className="ntc-list">
            {season.highlights.map((h) => (
              <li key={h} className="ntc-list-item">{h}</li>
            ))}
          </ul>
        </article>

        <article className="ntc-panel tips">
          <h2 className="ntc-panel-title">
            💡 Travel Tips
          </h2>
          <ul className="ntc-list">
            {season.tips.map((t) => (
              <li key={t} className="ntc-list-item">{t}</li>
            ))}
          </ul>
        </article>
      </section>


      {/* <section className="ntc-cta">
        <Link href="/contact" className="ntc-cta-link" title="Plan your trip">
          Plan your trip
        </Link>
      </section> */}



      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
    </main>
    </div>
    </div>
    
        <FAQ/>
        <ReachUs/>
    </>
  )
}
