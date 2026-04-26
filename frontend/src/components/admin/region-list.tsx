'use client'

import { Map as MapIcon, TrendingUp, Compass, Edit2, Trash2 } from "lucide-react"
import Link from "next/link"
import { deleteRegion } from "@/actions/region-actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface RegionListProps {
    regions: any[]
}

export function RegionList({ regions }: RegionListProps) {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const onDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this territory? This will unlink all expeditions mapping to this region.")) return
        
        setDeletingId(id)
        try {
            const result = await deleteRegion(id)
            if (result.success) {
                toast.success("Territory unmapped successfully")
                router.refresh()
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error("Failed to delete territory")
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regions.map((region) => (
                    <div key={region.id} className="group relative bg-admin-card border border-admin-card-border rounded-[40px] overflow-hidden transition-all hover:border-admin-accent/30 shadow-xl shadow-black/5 flex flex-col">
                        <div className="relative h-56 overflow-hidden">
                            <img src={region.image} alt={region.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-admin-card via-admin-card/20 to-transparent" />
                            <div className="absolute top-6 right-6">
                                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                                    {region._count?.treks || 0} Expeditions
                                </span>
                            </div>
                        </div>

                        <div className="p-8 flex-1 flex flex-col space-y-6">
                            <div>
                                <h3 className="text-2xl font-black text-admin-text-primary tracking-tight group-hover:text-admin-accent transition-colors">
                                    {region.name}
                                </h3>
                                <p className="text-xs font-bold text-admin-text-secondary opacity-50 mt-2 line-clamp-3">
                                    {region.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-admin-card-border">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-admin-accent/10 text-admin-accent">
                                        <TrendingUp size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-admin-text-secondary opacity-40 uppercase tracking-tighter">Avg Alt</p>
                                        <p className="text-xs font-bold text-admin-text-primary">{region.altitude}m</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-admin-accent/10 text-admin-accent">
                                        <Compass size={14} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-admin-text-secondary opacity-40 uppercase tracking-tighter">Terrain</p>
                                        <p className="text-xs font-bold text-admin-text-primary">{region.difficulty}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 py-6 bg-admin-bg/50 border-t border-admin-card-border flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Link href={`/admin/regions/${region.id}`}>
                                    <button className="flex items-center gap-2 text-[10px] font-black text-admin-accent uppercase tracking-widest hover:underline transition-all">
                                        <Edit2 size={12} /> Edit
                                    </button>
                                </Link>
                                <button 
                                    onClick={() => onDelete(region.id)}
                                    disabled={deletingId === region.id}
                                    className="flex items-center gap-2 text-[10px] font-black text-admin-text-secondary opacity-40 hover:text-red-500 uppercase tracking-widest transition-all disabled:opacity-20"
                                >
                                    <Trash2 size={12} /> Delete
                                </button>
                            </div>
                            <span className="text-[10px] font-black text-admin-text-secondary opacity-40 uppercase tracking-widest">
                                /{region.slug}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {regions.length === 0 && (
                <div className="bg-admin-card border-2 border-dashed border-admin-card-border rounded-[40px] p-32 text-center">
                    <div className="mx-auto w-24 h-24 bg-admin-accent/10 rounded-full flex items-center justify-center text-admin-accent mb-8">
                        <MapIcon size={48} />
                    </div>
                    <h2 className="text-3xl font-black text-admin-text-primary">No Territories Mapped</h2>
                    <p className="text-admin-text-secondary font-bold mt-4 max-w-md mx-auto opacity-60">Nepal's vast geography is waiting to be categorized. Start by mapping your first region.</p>
                    <Link href="/admin/regions/new">
                        <button className="mt-10 bg-admin-accent text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-admin-accent/20">
                            BEGIN MAPPING
                        </button>
                    </Link>
                </div>
            )}
        </>
    )
}
