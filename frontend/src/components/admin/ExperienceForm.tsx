"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createExperience, updateExperience } from "@/app/(admin)/admin/(dashboard)/experiences/actions"
import { ImageUpload } from "@/components/admin/image-upload"

const LIMITS = {
    name: 80,
    subtitle: 120,
    description: 300,
    short: 50
}

export function ExperienceForm({ initialData }: { initialData?: any }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [name, setName] = useState(initialData?.name || "")
    const [subtitle, setSubtitle] = useState(initialData?.subtitle || "")
    const [description, setDescription] = useState(initialData?.description || "")
    const [duration, setDuration] = useState(initialData?.duration || "")
    const [maxAltitude, setMaxAltitude] = useState(initialData?.maxAltitude || "")
    const [difficulty, setDifficulty] = useState(initialData?.difficulty || "")
    const [accent, setAccent] = useState(initialData?.accent || "#3b82f6")
    
    // Arrays and Images
    const [image, setImage] = useState<string>(initialData?.image || "")
    const [gallery, setGallery] = useState<string[]>(initialData?.gallery || [])
    
    const [longDescription, setLongDescription] = useState((initialData?.longDescription || []).join('\n'))
    const [highlights, setHighlights] = useState((initialData?.highlights || []).join('\n'))
    const [tips, setTips] = useState((initialData?.tips || []).join('\n'))
    const [bestMonths, setBestMonths] = useState((initialData?.bestMonths || []).join('\n'))

    const isValid = 
        name.length > 0 && name.length <= LIMITS.name &&
        subtitle.length <= LIMITS.subtitle &&
        description.length > 0 && description.length <= LIMITS.description &&
        duration.length <= LIMITS.short &&
        maxAltitude.length <= LIMITS.short &&
        difficulty.length <= LIMITS.short &&
        accent.length <= LIMITS.short &&
        image.length > 0;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!isValid) return;

        setLoading(true)
        setError(null)
        
        const parseList = (val: string) => val.split('\n').map(s => s.trim()).filter(Boolean)

        const data = {
            name, subtitle, description, duration, maxAltitude, difficulty, accent,
            image, gallery,
            longDescription: parseList(longDescription),
            bestMonths: parseList(bestMonths),
            highlights: parseList(highlights),
            tips: parseList(tips),
        }

        try {
            if (initialData?.id) {
                await updateExperience(initialData.id, data)
            } else {
                await createExperience(data)
            }
        } catch (err) {
            console.error(err)
            setError("Failed to save experience. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-admin-card border border-admin-card-border rounded-[32px] p-8 shadow-2xl shadow-black/5 space-y-8 transition-all hover:shadow-black/10">
            <h2 className="text-2xl font-black text-admin-text-primary">{initialData ? 'Edit Experience' : 'Create New Experience'}</h2>
            
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-bold text-admin-text-secondary uppercase tracking-wider">Name</label>
                        <span className={`text-xs font-bold ${name.length > LIMITS.name ? 'text-red-500' : 'text-admin-text-secondary'}`}>{name.length}/{LIMITS.name}</span>
                    </div>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                        className={`w-full bg-admin-background border rounded-xl px-4 py-3 text-admin-text-primary focus:outline-none transition-all focus:ring-2 focus:ring-admin-accent/20 ${name.length > LIMITS.name ? 'border-red-500 focus:border-red-500' : 'border-admin-card-border focus:border-admin-accent'}`}
                    />
                </div>

                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-bold text-admin-text-secondary uppercase tracking-wider">Subtitle</label>
                        <span className={`text-xs font-bold ${subtitle.length > LIMITS.subtitle ? 'text-red-500' : 'text-admin-text-secondary'}`}>{subtitle.length}/{LIMITS.subtitle}</span>
                    </div>
                    <input 
                        type="text" 
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className={`w-full bg-admin-background border rounded-xl px-4 py-3 text-admin-text-primary focus:outline-none transition-all focus:ring-2 focus:ring-admin-accent/20 ${subtitle.length > LIMITS.subtitle ? 'border-red-500 focus:border-red-500' : 'border-admin-card-border focus:border-admin-accent'}`}
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-admin-text-secondary mb-2 uppercase tracking-wider">Main Image</label>
                    <ImageUpload 
                        value={image ? [image] : []}
                        onChange={(url) => setImage(url)}
                        onRemove={() => setImage("")}
                        maxImages={1}
                    />
                    {!image && <p className="text-red-500 text-xs mt-1">Main image is required.</p>}
                </div>

                <div className="md:col-span-2">
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-bold text-admin-text-secondary uppercase tracking-wider">Short Description</label>
                        <span className={`text-xs font-bold ${description.length > LIMITS.description ? 'text-red-500' : 'text-admin-text-secondary'}`}>{description.length}/{LIMITS.description}</span>
                    </div>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required 
                        rows={2}
                        className={`w-full bg-admin-background border rounded-xl px-4 py-3 text-admin-text-primary focus:outline-none transition-all focus:ring-2 focus:ring-admin-accent/20 ${description.length > LIMITS.description ? 'border-red-500 focus:border-red-500' : 'border-admin-card-border focus:border-admin-accent'}`}
                    />
                </div>
                
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-bold text-admin-text-secondary uppercase tracking-wider">Duration (e.g. 3 Days)</label>
                        <span className={`text-xs font-bold ${duration.length > LIMITS.short ? 'text-red-500' : 'text-admin-text-secondary'}`}>{duration.length}/{LIMITS.short}</span>
                    </div>
                    <input 
                        type="text" 
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className={`w-full bg-admin-background border rounded-xl px-4 py-3 text-admin-text-primary focus:outline-none transition-all focus:ring-2 focus:ring-admin-accent/20 ${duration.length > LIMITS.short ? 'border-red-500 focus:border-red-500' : 'border-admin-card-border focus:border-admin-accent'}`}
                    />
                </div>

                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-bold text-admin-text-secondary uppercase tracking-wider">Max Altitude</label>
                        <span className={`text-xs font-bold ${maxAltitude.length > LIMITS.short ? 'text-red-500' : 'text-admin-text-secondary'}`}>{maxAltitude.length}/{LIMITS.short}</span>
                    </div>
                    <input 
                        type="text" 
                        value={maxAltitude}
                        onChange={(e) => setMaxAltitude(e.target.value)}
                        className={`w-full bg-admin-background border rounded-xl px-4 py-3 text-admin-text-primary focus:outline-none transition-all focus:ring-2 focus:ring-admin-accent/20 ${maxAltitude.length > LIMITS.short ? 'border-red-500 focus:border-red-500' : 'border-admin-card-border focus:border-admin-accent'}`}
                    />
                </div>

                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-bold text-admin-text-secondary uppercase tracking-wider">Difficulty</label>
                        <span className={`text-xs font-bold ${difficulty.length > LIMITS.short ? 'text-red-500' : 'text-admin-text-secondary'}`}>{difficulty.length}/{LIMITS.short}</span>
                    </div>
                    <input 
                        type="text" 
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className={`w-full bg-admin-background border rounded-xl px-4 py-3 text-admin-text-primary focus:outline-none transition-all focus:ring-2 focus:ring-admin-accent/20 ${difficulty.length > LIMITS.short ? 'border-red-500 focus:border-red-500' : 'border-admin-card-border focus:border-admin-accent'}`}
                    />
                </div>

                <div>
                    <div className="flex justify-between mb-2">
                        <label className="text-sm font-bold text-admin-text-secondary uppercase tracking-wider">Accent Color (Hex)</label>
                        <span className={`text-xs font-bold ${accent.length > LIMITS.short ? 'text-red-500' : 'text-admin-text-secondary'}`}>{accent.length}/{LIMITS.short}</span>
                    </div>
                    <input 
                        type="text" 
                        value={accent}
                        onChange={(e) => setAccent(e.target.value)}
                        className={`w-full bg-admin-background border rounded-xl px-4 py-3 text-admin-text-primary focus:outline-none transition-all focus:ring-2 focus:ring-admin-accent/20 ${accent.length > LIMITS.short ? 'border-red-500 focus:border-red-500' : 'border-admin-card-border focus:border-admin-accent'}`}
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-admin-text-secondary mb-2 uppercase tracking-wider">Long Description (One paragraph per line)</label>
                    <textarea 
                        value={longDescription}
                        onChange={(e) => setLongDescription(e.target.value)}
                        rows={4}
                        className="w-full bg-admin-background border border-admin-card-border rounded-xl px-4 py-3 text-admin-text-primary focus:outline-none focus:border-admin-accent focus:ring-2 focus:ring-admin-accent/20 transition-all"
                    />
                </div>
                
                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-admin-text-secondary mb-2 uppercase tracking-wider">Highlights (One per line)</label>
                    <textarea 
                        value={highlights}
                        onChange={(e) => setHighlights(e.target.value)}
                        rows={3}
                        className="w-full bg-admin-background border border-admin-card-border rounded-xl px-4 py-3 text-admin-text-primary focus:outline-none focus:border-admin-accent focus:ring-2 focus:ring-admin-accent/20 transition-all"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-admin-text-secondary mb-2 uppercase tracking-wider">Tips (One per line)</label>
                    <textarea 
                        value={tips}
                        onChange={(e) => setTips(e.target.value)}
                        rows={3}
                        className="w-full bg-admin-background border border-admin-card-border rounded-xl px-4 py-3 text-admin-text-primary focus:outline-none focus:border-admin-accent focus:ring-2 focus:ring-admin-accent/20 transition-all"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-admin-text-secondary mb-2 uppercase tracking-wider">Best Months (One per line)</label>
                    <textarea 
                        value={bestMonths}
                        onChange={(e) => setBestMonths(e.target.value)}
                        rows={2}
                        className="w-full bg-admin-background border border-admin-card-border rounded-xl px-4 py-3 text-admin-text-primary focus:outline-none focus:border-admin-accent focus:ring-2 focus:ring-admin-accent/20 transition-all"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-admin-text-secondary mb-2 uppercase tracking-wider">Gallery Images</label>
                    <ImageUpload 
                        value={gallery}
                        onChange={(url) => setGallery([...gallery, url])}
                        onRemove={(url) => setGallery(gallery.filter((g) => g !== url))}
                        maxImages={10}
                    />
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
                    {loading ? "SAVING..." : "SAVE EXPERIENCE"}
                </button>
            </div>
        </form>
    )
}
