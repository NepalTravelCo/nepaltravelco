
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { PackageForm } from "@/components/admin/package-form"

interface EditPackagePageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EditPackagePage({ params }: EditPackagePageProps) {
    const { id } = await params
    const pkg = await prisma.package.findUnique({
        where: { id }
    })

    if (!pkg) {
        notFound()
    }

    return (
        <div className="space-y-8">
            <PackageForm initialData={pkg} />
        </div>
    )
}
