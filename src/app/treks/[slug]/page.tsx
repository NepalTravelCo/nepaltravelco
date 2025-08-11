import { trekkinginfo } from "../../../data/Treks"
import ClientTrekPage from "./ClientPage"

interface TrekPageProps {
  params: {
    slug: string
  }
}

export default function TrekPage({ params }: TrekPageProps) {
  return <ClientTrekPage params={params} />
}

// Generate static params for all treks
export async function generateStaticParams() {
  return trekkinginfo.map((trek) => ({
    slug: trek.id.toString(),
  }))
}

// Generate metadata for each trek
export async function generateMetadata({ params }: TrekPageProps) {
  const trek = trekkinginfo.find((t) => t.id.toString() === params.slug)

  if (!trek) {
    return {
      title: "Trek Not Found",
    }
  }

  return {
    title: `${trek.name} - Nepal Treks`,
    description: trek.description,
  }
}
