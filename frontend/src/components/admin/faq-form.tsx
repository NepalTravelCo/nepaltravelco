'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createFaq, updateFaq } from "@/actions/faq-actions"
import { ArrowLeft, Save, Info } from "lucide-react"
import Link from "next/link"

interface FaqFormProps {
    initialData?: {
        id: string
        question: string
        answer: string
        category: string | null
        slug: string | null
    } | null
}

export function FaqForm({ initialData }: FaqFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        question: initialData?.question || "",
        answer: initialData?.answer || "",
        category: initialData?.category || "General",
        slug: initialData?.slug || "",
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
                formData.slug = formData.question.toLowerCase().trim().slice(0, 40).replace(/ /g, '-').replace(/[^\w-]+/g, '')
            }

            const result = initialData 
                ? await updateFaq(initialData.id, formData)
                : await createFaq(formData)
            
            if (result.success) {
                router.push("/admin/faqs")
                router.refresh()
            } else {
                alert(result.message || "Failed to save FAQ")
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
                    <Link href="/admin/faqs">
                        <button type="button" className="p-2.5 rounded-xl bg-admin-card border border-admin-card-border text-admin-text-secondary hover:text-admin-text-primary transition-all shadow-sm">
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-admin-text-primary">{initialData ? "Edit FAQ" : "New FAQ"}</h2>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-admin-text-secondary">{formData.question || "Untitled FAQ"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="inline-flex items-center justify-center rounded-xl bg-admin-accent text-white px-8 py-3 text-sm font-bold shadow-lg shadow-admin-accent/20 hover:bg-admin-accent/90 transition-all active:scale-95 disabled:opacity-50"
                    >
                        <Save className="mr-2 h-4 w-4" /> {loading ? "Processing..." : "Save FAQ"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-admin-card border border-admin-card-border rounded-2xl p-8 space-y-8 shadow-sm">
                        <div className="flex items-center gap-2 border-b border-admin-card-border pb-4">
                            <Info className="h-5 w-5 text-admin-accent" />
                            <h3 className="text-lg font-bold text-admin-text-primary">FAQ Details</h3>
                        </div>
                        
                        <div className="grid gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Question</label>
                                <input 
                                    name="question" 
                                    value={formData.question} 
                                    onChange={handleChange}
                                    placeholder="e.g. What is the best time to visit Nepal?"
                                    className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-5 py-4 text-admin-text-primary focus:outline-none focus:ring-2 focus:ring-admin-accent/20 focus:border-admin-accent transition-all placeholder:text-admin-text-secondary/30"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Category</label>
                                    <input 
                                        name="category" 
                                        value={formData.category} 
                                        onChange={handleChange}
                                        placeholder="e.g. General, Booking, Trekking"
                                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-5 py-4 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Slug</label>
                                    <input 
                                        name="slug" 
                                        value={formData.slug} 
                                        onChange={handleChange}
                                        placeholder="best-time-to-visit"
                                        className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-5 py-4 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary ml-1">Answer</label>
                                <textarea 
                                    name="answer" 
                                    value={formData.answer} 
                                    onChange={handleChange}
                                    placeholder="Provide a helpful, detailed answer to the question..."
                                    className="w-full bg-admin-bg border border-admin-card-border rounded-xl px-5 py-4 text-admin-text-primary focus:outline-none focus:border-admin-accent transition-all min-h-[180px] resize-none placeholder:text-admin-text-secondary/30"
                                    required
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    )
}
