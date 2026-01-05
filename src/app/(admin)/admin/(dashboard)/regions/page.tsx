
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { deleteRegion } from "@/actions/region-actions"
import { Plus, Pencil, Trash2, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

// Inline Table components
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
    return <th className={cn("h-12 px-6 align-middle font-bold text-[10px] uppercase tracking-widest text-admin-text-secondary", className)}> {children} </th>
}
function TableBody({ children }: { children: React.ReactNode }) {
    return <tbody>{children}</tbody>
}
function TableCell({ children, className, colSpan }: { children?: React.ReactNode, className?: string, colSpan?: number }) {
    return <td className={cn("p-6 align-middle", className)} colSpan={colSpan}>{children}</td>
}

export default async function RegionsPage() {
    const regions = await prisma.region.findMany({
        orderBy: { name: 'asc' },
        include: { _count: { select: { treks: true } } }
    })

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-admin-text-primary">Himalayan Regions</h2>
                    <p className="text-admin-text-secondary mt-1">Manage the geographic regions and their trail counts.</p>
                </div>
                <Link href="/admin/regions/new">
                    <button className="inline-flex items-center justify-center rounded-xl bg-admin-accent text-white px-6 py-3 text-sm font-bold shadow-lg shadow-admin-accent/20 hover:bg-admin-accent/90 transition-all active:scale-95">
                        <Plus className="mr-2 h-4 w-4" /> New Region
                    </button>
                </Link>
            </div>

            <div className="grid gap-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Region Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Trail Count (Manual)</TableHead>
                            <TableHead>Actual Treks</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {regions.length === 0 ? (
                            <TableRow>
                                <TableCell className="text-center py-12 text-admin-text-secondary italic" colSpan={5}>
                                    No regions found. Define your first region!
                                </TableCell>
                            </TableRow>
                        ) : regions.map((region) => (
                            <TableRow key={region.id} className="group">
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-admin-text-primary text-base group-hover:text-admin-accent transition-colors">{region.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-xs font-mono text-admin-text-secondary">{region.slug}</span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1.5 font-bold text-admin-text-primary">
                                        <Layers className="h-4 w-4 text-admin-accent/60" />
                                        {region.trailCount} Trails
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-800 border border-slate-200">
                                        {region._count.treks} Linked
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/admin/regions/${region.id}`}>
                                            <button className="p-2.5 rounded-lg bg-admin-bg border border-admin-card-border text-admin-text-secondary hover:text-admin-accent hover:border-admin-accent/30 transition-all shadow-sm">
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                        </Link>
                                        <form action={async () => {
                                            'use server'
                                            await deleteRegion(region.id)
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
