
'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const packageSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(0),
    duration: z.string().min(1),
    features: z.array(z.string()),
    image: z.string().url().optional().nullable().or(z.string().length(0)),
    location: z.string().optional().nullable(),
    slug: z.string().optional().nullable(),
    isBestSeller: z.boolean().optional(),
})

export async function createPackage(data: z.infer<typeof packageSchema>) {
    try {
        const validated = packageSchema.parse(data)
        const pkg = await prisma.package.create({
            data: {
                ...validated,
                image: validated.image || null,
                location: validated.location || null,
                slug: validated.slug || null,
            }
        })
        revalidatePath("/admin/packages")
        revalidatePath("/")
        return { success: true, package: pkg }
    } catch (error) {
        console.error("Failed to create package:", error)
        return { success: false, message: "Failed to create package" }
    }
}

export async function updatePackage(id: string, data: z.infer<typeof packageSchema>) {
    try {
        const validated = packageSchema.parse(data)
        const pkg = await prisma.package.update({
            where: { id },
            data: {
                ...validated,
                image: validated.image || null,
                location: validated.location || null,
                slug: validated.slug || null,
            }
        })
        revalidatePath("/admin/packages")
        revalidatePath("/")
        return { success: true, package: pkg }
    } catch (error) {
        console.error("Failed to update package:", error)
        return { success: false, message: "Failed to update package" }
    }
}

export async function deletePackage(id: string) {
    try {
        await prisma.package.delete({
            where: { id },
        })

        revalidatePath("/admin/packages")
        revalidatePath("/")
        return { success: true, message: "Package deleted successfully" }
    } catch (error) {
        console.error("Failed to delete package:", error)
        return { success: false, message: "Failed to delete package" }
    }
}

export async function toggleBestSeller(id: string, isBestSeller: boolean) {
    try {
        await prisma.package.update({
            where: { id },
            data: { isBestSeller }
        })
        revalidatePath("/admin/packages")
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Failed to toggle best seller status:", error)
        return { success: false, message: "Failed to update status" }
    }
}
