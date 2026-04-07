import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navigation from "@/header-component/Navigation";
import FooterSection from "@/footer-components/FooterSection";
import ReachUs from "@/homepage-components/ReachUs";
import FAQ from "@/homepage-components/FAQ";
import SeasonDetailContent from "../SeasonDetailContent";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type SeasonApiModel = {
  id?: string;
  slug: string;
  name: string;
  image: string;
  description: string;
  bestMonths?: string[];
  longDescription?: string[];
  highlights?: string[];
  tips?: string[];
  gallery?: string[];
  temperature?: string;
  duration?: string;
  climateType?: string;
  tagline?: string;
  weatherPatterns?: string[];
  natureChanges?: string[];
  culturalAspects?: string[];
  activities?: string[];
  climateDetails?: string[];
  bestActivities?: string[];
  whatToWear?: string[];
  regionalVariations?: string[];
};

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.BACKEND_URL ||
  "http://127.0.0.1:5000";

async function fetchSeasonBySlug(slug: string): Promise<SeasonApiModel | null> {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/seasons/${slug}`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) return null;
    return (await response.json()) as SeasonApiModel;
  } catch {
    return null;
  }
}

async function fetchSeasons(): Promise<SeasonApiModel[]> {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/api/seasons`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? (data as SeasonApiModel[]) : [];
  } catch {
    return [];
  }
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;
  const season = await fetchSeasonBySlug(slug);

  if (!season) {
    return {
      title: "Season Not Found | Nepal Travel Co.",
      description: "The requested season could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${season.name} in Nepal: Travel Guide, Best Months & Highlights`;
  const canonical = `https://www.example.com/seasons/${season.slug}`;

  return {
    title,
    description: season.description,
    alternates: { canonical },
    openGraph: {
      title,
      description: season.description,
      url: canonical,
      type: "article",
      images: season.image
        ? [{ url: season.image, alt: `${season.name} in Nepal` }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: season.description,
      images: season.image ? [season.image] : [],
    },
  };
}

export default async function SeasonPage({ params }: PageProps) {
  const { slug } = await params;
  const [season, allSeasons] = await Promise.all([
    fetchSeasonBySlug(slug),
    fetchSeasons(),
  ]);

  if (!season) return notFound();

  const otherSeasons = allSeasons
    .filter((item) => item.slug !== season.slug)
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: `${season.name} in Nepal`,
    description: season.description,
    image: season.image,
    url: `/seasons/${season.slug}`,
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Seasons", item: "/seasons" },
      {
        "@type": "ListItem",
        position: 3,
        name: season.name,
        item: `/seasons/${season.slug}`,
      },
    ],
  };

  return (
    <div className="bg-stone-50 text-stone-900 font-[var(--text-font)] min-h-screen">
      <Navigation />

      <main role="main" className="w-full relative">
        <SeasonDetailContent season={season} otherSeasons={otherSeasons} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbList),
          }}
        />
      </main>

      <div className="relative">
        <FAQ />
        <ReachUs />
      </div>

      <FooterSection />
    </div>
  );
}