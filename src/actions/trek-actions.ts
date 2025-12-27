
'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// Define schema for Trek validation



export async function deleteTrek(id: string) {
    try {
        await prisma.trek.delete({
            where: { id },
        })

        revalidatePath("/admin/treks")
        return { success: true, message: "Trek deleted successfully" }
    } catch (error) {
        console.error("Failed to delete trek:", error)
        return { success: false, message: "Failed to delete trek" }
    }
}
