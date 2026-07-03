import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, User, Mail, Phone, Globe, Inbox, CheckCircle, Trash2 } from "lucide-react"
import { markInquiryAsRead, deleteInquiry } from "@/actions/inquiry-actions"

interface InquiryDetailPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function InquiryDetailPage({ params }: InquiryDetailPageProps) {
    const { id } = await params
    const inquiry = await prisma.contactInquiry.findUnique({
        where: { id }
    })

    if (!inquiry) {
        notFound()
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto pb-32">
            <div className="flex items-center justify-between border-b border-admin-card-border pb-6 mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/inquiries">
                        <button type="button" className="p-2.5 rounded-xl bg-admin-card border border-admin-card-border text-admin-text-secondary hover:text-admin-text-primary transition-all shadow-sm">
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-admin-text-primary">Inquiry Details</h2>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-admin-text-secondary">From {inquiry.name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {inquiry.status === "UNREAD" && (
                        <form action={async () => {
                            'use server'
                            await markInquiryAsRead(inquiry.id)
                        }}>
                            <button type="submit" className="inline-flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 text-sm font-bold shadow-lg transition-all active:scale-95 cursor-pointer">
                                <CheckCircle className="mr-2 h-4 w-4" /> Mark as Read
                            </button>
                        </form>
                    )}
                    <form action={async () => {
                        'use server'
                        await deleteInquiry(inquiry.id)
                    }}>
                        <button type="submit" className="inline-flex items-center justify-center rounded-xl bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 text-sm font-bold shadow-lg transition-all active:scale-95 cursor-pointer">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Inquiry
                        </button>
                    </form>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-admin-card border border-admin-card-border rounded-2xl p-8 space-y-6 shadow-sm">
                        <div className="flex items-center gap-2 border-b border-admin-card-border pb-4">
                            <Inbox className="h-5 w-5 text-admin-accent" />
                            <h3 className="text-lg font-bold text-admin-text-primary">Message Content</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-admin-text-secondary mb-1">Subject</span>
                                <span className="text-base font-bold text-admin-text-primary">{inquiry.subject || "No Subject"}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-admin-text-secondary mb-1">Message</span>
                                <p className="text-sm text-admin-text-primary bg-admin-bg border border-admin-card-border rounded-xl p-5 min-h-[150px] leading-relaxed whitespace-pre-line">
                                    {inquiry.message}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <section className="bg-admin-card border border-admin-card-border rounded-2xl p-8 space-y-6 shadow-sm">
                        <div className="flex items-center gap-2 border-b border-admin-card-border pb-4">
                            <User className="h-5 w-5 text-admin-accent" />
                            <h3 className="text-lg font-bold text-admin-text-primary">Contact Info</h3>
                        </div>

                        <div className="space-y-4 text-sm">
                            <div className="flex items-center gap-3">
                                <User className="h-4 w-4 text-admin-text-secondary opacity-60 flex-shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-admin-text-secondary">Name</span>
                                    <span className="font-semibold text-admin-text-primary">{inquiry.name}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-admin-text-secondary opacity-60 flex-shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-admin-text-secondary">Email</span>
                                    <span className="font-semibold text-admin-text-primary break-all">{inquiry.email}</span>
                                </div>
                            </div>
                            {inquiry.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-admin-text-secondary opacity-60 flex-shrink-0" />
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-admin-text-secondary">Phone</span>
                                        <span className="font-semibold text-admin-text-primary">{inquiry.phone}</span>
                                    </div>
                                </div>
                            )}
                            {inquiry.nationality && (
                                <div className="flex items-center gap-3">
                                    <Globe className="h-4 w-4 text-admin-text-secondary opacity-60 flex-shrink-0" />
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-admin-text-secondary">Nationality</span>
                                        <span className="font-semibold text-admin-text-primary">{inquiry.nationality}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {(inquiry.destination || inquiry.budget || inquiry.duration || inquiry.groupSize || inquiry.accommodation || inquiry.tripType) && (
                        <section className="bg-admin-card border border-admin-card-border rounded-2xl p-8 space-y-6 shadow-sm">
                            <div className="flex items-center gap-2 border-b border-admin-card-border pb-4">
                                <Globe className="h-5 w-5 text-admin-accent" />
                                <h3 className="text-lg font-bold text-admin-text-primary">Trip Request Details</h3>
                            </div>

                            <div className="space-y-4 text-xs">
                                {inquiry.destination && (
                                    <div className="flex justify-between border-b border-admin-card-border/50 pb-2">
                                        <span className="text-admin-text-secondary font-semibold">Destination:</span>
                                        <span className="text-admin-text-primary font-bold">{inquiry.destination}</span>
                                    </div>
                                )}
                                {inquiry.duration && (
                                    <div className="flex justify-between border-b border-admin-card-border/50 pb-2">
                                        <span className="text-admin-text-secondary font-semibold">Duration:</span>
                                        <span className="text-admin-text-primary font-bold">{inquiry.duration}</span>
                                    </div>
                                )}
                                {inquiry.groupSize && (
                                    <div className="flex justify-between border-b border-admin-card-border/50 pb-2">
                                        <span className="text-admin-text-secondary font-semibold">Group Size:</span>
                                        <span className="text-admin-text-primary font-bold">{inquiry.groupSize} Guests</span>
                                    </div>
                                )}
                                {inquiry.budget && (
                                    <div className="flex justify-between border-b border-admin-card-border/50 pb-2">
                                        <span className="text-admin-text-secondary font-semibold">Budget:</span>
                                        <span className="text-admin-text-primary font-bold">{inquiry.budget}</span>
                                    </div>
                                )}
                                {inquiry.accommodation && (
                                    <div className="flex justify-between border-b border-admin-card-border/50 pb-2">
                                        <span className="text-admin-text-secondary font-semibold">Accommodation:</span>
                                        <span className="text-admin-text-primary font-bold">{inquiry.accommodation}</span>
                                    </div>
                                )}
                                {inquiry.tripType && (
                                    <div className="flex justify-between border-b border-admin-card-border/50 pb-2">
                                        <span className="text-admin-text-secondary font-semibold">Trip Type:</span>
                                        <span className="text-admin-text-primary font-bold">{inquiry.tripType}</span>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}
