'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createRegion, updateRegion } from "@/actions/region-actions"
import { 
    ArrowLeft, Save, Plus, Trash2, Calendar, Info, 
    ImageIcon, Loader2, Map as MapIcon, CloudSun, Sparkles, 
    CheckCircle2, AlertCircle, Mountain, TrendingUp,
    ShieldCheck, Edit2
} from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { ImageUpload } from "./image-upload"
import { cn } from "@/lib/utils"

const regionSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    slug: z.string().min(2, "Slug must be at least 2 characters").max(100),
    image: z.string().url("Please upload a cover image").or(z.string().length(0)),
    description: z.string().min(10, "Description is required").max(1000),
    altitude: z.number().int().min(0, "Altitude must be positive").max(8848),
    trailCount: z.number().int().min(0, "Trail count must be positive"),
    difficulty: z.string().min(1, "Difficulty is required").max(50),
    bestMonths: z.array(z.object({ value: z.string().min(1).max(50) })),
    whyChoose: z.array(z.object({ value: z.string().min(1).max(200) })),
})

type RegionFormValues = z.infer<typeof regionSchema>

interface RegionFormProps {
    initialData?: any | null
}

const FormInput = ({ label, name, placeholder, type = "text", icon: Icon, register, errors, watch, maxLength }: any) => {
    const value = watch(name) as string || "";
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-admin-text-secondary flex items-center gap-2">
                    {Icon && <Icon size={12} className="text-admin-accent" />}
                    {label}
                </label>
                {maxLength && (
                    <span className={cn(
                        "text-[9px] font-black tracking-widest",
                        charCount > maxLength * 0.9 ? "text-red-500" : "text-admin-text-secondary opacity-40"
                    )}>
                        {charCount} / {maxLength}
                    </span>
                )}
            </div>
            <div className="relative">
                <input 
                    {...register(name, { valueAsNumber: type === "number" })}
                    placeholder={placeholder}
                    type={type}
                    className={cn(
                        "w-full bg-admin-bg border border-admin-card-border rounded-2xl px-6 py-4 text-admin-text-primary focus:outline-none focus:ring-2 focus:ring-admin-accent/20 focus:border-admin-accent transition-all placeholder:text-admin-text-secondary/30 font-medium",
                        errors[name] && "border-red-500 ring-red-500/20"
                    )}
                />
                {errors[name] && (
                    <p className="mt-2 text-[10px] font-bold text-red-500 flex items-center gap-1.5 ml-1 animate-in fade-in slide-in-from-left-1">
                        <AlertCircle size={12} /> {errors[name]?.message}
                    </p>
                )}
            </div>
        </div>
    )
}

