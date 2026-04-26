import { prisma } from "@/lib/prisma"
import { TrekForm } from "@/components/admin/trek-form"
import { notFound } from "next/navigation"

interface EditTrekPageProps {
    params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic"

export default async function EditTrekPage({ params }: EditTrekPageProps) {
    const { id } = await params

    const [trek, regions] = await Promise.all([
        prisma.trek.findUnique({
            where: { id }
        }),
        prisma.region.findMany({
            select: { id: true, name: true },
            orderBy: { name: "asc" }
        })
    ])

    if (!trek) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4">
            <TrekForm initialData={trek} regions={regions} />
        </div>
    )
}
