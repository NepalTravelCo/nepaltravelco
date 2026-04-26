
export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { SeasonForm } from "@/components/admin/season-form"

export default async function EditSeasonPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    
    const season = await prisma.season.findUnique({
        where: { id }
    })

    if (!season) {
        notFound()
    }

    return <SeasonForm initialData={season} />
}