export function RegionForm({ initialData }: RegionFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState<"general" | "treks">("general")

    const form = useForm<RegionFormValues>({
        resolver: zodResolver(regionSchema),
        mode: "onChange",
        defaultValues: {
            name: initialData?.name || "",
            slug: initialData?.slug || "",
            image: initialData?.image || "",
            description: initialData?.description || "",
            altitude: initialData?.altitude || 3500,
            trailCount: initialData?.trailCount || 0,
            difficulty: initialData?.difficulty || "Moderate",
            bestMonths: initialData?.bestMonths?.map((v: string) => ({ value: v })) || [{ value: "Spring" }, { value: "Autumn" }],
            whyChoose: initialData?.whyChoose?.map((v: string) => ({ value: v })) || [{ value: "" }],
        }
    })

    const { control, register, handleSubmit, watch, setValue, formState: { errors, isValid } } = form
    const bestMonthsArray = useFieldArray({ control, name: "bestMonths" })
    const whyChooseArray = useFieldArray({ control, name: "whyChoose" })

    const [deletingTrekId, setDeletingTrekId] = useState<string | null>(null)

    const onDeleteTrek = async (trekId: string) => {
        if (!confirm("Are you sure you want to delete this trek?")) return
        setDeletingTrekId(trekId)
        try {
            const { deleteTrek } = await import("@/actions/trek-actions")
            const result = await deleteTrek(trekId)
            if (result.success) {
                toast.success("Trek deleted successfully")
                router.refresh()
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error("Failed to delete trek")
        } finally {
            setDeletingTrekId(null)
        }
    }

    const onSubmit = async (values: RegionFormValues) => {
        setLoading(true)
        try {
            const dataToSubmit = {
                ...values,
                bestMonths: values.bestMonths.map(v => v.value).filter(Boolean),
                whyChoose: values.whyChoose.map(v => v.value).filter(Boolean),
            }

            const result = initialData 
                ? await updateRegion(initialData.id, dataToSubmit)
                : await createRegion(dataToSubmit)

            if (result.success) {
                toast.success("Region saved successfully!")
                router.push("/admin/regions")
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
                    <Link href="/admin/regions">
                        <button type="button" className="p-3 rounded-2xl bg-admin-card border border-admin-card-border text-admin-text-secondary hover:text-admin-accent transition-all">
                            <ArrowLeft size={20} />
                        </button>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-black text-admin-text-primary tracking-tight">
                            {initialData ? "Refine Territory" : "Map New Region"}
                        </h2>
                        <div className="flex items-center gap-4 mt-2">
                            <button 
                                type="button"
                                onClick={() => setActiveTab("general")}
                                className={cn(
                                    "text-[10px] uppercase tracking-widest font-black transition-all",
                                    activeTab === "general" ? "text-admin-accent" : "text-admin-text-secondary opacity-40 hover:opacity-100"
                                )}
                            >
                                General Details
                            </button>
                            {initialData && (
                                <button 
                                    type="button"
                                    onClick={() => setActiveTab("treks")}
                                    className={cn(
                                        "text-[10px] uppercase tracking-widest font-black transition-all",
                                        activeTab === "treks" ? "text-admin-accent" : "text-admin-text-secondary opacity-40 hover:opacity-100"
                                    )}
                                >
                                    Assigned Treks ({initialData.treks?.length || 0})
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <button type="submit" disabled={loading || !isValid} className="bg-admin-accent text-white px-10 py-4 rounded-2xl text-sm font-black shadow-xl shadow-admin-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
                    {loading ? <Loader2 className="animate-spin" /> : "PUBLISH REGION"}
                </button>
            </div>

            <div className={cn("animate-in fade-in zoom-in-95 duration-500", activeTab === "general" ? "block" : "hidden")}>
                <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-12">
                    {/* General Info */}
                    <section className="bg-admin-card border border-admin-card-border rounded-[40px] p-10 space-y-10">
                        <div className="flex items-center gap-4 border-b border-admin-card-border pb-8">
                            <div className="p-3 rounded-2xl bg-admin-accent/10 text-admin-accent">
                                <MapIcon size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-admin-text-primary tracking-tight">Regional Identity</h3>
                                <p className="text-xs font-bold text-admin-text-secondary opacity-60">Define the core metadata for this geographic area.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10">
                            <FormInput label="Region Name" name="name" placeholder="e.g. Khumbu / Everest Region" icon={Mountain} register={register} errors={errors} watch={watch} maxLength={100} />
                            <FormInput label="URL Slug" name="slug" placeholder="everest-region" icon={MapIcon} register={register} errors={errors} watch={watch} maxLength={100} />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-admin-text-secondary flex items-center gap-2"><Sparkles size={12} className="text-admin-accent" /> Regional Overview</label>
                                <span className={cn("text-[9px] font-black tracking-widest", (watch("description")?.length || 0) > 900 ? "text-red-500" : "text-admin-text-secondary opacity-40")}>{(watch("description")?.length || 0)} / 1000</span>
                            </div>
                            <textarea {...register("description")} placeholder="Describe the landscapes, culture, and unique appeal..." className="w-full bg-admin-bg border border-admin-card-border rounded-2xl px-6 py-4 text-admin-text-primary focus:ring-2 focus:ring-admin-accent/20 focus:border-admin-accent outline-none font-medium min-h-[200px] resize-none" />
                        </div>
                    </section>

                    {/* Technical Specs */}
                    <section className="bg-admin-card border border-admin-card-border rounded-[40px] p-10 space-y-10">
                        <div className="flex items-center gap-4 border-b border-admin-card-border pb-8">
                            <div className="p-3 rounded-2xl bg-admin-accent/10 text-admin-accent">
                                <TrendingUp size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-admin-text-primary tracking-tight">Technical Specifications</h3>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            <FormInput label="Avg Altitude (m)" name="altitude" type="number" placeholder="3500" icon={TrendingUp} register={register} errors={errors} watch={watch} />
                            <FormInput label="Trail Inventory" name="trailCount" type="number" placeholder="12" icon={CheckCircle2} register={register} errors={errors} watch={watch} />
                            <FormInput label="Overall Difficulty" name="difficulty" placeholder="Varied" icon={ShieldCheck} register={register} errors={errors} watch={watch} maxLength={50} />
                        </div>
                    </section>

                    {/* Why Choose Section */}
                    <section className="bg-admin-card border border-admin-card-border rounded-[40px] p-10 space-y-10">
                        <div className="flex items-center justify-between border-b border-admin-card-border pb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-admin-accent/10 text-admin-accent">
                                    <Sparkles size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-admin-text-primary tracking-tight">Why Choose This Region?</h3>
                                    <p className="text-xs font-bold text-admin-text-secondary opacity-60">Highlight the unique selling points and attraction factors.</p>
                                </div>
                            </div>
                            <button type="button" onClick={() => whyChooseArray.append({ value: "" })} className="group flex items-center gap-2 bg-admin-accent/10 text-admin-accent px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-admin-accent hover:text-white transition-all">
                                <Plus size={14} /> Add Highlight
                            </button>
                        </div>

                        <div className="space-y-4">
                            {whyChooseArray.fields.map((field, i) => (
                                <div key={field.id} className="flex gap-4 group animate-in slide-in-from-left-2 duration-300">
                                    <div className="flex-1 relative">
                                        <input 
                                            {...register(`whyChoose.${i}.value` as any)} 
                                            placeholder="e.g. Rare wildlife sightings in the deep valleys" 
                                            className="w-full bg-admin-bg border border-admin-card-border rounded-2xl px-6 py-4 text-admin-text-primary focus:ring-2 focus:ring-admin-accent/20 focus:border-admin-accent outline-none font-medium transition-all" 
                                        />
                                    </div>
                                    <button type="button" onClick={() => whyChooseArray.remove(i)} className="p-4 text-admin-text-secondary hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all bg-admin-bg border border-admin-card-border rounded-2xl">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-4 space-y-12">
                    {/* Media */}
                    <section className="bg-admin-card border border-admin-card-border rounded-[40px] p-10 space-y-6">
                        <div className="flex items-center gap-3 border-b border-admin-card-border pb-6">
                            <div className="p-2.5 rounded-xl bg-admin-accent/10 text-admin-accent"><ImageIcon size={20} /></div>
                            <h3 className="text-xl font-black text-admin-text-primary">Cover Asset</h3>
                        </div>
                        <ImageUpload value={watch("image") ? [watch("image")] : []} onChange={(url) => setValue("image", url, { shouldValidate: true })} onRemove={() => setValue("image", "", { shouldValidate: true })} />
                    </section>

                    {/* Best Months */}
                    <section className="bg-admin-card border border-admin-card-border rounded-[40px] p-10 space-y-8">
                        <div className="flex items-center justify-between border-b border-admin-card-border pb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-admin-accent/10 text-admin-accent"><Calendar size={20} /></div>
                                <h3 className="text-xl font-black text-admin-text-primary">Peak Months</h3>
                            </div>
                            <button type="button" onClick={() => bestMonthsArray.append({ value: "" })} className="p-2 rounded-lg bg-admin-accent/10 text-admin-accent hover:bg-admin-accent hover:text-white transition-all"><Plus size={16} /></button>
                        </div>
                        <div className="space-y-4">
                            {bestMonthsArray.fields.map((field, i) => (
                                <div key={field.id} className="flex gap-2 group">
                                    <input {...register(`bestMonths.${i}.value` as any)} placeholder="e.g. October" className="flex-1 bg-admin-bg border border-admin-card-border rounded-xl px-4 py-2 text-sm text-admin-text-primary outline-none focus:border-admin-accent" />
                                    <button type="button" onClick={() => bestMonthsArray.remove(i)} className="p-2 text-admin-text-secondary hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                </div>
            </div>

            {/* Treks Tab */}
            {initialData && (
                <div className={cn("animate-in fade-in slide-in-from-bottom-4 duration-500", activeTab === "treks" ? "block" : "hidden")}>
                    <section className="bg-admin-card border border-admin-card-border rounded-[40px] p-10 space-y-8">
                        <div className="flex items-center justify-between border-b border-admin-card-border pb-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-admin-accent/10 text-admin-accent">
                                    <Mountain size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-admin-text-primary tracking-tight">Regional Expeditions</h3>
                                    <p className="text-xs font-bold text-admin-text-secondary opacity-60">Manage all treks currently mapped to this region.</p>
                                </div>
                            </div>
                            <Link href={`/admin/treks/new?regionId=${initialData.id}`}>
                                <button type="button" className="bg-admin-accent text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-admin-accent/20">
                                    Add New Trek
                                </button>
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {(initialData.treks || []).map((trek: any) => (
                                <div key={trek.id} className="group flex items-center gap-6 p-4 rounded-3xl bg-admin-bg border border-admin-card-border hover:border-admin-accent/30 transition-all">
                                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                                        <img src={trek.image} alt={trek.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-admin-text-primary truncate">{trek.name}</h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-admin-accent bg-admin-accent/5 px-2 py-0.5 rounded-md">{trek.difficulty}</span>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-admin-text-secondary opacity-40">{trek.duration}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link href={`/admin/treks/${trek.id}`}>
                                            <button type="button" className="p-3 rounded-xl bg-admin-card border border-admin-card-border text-admin-text-secondary hover:text-admin-accent hover:border-admin-accent transition-all">
                                                <Edit2 size={16} />
                                            </button>
                                        </Link>
                                        <button 
                                            type="button" 
                                            onClick={() => onDeleteTrek(trek.id)}
                                            disabled={deletingTrekId === trek.id}
                                            className="p-3 rounded-xl bg-admin-card border border-admin-card-border text-admin-text-secondary hover:text-red-500 hover:border-red-500 transition-all disabled:opacity-50"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {(initialData.treks?.length || 0) === 0 && (
                                <div className="col-span-full py-20 text-center space-y-4">
                                    <p className="text-sm font-bold text-admin-text-secondary opacity-40 italic">No treks have been assigned to this territory yet.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            )}
        </form>
    )
}
