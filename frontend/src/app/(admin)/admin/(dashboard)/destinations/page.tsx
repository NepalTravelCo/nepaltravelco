import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { deleteDestination } from "@/actions/destination-actions"
import { Plus, Pencil, Trash2, MapPin, Compass } from "lucide-react"
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

export default async function DestinationsPage() {
    const destinations = await prisma.destination.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-admin-text-primary">Destinations</h2>
                    <p className="text-admin-text-secondary mt-1">Manage the destinations displayed on the Places to Go page.</p>
                </div>
                <Link href="/admin/destinations/new">
                    <button className="inline-flex items-center justify-center rounded-xl bg-admin-accent text-white px-6 py-3 text-sm font-bold shadow-lg shadow-admin-accent/20 hover:bg-admin-accent/90 transition-all active:scale-95">
                        <Plus className="mr-2 h-4 w-4" /> New Destination
                    </button>
                </Link>
            </div>

            <div className="grid gap-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Destination Details</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {destinations.length === 0 ? (
                            <TableRow>
                                <TableCell className="text-center py-12 text-admin-text-secondary italic" colSpan={3}>
                                    No destinations found. Create your first destination!
                                </TableCell>
                            </TableRow>
                        ) : destinations.map((dest) => (
                            <TableRow key={dest.id} className="group">
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        {dest.image ? (
                                            <div className="h-12 w-12 rounded-lg bg-admin-bg border border-admin-card-border overflow-hidden">
                                                <img src={dest.image} alt={dest.name} className="h-full w-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="h-12 w-12 rounded-lg bg-admin-bg border border-admin-card-border flex items-center justify-center">
                                                <Compass className="h-6 w-6 text-admin-text-secondary opacity-30" />
                                            </div>
                                        )}
                                        <div className="flex flex-col">
                                            <span className="font-bold text-admin-text-primary text-base group-hover:text-admin-accent transition-colors">{dest.name}</span>
                                            <span className="text-[10px] font-medium text-admin-text-secondary line-clamp-1 max-w-[300px]">{dest.description}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center text-xs font-medium text-admin-text-primary">
                                        <MapPin className="mr-2 h-3.5 w-3.5 text-admin-accent/60" />
                                        {dest.location || "Nepal"}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/admin/destinations/${dest.id}`}>
                                            <button className="p-2.5 rounded-lg bg-admin-bg border border-admin-card-border text-admin-text-secondary hover:text-admin-accent hover:border-admin-accent/30 transition-all shadow-sm">
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                        </Link>
                                        <form action={async () => {
                                            'use server'
                                            await deleteDestination(dest.id)
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
