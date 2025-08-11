

import type { Metadata } from "next"
import Link from "next/link"
import Season from "./Seasons"
import { seasonsData } from "../../data/Seasons"
import FAQ from "@/homepage-components/FAQ"
import BrandParallax from "@/homepage-components/BrandParallax"
import ReachUs from "@/homepage-components/ReachUs"


// Page-level SEO metadata for the seasons index route. App Router supports generateMetadata per route. [^3]
export const metadata: Metadata = {
  title: "Seasons in Nepal | Complete Seasonal Guide",
  description:
    "Explore all seasons in Nepal with highlights, best months, and travel tips. Click any season to view detailed guides.",
  alternates: {
    canonical: "https://www.example.com/seasons", // Replace with your domain at deploy
  },
  openGraph: {
    title: "Seasons in Nepal | Complete Seasonal Guide",
    description:
      "Explore all seasons in Nepal with highlights, best months, and travel tips.",
    url: "https://www.example.com/seasons", // Replace with your domain
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seasons in Nepal | Complete Seasonal Guide",
    description:
      "Explore all seasons in Nepal with highlights, best months, and travel tips.",
  },
}

export default function SeasonsIndexPage() {
  const itemListStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: seasonsData.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `/seasons/${s.slug}`,
      name: s.name,
      image: s.image,
      description: s.description,
    })),
  }

  return (
    <>
    
    <div className="inner-pages-container">
      

      <Season />

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListStructuredData) }}
      />
    </div>
    <BrandParallax/>
    <FAQ/>
    <ReachUs/>
    </>
  )
}

