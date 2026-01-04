
import { TrekForm } from "@/components/admin/trek-form"
import { prisma } from "@/lib/prisma"

export default async function NewTrekPage() {
    const regions = await prisma.region.findMany({
        orderBy: { name: 'asc' }
    })

    return (
        <div className="max-w-7xl mx-auto">
            <TrekForm regions={regions} />
        </div>
    )
}
