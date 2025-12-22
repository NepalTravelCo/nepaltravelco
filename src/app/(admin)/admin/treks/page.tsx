
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { deleteTrek } from "@/actions/trek-actions"
import { Plus, Pencil, Trash2, Calendar } from "lucide-react"

// Inline Table components for speed/safety if UI lib not fully ready
function Table({ children }: { children: React.ReactNode }) {
    return <div className="w-full overflow-auto"><table className="w-full caption-bottom text-sm">{children}</table></div>
}
function TableHeader({ children }: { children: React.ReactNode }) {
    return <thead className="[&_tr]:border-b">{children}</thead>
}
function TableRow({ children, className }: { children: React.ReactNode, className?: string }) {
    return <tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}>{children}</tr>
}
function TableHead({ children }: { children: React.ReactNode }) {
    return <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">{children}</th>
}
function TableBody({ children }: { children: React.ReactNode }) {
    return <tbody className="[&_tr:last-child]:border-0">{children}</tbody>
}
function TableCell({ children }: { children?: React.ReactNode }) {
    return <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{children}</td>
}

export default async function TreksPage() {
    const treks = await prisma.trek.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Treks</h2>
                    <p className="text-muted-foreground">Manage your trek packages and itineraries.</p>
                </div>
                <Link href="/admin/treks/new">
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-slate-900 text-white hover:bg-slate-900/90 h-10 py-2 px-4">
                        <Plus className="mr-2 h-4 w-4" /> Add Trek
                    </button>
                </Link>
            </div>

            <div className="rounded-md border bg-white dark:bg-gray-800 shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Difficulty</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
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
                        ) : treks.map((trek: any) => (
                            <TableRow key={trek.id}>
                                <TableCell>
                                    <div className="font-medium">{trek.name}</div>
                                    <div className="text-xs text-muted-foreground">{trek.slug}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center text-gray-500">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        {trek.duration}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${trek.difficulty === 'Hard' ? 'bg-red-100 text-red-800' :
                                            trek.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                        {trek.difficulty}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {/* Assuming estimatedCost is stored as JSON with budget */}
                                    {(trek.estimatedCost as any)?.budget || "N/A"}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-end space-x-2">
                                        <Link href={`/admin/treks/${trek.id}`}>
                                            <button className="p-2 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-500">
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                        </Link>
                                        <form action={async () => {
                                            'use server'
                                            await deleteTrek(trek.id)
                                        }}>
                                            <button className="p-2 hover:bg-red-50 rounded-md text-red-400 hover:text-red-500">
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
