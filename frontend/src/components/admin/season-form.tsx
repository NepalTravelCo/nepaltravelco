'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray, Control, UseFormRegister, UseFormWatch, FieldErrors } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createSeason, updateSeason } from "@/actions/season-actions"
import { 
    ArrowLeft, Save, Plus, Trash2, Calendar, Info, 
    CloudSun, Image as ImageIcon, Loader2, Leaf, 
    Mountain, Shirt, Map, HelpCircle, Sparkles,
    CheckCircle2, AlertCircle
} from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { ImageUpload } from "./image-upload"
import { cn } from "@/lib/utils"

const seasonSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
    slug: z.string().min(2, "Slug must be at least 2 characters").max(50, "Slug is too long"),
    image: z.string().url("Please upload a hero image").or(z.string().length(0)),
    tagline: z.string().min(5, "Tagline must be at least 5 characters").max(100, "Tagline must be under 100 characters"),
    temperature: z.string().min(1, "Temperature range is required").max(50, "Keep it brief"),
    duration: z.string().min(1, "Typical duration is required").max(50, "Keep it brief"),
    climateType: z.string().min(1, "Climate type is required").max(50, "Keep it brief"),
    bestMonths: z.array(z.object({ value: z.string().min(1, "Month cannot be empty").max(20, "Too long") })),
    longDescription: z.array(z.object({ value: z.string().min(10, "Paragraph must be at least 10 characters").max(2000, "Paragraph is too long") })),
    highlights: z.array(z.object({ value: z.string().min(1, "Highlight cannot be empty").max(100, "Too long") })),
    tips: z.array(z.object({ value: z.string().min(1, "Tip cannot be empty").max(200, "Too long") })),
    gallery: z.array(z.string()),
    weatherPatterns: z.array(z.object({ value: z.string().max(200, "Too long") })),
    natureChanges: z.array(z.object({ value: z.string().max(200, "Too long") })),
    culturalAspects: z.array(z.object({ value: z.string().max(200, "Too long") })),
    activities: z.array(z.object({ value: z.string().max(100, "Too long") })),
    climateDetails: z.array(z.object({ value: z.string().max(200, "Too long") })),
    bestActivities: z.array(z.object({ value: z.string().max(100, "Too long") })),
    whatToWear: z.array(z.object({ value: z.string().max(100, "Too long") })),
    regionalVariations: z.array(z.object({ value: z.string().max(200, "Too long") })),
})

type SeasonFormValues = z.infer<typeof seasonSchema>

interface SeasonFormProps {
    initialData?: {
        id: string
        name: string
        slug: string
        image: string
        description: string
        tagline?: string | null
        temperature?: string | null
        duration?: string | null
        climateType?: string | null
        bestMonths: string[]
        longDescription: string[]
        highlights: string[]
        tips: string[]
        gallery: string[]
        weatherPatterns: string[]
        natureChanges: string[]
        culturalAspects: string[]
        activities: string[]
        climateDetails: string[]
        bestActivities: string[]
        whatToWear: string[]
        regionalVariations: string[]
    } | null
}

// Moving sub-components OUTSIDE to prevent focus loss
const FormInput = ({ 
    label, 
    name, 
    placeholder, 
    type = "text", 
    icon: Icon, 
    register, 
    errors, 
    watch,
    maxLength 
}: { 
    label: string, 
    name: keyof SeasonFormValues, 
    placeholder: string, 
    type?: string, 
    icon?: any, 
    register: UseFormRegister<SeasonFormValues>, 
    errors: FieldErrors<SeasonFormValues>,
    watch: UseFormWatch<SeasonFormValues>,
    maxLength?: number
}) => {
    const value = watch(name) as string || "";
    const charCount = value.length;

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
                    {...register(name)}
                    placeholder={placeholder}
                    type={type}
                    className={cn(
                        "w-full bg-admin-bg border border-admin-card-border rounded-2xl px-6 py-4 text-admin-text-primary focus:outline-none focus:ring-2 focus:ring-admin-accent/20 focus:border-admin-accent transition-all placeholder:text-admin-text-secondary/30 font-medium",
                        errors[name] && "border-red-500 ring-red-500/20"
                    )}
                />
                {errors[name] && (
                    <p className="mt-2 text-[10px] font-bold text-red-500 flex items-center gap-1.5 ml-1 animate-in fade-in slide-in-from-left-1">
                        <AlertCircle size={12} /> {errors[name]?.message as string}
                    </p>
                )}
                {!errors[name] && value && (
                    <CheckCircle2 size={16} className="absolute right-5 top-[18px] text-green-500/50" />
                )}
            </div>
        </div>
    )
}

