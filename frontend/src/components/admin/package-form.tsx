'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createPackage, updatePackage } from "@/actions/package-actions"
import { ArrowLeft, Save, Plus, Trash2, MapPin, Clock, DollarSign, Info } from "lucide-react"
import Link from "next/link"
import { ImageUpload } from "./image-upload"

interface PackageFormProps {
    initialData?: {
        id: string
        title: string
        slug: string | null
        image: string | null
        description: string
        price: number
        duration: string
        features: string[]
        location: string | null
    } | null
}

export function PackageForm({ initialData }: PackageFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        image: initialData?.image || "",
        description: initialData?.description || "",
        price: initialData?.price || 0,
        duration: initialData?.duration || "",
        features: initialData?.features || [""],
        location: initialData?.location || "Nepal",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ 
            ...prev, 
            [name]: name === 'price' ? parseFloat(value) || 0 : value 
        }))
    }

    const handleArrayChange = (index: number, value: string) => {
        setFormData(prev => {
            const features = [...prev.features]
            features[index] = value
            return { ...prev, features }
        })
    }

    const addFeature = () => {
        setFormData(prev => ({ 
            ...prev, 
            features: [...prev.features, ""] 
        }))
    }

    const removeFeature = (index: number) => {
        setFormData(prev => {
            const features = [...prev.features]
            features.splice(index, 1)
            return { ...prev, features }
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            // Auto-slug if empty
            if (!formData.slug) {
                formData.slug = formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            }

            const result = initialData 
                ? await updatePackage(initialData.id, formData)
                : await createPackage(formData)
            
            if (result.success) {
                router.push("/admin/packages")
                router.refresh()
            } else {
                alert(result.message || "Failed to save package")
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
            {/* Header Sticky Bar */}
            <div className="sticky top-0 z-40 flex items-center justify-between bg-admin-bg/80 backdrop-blur-md py-4 border-b border-admin-card-border mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/packages">
                        <button type="button" className="p-2.5 rounded-xl bg-admin-card border border-admin-card-border text-admin-text-secondary hover:text-admin-text-primary transition-all shadow-sm">
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-admin-text-primary">{initialData ? "Edit Package" : "New Package"}</h2>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-admin-text-secondary">{formData.title || "Untitled Package"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="inline-flex items-center justify-center rounded-xl bg-admin-accent text-white px-8 py-3 text-sm font-bold shadow-lg shadow-admin-accent/20 hover:bg-admin-accent/90 transition-all active:scale-95 disabled:opacity-50"
                    >
                        <Save className="mr-2 h-4 w-4" /> {loading ? "Processing..." : "Save Package"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <section className="bg-admin-card border border-admin-card-border rounded-2xl p-8 space-y-8 shadow-sm">
                        <div className="flex items-center gap-2 border-b border-admin-card-border pb-4">
                            <Info className="h-5 w-5 text-admin-accent" />
                            <h3 className="text-lg font-bold text-admin-text-primary">General Information</h3>
                        </div>
                        
                        <div className="grid gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Package Title</label>
                                <input 
                                    name="title" 
                                    value={formData.title} 
                                    onChange={handleChange}
                                    placeholder="e.g. Annapurna Base Camp Luxury Trek"
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
                                        placeholder="abc-luxury"
                                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-5 py-4 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all placeholder:text-admin-text-secondary/30"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-admin-text-secondary" />
                                        <input 
                                            name="location" 
                                            value={formData.location} 
                                            onChange={handleChange}
                                            placeholder="e.g. Annapurna Region"
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
                                    placeholder="Brief description of the package..."
                                    className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-5 py-4 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all min-h-[120px] resize-none placeholder:text-admin-text-secondary/30"
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    {/* Media Management */}
                    <section className="bg-admin-card border border-admin-card-border rounded-2xl p-8 space-y-8 shadow-sm">
                        <div className="flex items-center gap-2 border-b border-admin-card-border pb-4">
                            <Plus className="h-5 w-5 text-admin-accent" />
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

                    {/* Features Management */}
                    <section className="bg-admin-card border border-admin-card-border rounded-2xl p-8 space-y-8 shadow-sm">
                        <div className="flex items-center justify-between border-b border-admin-card-border pb-4">
                            <h3 className="text-lg font-bold text-admin-text-primary">Features & Highlights</h3>
                            <button type="button" onClick={addFeature} className="px-4 py-2 bg-admin-accent/10 text-admin-accent rounded-lg text-xs font-black uppercase tracking-widest hover:bg-admin-accent hover:text-white transition-all shadow-sm">
                                <Plus size={14} className="inline mr-1" /> Add Feature
                            </button>
                        </div>
                        <div className="space-y-4">
                            {formData.features.map((feature, i) => (
                                <div key={i} className="flex gap-3 group animate-in fade-in slide-in-from-top-1 duration-200">
                                    <input 
                                        value={feature} 
                                        onChange={(e) => handleArrayChange(i, e.target.value)}
                                        placeholder="e.g. 5-Star Accommodation"
                                        className="flex-1 bg-admin-bg border border-admin-card-border rounded-xl px-4 py-3.5 text-admin-text-primary text-sm focus:outline-none focus:border-admin-accent transition-all placeholder:text-admin-text-secondary/30"
                                    />
                                    <button type="button" onClick={() => removeFeature(i)} className="p-3.5 text-red-500 hover:bg-red-500/10 rounded-xl transition-all opacity-40 group-hover:opacity-100">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    {/* Pricing & Time */}
                    <section className="bg-admin-card border border-admin-card-border rounded-2xl p-8 space-y-8 shadow-sm">
                        <div className="flex items-center gap-2 border-b border-admin-card-border pb-4">
                            <DollarSign className="h-5 w-5 text-admin-accent" />
                            <h3 className="text-lg font-bold text-admin-text-primary">Pricing & Logistics</h3>
                        </div>

                        <div className="grid gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-admin-text-secondary ml-1">Base Price (USD)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-admin-text-secondary" />
                                    <input 
                                        type="number"
                                        name="price" 
                                        value={formData.price} 
                                        onChange={handleChange}
                                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl pl-11 pr-4 py-3.5 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all font-bold"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-admin-text-secondary ml-1">Total Duration</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-admin-text-secondary" />
                                    <input 
                                        name="duration" 
                                        value={formData.duration} 
                                        onChange={handleChange}
                                        placeholder="e.g. 10 Days"
                                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl pl-11 pr-4 py-3.5 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all font-bold placeholder:text-admin-text-secondary/30"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    )
}
