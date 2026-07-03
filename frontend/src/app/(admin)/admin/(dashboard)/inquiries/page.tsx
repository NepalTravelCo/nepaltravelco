import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { deleteInquiry, markInquiryAsRead } from "@/actions/inquiry-actions"
import { Mail, Trash2, Calendar, CheckCircle } from "lucide-react"
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

export default async function InquiriesPage() {
    const inquiries = await prisma.contactInquiry.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-admin-text-primary">Contact Inquiries Inbox</h2>
                    <p className="text-admin-text-secondary mt-1">Review contact inquiries and budget travel requests sent by visitors.</p>
                </div>
            </div>

            <div className="grid gap-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Subject / Trip Request</TableHead>
                            <TableHead>Received</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inquiries.length === 0 ? (
                            <TableRow>
                                <TableCell className="text-center py-12 text-admin-text-secondary italic" colSpan={5}>
                                    No inquiries found. Your inbox is empty!
                                </TableCell>
                            </TableRow>
                        ) : inquiries.map((inq) => (
                            <TableRow key={inq.id} className={cn("group transition-colors", inq.status === "UNREAD" ? "bg-admin-accent/5 hover:bg-admin-accent/10" : "")}>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-admin-bg border border-admin-card-border flex items-center justify-center font-bold text-admin-text-primary">
                                            {inq.name.charAt(0)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-admin-text-primary">{inq.name}</span>
                                            <span className="text-xs text-admin-text-secondary">{inq.email}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col max-w-[300px]">
                                        <span className={cn("text-xs font-semibold text-admin-text-primary line-clamp-1", inq.status === "UNREAD" ? "font-black" : "")}>
                                            {inq.subject || `Trip Request: ${inq.destination || "Not specified"}`}
                                        </span>
                                        <span className="text-[10px] text-admin-text-secondary line-clamp-1 mt-1">{inq.message}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center text-xs font-medium text-admin-text-secondary">
                                        <Calendar className="mr-1.5 h-3.5 w-3.5 opacity-50" />
                                        {new Date(inq.createdAt).toLocaleDateString()}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border", 
                                        inq.status === "UNREAD" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20")}>
                                        {inq.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {inq.status === "UNREAD" && (
                                            <form action={async () => {
                                                'use server'
                                                await markInquiryAsRead(inq.id)
                                            }}>
                                                <button className="p-2.5 rounded-lg bg-admin-bg border border-admin-card-border text-admin-text-secondary hover:text-emerald-500 hover:border-emerald-500/30 transition-all shadow-sm" title="Mark as Read">
                                                    <CheckCircle className="h-4 w-4" />
                                                </button>
                                            </form>
                                        )}
                                        <Link href={`/admin/inquiries/${inq.id}`}>
                                            <button className="p-2.5 rounded-lg bg-admin-bg border border-admin-card-border text-admin-text-secondary hover:text-admin-accent hover:border-admin-accent/30 transition-all shadow-sm">
                                                <Mail className="h-4 w-4" />
                                            </button>
                                        </Link>
                                        <form action={async () => {
                                            'use server'
                                            await deleteInquiry(inq.id)
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
