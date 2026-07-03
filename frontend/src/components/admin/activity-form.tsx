'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createActivity, updateActivity } from "@/actions/activity-actions"
import { ArrowLeft, Save, Info, Plus, Trash2, Tag, Smile } from "lucide-react"
import Link from "next/link"
import { ImageUpload } from "./image-upload"

interface ActivityFormProps {
    initialData?: {
        id: string
        name: string
        slug: string
        tag: string
        description: string
        icon: string
        color: string | null
        image: string
        highlights: string[]
        categoryId: number | null
    } | null
}

export function ActivityForm({ initialData }: ActivityFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        tag: initialData?.tag || "",
        description: initialData?.description || "",
        icon: initialData?.icon || "compass",
        color: initialData?.color || "text-emerald-500",
        image: initialData?.image || "",
        highlights: initialData?.highlights || [""],
        categoryId: initialData?.categoryId || null,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleArrayChange = (index: number, value: string) => {
        setFormData(prev => {
            const highlights = [...prev.highlights]
            highlights[index] = value
            return { ...prev, highlights }
        })
    }

    const addHighlight = () => {
        setFormData(prev => ({ ...prev, highlights: [...prev.highlights, ""] }))
    }

    const removeHighlight = (index: number) => {
        setFormData(prev => {
            const highlights = [...prev.highlights]
            highlights.splice(index, 1)
            return { ...prev, highlights }
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (!formData.slug) {
                formData.slug = formData.name.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            }

            const result = initialData 
                ? await updateActivity(initialData.id, formData)
                : await createActivity(formData)
            
            if (result.success) {
                router.push("/admin/activities")
                router.refresh()
            } else {
                alert(result.message || "Failed to save activity")
            }
        } catch (error) {
            console.error(error)
            alert("An error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-32">
            <div className="sticky top-0 z-40 flex items-center justify-between bg-admin-bg/80 backdrop-blur-md py-4 border-b border-admin-card-border mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/activities">
                        <button type="button" className="p-2.5 rounded-xl bg-admin-card border border-admin-card-border text-admin-text-secondary hover:text-admin-text-primary transition-all shadow-sm">
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-admin-text-primary">{initialData ? "Edit Activity" : "New Activity"}</h2>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-admin-text-secondary">{formData.name || "Untitled Activity"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="inline-flex items-center justify-center rounded-xl bg-admin-accent text-white px-8 py-3 text-sm font-bold shadow-lg shadow-admin-accent/20 hover:bg-admin-accent/90 transition-all active:scale-95 disabled:opacity-50"
                    >
                        <Save className="mr-2 h-4 w-4" /> {loading ? "Processing..." : "Save Activity"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-admin-card border border-admin-card-border rounded-2xl p-8 space-y-8 shadow-sm">
                        <div className="flex items-center gap-2 border-b border-admin-card-border pb-4">
                            <Info className="h-5 w-5 text-admin-accent" />
                            <h3 className="text-lg font-bold text-admin-text-primary">General Information</h3>
                        </div>
                        
                        <div className="grid gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Activity Name</label>
                                <input 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange}
                                    placeholder="e.g. Paragliding"
                                    className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-5 py-4 text-admin-text-primary focus:outline-none focus:ring-2 focus:ring-admin-accent/20 focus:border-admin-accent transition-all placeholder:text-admin-text-secondary/30"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Slug</label>
                                    <input 
                                        name="slug" 
                                        value={formData.slug} 
                                        onChange={handleChange}
                                        placeholder="paragliding"
                                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-5 py-4 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Tag / Category Tag</label>
                                    <div className="relative">
                                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-admin-text-secondary" />
                                        <input 
                                            name="tag" 
                                            value={formData.tag} 
                                            onChange={handleChange}
                                            placeholder="e.g. Adventure"
                                            className="w-full bg-admin-bg border border-admin-card-border rounded-xl pl-11 pr-5 py-4 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Icon Name (Lucide)</label>
                                    <input 
                                        name="icon" 
                                        value={formData.icon} 
                                        onChange={handleChange}
                                        placeholder="e.g. wind, compass, map"
                                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-5 py-4 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all"
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Color Theme Class</label>
                                    <input 
                                        name="color" 
                                        value={formData.color || ""} 
                                        onChange={handleChange}
                                        placeholder="e.g. text-emerald-500"
                                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-5 py-4 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Description</label>
                                <textarea 
                                    name="description" 
                                    value={formData.description} 
                                    onChange={handleChange}
                                    placeholder="Brief description of the activity..."
                                    className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-5 py-4 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all min-h-[120px] resize-none placeholder:text-admin-text-secondary/30"
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-admin-card border border-admin-card-border rounded-2xl p-8 space-y-8 shadow-sm">
                        <div className="flex items-center justify-between border-b border-admin-card-border pb-4">
                            <h3 className="text-lg font-bold text-admin-text-primary">Highlights & Core Features</h3>
                            <button type="button" onClick={addHighlight} className="px-4 py-2 bg-admin-accent/10 text-admin-accent rounded-lg text-xs font-black uppercase tracking-widest hover:bg-admin-accent hover:text-white transition-all shadow-sm">
                                <Plus size={14} className="inline mr-1" /> Add Highlight
                            </button>
                        </div>
                        <div className="space-y-4">
                            {formData.highlights.map((highlight, i) => (
                                <div key={i} className="flex gap-3 group animate-in fade-in slide-in-from-top-1 duration-200">
                                    <input 
                                        value={highlight} 
                                        onChange={(e) => handleArrayChange(i, e.target.value)}
                                        placeholder="e.g. Stunning Lakeside Views"
                                        className="flex-1 bg-admin-bg border border-admin-card-border rounded-xl px-4 py-3.5 text-admin-text-primary text-sm focus:outline-none focus:border-admin-accent transition-all"
                                    />
                                    <button type="button" onClick={() => removeHighlight(i)} className="p-3.5 text-red-500 hover:bg-red-500/10 rounded-xl transition-all opacity-40 group-hover:opacity-100">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <section className="bg-admin-card border border-admin-card-border rounded-2xl p-8 space-y-8 shadow-sm">
                        <div className="flex items-center gap-2 border-b border-admin-card-border pb-4">
                            <Smile className="h-5 w-5 text-admin-accent" />
                            <h3 className="text-lg font-bold text-admin-text-primary">Media Library</h3>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Featured Image</label>
                            <ImageUpload 
                                value={formData.image ? [formData.image] : []}
                                onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                                onRemove={() => setFormData(prev => ({ ...prev, image: "" }))}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </form>
    )
}
