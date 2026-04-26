'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const regionSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    image: z.string().url().or(z.string().length(0)),
    description: z.string().min(1),
    altitude: z.number().int().min(0),
    trailCount: z.number().int().min(0),
    bestMonths: z.array(z.string()).default([]),
    difficulty: z.string().min(1),
    whyChoose: z.array(z.string()).default([]),
})

export async function createRegion(data: z.infer<typeof regionSchema>) {
    try {
        const validated = regionSchema.parse(data)
        const region = await prisma.region.create({
            data: validated
        })
        revalidatePath("/admin/regions")
        revalidatePath("/treks")
        return { success: true, region }
    } catch (error) {
        console.error("Failed to create region:", error)
        if (error instanceof z.ZodError) {
            return { success: false, message: "Validation failed: " + error.errors.map(e => e.message).join(", ") }
        }
        return { success: false, message: error instanceof Error ? error.message : "Failed to create region" }
    }
}

export async function updateRegion(id: string, data: z.infer<typeof regionSchema>) {
    try {
        const validated = regionSchema.parse(data)
        const region = await prisma.region.update({
            where: { id },
            data: validated
        })
        revalidatePath("/admin/regions")
        revalidatePath("/treks")
        revalidatePath(`/treks/region/${region.slug}`)
        return { success: true, region }
    } catch (error) {
        console.error("Failed to update region:", error)
        if (error instanceof z.ZodError) {
            return { success: false, message: "Validation failed: " + error.errors.map(e => e.message).join(", ") }
        }
        return { success: false, message: error instanceof Error ? error.message : "Failed to update region" }
    }
}

export async function deleteRegion(id: string) {
    try {
        await prisma.region.delete({
            where: { id },
        })

        revalidatePath("/admin/regions")
        revalidatePath("/treks")
        return { success: true, message: "Region deleted successfully" }
    } catch (error) {
        console.error("Failed to delete region:", error)
        return { success: false, message: "Failed to delete region" }
    }
}
