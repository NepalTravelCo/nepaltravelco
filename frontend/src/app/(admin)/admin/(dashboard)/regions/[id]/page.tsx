import { prisma } from "@/lib/prisma"
import { RegionForm } from "@/components/admin/region-form"
import { notFound } from "next/navigation"

interface EditRegionPageProps {
    params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic"

export default async function EditRegionPage({ params }: EditRegionPageProps) {
    const { id } = await params

    const region = await prisma.region.findUnique({
        where: { id },
        include: { treks: { orderBy: { updatedAt: "desc" } } }
    })

    if (!region) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4">
            <RegionForm initialData={region} />
        </div>
    )
}
