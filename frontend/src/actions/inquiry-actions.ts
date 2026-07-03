'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function markInquiryAsRead(id: string) {
    try {
        await prisma.contactInquiry.update({
            where: { id },
            data: { status: "READ" }
        })
        revalidatePath("/admin/inquiries")
        revalidatePath(`/admin/inquiries/${id}`)
        return { success: true }
    } catch (error) {
        console.error("Failed to update inquiry:", error)
        return { success: false, message: "Failed to update inquiry" }
    }
}

export async function deleteInquiry(id: string) {
    try {
        await prisma.contactInquiry.delete({
            where: { id },
        })
        revalidatePath("/admin/inquiries")
        return { success: true }
    } catch (error) {
        console.error("Failed to delete inquiry:", error)
        return { success: false, message: "Failed to delete inquiry" }
    }
}
