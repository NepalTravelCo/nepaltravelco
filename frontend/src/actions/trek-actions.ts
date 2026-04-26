'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const trekSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    image: z.string().url().or(z.string().length(0)),
    description: z.string().min(1),
    longDescription: z.array(z.string()).default([]),
    altitude: z.number().int().min(0),
    duration: z.string().min(1),
    difficulty: z.string().min(1),
    bestMonths: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    tips: z.array(z.string()).default([]),
    gallery: z.array(z.string()).default([]),
    itinerary: z.any(), // JSON
    estimatedCost: z.any(), // JSON
    permits: z.array(z.string()).default([]),
    regionId: z.string().optional().nullable(),
})

export async function createTrek(data: z.infer<typeof trekSchema>) {
    try {
        const validated = trekSchema.parse(data)
        const trek = await prisma.trek.create({
            data: validated
        })
        revalidatePath("/admin/treks")
        revalidatePath("/treks")
        revalidatePath(`/treks/${trek.slug}`)
        return { success: true, trek }
    } catch (error) {
        console.error("Failed to create trek:", error)
        if (error instanceof z.ZodError) {
            return { success: false, message: "Validation failed: " + error.errors.map(e => e.message).join(", ") }
        }
        return { success: false, message: error instanceof Error ? error.message : "Failed to create trek" }
    }
}

export async function updateTrek(id: string, data: z.infer<typeof trekSchema>) {
    try {
        const validated = trekSchema.parse(data)
        const trek = await prisma.trek.update({
            where: { id },
            data: validated
        })
        revalidatePath("/admin/treks")
        revalidatePath("/treks")
        revalidatePath(`/treks/${trek.slug}`)
        return { success: true, trek }
    } catch (error) {
        console.error("Failed to update trek:", error)
        if (error instanceof z.ZodError) {
            return { success: false, message: "Validation failed: " + error.errors.map(e => e.message).join(", ") }
        }
        return { success: false, message: error instanceof Error ? error.message : "Failed to update trek" }
    }
}

export async function deleteTrek(id: string) {
    try {
        const trek = await prisma.trek.delete({
            where: { id },
        })

        revalidatePath("/admin/treks")
        revalidatePath("/treks")
        revalidatePath(`/treks/${trek.slug}`)
        return { success: true, message: "Trek deleted successfully" }
    } catch (error) {
        console.error("Failed to delete trek:", error)
        return { success: false, message: "Failed to delete trek" }
    }
}
