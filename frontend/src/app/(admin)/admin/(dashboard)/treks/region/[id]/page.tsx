import { prisma } from "@/lib/prisma"
import { Plus, Edit2, Clock, TrendingUp, ArrowLeft, Mountain } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface RegionTreksPageProps {
    params: Promise<{ id: string }>
}

import { TrekCard } from "@/components/admin/trek-card"

export const dynamic = "force-dynamic"

export default async function RegionTreksPage({ params }: RegionTreksPageProps) {
    const { id } = await params

    const region = await prisma.region.findUnique({
        where: { id },
        include: { 
            treks: {
                orderBy: { updatedAt: "desc" }
            }
        }
    })

    if (!region) {
        notFound()
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-admin-card border border-admin-card-border p-8 rounded-[32px] shadow-2xl shadow-black/5">
                <div className="flex items-center gap-6">
                    <Link href="/admin/treks">
                        <button className="p-3 rounded-2xl bg-admin-bg border border-admin-card-border text-admin-text-secondary hover:text-admin-accent transition-all">
                            <ArrowLeft size={20} />
                        </button>
                    </Link>
                    <div>
                        <h1 className="text-4xl font-black text-admin-text-primary tracking-tight">{region.name}</h1>
                        <p className="text-sm font-bold text-admin-text-secondary opacity-60 mt-1 uppercase tracking-widest">Managing Expeditions in this Territory</p>
                    </div>
                </div>
                <Link href={`/admin/treks/new?regionId=${region.id}`}>
                    <button className="group flex items-center gap-3 bg-admin-accent text-white px-8 py-4 rounded-2xl font-black text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-admin-accent/20">
                        <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        CHARTER NEW EXPEDITION
                    </button>
                </Link>
            </div>

            {/* Trek Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {region.treks.map((trek) => (
                    <TrekCard key={trek.id} trek={trek} />
                ))}
            </div>

            {/* Empty State */}
            {region.treks.length === 0 && (
                <div className="bg-admin-card border-2 border-dashed border-admin-card-border rounded-[40px] p-32 text-center">
                    <div className="mx-auto w-24 h-24 bg-admin-accent/10 rounded-full flex items-center justify-center text-admin-accent mb-8">
                        <Mountain size={48} />
                    </div>
                    <h2 className="text-3xl font-black text-admin-text-primary">No Treks in {region.name}</h2>
                    <p className="text-admin-text-secondary font-bold mt-4 max-w-md mx-auto opacity-60">This region doesn't have any expeditions yet. Start by chartering your first one.</p>
                    <Link href={`/admin/treks/new?regionId=${region.id}`}>
                        <button className="mt-10 bg-admin-accent text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-admin-accent/20">
                            CHARTER FIRST TREK
                        </button>
                    </Link>
                </div>
            )}
        </div>
    )
}
