import Navigation from "@/header-component/Navigation"
import FooterSection from "@/footer-components/FooterSection"
import TreksHero from "./TreksHero"
import TrekInteraction from "./TrekInteraction"
// import { prisma as prismaClient } from "@/lib/prisma"
// const prisma = prismaClient

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function TreksPage() {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000'
  
  const [treksResponse, regionsResponse] = await Promise.all([
    fetch(`${backendUrl}/api/treks`, { cache: 'no-store' }),
    fetch(`${backendUrl}/api/regions`, { cache: 'no-store' })
  ])

  const treks = await treksResponse.json()
  const regions = await regionsResponse.json()
  // Wait, the previous code used prisma.region.findMany({ include: { treks: true } })
  // I might need a /api/regions endpoint too if I want parity.
  // For now, I'll use destinations or create a /api/regions if needed.
  // Let's create /api/regions in the backend to be safe.

  return (
    <div className="bg-black text-white font-[var(--text-font)] h-screen overflow-hidden">
      <Navigation />

      <main className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth">
        <TreksHero />
        <TrekInteraction treks={treks} regions={regions} />
        <div className="snap-start">
          <FooterSection />
        </div>
      </main>
    </div>
  )
}