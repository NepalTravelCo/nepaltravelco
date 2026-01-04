
'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const trekSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    image: z.string().url(),
    description: z.string().min(1),
    longDescription: z.array(z.string()),
    altitude: z.number().int(),
    duration: z.string().min(1),
    difficulty: z.string().min(1),
    bestMonths: z.array(z.string()),
    highlights: z.array(z.string()),
    tips: z.array(z.string()),
    gallery: z.array(z.string()),
    itinerary: z.array(z.object({
        day: z.number(),
        title: z.string(),
        description: z.string(),
    })),
    estimatedCost: z.object({
        budget: z.string(),
        includes: z.array(z.string()),
    }),
    permits: z.array(z.string()),
    regionId: z.string().optional().nullable(),
})

export async function createTrek(data: any) {
    try {
        const validated = trekSchema.parse(data)
        const trek = await prisma.trek.create({
            data: validated
        })
        revalidatePath("/admin/treks")
        revalidatePath("/treks")
        return { success: true, trek }
    } catch (error) {
        console.error("Failed to create trek:", error)
        return { success: false, message: "Failed to create trek" }
    }
}

export async function updateTrek(id: string, data: any) {
    try {
        const validated = trekSchema.parse(data)
        const trek = await prisma.trek.update({
            where: { id },
            data: validated
        })
        revalidatePath("/admin/treks")
        revalidatePath(`/treks/${trek.slug}`)
        revalidatePath("/treks")
        return { success: true, trek }
    } catch (error) {
        console.error("Failed to update trek:", error)
        return { success: false, message: "Failed to update trek" }
    }
}

export async function deleteTrek(id: string) {
    try {
        await prisma.trek.delete({
            where: { id },
        })

        revalidatePath("/admin/treks")
        revalidatePath("/treks")
        return { success: true, message: "Trek deleted successfully" }
    } catch (error) {
        console.error("Failed to delete trek:", error)
        return { success: false, message: "Failed to delete trek" }
    }
}
