import { prisma } from "@/lib/prisma"
import { CollectionForm } from "@/components/admin/collection-form"

export default async function NewCollectionPage() {
    const allTreks = await prisma.trek.findMany({
        select: { id: true, name: true, image: true },
        orderBy: { name: "asc" }
    })

    return (
        <div className="container mx-auto px-4">
            <CollectionForm allTreks={allTreks} />
        </div>
    )
}
