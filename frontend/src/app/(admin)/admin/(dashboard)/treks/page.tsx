import { prisma } from "@/lib/prisma"
import { Plus, Mountain } from "lucide-react"
import Link from "next/link"
import { RegionCard } from "@/components/admin/region-card"

export const dynamic = "force-dynamic"

export default async function TreksAdminPage() {
    const regions = await prisma.region.findMany({
        include: { _count: { select: { treks: true } } },
        orderBy: { name: "asc" }
    })

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-admin-card border border-admin-card-border p-8 rounded-[32px] shadow-2xl shadow-black/5">
                <div>
                    <h1 className="text-4xl font-black text-admin-text-primary tracking-tight">Expeditions</h1>
                    <p className="text-sm font-bold text-admin-text-secondary opacity-60 mt-1 uppercase tracking-widest">Explore and Manage Treks by Territory</p>
                </div>
                <Link href="/admin/regions/new">
                    <button className="group flex items-center gap-3 bg-admin-accent text-white px-8 py-4 rounded-2xl font-black text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-admin-accent/20">
                        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        MAP NEW TERRITORY
                    </button>
                </Link>
            </div>

            {/* Region Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regions.map((region) => (
                    <RegionCard key={region.id} region={region as any} />
                ))}
            </div>

            {/* Empty State */}
            {regions.length === 0 && (
                <div className="bg-admin-card border-2 border-dashed border-admin-card-border rounded-[40px] p-32 text-center">
                    <div className="mx-auto w-24 h-24 bg-admin-accent/10 rounded-full flex items-center justify-center text-admin-accent mb-8">
                        <Mountain size={48} />
                    </div>
                    <h2 className="text-3xl font-black text-admin-text-primary">No Territories Found</h2>
                    <p className="text-admin-text-secondary font-bold mt-4 max-w-md mx-auto opacity-60">You haven't mapped any regions yet. Regions act as containers for your treks.</p>
                    <Link href="/admin/regions/new">
                        <button className="mt-10 bg-admin-accent text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-admin-accent/20">
                            GET STARTED
                        </button>
                    </Link>
                </div>
            )}
        </div>
    )
}
