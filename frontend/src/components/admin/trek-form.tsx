'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray, UseFormRegister, UseFormWatch, FieldErrors, Control } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createTrek, updateTrek } from "@/actions/trek-actions"
import { 
    ArrowLeft, Save, Plus, Trash2, Calendar, Info, 
    Mountain, Image as ImageIcon, Loader2, Map,
    CloudSun, Sparkles, CheckCircle2, AlertCircle,
    Route, DollarSign, ShieldCheck, ListChecks,
    Flag, Clock, TrendingUp, HelpCircle
} from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { ImageUpload } from "./image-upload"
import { cn } from "@/lib/utils"

const trekSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    slug: z.string().min(2, "Slug must be at least 2 characters").max(100),
    image: z.string().url("Please upload a hero image").or(z.string().length(0)),
    description: z.string().min(10, "Short description is required").max(300),
    altitude: z.number().int().min(0, "Altitude must be positive").max(8848),
    duration: z.string().min(1, "Duration is required").max(50),
    difficulty: z.string().min(1, "Difficulty is required").max(50),
    regionId: z.string().min(1, "Please select a region"),
    bestMonths: z.array(z.object({ value: z.string().min(1).max(50) })),
    longDescription: z.array(z.object({ value: z.string().min(10).max(3000) })),
    highlights: z.array(z.object({ value: z.string().min(1).max(200) })),
    tips: z.array(z.object({ value: z.string().min(1).max(500) })),
    permits: z.array(z.object({ value: z.string().min(1).max(200) })),
    gallery: z.array(z.string()),
    itinerary: z.array(z.object({ 
        day: z.number().int().min(1),
        title: z.string().min(1).max(200),
        description: z.string().min(1).max(1000),
        image: z.string().optional()
    })),
    estimatedCost: z.object({
        budget: z.string().min(1).max(100),
        includes: z.array(z.object({ value: z.string().min(1).max(200) }))
    })
})

type TrekFormValues = z.infer<typeof trekSchema>

