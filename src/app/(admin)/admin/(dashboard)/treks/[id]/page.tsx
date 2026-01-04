
import { TrekForm } from "@/components/admin/trek-form"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

type EditTrekPageProps = {
    params: Promise<{ id: string }>
}

export default async function EditTrekPage({ params }: EditTrekPageProps) {
    const { id } = await params
    
    const [trek, regions] = await Promise.all([
        prisma.trek.findUnique({
            where: { id }
        }),
        prisma.region.findMany({
            orderBy: { name: 'asc' }
        })
    ])

    if (!trek) {
        notFound()
    }

    return (
        <div className="max-w-7xl mx-auto">
            <TrekForm initialData={trek} regions={regions} />
        </div>
    )
}
