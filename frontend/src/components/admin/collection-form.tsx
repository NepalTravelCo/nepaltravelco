'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createCollection, updateCollection } from "@/actions/collection-actions"
import { 
    ArrowLeft, Save, Sparkles, Map, Info, 
    ImageIcon, Loader2, CheckCircle2, AlertCircle,
    LayoutGrid, ListChecks
} from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { ImageUpload } from "./image-upload"
import { cn } from "@/lib/utils"

const collectionSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    slug: z.string().min(2, "Slug must be at least 2 characters").max(100),
    description: z.string().max(500).optional(),
    image: z.string().optional(),
    trekIds: z.array(z.string()).min(1, "Select at least one trek")
})

type CollectionFormValues = z.infer<typeof collectionSchema>

interface CollectionFormProps {
    initialData?: any | null
    allTreks: { id: string, name: string, image: string }[]
}

export function CollectionForm({ initialData, allTreks }: CollectionFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm<CollectionFormValues>({
        resolver: zodResolver(collectionSchema),
        defaultValues: {
            name: initialData?.name || "",
            slug: initialData?.slug || "",
            description: initialData?.description || "",
            image: initialData?.image || "",
            trekIds: initialData?.treks?.map((t: any) => t.id) || []
        }
    })

    const { register, handleSubmit, watch, setValue, formState: { errors } } = form
    const selectedTrekIds = watch("trekIds")

    const toggleTrek = (id: string) => {
        const current = [...selectedTrekIds]
        const index = current.indexOf(id)
        if (index > -1) {
            current.splice(index, 1)
        } else {
            current.push(id)
        }
        setValue("trekIds", current, { shouldValidate: true })
    }

    const onSubmit = async (values: CollectionFormValues) => {
        setLoading(true)
        try {
            const result = initialData 
                ? await updateCollection(initialData.id, values)
                : await createCollection(values)

            if (result.success) {
                toast.success("Collection saved successfully!")
                router.push("/admin/collections")
                router.refresh()
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error("An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 pb-32 max-w-7xl mx-auto">
            {/* Header */}
            <div className="sticky top-0 z-50 flex items-center justify-between bg-admin-bg/60 backdrop-blur-2xl py-6 border-b border-admin-card-border/50 px-4 -mx-4">
                <div className="flex items-center gap-6">
                    <Link href="/admin/collections">
                        <button type="button" className="p-3 rounded-2xl bg-admin-card border border-admin-card-border text-admin-text-secondary hover:text-admin-accent transition-all">
                            <ArrowLeft size={20} />
                        </button>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-black text-admin-text-primary tracking-tight">
                            {initialData ? "Edit Collection" : "New Collection"}
                        </h2>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-admin-text-secondary opacity-60 mt-1">
                            Curate a specialized grouping of expeditions
                        </p>
                    </div>
                </div>
                <button type="submit" disabled={loading} className="bg-admin-accent text-white px-10 py-4 rounded-2xl text-sm font-black shadow-xl shadow-admin-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
                    {loading ? <Loader2 className="animate-spin" /> : "SAVE COLLECTION"}
                </button>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-7 space-y-12">
                    {/* Basic Info */}
                    <section className="bg-admin-card border border-admin-card-border rounded-[40px] p-10 space-y-8">
                        <div className="flex items-center gap-3 border-b border-admin-card-border pb-6">
                            <div className="p-2.5 rounded-xl bg-admin-accent/10 text-admin-accent"><Info size={20} /></div>
                            <h3 className="text-xl font-black text-admin-text-primary">Core Metadata</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-admin-text-secondary ml-1">Collection Name</label>
                                <input {...register("name")} placeholder="e.g. Luxury Lodge Treks" className="w-full bg-admin-bg border border-admin-card-border rounded-2xl px-6 py-4 text-admin-text-primary focus:ring-2 focus:ring-admin-accent/20 focus:border-admin-accent outline-none font-medium" />
                                {errors.name && <p className="text-[10px] font-bold text-red-500 mt-1">{errors.name.message}</p>}
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-admin-text-secondary ml-1">Slug</label>
                                <input {...register("slug")} placeholder="luxury-treks" className="w-full bg-admin-bg border border-admin-card-border rounded-2xl px-6 py-4 text-admin-text-primary focus:ring-2 focus:ring-admin-accent/20 focus:border-admin-accent outline-none font-medium" />
                                {errors.slug && <p className="text-[10px] font-bold text-red-500 mt-1">{errors.slug.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-admin-text-secondary ml-1">Description</label>
                            <textarea {...register("description")} placeholder="Describe the theme of this collection..." className="w-full bg-admin-bg border border-admin-card-border rounded-2xl px-6 py-4 text-admin-text-primary focus:ring-2 focus:ring-admin-accent/20 focus:border-admin-accent outline-none font-medium min-h-[120px] resize-none" />
                        </div>
                    </section>

                    {/* Image */}
                    <section className="bg-admin-card border border-admin-card-border rounded-[40px] p-10 space-y-6">
                         <div className="flex items-center gap-3 border-b border-admin-card-border pb-6">
                            <div className="p-2.5 rounded-xl bg-admin-accent/10 text-admin-accent"><ImageIcon size={20} /></div>
                            <h3 className="text-xl font-black text-admin-text-primary">Cover Artwork</h3>
                        </div>
                        <ImageUpload value={watch("image") ? [watch("image")!] : []} onChange={(url) => setValue("image", url)} onRemove={() => setValue("image", "")} />
                    </section>
                </div>

                <div className="lg:col-span-5 space-y-12">
                    {/* Trek Selection */}
                    <section className="bg-admin-card border border-admin-card-border rounded-[40px] p-10 space-y-8 h-full flex flex-col">
                        <div className="flex items-center justify-between border-b border-admin-card-border pb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-admin-accent/10 text-admin-accent"><ListChecks size={20} /></div>
                                <h3 className="text-xl font-black text-admin-text-primary">Assign Treks</h3>
                            </div>
                            <span className="bg-admin-accent text-white text-[10px] font-black px-3 py-1 rounded-full">{selectedTrekIds.length} Selected</span>
                        </div>

                        <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                            {allTreks.map((trek) => (
                                <button
                                    key={trek.id}
                                    type="button"
                                    onClick={() => toggleTrek(trek.id)}
                                    className={cn(
                                        "w-full flex items-center gap-4 p-4 rounded-[20px] border transition-all duration-300 group",
                                        selectedTrekIds.includes(trek.id)
                                            ? "bg-admin-accent/5 border-admin-accent shadow-lg shadow-admin-accent/5"
                                            : "bg-admin-bg border-admin-card-border hover:border-admin-accent/30"
                                    )}
                                >
                                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                        <img src={trek.image} alt={trek.name} className="w-full h-full object-cover" />
                                        {selectedTrekIds.includes(trek.id) && (
                                            <div className="absolute inset-0 bg-admin-accent/60 flex items-center justify-center text-white">
                                                <CheckCircle2 size={24} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-left flex-1">
                                        <p className={cn("font-bold transition-colors", selectedTrekIds.includes(trek.id) ? "text-admin-accent" : "text-admin-text-primary")}>
                                            {trek.name}
                                        </p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-admin-text-secondary opacity-40 mt-0.5">Expedition</p>
                                    </div>
                                    <div className={cn(
                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                        selectedTrekIds.includes(trek.id) ? "bg-admin-accent border-admin-accent" : "border-admin-card-border"
                                    )}>
                                        {selectedTrekIds.includes(trek.id) && <div className="w-2 h-2 bg-white rounded-full" />}
                                    </div>
                                </button>
                            ))}
                        </div>
                        {errors.trekIds && <p className="text-[10px] font-bold text-red-500">{errors.trekIds.message}</p>}
                    </section>
                </div>
            </div>
        </form>
    )
}