interface TrekFormProps {
    initialData?: any | null
    regions: { id: string, name: string }[]
    initialRegionId?: string
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

const ArraySection = ({ title, fields, append, remove, name, isTextArea = false, icon: Icon, register, errors, watch, maxLength = 200 }: any) => (
    <section className="bg-admin-card border border-admin-card-border rounded-3xl p-8 space-y-6 shadow-xl shadow-black/5">
        <div className="flex items-center justify-between border-b border-admin-card-border pb-5">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-admin-accent/10 text-admin-accent">
                    <Icon size={20} />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-admin-text-primary tracking-tight">{title}</h3>
                    <p className="text-[10px] font-bold text-admin-text-secondary opacity-50">Max {maxLength} chars</p>
                </div>
            </div>
            <button 
                type="button" 
                onClick={() => append({ value: "" })} 
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-admin-accent/5 text-admin-accent text-[10px] font-black uppercase tracking-widest hover:bg-admin-accent hover:text-white transition-all active:scale-95"
            >
                <Plus size={14} /> Add Entry
            </button>
        </div>
        <div className="space-y-4">
            {fields.map((field: any, i: number) => {
                const fieldPath = `${name}.${i}.value`;
                const charCount = watch(`${name}.${i}.value`)?.length || 0;
                const error = errors[name]?.[i]?.value;

                return (
                    <div key={field.id} className="flex gap-4 group">
                        <div className="flex-1 relative">
                            {isTextArea ? (
                                <div className="relative">
                                    <textarea 
                                        {...register(fieldPath)}
                                        placeholder={`Enter ${title.toLowerCase()}...`}
                                        className={cn(
                                            "w-full bg-admin-bg border border-admin-card-border rounded-2xl px-6 py-4 text-admin-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-admin-accent/20 focus:border-admin-accent transition-all min-h-[120px] resize-y",
                                            error && "border-red-500 ring-red-500/20"
                                        )}
                                    />
                                    <div className="absolute bottom-4 right-6 text-[9px] font-black opacity-30">{charCount} / {maxLength}</div>
                                </div>
                            ) : (
                                <div className="relative">
                                    <input 
                                        {...register(fieldPath)}
                                        placeholder={`Enter ${title.toLowerCase()}...`}
                                        className={cn(
                                            "w-full bg-admin-bg border border-admin-card-border rounded-2xl px-6 py-4 text-admin-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-admin-accent/20 focus:border-admin-accent transition-all pr-20",
                                            error && "border-red-500 ring-red-500/20"
                                        )}
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black opacity-30">{charCount} / {maxLength}</div>
                                </div>
                            )}
                            {error && <p className="mt-1 text-[10px] font-bold text-red-500">{error.message}</p>}
                        </div>
                        <button type="button" onClick={() => remove(i)} className="h-12 w-12 flex items-center justify-center text-admin-text-secondary hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
                    </div>
                )
            })}
        </div>
    </section>
)

export function TrekForm({ initialData, regions, initialRegionId }: TrekFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState<"general" | "details" | "itinerary" | "media">("general")

    const form = useForm<TrekFormValues>({
        resolver: zodResolver(trekSchema),
        mode: "onChange",
        defaultValues: {
            name: initialData?.name || "",
            slug: initialData?.slug || "",
            image: initialData?.image || "",
            description: initialData?.description || "",
            altitude: initialData?.altitude || 0,
            duration: initialData?.duration || "",
            difficulty: initialData?.difficulty || "",
            regionId: initialData?.regionId || initialRegionId || "",
            bestMonths: initialData?.bestMonths?.map((v: string) => ({ value: v })) || [{ value: "" }],
            longDescription: initialData?.longDescription?.map((v: string) => ({ value: v })) || [{ value: "" }],
            highlights: initialData?.highlights?.map((v: string) => ({ value: v })) || [{ value: "" }],
            tips: initialData?.tips?.map((v: string) => ({ value: v })) || [{ value: "" }],
            permits: initialData?.permits?.map((v: string) => ({ value: v })) || [{ value: "" }],
            gallery: initialData?.gallery || [],
            itinerary: initialData?.itinerary?.map((item: any, i: number) => ({ 
                day: item.day || i + 1,
                title: item.title || "",
                description: item.description || "",
                image: item.image || ""
            })) || [{ day: 1, title: "", description: "", image: "" }],
            estimatedCost: {
                budget: initialData?.estimatedCost?.budget || "",
                includes: initialData?.estimatedCost?.includes?.map((v: string) => ({ value: v })) || [{ value: "" }]
            }
        }
    })

    const { control, register, handleSubmit, watch, setValue, formState: { errors, isValid } } = form

    const longDescArray = useFieldArray({ control, name: "longDescription" })
    const bestMonthsArray = useFieldArray({ control, name: "bestMonths" })
    const highlightsArray = useFieldArray({ control, name: "highlights" })
    const tipsArray = useFieldArray({ control, name: "tips" })
    const permitsArray = useFieldArray({ control, name: "permits" })
    const itineraryArray = useFieldArray({ control, name: "itinerary" })
    const includesArray = useFieldArray({ control, name: "estimatedCost.includes" as any })

    const onSubmit = async (values: TrekFormValues) => {
        setLoading(true)
        try {
            const dataToSubmit = {
                ...values,
                longDescription: values.longDescription.map(v => v.value).filter(Boolean),
                bestMonths: values.bestMonths.map(v => v.value).filter(Boolean),
                highlights: values.highlights.map(v => v.value).filter(Boolean),
                tips: values.tips.map(v => v.value).filter(Boolean),
                permits: values.permits.map(v => v.value).filter(Boolean),
                estimatedCost: {
                    budget: values.estimatedCost.budget,
                    includes: values.estimatedCost.includes.map(v => v.value).filter(Boolean)
                }
            }

            const result = initialData 
                ? await updateTrek(initialData.id, dataToSubmit)
                : await createTrek(dataToSubmit)

            if (result.success) {
                toast.success("Trek saved successfully!")
                router.push("/admin/treks")
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
                    <Link href="/admin/treks">
                        <button type="button" className="p-3 rounded-2xl bg-admin-card border border-admin-card-border text-admin-text-secondary hover:text-admin-accent transition-all">
                            <ArrowLeft size={20} />
                        </button>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-black text-admin-text-primary tracking-tight">
                            {initialData ? "Refine Expedition" : "Charter New Trek"}
                        </h2>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-admin-text-secondary opacity-60 mt-1">
                            {watch("name") || "Unnamed Trek"}
                        </p>
                    </div>
                </div>
                <button type="submit" disabled={loading || !isValid} className="bg-admin-accent text-white px-10 py-4 rounded-2xl text-sm font-black shadow-xl shadow-admin-accent/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50">
                    {loading ? <Loader2 className="animate-spin" /> : "PUBLISH EXPEDITION"}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex p-1.5 bg-admin-card/50 border border-admin-card-border rounded-3xl w-fit mx-auto">
                {[
                    { id: "general", label: "General", icon: Info },
                    { id: "details", label: "Expedition Specs", icon: Mountain },
                    { id: "itinerary", label: "Route Map", icon: Route },
                    { id: "media", label: "Media Assets", icon: ImageIcon },
                ].map((tab) => (
                    <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id as any)} className={cn("flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all", activeTab === tab.id ? "bg-admin-accent text-white" : "text-admin-text-secondary hover:bg-admin-bg")}>
                        <tab.icon size={16} /> {tab.label}
                    </button>
                ))}
            </div>

            <div className="space-y-12 animate-in fade-in zoom-in-95 duration-500">
                {activeTab === "general" && (
                    <div className="space-y-12">
                        <section className="bg-admin-card border border-admin-card-border rounded-[40px] p-12 space-y-10">
                            <div className="flex items-center gap-4 border-b border-admin-card-border pb-8">
                                <div className="p-3 rounded-2xl bg-admin-accent/10 text-admin-accent">
                                    <Sparkles size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-admin-text-primary tracking-tight">Identity & Hook</h3>
                                    <p className="text-xs font-bold text-admin-text-secondary opacity-60">Crafting the first impression of this expedition.</p>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <FormInput label="Catchy Hook (Short Overview)" name="description" placeholder="A 12-day journey to the roof of the world..." icon={Sparkles} register={register} errors={errors} watch={watch} maxLength={300} />
                                
                                <div className="grid md:grid-cols-2 gap-10">
                                    <FormInput label="Trek Name" name="name" placeholder="Everest Base Camp" icon={Mountain} register={register} errors={errors} watch={watch} maxLength={100} />
                                    <FormInput label="URL Slug" name="slug" placeholder="everest-base-camp" icon={Map} register={register} errors={errors} watch={watch} maxLength={100} />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-admin-text-secondary flex items-center gap-2"><Flag size={12} className="text-admin-accent" /> Region Authority</label>
                                    <select {...register("regionId")} className="w-full bg-admin-bg border border-admin-card-border rounded-2xl px-6 py-4 text-admin-text-primary focus:ring-2 focus:ring-admin-accent/20 focus:border-admin-accent outline-none font-medium appearance-none">
                                        <option value="">Select a region...</option>
                                        {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                    </select>
                                    {errors.regionId && <p className="text-[10px] font-bold text-red-500 mt-1">{errors.regionId.message}</p>}
                                </div>
                            </div>
                        </section>

                        <ArraySection title="Extended Narrative (Paragraphs)" name="longDescription" fields={longDescArray.fields} append={longDescArray.append} remove={longDescArray.remove} isTextArea icon={Sparkles} register={register} errors={errors} watch={watch} maxLength={3000} />
                    </div>
                )}

                {activeTab === "details" && (
                    <div className="space-y-12">
                        <section className="bg-admin-card border border-admin-card-border rounded-[40px] p-12 space-y-10">
                            <div className="grid md:grid-cols-3 gap-10">
                                <FormInput label="Max Elevation (m)" name="altitude" type="number" placeholder="5364" icon={TrendingUp} register={register} errors={errors} watch={watch} />
                                <FormInput label="Duration" name="duration" placeholder="12 Days" icon={Clock} register={register} errors={errors} watch={watch} maxLength={50} />
                                <FormInput label="Difficulty Level" name="difficulty" placeholder="Challenging / Hard" icon={ShieldCheck} register={register} errors={errors} watch={watch} maxLength={50} />
                            </div>
                        </section>
                        <div className="grid lg:grid-cols-2 gap-8">
                            <ArraySection title="Core Highlights" name="highlights" fields={highlightsArray.fields} append={highlightsArray.append} remove={highlightsArray.remove} icon={CheckCircle2} register={register} errors={errors} watch={watch} maxLength={200} />
                            <ArraySection title="Planning Months" name="bestMonths" fields={bestMonthsArray.fields} append={bestMonthsArray.append} remove={bestMonthsArray.remove} icon={Calendar} register={register} errors={errors} watch={watch} maxLength={50} />
                            <ArraySection title="Insider Tips" name="tips" fields={tipsArray.fields} append={tipsArray.append} remove={tipsArray.remove} isTextArea icon={HelpCircle} register={register} errors={errors} watch={watch} maxLength={500} />
                            <ArraySection title="Required Permits" name="permits" fields={permitsArray.fields} append={permitsArray.append} remove={permitsArray.remove} icon={ShieldCheck} register={register} errors={errors} watch={watch} maxLength={200} />
                        </div>
                        <section className="bg-admin-card border border-admin-card-border rounded-[40px] p-12 space-y-10">
                            <h3 className="text-xl font-black text-admin-text-primary flex items-center gap-3"><DollarSign size={20} className="text-admin-accent" /> Financial Configuration</h3>
                            <div className="grid md:grid-cols-2 gap-10">
                                <FormInput label="Base Budget" name="estimatedCost.budget" placeholder="Starting from $1,299" icon={DollarSign} register={register} errors={errors} watch={watch} maxLength={100} />
                                <ArraySection title="What's Included" name="estimatedCost.includes" fields={includesArray.fields} append={includesArray.append} remove={includesArray.remove} icon={ListChecks} register={register} errors={errors} watch={watch} maxLength={200} />
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === "itinerary" && (
                    <div className="space-y-8">
                        <section className="bg-admin-card border border-admin-card-border rounded-[40px] p-12 space-y-8">
                            <div className="flex items-center justify-between border-b border-admin-card-border pb-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-admin-accent/10 text-admin-accent"><Route size={24} /></div>
                                    <h3 className="text-2xl font-black text-admin-text-primary tracking-tight">Day-by-Day Expedition Path</h3>
                                </div>
                                <button type="button" onClick={() => itineraryArray.append({ day: itineraryArray.fields.length + 1, title: "", description: "", image: "" })} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-admin-accent text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all"><Plus size={16} /> Add Day</button>
                            </div>
                            <div className="space-y-6">
                                {itineraryArray.fields.map((field, i) => (
                                    <div key={field.id} className="group relative bg-admin-bg/50 border border-admin-card-border rounded-[32px] p-8 hover:border-admin-accent/30 transition-all">
                                        <div className="grid md:grid-cols-[200px_1fr] gap-10">
                                            <div className="space-y-6">
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-admin-accent">Day Sequence</label>
                                                    <input type="number" {...register(`itinerary.${i}.day` as any, { valueAsNumber: true })} className="w-full bg-admin-card border border-admin-card-border rounded-xl px-4 py-3 text-center font-black text-xl text-admin-text-primary outline-none focus:border-admin-accent" />
                                                </div>
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-admin-text-secondary">Phase Image</label>
                                                    <ImageUpload 
                                                        value={watch(`itinerary.${i}.image` as any) ? [watch(`itinerary.${i}.image` as any)] : []} 
                                                        onChange={(url) => setValue(`itinerary.${i}.image` as any, url)} 
                                                        onRemove={() => setValue(`itinerary.${i}.image` as any, "")} 
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-6">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-admin-text-secondary">Destination / Phase Title</label>
                                                    <input {...register(`itinerary.${i}.title` as any)} placeholder="e.g. Fly to Lukla & Trek to Phakding" className="w-full bg-admin-card border border-admin-card-border rounded-2xl px-6 py-4 text-admin-text-primary outline-none focus:border-admin-accent font-bold" />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-admin-text-secondary">Detailed Log</label>
                                                    <textarea {...register(`itinerary.${i}.description` as any)} placeholder="Detail the terrain, highlights, and approximate duration..." className="w-full bg-admin-card border border-admin-card-border rounded-2xl px-6 py-4 text-admin-text-primary outline-none focus:border-admin-accent min-h-[150px] resize-none" />
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => itineraryArray.remove(i)} className="absolute top-8 right-8 text-admin-text-secondary hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={20} /></button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === "media" && (
                    <section className="bg-admin-card border border-admin-card-border rounded-[40px] p-12 space-y-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-admin-text-secondary">Hero Banner Image</label>
                            <ImageUpload value={watch("image") ? [watch("image")] : []} onChange={(url) => setValue("image", url, { shouldValidate: true })} onRemove={() => setValue("image", "", { shouldValidate: true })} />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-admin-text-secondary">Expedition Gallery</label>
                            <ImageUpload value={watch("gallery")} onChange={(url) => setValue("gallery", [...watch("gallery"), url])} onRemove={(url) => setValue("gallery", watch("gallery").filter(item => item !== url))} maxImages={12} />
                        </div>
                    </section>
                )}
            </div>
        </form>
    )
}
