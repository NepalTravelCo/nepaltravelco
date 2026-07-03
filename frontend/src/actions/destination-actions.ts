'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const destinationSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    image: z.string().min(1),
    location: z.string().optional().nullable(),
    slug: z.string().optional().nullable(),
})

export async function createDestination(data: z.infer<typeof destinationSchema>) {
    try {
        const validated = destinationSchema.parse(data)
        const slug = validated.slug || validated.name.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        const dest = await prisma.destination.create({
            data: {
                ...validated,
                slug,
                location: validated.location || null,
            }
        })
        revalidatePath("/admin/destinations")
        revalidatePath("/places-to-go")
        return { success: true, destination: dest }
    } catch (error) {
        console.error("Failed to create destination:", error)
        return { success: false, message: "Failed to create destination" }
    }
}

export async function updateDestination(id: string, data: z.infer<typeof destinationSchema>) {
    try {
        const validated = destinationSchema.parse(data)
        const slug = validated.slug || validated.name.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        const dest = await prisma.destination.update({
            where: { id },
            data: {
                ...validated,
                slug,
                location: validated.location || null,
            }
        })
        revalidatePath("/admin/destinations")
        revalidatePath("/places-to-go")
        revalidatePath(`/places-to-go/${slug}`)
        return { success: true, destination: dest }
    } catch (error) {
        console.error("Failed to update destination:", error)
        return { success: false, message: "Failed to update destination" }
    }
}

export async function deleteDestination(id: string) {
    try {
        await prisma.destination.delete({
            where: { id },
        })
        revalidatePath("/admin/destinations")
        revalidatePath("/places-to-go")
        return { success: true, message: "Destination deleted successfully" }
    } catch (error) {
        console.error("Failed to delete destination:", error)
        return { success: false, message: "Failed to delete destination" }
    }
}
