'use client'

import Link from "next/link"
import { Edit2, Trash2, Mountain, ArrowRight } from "lucide-react"
import { deleteRegion } from "@/actions/region-actions"
import { toast } from "sonner"
import { useState } from "react"

interface RegionCardProps {
    region: {
        id: string
        name: string
        image: string
        description: string
        _count: { treks: number }
    }
}

export function RegionCard({ region }: RegionCardProps) {
    const [deleting, setDeleting] = useState(false)

    const onDelete = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        
        if (!confirm("Are you sure you want to delete this region? All associated treks will be unlinked.")) return
        
        setDeleting(true)
        try {
            const result = await deleteRegion(region.id)
            if (result.success) {
                toast.success("Region deleted successfully")
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error("Failed to delete region")
        } finally {
            setDeleting(false)
        }
    }

    return (
        <div className="group relative bg-admin-card border border-admin-card-border rounded-[40px] overflow-hidden transition-all hover:border-admin-accent/30 shadow-xl shadow-black/5 flex flex-col h-full">
            {/* Image Preview */}
            <div className="relative h-64 overflow-hidden">
                <img src={region.image} alt={region.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-admin-card via-admin-card/20 to-transparent" />
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="bg-admin-accent text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                        {region._count.treks} Expeditions
                    </span>
                </div>
                <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Link href={`/admin/regions/${region.id}`}>
                        <button className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-admin-accent hover:border-admin-accent transition-all">
                            <Edit2 size={16} />
                        </button>
                    </Link>
                    <button 
                        onClick={onDelete}
                        disabled={deleting}
                        className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-red-500 hover:border-red-500 transition-all disabled:opacity-50"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-4 flex-1 flex flex-col">
                <h3 className="text-2xl font-black text-admin-text-primary tracking-tight group-hover:text-admin-accent transition-colors">
                    {region.name}
                </h3>
                <p className="text-xs font-bold text-admin-text-secondary opacity-50 line-clamp-3 italic">
                    {region.description}
                </p>
            </div>

            {/* Bottom Actions */}
            <Link href={`/admin/treks/region/${region.id}`} className="px-8 py-6 bg-admin-bg/50 border-t border-admin-card-border flex items-center justify-between hover:bg-admin-accent hover:text-white transition-all group/btn">
                <span className="text-[10px] font-black uppercase tracking-widest">
                    Explore Regional Treks
                </span>
                <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
            </Link>
        </div>
    )
}
