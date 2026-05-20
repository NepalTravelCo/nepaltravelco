import { prisma } from "@/lib/prisma"
import { ExperienceHeroForm } from "@/components/admin/ExperienceHeroForm"

export const dynamic = "force-dynamic"

export default async function HeroSectionPage() {
    const heroSection = await prisma.infoSection.findUnique({
        where: { slug: "experiences-hero" }
    })

    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-20">
            <div>
                <h1 className="text-4xl font-black text-admin-text-primary tracking-tight">Hero Section</h1>
                <p className="text-sm font-bold text-admin-text-secondary opacity-60 mt-1 uppercase tracking-widest">Update the experiences landing area</p>
            </div>
            
            <ExperienceHeroForm initialData={heroSection} />
        </div>
    )
}
