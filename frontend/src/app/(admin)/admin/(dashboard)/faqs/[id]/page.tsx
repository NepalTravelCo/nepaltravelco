import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { FaqForm } from "@/components/admin/faq-form"

interface EditFaqPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditFaqPage({ params }: EditFaqPageProps) {
    const { id } = await params
    const faq = await prisma.faq.findUnique({
        where: { id }
    })

    if (!faq) {
        notFound()
    }

    return (
        <div className="space-y-8">
            <FaqForm initialData={faq} />
        </div>
    )
}
