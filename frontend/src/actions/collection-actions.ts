'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const collectionSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    trekIds: z.array(z.string()).default([]),
})

export async function createCollection(data: z.infer<typeof collectionSchema>) {
    try {
        const validated = collectionSchema.parse(data)
        const { trekIds, ...rest } = validated
        
        const collection = await prisma.trekCollection.create({
            data: {
                ...rest,
                treks: {
                    connect: trekIds.map(id => ({ id }))
                }
            }
        })
        revalidatePath("/admin/collections")
        return { success: true, collection }
    } catch (error) {
        console.error("Failed to create collection:", error)
        return { success: false, message: "Failed to create collection" }
    }
}

export async function updateCollection(id: string, data: z.infer<typeof collectionSchema>) {
    try {
        const validated = collectionSchema.parse(data)
        const { trekIds, ...rest } = validated
        
        const collection = await prisma.trekCollection.update({
            where: { id },
            data: {
                ...rest,
                treks: {
                    set: trekIds.map(id => ({ id }))
                }
            }
        })
        revalidatePath("/admin/collections")
        return { success: true, collection }
    } catch (error) {
        console.error("Failed to update collection:", error)
        return { success: false, message: "Failed to update collection" }
    }
}

export async function deleteCollection(id: string) {
    try {
        await prisma.trekCollection.delete({
            where: { id },
        })
        revalidatePath("/admin/collections")
        return { success: true, message: "Collection deleted successfully" }
    } catch (error) {
        console.error("Failed to delete collection:", error)
        return { success: false, message: "Failed to delete collection" }
    }
}
