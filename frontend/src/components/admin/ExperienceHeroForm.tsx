"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateHeroSection } from "@/app/(admin)/admin/(dashboard)/experiences/actions"
import { ImageUpload } from "@/components/admin/image-upload"

const LIMITS = {
    subtitle: 50,
    title: 80,
    content: 300,
}

export function ExperienceHeroForm({ initialData }: { initialData?: any }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [subtitle, setSubtitle] = useState(initialData?.subtitle || "")
    const [title, setTitle] = useState(initialData?.title || "")
    const [content, setContent] = useState(initialData?.content || "")
    const [mainImage, setMainImage] = useState<string>(initialData?.mainImage || "")

    const isValid = 
        subtitle.length > 0 && subtitle.length <= LIMITS.subtitle &&
        title.length > 0 && title.length <= LIMITS.title &&
        content.length > 0 && content.length <= LIMITS.content &&
        mainImage.length > 0;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!isValid) return;
        
        setLoading(true)
        setError(null)
        
        try {
            await updateHeroSection({
                title, subtitle, content, mainImage
            })
        } catch (err) {
            console.error(err)
            setError("Failed to save hero section. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-admin-card border border-admin-card-border rounded-[32px] p-8 shadow-2xl shadow-black/5 space-y-6 transition-all hover:shadow-black/10">
            <h2 className="text-2xl font-black text-admin-text-primary">Edit Hero Section</h2>
            
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="space-y-6">
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-bold text-admin-text-secondary uppercase tracking-wider">Subtext (e.g. Beyond the Peaks)</label>
                        <span className={`text-xs font-bold ${subtitle.length > LIMITS.subtitle ? 'text-red-500' : 'text-admin-text-secondary'}`}>
                            {subtitle.length}/{LIMITS.subtitle}
                        </span>
                    </div>
                    <input 
                        type="text" 
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        required 
                        className={`w-full bg-admin-background border rounded-xl px-4 py-3 text-admin-text-primary focus:outline-none transition-all focus:ring-2 focus:ring-admin-accent/20 ${subtitle.length > LIMITS.subtitle ? 'border-red-500 focus:border-red-500' : 'border-admin-card-border focus:border-admin-accent'}`}
                    />
                    {subtitle.length > LIMITS.subtitle && <p className="text-red-500 text-xs mt-1">Exceeds maximum length of {LIMITS.subtitle} characters.</p>}
                </div>
                
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-bold text-admin-text-secondary uppercase tracking-wider">Main Title (e.g. Unforgettable Experiences)</label>
                        <span className={`text-xs font-bold ${title.length > LIMITS.title ? 'text-red-500' : 'text-admin-text-secondary'}`}>
                            {title.length}/{LIMITS.title}
                        </span>
                    </div>
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required 
                        className={`w-full bg-admin-background border rounded-xl px-4 py-3 text-admin-text-primary focus:outline-none transition-all focus:ring-2 focus:ring-admin-accent/20 ${title.length > LIMITS.title ? 'border-red-500 focus:border-red-500' : 'border-admin-card-border focus:border-admin-accent'}`}
                    />
                    {title.length > LIMITS.title && <p className="text-red-500 text-xs mt-1">Exceeds maximum length of {LIMITS.title} characters.</p>}
                </div>
                
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-bold text-admin-text-secondary uppercase tracking-wider">Description</label>
                        <span className={`text-xs font-bold ${content.length > LIMITS.content ? 'text-red-500' : 'text-admin-text-secondary'}`}>
                            {content.length}/{LIMITS.content}
                        </span>
                    </div>
                    <textarea 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required 
                        rows={4}
                        className={`w-full bg-admin-background border rounded-xl px-4 py-3 text-admin-text-primary focus:outline-none transition-all focus:ring-2 focus:ring-admin-accent/20 ${content.length > LIMITS.content ? 'border-red-500 focus:border-red-500' : 'border-admin-card-border focus:border-admin-accent'}`}
                    />
                    {content.length > LIMITS.content && <p className="text-red-500 text-xs mt-1">Exceeds maximum length of {LIMITS.content} characters.</p>}
                </div>
                
                <div>
                    <label className="block text-sm font-bold text-admin-text-secondary mb-2 uppercase tracking-wider">Background Image</label>
                    <ImageUpload 
                        value={mainImage ? [mainImage] : []}
                        onChange={(url) => setMainImage(url)}
                        onRemove={() => setMainImage("")}
                        maxImages={1}
                    />
                    {!mainImage && <p className="text-red-500 text-xs mt-1">Background image is required.</p>}
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-admin-card-border mt-8">
                <button 
                    type="button" 
                    onClick={() => router.back()}
                    className="px-6 py-3 rounded-xl font-bold text-admin-text-secondary hover:text-admin-text-primary hover:bg-admin-background transition-all"
                >
                    CANCEL
                </button>
                <button 
                    type="submit" 
                    disabled={loading || !isValid}
                    className="bg-admin-accent text-white px-8 py-3 rounded-xl font-black shadow-xl shadow-admin-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {loading ? "SAVING..." : "SAVE HERO"}
                </button>
            </div>
        </form>
    )
}
