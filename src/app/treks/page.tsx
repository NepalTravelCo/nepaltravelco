import Navigation from "@/header-component/Navigation"
import FooterSection from "@/footer-components/FooterSection"
import TreksHero from "./TreksHero"
import TrekInteraction from "./TrekInteraction"
import { prisma as prismaClient } from "@/lib/prisma"

const prisma = prismaClient

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function TreksPage() {
  const [treks, regions] = await Promise.all([
    prisma.trek.findMany({
      include: { region: true },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.region.findMany({
      include: { treks: true },
      orderBy: { name: 'asc' },
    }),
  ])

  return (
    <div className="bg-black text-white font-[var(--text-font)] h-screen overflow-hidden">
      <Navigation />

      <main className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth">
        <TreksHero />
        <TrekInteraction treks={treks} regions={regions} />
        <div className="snap-start">
          <FooterSection />
        </div>
      </main>
    </div>
  )
}