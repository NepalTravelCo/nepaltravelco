

import type { Metadata } from "next"

import Navigation from "@/header-component/Navigation"
import FooterSection from "@/footer-components/FooterSection"
import SeasonsHero from "./SeasonsHero"
import SeasonsInteraction from "./SeasonsInteraction"
import { seasonsData } from "../../data/Seasons"

// Page-level SEO metadata for the seasons index route. App Router supports generateMetadata per route.
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
    <div className="bg-black text-white font-[var(--text-font)] h-screen overflow-hidden">
      <Navigation />

      <main className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth">
        <SeasonsHero />
        <SeasonsInteraction />
        <div className="snap-start">
          <FooterSection />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListStructuredData) }}
        />
      </main>
    </div>
  )
}

