import type { Metadata } from "next"
import TrekClientPage from "./TrekClientPage"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

type TrekPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const treks = await prisma.trek.findMany({
    select: { slug: true }
  })
  return treks.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: TrekPageProps): Promise<Metadata> {
  const { slug } = await params
  const trek = await prisma.trek.findUnique({
    where: { slug }
  })

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
  const { slug } = await params
  const trek = await prisma.trek.findUnique({
    where: { slug },
    include: { region: true }
  })

  if (!trek) {
    notFound()
  }

  return <TrekClientPage trek={trek} />
}
