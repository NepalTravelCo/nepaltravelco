import { prisma } from "@/lib/prisma"
import { Plus, LayoutGrid, Search, Edit2, Trash2, Mountain, Layers } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function CollectionsAdminPage() {
    const collections = await prisma.trekCollection.findMany({
        include: { _count: { select: { treks: true } } },
        orderBy: { updatedAt: "desc" }
    })

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-admin-card border border-admin-card-border p-8 rounded-[32px] shadow-2xl shadow-black/5">
                <div className="flex items-center gap-6">
                    <div className="p-4 rounded-[24px] bg-admin-accent/10 text-admin-accent">
                        <Layers size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-admin-text-primary tracking-tight">Curation</h1>
                        <p className="text-sm font-bold text-admin-text-secondary opacity-60 mt-1 uppercase tracking-widest">Managing Trek Collections & Theme Groups</p>
                    </div>
                </div>
                <Link href="/admin/collections/new">
                    <button className="group flex items-center gap-3 bg-admin-accent text-white px-8 py-4 rounded-2xl font-black text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-admin-accent/20">
                        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        CREATE COLLECTION
                    </button>
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {collections.map((collection) => (
                    <div key={collection.id} className="group relative bg-admin-card border border-admin-card-border rounded-[40px] overflow-hidden transition-all hover:border-admin-accent/30 shadow-xl shadow-black/5 flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                            {collection.image ? (
                                <img src={collection.image} alt={collection.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            ) : (
                                <div className="w-full h-full bg-admin-accent/5 flex items-center justify-center text-admin-accent/20">
                                    <Mountain size={64} />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-admin-card via-admin-card/40 to-transparent" />
                            <div className="absolute bottom-6 left-8">
                                <span className="bg-admin-accent text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                                    {collection._count.treks} Expeditions
                                </span>
                            </div>
                        </div>

                        <div className="p-8 flex-1">
                            <h3 className="text-2xl font-black text-admin-text-primary tracking-tight group-hover:text-admin-accent transition-colors">
                                {collection.name}
                            </h3>
                            <p className="text-xs font-bold text-admin-text-secondary opacity-50 mt-2 line-clamp-2 italic">
                                {collection.description || "No description provided."}
                            </p>
                        </div>

                        <div className="px-8 py-6 bg-admin-bg/50 border-t border-admin-card-border flex items-center justify-between">
                            <Link href={`/admin/collections/${collection.id}`}>
                                <button className="flex items-center gap-2 text-[10px] font-black text-admin-accent uppercase tracking-widest hover:underline">
                                    <Edit2 size={12} /> Edit Collection
                                </button>
                            </Link>
                            <span className="text-[10px] font-black text-admin-text-secondary opacity-40 uppercase tracking-widest">
                                /{collection.slug}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {collections.length === 0 && (
                <div className="bg-admin-card border-2 border-dashed border-admin-card-border rounded-[40px] p-32 text-center">
                    <div className="mx-auto w-24 h-24 bg-admin-accent/10 rounded-full flex items-center justify-center text-admin-accent mb-8">
                        <LayoutGrid size={48} />
                    </div>
                    <h2 className="text-3xl font-black text-admin-text-primary">No Collections Created</h2>
                    <p className="text-admin-text-secondary font-bold mt-4 max-w-md mx-auto opacity-60">Organize your treks into meaningful groups like 'Luxury', 'Extreme', or 'Family Friendly'.</p>
                    <Link href="/admin/collections/new">
                        <button className="mt-10 bg-admin-accent text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-admin-accent/20">
                            CREATE YOUR FIRST COLLECTION
                        </button>
                    </Link>
                </div>
            )}
        </div>
    )
}
