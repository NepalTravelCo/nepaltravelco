import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { SectionForm } from "@/components/admin/section-form"

interface EditSectionPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditSectionPage({ params }: EditSectionPageProps) {
    const { id } = await params
    const section = await prisma.infoSection.findUnique({
        where: { id }
    })

    if (!section) {
        notFound()
    }

    return (
        <div className="space-y-8">
            <SectionForm initialData={section} />
        </div>
    )
}
