'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const sectionSchema = z.object({
    slug: z.string().min(1),
    category: z.string().min(1),
    tag: z.string().optional().nullable(),
    title: z.string().min(1),
    subtitle: z.string().optional().nullable(),
    mainImage: z.string().optional().nullable(),
    content: z.string().min(1),
    isFeatured: z.boolean().default(false),
})

export async function createSection(data: z.infer<typeof sectionSchema>) {
    try {
        const validated = sectionSchema.parse(data)
        const section = await prisma.infoSection.create({
            data: {
                ...validated,
                tag: validated.tag || null,
                subtitle: validated.subtitle || null,
                mainImage: validated.mainImage || null,
            }
        })
        revalidatePath("/admin/sections")
        revalidatePath("/")
        return { success: true, section }
    } catch (error) {
        console.error("Failed to create section:", error)
        return { success: false, message: "Failed to create section" }
    }
}

export async function updateSection(id: string, data: z.infer<typeof sectionSchema>) {
    try {
        const validated = sectionSchema.parse(data)
        const section = await prisma.infoSection.update({
            where: { id },
            data: {
                ...validated,
                tag: validated.tag || null,
                subtitle: validated.subtitle || null,
                mainImage: validated.mainImage || null,
            }
        })
        revalidatePath("/admin/sections")
        revalidatePath("/")
        return { success: true, section }
    } catch (error) {
        console.error("Failed to update section:", error)
        return { success: false, message: "Failed to update section" }
    }
}

export async function deleteSection(id: string) {
    try {
        await prisma.infoSection.delete({
            where: { id },
        })
        revalidatePath("/admin/sections")
        revalidatePath("/")
        return { success: true, message: "Section deleted successfully" }
    } catch (error) {
        console.error("Failed to delete section:", error)
        return { success: false, message: "Failed to delete section" }
    }
}
