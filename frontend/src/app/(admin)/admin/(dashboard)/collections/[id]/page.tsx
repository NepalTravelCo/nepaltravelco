import { prisma } from "@/lib/prisma"
import { CollectionForm } from "@/components/admin/collection-form"
import { notFound } from "next/navigation"

interface EditCollectionPageProps {
    params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic"

export default async function EditCollectionPage({ params }: EditCollectionPageProps) {
    const { id } = await params

    const [collection, allTreks] = await Promise.all([
        prisma.trekCollection.findUnique({
            where: { id },
            include: { treks: { select: { id: true } } }
        }),
        prisma.trek.findMany({
            select: { id: true, name: true, image: true },
            orderBy: { name: "asc" }
        })
    ])

    if (!collection) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4">
            <CollectionForm initialData={collection} allTreks={allTreks} />
        </div>
    )
}
