
'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createTrek, updateTrek } from "@/actions/trek-actions"
import { ArrowLeft, Save, X, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

interface Region {
    id: string
    name: string
}

interface TrekFormProps {
    initialData?: any
    regions: Region[]
}

export function TrekForm({ initialData, regions }: TrekFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        image: initialData?.image || "",
        description: initialData?.description || "",
        longDescription: initialData?.longDescription || [""],
        altitude: initialData?.altitude || 0,
        duration: initialData?.duration || "",
        difficulty: initialData?.difficulty || "Moderate",
        bestMonths: initialData?.bestMonths || [],
        highlights: initialData?.highlights || [""],
        tips: initialData?.tips || [""],
        gallery: initialData?.gallery || [],
        itinerary: initialData?.itinerary || [],
        estimatedCost: initialData?.estimatedCost || { budget: "", includes: [] },
        permits: initialData?.permits || [""],
        regionId: initialData?.regionId || "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: name === 'altitude' ? parseInt(value) || 0 : value }))
    }

    const handleArrayChange = (field: string, index: number, value: string) => {
        setFormData(prev => {
            const arr = [...(prev[field as keyof typeof prev] as string[])]
            arr[index] = value
            return { ...prev, [field]: arr }
        })
    }

    const addArrayItem = (field: string) => {
        setFormData(prev => ({ 
            ...prev, 
            [field]: [...(prev[field as keyof typeof prev] as string[]), ""] 
        }))
    }

    const removeArrayItem = (field: string, index: number) => {
        setFormData(prev => {
            const arr = [...(prev[field as keyof typeof prev] as string[])]
            arr.splice(index, 1)
            return { ...prev, [field]: arr }
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = initialData 
                ? await updateTrek(initialData.id, formData)
                : await createTrek(formData)
            
            if (result.success) {
                router.push("/admin/treks")
                router.refresh()
            } else {
                alert(result.message || "Failed to save trek")
            }
        } catch (error) {
            console.error(error)
            alert("An error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/treks">
                        <button type="button" className="p-2 rounded-lg bg-admin-card border border-admin-card-border text-admin-text-secondary hover:text-admin-text-primary transition-all">
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                    </Link>
                    <h2 className="text-3xl font-bold tracking-tight text-white">{initialData ? "Edit Trek" : "Create New Trek"}</h2>
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-xl bg-admin-accent text-white px-8 py-3 text-sm font-bold shadow-lg shadow-admin-accent/20 hover:bg-admin-accent/90 transition-all disabled:opacity-50"
                >
                    <Save className="mr-2 h-4 w-4" /> {loading ? "Saving..." : "Save Expedition"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-admin-card border border-admin-card-border rounded-2xl p-6 space-y-6">
                        <h3 className="text-lg font-bold text-white border-b border-admin-card-border pb-4">General Information</h3>
                        <div className="grid gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary">Trek Name</label>
                                <input 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange}
                                    placeholder="e.g. Everest Base Camp"
                                    className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-accent transition-colors"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary">Slug</label>
                                    <input 
                                        name="slug" 
                                        value={formData.slug} 
                                        onChange={handleChange}
                                        placeholder="everest-base-camp"
                                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-accent transition-colors"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary">Region</label>
                                    <select 
                                        name="regionId" 
                                        value={formData.regionId} 
                                        onChange={handleChange}
                                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-accent transition-colors appearance-none"
                                    >
                                        <option value="">Select Region</option>
                                        {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary">Hero Image URL</label>
                                <input 
                                    name="image" 
                                    value={formData.image} 
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-accent transition-colors"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary">Short Description</label>
                                <textarea 
                                    name="description" 
                                    value={formData.description} 
                                    onChange={handleChange}
                                    placeholder="Brief summary for list view..."
                                    className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-accent transition-colors min-h-[100px]"
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-admin-card border border-admin-card-border rounded-2xl p-6 space-y-6">
                        <div className="flex items-center justify-between border-b border-admin-card-border pb-4">
                            <h3 className="text-lg font-bold text-white">Highlights</h3>
                            <button type="button" onClick={() => addArrayItem('highlights')} className="text-xs font-bold text-admin-accent hover:underline flex items-center gap-1">
                                <Plus size={14} /> Add Highlight
                            </button>
                        </div>
                        <div className="grid gap-4">
                            {formData.highlights.map((h, i) => (
                                <div key={i} className="flex gap-2">
                                    <input 
                                        value={h} 
                                        onChange={(e) => handleArrayChange('highlights', i, e.target.value)}
                                        className="flex-1 bg-admin-bg border border-admin-card-border rounded-xl px-4 py-3 text-white focus:outline-none"
                                    />
                                    <button type="button" onClick={() => removeArrayItem('highlights', i)} className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-8">
                    <section className="bg-admin-card border border-admin-card-border rounded-2xl p-6 space-y-6">
                        <h3 className="text-lg font-bold text-white border-b border-admin-card-border pb-4">Technical Specs</h3>
                        <div className="grid gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary">Max Altitude (m)</label>
                                <input 
                                    type="number"
                                    name="altitude" 
                                    value={formData.altitude} 
                                    onChange={handleChange}
                                    className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-accent transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary">Duration</label>
                                <input 
                                    name="duration" 
                                    value={formData.duration} 
                                    onChange={handleChange}
                                    placeholder="e.g. 12-14 days"
                                    className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-accent transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary">Difficulty</label>
                                <select 
                                    name="difficulty" 
                                    value={formData.difficulty} 
                                    onChange={handleChange}
                                    className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-admin-accent transition-colors appearance-none"
                                >
                                    <option value="Easy">Easy</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="Hard">Hard</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    )
}
