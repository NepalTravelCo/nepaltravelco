
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { deleteTrek } from "@/actions/trek-actions"
import { Plus, Pencil, Trash2, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

// Inline Table components for speed/safety if UI lib not fully ready
function Table({ children }: { children: React.ReactNode }) {
    return <div className="w-full overflow-auto"><table className="w-full caption-bottom text-sm">{children}</table></div>
}
function TableHeader({ children }: { children: React.ReactNode }) {
    return <thead className="[&_tr]:border-b [&_tr]:border-primary/5">{children}</thead>
}
function TableRow({ children, className }: { children: React.ReactNode, className?: string }) {
    return <tr className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)}>{children}</tr>
}
function TableHead({ children, className }: { children: React.ReactNode, className?: string }) {
    return <th className={cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className)}>{children}</th>
}
function TableBody({ children }: { children: React.ReactNode }) {
    return <tbody className="[&_tr:last-child]:border-0">{children}</tbody>
}
function TableCell({ children, className }: { children?: React.ReactNode, className?: string }) {
    return <td className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}>{children}</td>
}

export default async function TreksPage() {
    const treks = await prisma.trek.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-4xl font-black tracking-tight text-primary">Treks</h2>
                    <p className="text-stone-500 font-medium">Manage your portfolio of Himalayan expeditions.</p>
                </div>
                <Link href="/admin/treks/new">
                    <button className="inline-flex items-center justify-center rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 h-12 py-2 px-6">
                        <Plus className="mr-2 h-4 w-4" /> Add New Trek
                    </button>
                </Link>
            </div>

            <div className="rounded-md border border-secondary/20 bg-white dark:bg-gray-800 shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-stone-50/50 hover:bg-stone-50/50">
                            <TableHead className="py-6 px-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Name & ID</TableHead>
                            <TableHead className="py-6 px-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Duration</TableHead>
                            <TableHead className="py-6 px-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Difficulty</TableHead>
                            <TableHead className="py-6 px-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Entry Fee</TableHead>
                            <TableHead className="py-6 px-6"><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {treks.length === 0 ? (
                            <TableRow>
                                <TableCell>No treks found. Add your first one!</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ) : treks.map((trek) => (
                            <TableRow key={trek.id}>
                                <TableCell className="px-6 py-6">
                                    <div className="font-black text-primary mb-1">{trek.name}</div>
                                    <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{trek.slug}</div>
                                </TableCell>
                                <TableCell className="px-6 py-6">
                                    <div className="flex items-center text-stone-600 font-bold text-xs">
                                        <Calendar className="mr-2 h-4 w-4 text-secondary/60" />
                                        {trek.duration}
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-6">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest 
                        ${trek.difficulty === 'Hard' ? 'bg-red-50 text-red-600 border border-red-100' :
                                            trek.difficulty === 'Moderate' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                                        {trek.difficulty}
                                    </span>
                                </TableCell>
                                <TableCell className="px-6 py-6 font-black text-primary">
                                    {(trek.estimatedCost as { budget?: string })?.budget || "N/A"}
                                </TableCell>
                                <TableCell className="px-6 py-6">
                                    <div className="flex items-center justify-end space-x-3">
                                        <Link href={`/admin/treks/${trek.id}`}>
                                            <button className="p-3 bg-stone-50 hover:bg-stone-100 rounded-xl text-stone-400 hover:text-primary transition-all duration-300 border border-stone-200 shadow-sm">
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                        </Link>
                                        <form action={async () => {
                                            'use server'
                                            await deleteTrek(trek.id)
                                        }}>
                                            <button className="p-3 bg-red-50 hover:bg-red-100 rounded-xl text-red-400 hover:text-red-600 transition-all duration-300 border border-red-100 shadow-sm">
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
