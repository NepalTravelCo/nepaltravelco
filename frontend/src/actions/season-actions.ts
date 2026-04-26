
'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const seasonSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    image: z.string().url().or(z.string().length(0)),
    description: z.string().min(1),
    tagline: z.string().optional().nullable(),
    temperature: z.string().optional().nullable(),
    duration: z.string().optional().nullable(),
    climateType: z.string().optional().nullable(),
    bestMonths: z.array(z.string()).default([]),
    longDescription: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    tips: z.array(z.string()).default([]),
    gallery: z.array(z.string()).default([]),
    weatherPatterns: z.array(z.string()).default([]),
    natureChanges: z.array(z.string()).default([]),
    culturalAspects: z.array(z.string()).default([]),
    activities: z.array(z.string()).default([]),
    climateDetails: z.array(z.string()).default([]),
    bestActivities: z.array(z.string()).default([]),
    whatToWear: z.array(z.string()).default([]),
    regionalVariations: z.array(z.string()).default([]),
})

export async function createSeason(data: z.infer<typeof seasonSchema>) {
    try {
        const validated = seasonSchema.parse(data)
        const season = await prisma.season.create({
            data: validated
        })
        revalidatePath("/admin/seasons")
        revalidatePath("/seasons")
        revalidatePath(`/seasons/${season.slug}`)
        return { success: true, season }
    } catch (error) {
        console.error("Failed to create season:", error)
        if (error instanceof z.ZodError) {
            return { success: false, message: "Validation failed: " + error.errors.map(e => e.message).join(", ") }
        }
        return { success: false, message: error instanceof Error ? error.message : "Failed to create season" }
    }
}

export async function updateSeason(id: string, data: z.infer<typeof seasonSchema>) {
    try {
        const validated = seasonSchema.parse(data)
        const season = await prisma.season.update({
            where: { id },
            data: validated
        })
        revalidatePath("/admin/seasons")
        revalidatePath("/seasons")
        revalidatePath(`/seasons/${season.slug}`)
        return { success: true, season }
    } catch (error) {
        console.error("Failed to update season:", error)
        if (error instanceof z.ZodError) {
            return { success: false, message: "Validation failed: " + error.errors.map(e => e.message).join(", ") }
        }
        return { success: false, message: error instanceof Error ? error.message : "Failed to update season" }
    }
}

export async function deleteSeason(id: string) {
    try {
        const season = await prisma.season.delete({
            where: { id },
        })

        revalidatePath("/admin/seasons")
        revalidatePath("/seasons")
        revalidatePath(`/seasons/${season.slug}`)
        return { success: true, message: "Season deleted successfully" }
    } catch (error) {
        console.error("Failed to delete season:", error)
        return { success: false, message: "Failed to delete season" }
    }
}