const ArraySection = ({ 
    title, 
    fields, 
    append, 
    remove, 
    name, 
    isTextArea = false, 
    icon: Icon,
    register,
    errors,
    watch,
    maxLength = 200
}: { 
    title: string, 
    fields: any[], 
    append: any, 
    remove: any, 
    name: keyof SeasonFormValues, 
    isTextArea?: boolean, 
    icon: any,
    register: UseFormRegister<SeasonFormValues>,
    errors: FieldErrors<SeasonFormValues>,
    watch: UseFormWatch<SeasonFormValues>,
    maxLength?: number
}) => (
    <section className="bg-admin-card border border-admin-card-border rounded-3xl p-8 space-y-6 shadow-xl shadow-black/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
            {fields.map((field, i) => {
                const fieldName = `${name}.${i}.value`;
                const charCount = (watch(name) as any)?.[i]?.value?.length || 0;
                const fieldErrors = (errors[name] as any)?.[i]?.value;

                return (
                    <div key={field.id} className="flex gap-4 group">
                        <div className="flex-1 relative">
                            {isTextArea ? (
                                <div className="relative">
                                    <textarea 
                                        {...register(fieldName as any)}
                                        placeholder={`Enter ${title.toLowerCase()} paragraph...`}
                                        className={cn(
                                            "w-full bg-admin-bg border border-admin-card-border rounded-2xl px-6 py-4 text-admin-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-admin-accent/20 focus:border-admin-accent transition-all min-h-[200px] resize-y",
                                            fieldErrors && "border-red-500 ring-red-500/20"
                                        )}
                                    />
                                    <div className={cn(
                                        "absolute bottom-4 right-6 text-[10px] font-black tracking-widest px-2 py-1 rounded-md bg-admin-bg/50 backdrop-blur-sm border border-admin-card-border",
                                        charCount > maxLength * 0.9 ? "text-red-500" : "text-admin-text-secondary opacity-40"
                                    )}>
                                        {charCount} / {maxLength}
                                    </div>
                                </div>
                            ) : (
                                <div className="relative">
                                    <input 
                                        {...register(fieldName as any)}
                                        placeholder={`Enter ${title.toLowerCase()}...`}
                                        className={cn(
                                            "w-full bg-admin-bg border border-admin-card-border rounded-2xl px-6 py-4 text-admin-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-admin-accent/20 focus:border-admin-accent transition-all pr-24",
                                            fieldErrors && "border-red-500 ring-red-500/20"
                                        )}
                                    />
                                    <div className={cn(
                                        "absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black tracking-widest opacity-40 px-2 py-1",
                                        charCount > maxLength * 0.9 ? "text-red-500 opacity-100" : "text-admin-text-secondary"
                                    )}>
                                        {charCount} / {maxLength}
                                    </div>
                                </div>
                            )}
                            {fieldErrors && (
                                <p className="mt-1.5 text-[10px] font-bold text-red-500 flex items-center gap-1">
                                    <AlertCircle size={10} /> {fieldErrors.message}
                                </p>
                            )}
                        </div>
                        <button 
                            type="button" 
                            onClick={() => remove(i)} 
                            className="h-12 w-12 flex items-center justify-center text-admin-text-secondary hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                )
            })}
        </div>
    </section>
)

export function SeasonForm({ initialData }: SeasonFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState<"general" | "climate" | "nature" | "media">("general")

    const form = useForm<SeasonFormValues>({
        resolver: zodResolver(seasonSchema),
        mode: "onChange", // Better for real-time validation
        defaultValues: {
            name: initialData?.name || "",
            slug: initialData?.slug || "",
            image: initialData?.image || "",
            tagline: initialData?.tagline || "",
            temperature: initialData?.temperature || "",
            duration: initialData?.duration || "",
            climateType: initialData?.climateType || "",
            bestMonths: initialData?.bestMonths?.map(v => ({ value: v })) || [{ value: "" }],
            longDescription: initialData?.longDescription?.map(v => ({ value: v })) || [{ value: "" }],
            highlights: initialData?.highlights?.map(v => ({ value: v })) || [{ value: "" }],
            tips: initialData?.tips?.map(v => ({ value: v })) || [{ value: "" }],
            gallery: initialData?.gallery || [],
            weatherPatterns: initialData?.weatherPatterns?.map(v => ({ value: v })) || [{ value: "" }],
            natureChanges: initialData?.natureChanges?.map(v => ({ value: v })) || [{ value: "" }],
            culturalAspects: initialData?.culturalAspects?.map(v => ({ value: v })) || [{ value: "" }],
            activities: initialData?.activities?.map(v => ({ value: v })) || [{ value: "" }],
            climateDetails: initialData?.climateDetails?.map(v => ({ value: v })) || [{ value: "" }],
            bestActivities: initialData?.bestActivities?.map(v => ({ value: v })) || [{ value: "" }],
            whatToWear: initialData?.whatToWear?.map(v => ({ value: v })) || [{ value: "" }],
            regionalVariations: initialData?.regionalVariations?.map(v => ({ value: v })) || [{ value: "" }],
        }
    })

    const { control, register, handleSubmit, watch, setValue, formState: { errors, isValid } } = form

    // Field Arrays
    const longDescArray = useFieldArray({ control, name: "longDescription" })
    const bestMonthsArray = useFieldArray({ control, name: "bestMonths" })
    const highlightsArray = useFieldArray({ control, name: "highlights" })
    const tipsArray = useFieldArray({ control, name: "tips" })
    const weatherArray = useFieldArray({ control, name: "weatherPatterns" })
    const natureArray = useFieldArray({ control, name: "natureChanges" })
    const cultureArray = useFieldArray({ control, name: "culturalAspects" })
    const activitiesArray = useFieldArray({ control, name: "activities" })
    const climateArray = useFieldArray({ control, name: "climateDetails" })
    const bestActivitiesArray = useFieldArray({ control, name: "bestActivities" })
    const wearArray = useFieldArray({ control, name: "whatToWear" })
    const regionalArray = useFieldArray({ control, name: "regionalVariations" })

    const onSubmit = async (values: SeasonFormValues) => {
        setLoading(true)
        
        const promise = (async () => {
            try {
                const dataToSubmit = {
                    ...values,
                    description: values.longDescription[0]?.value.substring(0, 150) + "...", 
                    bestMonths: values.bestMonths.map(v => v.value).filter(Boolean),
                    longDescription: values.longDescription.map(v => v.value).filter(Boolean),
                    highlights: values.highlights.map(v => v.value).filter(Boolean),
                    tips: values.tips.map(v => v.value).filter(Boolean),
                    weatherPatterns: values.weatherPatterns.map(v => v.value).filter(Boolean),
                    natureChanges: values.natureChanges.map(v => v.value).filter(Boolean),
                    culturalAspects: values.culturalAspects.map(v => v.value).filter(Boolean),
                    activities: values.activities.map(v => v.value).filter(Boolean),
                    climateDetails: values.climateDetails.map(v => v.value).filter(Boolean),
                    bestActivities: values.bestActivities.map(v => v.value).filter(Boolean),
                    whatToWear: values.whatToWear.map(v => v.value).filter(Boolean),
                    regionalVariations: values.regionalVariations.map(v => v.value).filter(Boolean),
                }

                if (!dataToSubmit.slug) {
                    dataToSubmit.slug = dataToSubmit.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                }

                const result = initialData 
                    ? await updateSeason(initialData.id, dataToSubmit as any)
                    : await createSeason(dataToSubmit as any)
                
                if (result.success) {
                    router.push("/admin/seasons")
                    router.refresh()
                    return result
                } else {
                    throw new Error(result.message || "Failed to save season")
                }
            } catch (error) {
                console.error(error)
                throw error
            }
        })()

        toast.promise(promise, {
            loading: initialData ? 'Updating season...' : 'Creating season...',
            success: 'Changes saved successfully!',
            error: (err) => err instanceof Error ? err.message : 'Failed to save season',
        })

        try {
            await promise
        } catch (e) {
            // Error handled by toast
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 pb-32 max-w-7xl mx-auto">
            {/* Premium Header */}
            <div className="sticky top-0 z-50 flex items-center justify-between bg-admin-bg/60 backdrop-blur-2xl py-6 border-b border-admin-card-border/50 mb-10 px-4 -mx-4">
                <div className="flex items-center gap-6">
                    <Link href="/admin/seasons">
                        <button type="button" className="group p-3 rounded-2xl bg-admin-card border border-admin-card-border text-admin-text-secondary hover:text-admin-accent hover:border-admin-accent/30 transition-all shadow-xl shadow-black/5 hover:scale-105 active:scale-95">
                            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                        </button>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-black tracking-tight text-admin-text-primary bg-gradient-to-r from-admin-text-primary to-admin-text-secondary bg-clip-text text-transparent">
                            {initialData ? "Refine Season" : "Craft New Season"}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] uppercase tracking-widest font-black text-admin-accent bg-admin-accent/10 px-2.5 py-0.5 rounded-full">Editor Mode</span>
                            <span className="text-[10px] font-bold text-admin-text-secondary">•</span>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-admin-text-secondary opacity-60 italic">{watch("name") || "Untitled"}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        type="submit" 
                        disabled={loading || !isValid}
                        className="group relative inline-flex items-center justify-center rounded-2xl bg-admin-accent text-white px-10 py-4 text-sm font-black shadow-2xl shadow-admin-accent/30 hover:bg-admin-accent/90 transition-all active:scale-95 disabled:opacity-50 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />} 
                        {loading ? "SAVING..." : "PUBLISH CHANGES"}
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex p-1.5 bg-admin-card/50 border border-admin-card-border rounded-3xl w-fit mx-auto shadow-2xl shadow-black/5">
                {[
                    { id: "general", label: "General", icon: Info },
                    { id: "climate", label: "Climate & Specs", icon: CloudSun },
                    { id: "nature", label: "Culture & Nature", icon: Sparkles },
                    { id: "media", label: "Media Assets", icon: ImageIcon },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
                            activeTab === tab.id 
                                ? "bg-admin-accent text-white shadow-xl shadow-admin-accent/20" 
                                : "text-admin-text-secondary hover:text-admin-text-primary hover:bg-admin-bg"
                        )}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="space-y-12 animate-in fade-in zoom-in-95 duration-500">
                {activeTab === "general" && (
                    <div className="space-y-12">
                        <section className="bg-admin-card border border-admin-card-border rounded-[40px] p-12 space-y-10 shadow-2xl shadow-black/5">
                            <div className="flex items-center gap-4 border-b border-admin-card-border pb-8">
                                <div className="p-3 rounded-2xl bg-admin-accent/10 text-admin-accent">
                                    <Info size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-admin-text-primary tracking-tight">Identity & Story</h3>
                                    <p className="text-xs font-bold text-admin-text-secondary opacity-60">Defining the core essence of this travel window.</p>
                                </div>
                            </div>
                            
                            <div className="grid gap-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <FormInput label="Season Name" name="name" placeholder="e.g. Autumn" icon={Calendar} register={register} errors={errors} watch={watch} maxLength={50} />
                                    <FormInput label="URL Slug" name="slug" placeholder="autumn" icon={Map} register={register} errors={errors} watch={watch} maxLength={50} />
                                </div>

                                <FormInput label="Signature Tagline" name="tagline" placeholder="The Golden Peak Season of Clarity" icon={Sparkles} register={register} errors={errors} watch={watch} maxLength={100} />
                            </div>
                        </section>

                        <div className="space-y-8">
                            <ArraySection title="Long Narrative (Paragraphs)" name="longDescription" fields={longDescArray.fields} append={longDescArray.append} remove={longDescArray.remove} isTextArea icon={Sparkles} register={register} errors={errors} watch={watch} maxLength={2000} />
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                <ArraySection title="Core Highlights" name="highlights" fields={highlightsArray.fields} append={highlightsArray.append} remove={highlightsArray.remove} icon={CheckCircle2} register={register} errors={errors} watch={watch} maxLength={100} />
                                <ArraySection title="Insider Tips" name="tips" fields={tipsArray.fields} append={tipsArray.append} remove={tipsArray.remove} icon={HelpCircle} register={register} errors={errors} watch={watch} maxLength={200} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "climate" && (
                    <div className="space-y-12">
                        <section className="bg-admin-card border border-admin-card-border rounded-[40px] p-12 space-y-10 shadow-2xl shadow-black/5">
                            <div className="flex items-center gap-4 border-b border-admin-card-border pb-8">
                                <div className="p-3 rounded-2xl bg-admin-accent/10 text-admin-accent">
                                    <CloudSun size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-admin-text-primary tracking-tight">Climate Configuration</h3>
                                    <p className="text-xs font-bold text-admin-text-secondary opacity-60">Technical weather specifications and planning windows.</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-10">
                                <FormInput label="Temperature Range" name="temperature" placeholder="10°C to 20°C" icon={CloudSun} register={register} errors={errors} watch={watch} maxLength={50} />
                                <FormInput label="Calendar Span" name="duration" placeholder="September - November" icon={Calendar} register={register} errors={errors} watch={watch} maxLength={50} />
                                <FormInput label="Climate Category" name="climateType" placeholder="Dry & Clear" icon={Sparkles} register={register} errors={errors} watch={watch} maxLength={50} />
                            </div>
                        </section>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <ArraySection title="Best Planning Months" name="bestMonths" fields={bestMonthsArray.fields} append={bestMonthsArray.append} remove={bestMonthsArray.remove} icon={Calendar} register={register} errors={errors} watch={watch} maxLength={20} />
                            <ArraySection title="Weather Intricacies" name="weatherPatterns" fields={weatherArray.fields} append={weatherArray.append} remove={weatherArray.remove} icon={CloudSun} register={register} errors={errors} watch={watch} maxLength={200} />
                            <ArraySection title="Technical Details" name="climateDetails" fields={climateArray.fields} append={climateArray.append} remove={climateArray.remove} icon={HelpCircle} register={register} errors={errors} watch={watch} maxLength={200} />
                        </div>
                    </div>
                )}

                {activeTab === "nature" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <ArraySection title="Ecosystem Changes" name="natureChanges" fields={natureArray.fields} append={natureArray.append} remove={natureArray.remove} icon={Leaf} register={register} errors={errors} watch={watch} maxLength={200} />
                        <ArraySection title="Cultural Traditions" name="culturalAspects" fields={cultureArray.fields} append={cultureArray.append} remove={cultureArray.remove} icon={Mountain} register={register} errors={errors} watch={watch} maxLength={200} />
                        <ArraySection title="Recommended Gear" name="whatToWear" fields={wearArray.fields} append={wearArray.append} remove={wearArray.remove} icon={Shirt} register={register} errors={errors} watch={watch} maxLength={100} />
                        <ArraySection title="Regional Nuances" name="regionalVariations" fields={regionalArray.fields} append={regionalArray.append} remove={regionalArray.remove} icon={Map} register={register} errors={errors} watch={watch} maxLength={200} />
                        <ArraySection title="Top Experiences" name="bestActivities" fields={bestActivitiesArray.fields} append={bestActivitiesArray.append} remove={bestActivitiesArray.remove} icon={Sparkles} register={register} errors={errors} watch={watch} maxLength={100} />
                        <ArraySection title="General Activities" name="activities" fields={activitiesArray.fields} append={activitiesArray.append} remove={activitiesArray.remove} icon={Mountain} register={register} errors={errors} watch={watch} maxLength={100} />
                    </div>
                )}

                {activeTab === "media" && (
                    <div className="space-y-12">
                        <section className="bg-admin-card border border-admin-card-border rounded-[40px] p-12 space-y-10 shadow-2xl shadow-black/5">
                            <div className="flex items-center gap-4 border-b border-admin-card-border pb-8">
                                <div className="p-3 rounded-2xl bg-admin-accent/10 text-admin-accent">
                                    <ImageIcon size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-admin-text-primary tracking-tight">Visual Identity</h3>
                                    <p className="text-xs font-bold text-admin-text-secondary opacity-60">Managing the high-resolution imagery for this season.</p>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-admin-text-secondary ml-1">Signature Hero Image</label>
                                    <div className="p-8 rounded-[32px] bg-admin-bg border-2 border-dashed border-admin-card-border hover:border-admin-accent/50 transition-colors">
                                        <ImageUpload 
                                            value={watch("image") ? [watch("image")] : []}
                                            onChange={(url) => setValue("image", url, { shouldValidate: true })}
                                            onRemove={() => setValue("image", "", { shouldValidate: true })}
                                        />
                                        {errors.image && <p className="mt-4 text-[10px] font-bold text-red-500 flex items-center gap-1.5"><AlertCircle size={12} /> {errors.image.message as string}</p>}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-admin-text-secondary ml-1">Visual Gallery Collection</label>
                                    <div className="p-8 rounded-[32px] bg-admin-bg border-2 border-dashed border-admin-card-border hover:border-admin-accent/50 transition-colors">
                                        <ImageUpload 
                                            value={watch("gallery")}
                                            onChange={(url) => setValue("gallery", [...watch("gallery"), url])}
                                            onRemove={(url) => setValue("gallery", watch("gallery").filter(item => item !== url))}
                                            maxImages={12}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </form>
    )
}
