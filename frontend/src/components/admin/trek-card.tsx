'use client'

import Link from "next/link"
import { Edit2, Trash2, Clock, TrendingUp } from "lucide-react"
import { deleteTrek } from "@/actions/trek-actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface TrekCardProps {
    trek: {
        id: string
        name: string
        image: string
        description: string
        difficulty: string
        duration: string
        altitude: number
        updatedAt: Date
    }
}

export function TrekCard({ trek }: TrekCardProps) {
    const router = useRouter()
    const [deleting, setDeleting] = useState(false)

    const onDelete = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!confirm("Are you sure you want to delete this trek?")) return

        setDeleting(true)
        try {
            const result = await deleteTrek(trek.id)
            if (result.success) {
                toast.success("Trek deleted successfully")
                router.refresh()
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error("Failed to delete trek")
        } finally {
            setDeleting(false)
        }
    }

    return (
        <div className="group relative bg-admin-card border border-admin-card-border rounded-[40px] overflow-hidden transition-all hover:border-admin-accent/30 shadow-xl shadow-black/5 flex flex-col h-full">
            {/* Image Preview */}
            <div className="relative h-64 overflow-hidden">
                <img src={trek.image} alt={trek.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-admin-card via-admin-card/20 to-transparent" />
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="bg-admin-accent text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                        {trek.difficulty}
                    </span>
                </div>
                <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Link href={`/admin/treks/${trek.id}`}>
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
            <div className="p-8 space-y-6 flex-1 flex flex-col">
                <div>
                    <h3 className="text-2xl font-black text-admin-text-primary tracking-tight group-hover:text-admin-accent transition-colors">
                        {trek.name}
                    </h3>
                    <p className="text-xs font-bold text-admin-text-secondary opacity-50 mt-2 line-clamp-2">
                        {trek.description}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-admin-card-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-admin-accent/10 text-admin-accent">
                            <Clock size={14} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-admin-text-secondary opacity-40 uppercase tracking-tighter">Duration</p>
                            <p className="text-xs font-bold text-admin-text-primary">{trek.duration}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-admin-accent/10 text-admin-accent">
                            <TrendingUp size={14} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-admin-text-secondary opacity-40 uppercase tracking-tighter">Peak Alt</p>
                            <p className="text-xs font-bold text-admin-text-primary">{trek.altitude}m</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="px-8 py-6 bg-admin-bg/50 border-t border-admin-card-border flex items-center justify-between group-hover:bg-admin-accent/5">
                <span className="text-[10px] font-black text-admin-text-secondary opacity-40 uppercase tracking-widest">
                    Modified: {new Date(trek.updatedAt).toLocaleDateString()}
                </span>
                <Link href={`/admin/treks/${trek.id}`}>
                    <span className="text-[10px] font-black text-admin-accent hover:underline cursor-pointer tracking-widest uppercase">Manage Content</span>
                </Link>
            </div>
        </div>
    )
}
