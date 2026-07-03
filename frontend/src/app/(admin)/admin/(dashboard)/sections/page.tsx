import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { deleteSection } from "@/actions/section-actions"
import { Plus, Pencil, Trash2, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

function Table({ children }: { children: React.ReactNode }) {
    return <div className="w-full overflow-hidden rounded-xl border border-admin-card-border bg-admin-card shadow-sm"><table className="w-full text-sm text-left">{children}</table></div>
}
function TableHeader({ children }: { children: React.ReactNode }) {
    return <thead className="bg-admin-bg/50 border-b border-admin-card-border">{children}</thead>
}
function TableRow({ children, className }: { children: React.ReactNode, className?: string }) {
    return <tr className={cn("border-b border-admin-card-border transition-colors hover:bg-admin-bg/30 last:border-0", className)}>{children}</tr>
}
function TableHead({ children, className }: { children: React.ReactNode, className?: string }) {
    return <th className={cn("h-12 px-6 align-middle font-bold text-[10px] uppercase tracking-widest text-admin-text-secondary", className)}>{children}</th>
}
function TableBody({ children }: { children: React.ReactNode }) {
    return <tbody>{children}</tbody>
}
function TableCell({ children, className, colSpan }: { children?: React.ReactNode, className?: string, colSpan?: number }) {
    return <td className={cn("p-6 align-middle", className)} colSpan={colSpan}>{children}</td>
}

export default async function SectionsPage() {
    const sections = await prisma.infoSection.findMany({
        orderBy: { slug: 'asc' }
    })

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-admin-text-primary">Page Sections</h2>
                    <p className="text-admin-text-secondary mt-1">Manage global content blocks and copy displayed across pages.</p>
                </div>
                <Link href="/admin/sections/new">
                    <button className="inline-flex items-center justify-center rounded-xl bg-admin-accent text-white px-6 py-3 text-sm font-bold shadow-lg shadow-admin-accent/20 hover:bg-admin-accent/90 transition-all active:scale-95">
                        <Plus className="mr-2 h-4 w-4" /> New Section
                    </button>
                </Link>
            </div>

            <div className="grid gap-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Section Details</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Slug Identifier</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sections.length === 0 ? (
                            <TableRow>
                                <TableCell className="text-center py-12 text-admin-text-secondary italic" colSpan={4}>
                                    No page sections found.
                                </TableCell>
                            </TableRow>
                        ) : sections.map((sec) => (
                            <TableRow key={sec.id} className="group">
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        {sec.mainImage ? (
                                            <div className="h-12 w-12 rounded-lg bg-admin-bg border border-admin-card-border overflow-hidden">
                                                <img src={sec.mainImage} alt={sec.title} className="h-full w-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="h-12 w-12 rounded-lg bg-admin-bg border border-admin-card-border flex items-center justify-center">
                                                <FileText className="h-6 w-6 text-admin-text-secondary opacity-30" />
                                            </div>
                                        )}
                                        <div className="flex flex-col">
                                            <span className="font-bold text-admin-text-primary text-base group-hover:text-admin-accent transition-colors">{sec.title}</span>
                                            {sec.subtitle && <span className="text-[10px] font-medium text-admin-text-secondary">{sec.subtitle}</span>}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-admin-accent/10 border border-admin-accent/20 text-admin-accent">
                                        {sec.category}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <code className="text-xs font-semibold text-admin-text-secondary bg-admin-bg px-2.5 py-1.5 rounded-lg border border-admin-card-border">
                                        {sec.slug}
                                    </code>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/admin/sections/${sec.id}`}>
                                            <button className="p-2.5 rounded-lg bg-admin-bg border border-admin-card-border text-admin-text-secondary hover:text-admin-accent hover:border-admin-accent/30 transition-all shadow-sm">
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                        </Link>
                                        <form action={async () => {
                                            'use server'
                                            await deleteSection(sec.id)
                                        }}>
                                            <button className="p-2.5 rounded-lg bg-red-500/5 border border-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </form>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
