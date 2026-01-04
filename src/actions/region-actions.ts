
'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const regionSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    image: z.string().url(),
    trailCount: z.number().int(),
    description: z.string().min(1),
})

export async function createRegion(data: any) {
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
        return { success: false, message: "Failed to create region" }
    }
}

export async function updateRegion(id: string, data: any) {
    try {
        const validated = regionSchema.parse(data)
        const region = await prisma.region.update({
            where: { id },
            data: validated
        })
        revalidatePath("/admin/regions")
        revalidatePath("/treks")
        return { success: true, region }
    } catch (error) {
        console.error("Failed to update region:", error)
        return { success: false, message: "Failed to update region" }
    }
}
