'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createDestination, updateDestination } from "@/actions/destination-actions"
import { ArrowLeft, Save, Info, MapPin } from "lucide-react"
import Link from "next/link"
import { ImageUpload } from "./image-upload"

interface DestinationFormProps {
    initialData?: {
        id: string
        name: string
        slug: string
        image: string
        description: string
        location: string | null
    } | null
}

export function DestinationForm({ initialData }: DestinationFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        image: initialData?.image || "",
        description: initialData?.description || "",
        location: initialData?.location || "Nepal",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (!formData.slug) {
                formData.slug = formData.name.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            }

            const result = initialData 
                ? await updateDestination(initialData.id, formData)
                : await createDestination(formData)
            
            if (result.success) {
                router.push("/admin/destinations")
                router.refresh()
            } else {
                alert(result.message || "Failed to save destination")
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
                    <Link href="/admin/destinations">
                        <button type="button" className="p-2.5 rounded-xl bg-admin-card border border-admin-card-border text-admin-text-secondary hover:text-admin-text-primary transition-all shadow-sm">
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-admin-text-primary">{initialData ? "Edit Destination" : "New Destination"}</h2>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-admin-text-secondary">{formData.name || "Untitled Destination"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="inline-flex items-center justify-center rounded-xl bg-admin-accent text-white px-8 py-3 text-sm font-bold shadow-lg shadow-admin-accent/20 hover:bg-admin-accent/90 transition-all active:scale-95 disabled:opacity-50"
                    >
                        <Save className="mr-2 h-4 w-4" /> {loading ? "Processing..." : "Save Destination"}
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
                                <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Destination Name</label>
                                <input 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange}
                                    placeholder="e.g. Pokhara"
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
                                        placeholder="pokhara"
                                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-5 py-4 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all placeholder:text-admin-text-secondary/30"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Location Details</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-admin-text-secondary" />
                                        <input 
                                            name="location" 
                                            value={formData.location} 
                                            onChange={handleChange}
                                            placeholder="e.g. Gandaki Province"
                                            className="w-full bg-admin-bg border border-admin-card-border rounded-xl pl-11 pr-5 py-4 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all placeholder:text-admin-text-secondary/30"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Description</label>
                                <textarea 
                                    name="description" 
                                    value={formData.description} 
                                    onChange={handleChange}
                                    placeholder="Detailed description of the destination..."
                                    className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-5 py-4 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all min-h-[160px] resize-none placeholder:text-admin-text-secondary/30"
                                    required
                                />
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <section className="bg-admin-card border border-admin-card-border rounded-2xl p-8 space-y-8 shadow-sm">
                        <div className="flex items-center gap-2 border-b border-admin-card-border pb-4">
                            <Info className="h-5 w-5 text-admin-accent" />
                            <h3 className="text-lg font-bold text-admin-text-primary">Media Library</h3>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Cover Image</label>
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
