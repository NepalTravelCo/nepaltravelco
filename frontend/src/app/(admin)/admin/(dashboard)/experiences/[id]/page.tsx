import { prisma } from "@/lib/prisma"
import { ExperienceForm } from "@/components/admin/ExperienceForm"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const experience = await prisma.experience.findUnique({
        where: { id }
    })

    if (!experience) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div>
                <h1 className="text-4xl font-black text-admin-text-primary tracking-tight">Edit Experience</h1>
                <p className="text-sm font-bold text-admin-text-secondary opacity-60 mt-1 uppercase tracking-widest">Update the {experience.name} collection</p>
            </div>
            
            <ExperienceForm initialData={experience} />
        </div>
    )
}
