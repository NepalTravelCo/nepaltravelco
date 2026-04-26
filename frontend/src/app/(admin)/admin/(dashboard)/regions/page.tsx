import { RegionList } from "@/components/admin/region-list"
import { prisma } from "@/lib/prisma"
import { Plus, Map as MapIcon } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function RegionsAdminPage() {
    const regions = await prisma.region.findMany({
        include: { _count: { select: { treks: true } } },
        orderBy: { name: "asc" }
    })

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-admin-card border border-admin-card-border p-8 rounded-[32px] shadow-2xl shadow-black/5">
                <div className="flex items-center gap-6">
                    <div className="p-4 rounded-[24px] bg-admin-accent/10 text-admin-accent">
                        <MapIcon size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-admin-text-primary tracking-tight">Territories</h1>
                        <p className="text-sm font-bold text-admin-text-secondary opacity-60 mt-1 uppercase tracking-widest">Managing Nepal's Geographic Regions</p>
                    </div>
                </div>
                <Link href="/admin/regions/new">
                    <button className="group flex items-center gap-3 bg-admin-accent text-white px-8 py-4 rounded-2xl font-black text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-admin-accent/20">
                        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        MAP NEW TERRITORY
                    </button>
                </Link>
            </div>

            <RegionList regions={regions as any} />
        </div>
    )
}
