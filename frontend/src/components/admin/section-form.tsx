'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createSection, updateSection } from "@/actions/section-actions"
import { ArrowLeft, Save, Info } from "lucide-react"
import Link from "next/link"
import { ImageUpload } from "./image-upload"

interface SectionFormProps {
    initialData?: {
        id: string
        slug: string
        category: string
        tag: string | null
        title: string
        subtitle: string | null
        mainImage: string | null
        content: string
        isFeatured: boolean
    } | null
}

export function SectionForm({ initialData }: SectionFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        slug: initialData?.slug || "",
        category: initialData?.category || "general",
        tag: initialData?.tag || "",
        title: initialData?.title || "",
        subtitle: initialData?.subtitle || "",
        mainImage: initialData?.mainImage || "",
        content: initialData?.content || "",
        isFeatured: initialData?.isFeatured || false,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const result = initialData 
                ? await updateSection(initialData.id, formData)
                : await createSection(formData)
            
            if (result.success) {
                router.push("/admin/sections")
                router.refresh()
            } else {
                alert(result.message || "Failed to save section")
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
                    <Link href="/admin/sections">
                        <button type="button" className="p-2.5 rounded-xl bg-admin-card border border-admin-card-border text-admin-text-secondary hover:text-admin-text-primary transition-all shadow-sm">
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-admin-text-primary">{initialData ? "Edit Page Section" : "New Page Section"}</h2>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-admin-text-secondary">{formData.slug || "Untitled Section"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="inline-flex items-center justify-center rounded-xl bg-admin-accent text-white px-8 py-3 text-sm font-bold shadow-lg shadow-admin-accent/20 hover:bg-admin-accent/90 transition-all active:scale-95 disabled:opacity-50"
                    >
                        <Save className="mr-2 h-4 w-4" /> {loading ? "Processing..." : "Save Section"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-admin-card border border-admin-card-border rounded-2xl p-8 space-y-8 shadow-sm">
                        <div className="flex items-center gap-2 border-b border-admin-card-border pb-4">
                            <Info className="h-5 w-5 text-admin-accent" />
                            <h3 className="text-lg font-bold text-admin-text-primary">Content Section Details</h3>
                        </div>
                        
                        <div className="grid gap-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Section Identifier (Slug)</label>
                                    <input 
                                        name="slug" 
                                        value={formData.slug} 
                                        onChange={handleChange}
                                        placeholder="e.g. filler-valley"
                                        disabled={!!initialData}
                                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-5 py-4 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all disabled:opacity-60"
                                        required
                                    />
                                    {!!initialData && <p className="text-[10px] text-red-500 font-semibold mt-1">Slug cannot be changed once created as the frontend relies on this ID.</p>}
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Category</label>
                                    <input 
                                        name="category" 
                                        value={formData.category} 
                                        onChange={handleChange}
                                        placeholder="e.g. brand, explore-valley, homepage"
                                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-5 py-4 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Tag (Optional)</label>
                                    <input 
                                        name="tag" 
                                        value={formData.tag} 
                                        onChange={handleChange}
                                        placeholder="e.g. festival"
                                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-5 py-4 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all"
                                    />
                                </div>
                                <div className="space-y-3 flex items-center justify-between p-4 bg-admin-bg border border-admin-card-border rounded-xl mt-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-admin-text-primary">Featured Section</span>
                                        <span className="text-[10px] text-admin-text-secondary">Mark this section as featured</span>
                                    </div>
                                    <input 
                                        type="checkbox"
                                        name="isFeatured" 
                                        checked={formData.isFeatured} 
                                        onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                                        className="h-5 w-5 rounded border-admin-card-border text-admin-accent focus:ring-admin-accent/20 cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Section Title</label>
                                <input 
                                    name="title" 
                                    value={formData.title} 
                                    onChange={handleChange}
                                    placeholder="Section Title"
                                    className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-5 py-4 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all"
                                    required
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Subtitle</label>
                                <input 
                                    name="subtitle" 
                                    value={formData.subtitle} 
                                    onChange={handleChange}
                                    placeholder="Section Subtitle"
                                    className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-5 py-4 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Content Body (Markdown/HTML supported)</label>
                                <textarea 
                                    name="content" 
                                    value={formData.content} 
                                    onChange={handleChange}
                                    placeholder="Write content body here..."
                                    className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-5 py-4 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all min-h-[220px] resize-none"
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
                            <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Main Image</label>
                            <ImageUpload 
                                value={formData.mainImage ? [formData.mainImage] : []}
                                onChange={(url) => setFormData(prev => ({ ...prev, mainImage: url }))}
                                onRemove={() => setFormData(prev => ({ ...prev, mainImage: "" }))}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </form>
    )
}
