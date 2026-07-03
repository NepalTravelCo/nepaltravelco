'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const activitySchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    image: z.string().min(1),
    icon: z.string().min(1),
    tag: z.string().min(1),
    color: z.string().optional().nullable(),
    highlights: z.array(z.string()),
    slug: z.string().optional().nullable(),
    categoryId: z.number().optional().nullable(),
})

export async function createActivity(data: z.infer<typeof activitySchema>) {
    try {
        const validated = activitySchema.parse(data)
        const slug = validated.slug || validated.name.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        const act = await prisma.activity.create({
            data: {
                ...validated,
                slug,
                color: validated.color || null,
                categoryId: validated.categoryId || null,
            }
        })
        revalidatePath("/admin/activities")
        revalidatePath("/things-to-do")
        revalidatePath("/")
        return { success: true, activity: act }
    } catch (error) {
        console.error("Failed to create activity:", error)
        return { success: false, message: "Failed to create activity" }
    }
}

export async function updateActivity(id: string, data: z.infer<typeof activitySchema>) {
    try {
        const validated = activitySchema.parse(data)
        const slug = validated.slug || validated.name.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        const act = await prisma.activity.update({
            where: { id },
            data: {
                ...validated,
                slug,
                color: validated.color || null,
                categoryId: validated.categoryId || null,
            }
        })
        revalidatePath("/admin/activities")
        revalidatePath("/things-to-do")
        revalidatePath("/")
        return { success: true, activity: act }
    } catch (error) {
        console.error("Failed to update activity:", error)
        return { success: false, message: "Failed to update activity" }
    }
}

export async function deleteActivity(id: string) {
    try {
        await prisma.activity.delete({
            where: { id },
        })
        revalidatePath("/admin/activities")
        revalidatePath("/things-to-do")
        revalidatePath("/")
        return { success: true, message: "Activity deleted successfully" }
    } catch (error) {
        console.error("Failed to delete activity:", error)
        return { success: false, message: "Failed to delete activity" }
    }
}
