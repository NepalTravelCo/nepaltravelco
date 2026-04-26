
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { deleteSeason } from "@/actions/season-actions"
import { Plus, Pencil, Trash2, Calendar as CalendarIcon, CloudSun } from "lucide-react"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

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
    return <th className={cn("h-12 px-6 align-middle font-bold text-[10px] uppercase tracking-widest text-admin-text-secondary", className)}>{children}</th>
}
function TableBody({ children }: { children: React.ReactNode }) {
    return <tbody>{children}</tbody>
}
function TableCell({ children, className, colSpan }: { children?: React.ReactNode, className?: string, colSpan?: number }) {
    return <td className={cn("p-6 align-middle", className)} colSpan={colSpan}>{children}</td>
}

export default async function SeasonsPage() {
    const seasons = await prisma.season.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-admin-text-primary">Travel Seasons</h2>
                    <p className="text-admin-text-secondary mt-1">Manage the seasonal information and weather patterns for Nepal.</p>
                </div>
                <Link href="/admin/seasons/new">
                    <button className="inline-flex items-center justify-center rounded-xl bg-admin-accent text-white px-6 py-3 text-sm font-bold shadow-lg shadow-admin-accent/20 hover:bg-admin-accent/90 transition-all active:scale-95">
                        <Plus className="mr-2 h-4 w-4" /> New Season
                    </button>
                </Link>
            </div>

            <div className="grid gap-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Season Details</TableHead>
                            <TableHead>Best Months</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {seasons.length === 0 ? (
                            <TableRow>
                                <TableCell className="text-center py-12 text-admin-text-secondary italic" colSpan={4}>
                                    No seasons found. Create your first seasonal guide!
                                </TableCell>
                            </TableRow>
                        ) : seasons.map((season) => (
                            <TableRow key={season.id} className="group">
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        {season.image ? (
                                            <div className="h-12 w-12 rounded-lg bg-admin-bg border border-admin-card-border overflow-hidden">
                                                <img src={season.image} alt={season.name} className="h-full w-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="h-12 w-12 rounded-lg bg-admin-bg border border-admin-card-border flex items-center justify-center">
                                                <CloudSun className="h-6 w-6 text-admin-text-secondary opacity-30" />
                                            </div>
                                        )}
                                        <div className="flex flex-col">
                                            <span className="font-bold text-admin-text-primary text-base group-hover:text-admin-accent transition-colors">{season.name}</span>
                                            <span className="text-[10px] font-medium text-admin-text-secondary line-clamp-1 max-w-[300px]">{season.description}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center text-xs font-medium text-admin-text-primary">
                                        <CalendarIcon className="mr-2 h-3.5 w-3.5 text-admin-accent/60" />
                                        {season.bestMonths.join(", ") || "N/A"}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-xs font-mono bg-admin-bg px-2 py-1 rounded border border-admin-card-border text-admin-text-secondary">
                                        {season.slug}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/admin/seasons/${season.id}`}>
                                            <button className="p-2.5 rounded-lg bg-admin-bg border border-admin-card-border text-admin-text-secondary hover:text-admin-accent hover:border-admin-accent/30 transition-all shadow-sm">
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                        </Link>
                                        <form action={async () => {
                                            'use server'
                                            await deleteSeason(season.id)
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
