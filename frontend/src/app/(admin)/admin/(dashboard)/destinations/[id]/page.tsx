import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { DestinationForm } from "@/components/admin/destination-form"

interface EditDestinationPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditDestinationPage({ params }: EditDestinationPageProps) {
    const { id } = await params
    const dest = await prisma.destination.findUnique({
        where: { id }
    })

    if (!dest) {
        notFound()
    }

    return (
        <div className="space-y-8">
            <DestinationForm initialData={dest} />
        </div>
    )
}
