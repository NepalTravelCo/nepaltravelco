import type { Metadata } from "next"
import TrekClientPage, { Trek } from "./TrekClientPage"
import { notFound } from "next/navigation"
import { getBackendBaseUrl } from "@/lib/backend-url"
// import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic"
export const revalidate = 0

type TrekPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const backendUrl = getBackendBaseUrl()
  try {
    const response = await fetch(`${backendUrl}/api/treks`)
    const treks = await response.json()
    return treks.map((t: any) => ({ slug: t.slug }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

export async function generateMetadata({ params }: TrekPageProps): Promise<Metadata> {
  const { slug } = await params
  const backendUrl = getBackendBaseUrl()
  
  try {
    const response = await fetch(`${backendUrl}/api/treks/${slug}`)
    if (!response.ok) {
      return { title: "Trek Not Found" }
    }
    const trek = await response.json()
    return {
      title: `${trek.name} - Nepal Treks`,
      description: trek.description,
    }
  } catch (error) {
    return { title: "Trek Page" }
  }
}

export default async function TrekPage({ params }: TrekPageProps) {
  const { slug } = await params
  const backendUrl = getBackendBaseUrl()

  try {
    const response = await fetch(`${backendUrl}/api/treks/${slug}`, { cache: 'no-store' })
    if (!response.ok) {
      notFound()
    }
    const trek = await response.json()
    return <TrekClientPage trek={trek as unknown as Trek} />
  } catch (error) {
    console.error("Error fetching trek details:", error)
    notFound()
  }
}
