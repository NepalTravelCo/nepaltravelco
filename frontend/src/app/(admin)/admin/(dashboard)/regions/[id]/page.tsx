
import { RegionForm } from "@/components/admin/region-form"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

type EditRegionPageProps = {
    params: Promise<{ id: string }>
}

export default async function EditRegionPage({ params }: EditRegionPageProps) {
    const { id } = await params
    
    const region = await prisma.region.findUnique({
        where: { id }
    })

    if (!region) {
        notFound()
    }

    return (
        <div className="max-w-7xl mx-auto">
            <RegionForm initialData={region} />
        </div>
    )
}
