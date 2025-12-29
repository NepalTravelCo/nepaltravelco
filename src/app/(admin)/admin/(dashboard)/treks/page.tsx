
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { deleteTrek } from "@/actions/trek-actions"
import { Plus, Pencil, Trash2, Calendar, MapPin, DollarSign, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

// Inline Table components for high-level UI control
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

export default async function TreksPage() {
    const treks = await prisma.trek.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-admin-text-primary">Expeditions</h2>
                    <p className="text-admin-text-secondary mt-1">Manage and curate your portfolio of Himalayan trekking adventures.</p>
                </div>
                <Link href="/admin/treks/new">
                    <button className="inline-flex items-center justify-center rounded-xl bg-admin-accent text-white px-6 py-3 text-sm font-bold shadow-lg shadow-admin-accent/20 hover:bg-admin-accent/90 transition-all active:scale-95">
                        <Plus className="mr-2 h-4 w-4" /> New Trek
                    </button>
                </Link>
            </div>

            <div className="grid gap-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Trek Details</TableHead>
                            <TableHead>Specs</TableHead>
                            <TableHead>Difficulty</TableHead>
                            <TableHead>Inventory/Cost</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {treks.length === 0 ? (
                            <TableRow>
                                <TableCell className="text-center py-12 text-admin-text-secondary italic" colSpan={5}>
                                    No treks found. Add your first masterpiece!
                                </TableCell>
                            </TableRow>
                        ) : treks.map((trek) => (
                            <TableRow key={trek.id} className="group">
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-admin-text-primary text-base group-hover:text-admin-accent transition-colors">{trek.name}</span>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <MapPin className="h-3 w-3 text-admin-text-secondary" />
                                            <span className="text-[10px] font-bold text-admin-text-secondary uppercase tracking-wider">{trek.slug}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center text-xs font-medium text-admin-text-primary">
                                            <Clock className="mr-2 h-3.5 w-3.5 text-admin-accent/60" />
                                            {trek.duration}
                                        </div>
                                        <div className="flex items-center text-[10px] text-admin-text-secondary font-bold uppercase tracking-tighter">
                                            <Calendar className="mr-2 h-3.5 w-3.5 opacity-50" />
                                            Active Season
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className={cn(
                                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                        trek.difficulty === 'Hard' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                        trek.difficulty === 'Moderate' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                                        'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                    )}>
                                        {trek.difficulty}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center font-bold text-admin-text-primary">
                                        <DollarSign className="h-3.5 w-3.5 text-admin-text-secondary mr-0.5" />
                                        {(trek.estimatedCost as { budget?: string })?.budget || "0.00"}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/admin/treks/${trek.id}`}>
                                            <button className="p-2.5 rounded-lg bg-admin-bg border border-admin-card-border text-admin-text-secondary hover:text-admin-accent hover:border-admin-accent/30 transition-all shadow-sm">
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                        </Link>
                                        <form action={async () => {
                                            'use server'
                                            await deleteTrek(trek.id)
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
