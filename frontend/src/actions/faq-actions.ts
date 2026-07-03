'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const faqSchema = z.object({
    question: z.string().min(1),
    answer: z.string().min(1),
    category: z.string().optional().nullable(),
    slug: z.string().optional().nullable(),
})

export async function createFaq(data: z.infer<typeof faqSchema>) {
    try {
        const validated = faqSchema.parse(data)
        const slug = validated.slug || validated.question.toLowerCase().trim().slice(0, 40).replace(/ /g, '-').replace(/[^\w-]+/g, '')
        const faq = await prisma.faq.create({
            data: {
                ...validated,
                slug,
                category: validated.category || "General",
            }
        })
        revalidatePath("/admin/faqs")
        revalidatePath("/")
        return { success: true, faq }
    } catch (error) {
        console.error("Failed to create FAQ:", error)
        return { success: false, message: "Failed to create FAQ" }
    }
}

export async function updateFaq(id: string, data: z.infer<typeof faqSchema>) {
    try {
        const validated = faqSchema.parse(data)
        const slug = validated.slug || validated.question.toLowerCase().trim().slice(0, 40).replace(/ /g, '-').replace(/[^\w-]+/g, '')
        const faq = await prisma.faq.update({
            where: { id },
            data: {
                ...validated,
                slug,
                category: validated.category || "General",
            }
        })
        revalidatePath("/admin/faqs")
        revalidatePath("/")
        return { success: true, faq }
    } catch (error) {
        console.error("Failed to update FAQ:", error)
        return { success: false, message: "Failed to update FAQ" }
    }
}

export async function deleteFaq(id: string) {
    try {
        await prisma.faq.delete({
            where: { id },
        })
        revalidatePath("/admin/faqs")
        revalidatePath("/")
        return { success: true, message: "FAQ deleted successfully" }
    } catch (error) {
        console.error("Failed to delete FAQ:", error)
        return { success: false, message: "Failed to delete FAQ" }
    }
}
