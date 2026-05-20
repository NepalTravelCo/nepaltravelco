import { prisma } from "@/lib/prisma"
import { Plus, Compass, Image as ImageIcon, Trash2, Edit } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { deleteExperience } from "./actions"

export const dynamic = "force-dynamic"

export default async function ExperiencesAdminPage() {
    const experiences = await prisma.experience.findMany({
        orderBy: { createdAt: "desc" }
    })

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-admin-card border border-admin-card-border p-8 rounded-[32px] shadow-2xl shadow-black/5">
                <div>
                    <h1 className="text-4xl font-black text-admin-text-primary tracking-tight">Experiences</h1>
                    <p className="text-sm font-bold text-admin-text-secondary opacity-60 mt-1 uppercase tracking-widest">Manage Non-Trek Experiences & Hero Section</p>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/admin/experiences/hero">
                        <button className="group flex items-center gap-3 bg-white/5 border border-admin-card-border text-admin-text-primary px-6 py-4 rounded-2xl font-bold text-sm transition-all hover:bg-white/10 active:scale-[0.98]">
                            <ImageIcon size={20} className="text-admin-accent" />
                            EDIT HERO
                        </button>
                    </Link>
                    <Link href="/admin/experiences/new">
                        <button className="group flex items-center gap-3 bg-admin-accent text-white px-8 py-4 rounded-2xl font-black text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-admin-accent/20">
                            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                            ADD NEW
                        </button>
                    </Link>
                </div>
            </div>

            {/* Experience Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {experiences.map((exp) => (
                    <div key={exp.id} className="group flex flex-col bg-admin-card border border-admin-card-border rounded-[32px] overflow-hidden hover:border-admin-accent/50 transition-colors shadow-lg">
                        <div className="relative h-48 w-full bg-admin-background">
                            {exp.image ? (
                                <Image src={exp.image} alt={exp.name} fill className="object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-admin-text-secondary">No Image</div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <h3 className="absolute bottom-4 left-6 text-xl font-bold text-white">{exp.name}</h3>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <p className="text-admin-text-secondary text-sm line-clamp-2 mb-6 flex-1">{exp.description}</p>
                            
                            <div className="flex items-center justify-end gap-2 pt-4 border-t border-admin-card-border">
                                <Link href={`/admin/experiences/${exp.id}`}>
                                    <button className="p-3 bg-admin-background hover:bg-admin-accent hover:text-white text-admin-text-primary rounded-xl transition-colors">
                                        <Edit size={16} />
                                    </button>
                                </Link>
                                <form action={async () => { "use server"; await deleteExperience(exp.id); }}>
                                    <button type="submit" className="p-3 bg-admin-background hover:bg-red-500 hover:text-white text-admin-text-primary rounded-xl transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {experiences.length === 0 && (
                <div className="bg-admin-card border-2 border-dashed border-admin-card-border rounded-[40px] p-32 text-center">
                    <div className="mx-auto w-24 h-24 bg-admin-accent/10 rounded-full flex items-center justify-center text-admin-accent mb-8">
                        <Compass size={48} />
                    </div>
                    <h2 className="text-3xl font-black text-admin-text-primary">No Experiences Found</h2>
                    <p className="text-admin-text-secondary font-bold mt-4 max-w-md mx-auto opacity-60">Add some non-trek experiences to showcase on your site.</p>
                    <Link href="/admin/experiences/new">
                        <button className="mt-10 bg-admin-accent text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-admin-accent/20">
                            GET STARTED
                        </button>
                    </Link>
                </div>
            )}
        </div>
    )
}
