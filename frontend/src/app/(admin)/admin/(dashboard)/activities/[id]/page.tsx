import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ActivityForm } from "@/components/admin/activity-form"

interface EditActivityPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditActivityPage({ params }: EditActivityPageProps) {
    const { id } = await params
    const act = await prisma.activity.findUnique({
        where: { id }
    })

    if (!act) {
        notFound()
    }

    return (
        <div className="space-y-8">
            <ActivityForm initialData={act} />
        </div>
    )
}
