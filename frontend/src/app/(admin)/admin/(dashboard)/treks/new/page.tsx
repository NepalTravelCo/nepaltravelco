import { prisma } from "@/lib/prisma"
import { TrekForm } from "@/components/admin/trek-form"

interface NewTrekPageProps {
    searchParams: Promise<{ regionId?: string }>
}

export default async function NewTrekPage({ searchParams }: NewTrekPageProps) {
    const { regionId } = await searchParams
    const regions = await prisma.region.findMany({
        select: { id: true, name: true },
        orderBy: { name: "asc" }
    })

    return (
        <div className="container mx-auto px-4">
            <TrekForm regions={regions} initialRegionId={regionId} />
        </div>
    )
}
