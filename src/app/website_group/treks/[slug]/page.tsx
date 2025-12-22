import type { Metadata } from "next"
import { getTrekBySlug, getAllTrekSlugs } from "@/data/Treks"
import TrekClientPage from "./TrekClientPage"

type TrekPageProps = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = getAllTrekSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: TrekPageProps): Promise<Metadata> {
  const { slug } = params
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
  const { slug } = params
  return <TrekClientPage params={{ slug }} />
}
