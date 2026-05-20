"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createExperience(data: any) {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
    
    await prisma.experience.create({
        data: {
            ...data,
            slug,
        }
    })
    
    revalidatePath("/admin/experiences")
    revalidatePath("/experiences")
    redirect("/admin/experiences")
}

export async function updateExperience(id: string, data: any) {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
    
    await prisma.experience.update({
        where: { id },
        data: {
            ...data,
            slug,
        }
    })
    
    revalidatePath("/admin/experiences")
    revalidatePath("/experiences")
    redirect("/admin/experiences")
}

export async function deleteExperience(id: string) {
    await prisma.experience.delete({
        where: { id }
    })
    
    revalidatePath("/admin/experiences")
    revalidatePath("/experiences")
    redirect("/admin/experiences")
}

export async function updateHeroSection(data: any) {
    const category = "experiences-hero"
    const slug = "experiences-hero"
    
    const existing = await prisma.infoSection.findUnique({
        where: { slug }
    })
    
    if (existing) {
        await prisma.infoSection.update({
            where: { slug },
            data: {
                title: data.title,
                subtitle: data.subtitle,
                content: data.content,
                mainImage: data.mainImage
            }
        })
    } else {
        await prisma.infoSection.create({
            data: {
                slug,
                category,
                title: data.title,
                subtitle: data.subtitle,
                content: data.content,
                mainImage: data.mainImage
            }
        })
    }
    
    revalidatePath("/admin/experiences")
    revalidatePath("/experiences")
    redirect("/admin/experiences")
}
