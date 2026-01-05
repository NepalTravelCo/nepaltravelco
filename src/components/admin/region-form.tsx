
'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createRegion, updateRegion } from "@/actions/region-actions"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

interface RegionFormProps {
    initialData?: {
        id: string
        name: string
        slug: string
        image: string
        trailCount: number
        altitude: number
        description: string
    } | null
}

export function RegionForm({ initialData }: RegionFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        image: initialData?.image || "",
        trailCount: initialData?.trailCount || 0,
        altitude: initialData?.altitude || 3500,
        description: initialData?.description || "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        const numericFields = ['trailCount', 'altitude']
        setFormData(prev => ({ ...prev, [name]: numericFields.includes(name) ? parseInt(value) || 0 : value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = initialData 
                ? await updateRegion(initialData.id, formData)
                : await createRegion(formData)
            
            if (result.success) {
                router.push("/admin/regions")
                router.refresh()
            } else {
                alert(result.message || "Failed to save region")
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/regions">
                        <button type="button" className="p-2 rounded-lg bg-admin-card border border-admin-card-border text-admin-text-secondary hover:text-admin-text-primary transition-all">
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                    </Link>
                    <h2 className="text-3xl font-bold tracking-tight text-white">{initialData ? "Edit Region" : "Create Region"}</h2>
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-xl bg-admin-accent text-white px-8 py-3 text-sm font-bold shadow-lg shadow-admin-accent/20 hover:bg-admin-accent/90 transition-all disabled:opacity-50"
                >
                    <Save className="mr-2 h-4 w-4" /> {loading ? "Saving..." : "Save Region"}
                </button>
            </div>

            <div className="bg-admin-card border border-admin-card-border rounded-2xl p-8 space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary">Region Name</label>
                    <input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange}
                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-accent transition-colors"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary">Slug</label>
                    <input 
                        name="slug" 
                        value={formData.slug} 
                        onChange={handleChange}
                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-accent transition-colors"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary">Image URL</label>
                    <input 
                        name="image" 
                        value={formData.image} 
                        onChange={handleChange}
                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-accent transition-colors"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary">Trail Count</label>
                    <input 
                        type="number"
                        name="trailCount" 
                        value={formData.trailCount} 
                        onChange={handleChange}
                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-accent transition-colors"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary">Basecamp Altitude (m)</label>
                    <input 
                        type="number"
                        name="altitude" 
                        value={formData.altitude} 
                        onChange={handleChange}
                        placeholder="e.g. 5364 for Everest"
                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-accent transition-colors"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary">Description</label>
                    <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange}
                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-accent transition-colors min-h-[120px]"
                        required
                    />
                </div>
            </div>
        </form>
    )
}
