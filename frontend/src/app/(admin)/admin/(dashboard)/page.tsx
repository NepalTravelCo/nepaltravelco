import { Mountain, Users, Calendar, AlertCircle, TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
    const [trekCount, packageCount, bookingCount, recentBookings] = await Promise.all([
        prisma.trek.count(),
        prisma.package.count(),
        prisma.booking.count(),
        prisma.booking.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' }
        })
    ])

    const stats = [
        { label: "Total Expeditions", value: trekCount, icon: Mountain, change: "+2", trend: "up", color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Active Packages", value: packageCount, icon: Activity, change: "+1", trend: "up", color: "text-purple-500", bg: "bg-purple-500/10" },
        { label: "Total Bookings", value: bookingCount, icon: Calendar, change: "+12%", trend: "up", color: "text-emerald-500", bg: "bg-emerald-500/10" },
        { label: "Site Visitors", value: "1.2k", icon: Users, change: "-3%", trend: "down", color: "text-amber-500", bg: "bg-amber-500/10" },
    ]

    return (
        <div className="max-w-7xl mx-auto space-y-10 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-8 border-admin-card-border/50">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-admin-text-primary flex items-center gap-3">
                        Dashboard <span className="text-xs font-bold px-2 py-1 bg-admin-accent/20 text-admin-accent rounded uppercase tracking-widest">v2.0</span>
                    </h1>
                    <p className="text-admin-text-secondary mt-2 font-medium">Global operations and conversion metrics at a glance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-admin-card border border-admin-card-border rounded-xl">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-black uppercase tracking-widest text-admin-text-secondary">Live Traffic</span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <div key={stat.label} className="group relative admin-card p-6 overflow-hidden hover:border-admin-accent/30 transition-all duration-300">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Icon size={80} />
                            </div>
                            
                            <div className="flex items-start justify-between relative z-10">
                                <div className={cn("p-3 rounded-2xl", stat.bg)}>
                                    <Icon className={cn("h-6 w-6", stat.color)} />
                                </div>
                                <div className={cn("flex items-center gap-1 text-xs font-black uppercase tracking-widest", 
                                    stat.trend === "up" ? "text-emerald-500" : "text-rose-500")}>
                                    {stat.change}
                                    {stat.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                </div>
                            </div>
                            
                            <div className="mt-6 relative z-10">
                                <h3 className="text-sm font-bold text-admin-text-secondary uppercase tracking-widest">{stat.label}</h3>
                                <div className="text-4xl font-black text-admin-text-primary mt-1">{stat.value}</div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
                {/* Recent Activity */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="admin-card overflow-hidden">
                        <div className="p-6 border-b border-admin-card-border/50 flex items-center justify-between bg-white/[0.02]">
                            <h3 className="text-lg font-black text-admin-text-primary uppercase tracking-widest flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-admin-accent" /> Recent Bookings
                            </h3>
                            <button className="text-[10px] font-black text-admin-accent uppercase tracking-[0.2em] hover:underline">Full Report</button>
                        </div>
                        <div className="divide-y divide-admin-card-border/30">
                            {recentBookings.length > 0 ? recentBookings.map((booking) => (
                                <div key={booking.id} className="group flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-center gap-5">
                                        <div className="h-12 w-12 rounded-2xl bg-admin-bg border border-admin-card-border flex items-center justify-center font-black text-admin-accent text-lg shadow-inner group-hover:border-admin-accent/50 transition-colors">
                                            {booking.customerName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-md font-bold text-admin-text-primary leading-none">{booking.customerName}</p>
                                            <p className="text-xs text-admin-text-secondary mt-1.5 flex items-center gap-2 font-medium">
                                                {booking.serviceName || "Custom Trek"}
                                                <span className="h-1 w-1 rounded-full bg-admin-card-border" />
                                                {booking.guests} Guests
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold uppercase tracking-widest text-admin-text-secondary">{booking.serviceType}</p>
                                        <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border mt-2 inline-block", 
                                            booking.status === "CONFIRMED" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20")}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-12 text-center">
                                    <AlertCircle className="h-10 w-10 text-admin-text-secondary mx-auto mb-4 opacity-20" />
                                    <p className="text-admin-text-secondary font-medium">No recent bookings found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Performance & Shortcuts */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="admin-card p-8 relative overflow-hidden bg-gradient-to-br from-admin-card to-admin-bg">
                        <div className="absolute top-0 right-0 p-4">
                            <Activity className="text-admin-accent opacity-20" size={40} />
                        </div>
                        <h3 className="text-lg font-black text-admin-text-primary uppercase tracking-widest mb-8 border-b border-admin-card-border/50 pb-4">Performance</h3>
                        
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-admin-text-secondary">
                                    <span>Trek Inquiries</span>
                                    <span className="text-admin-text-primary">82%</span>
                                </div>
                                <div className="h-1.5 w-full bg-admin-bg rounded-full overflow-hidden border border-admin-card-border">
                                    <div className="h-full bg-admin-accent w-[82%] shadow-[0_0_10px_rgba(234,88,12,0.4)]" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-admin-text-secondary">
                                    <span>Booking Completion</span>
                                    <span className="text-admin-text-primary">64%</span>
                                </div>
                                <div className="h-1.5 w-full bg-admin-bg rounded-full overflow-hidden border border-admin-card-border">
                                    <div className="h-full bg-blue-500 w-[64%] shadow-[0_0_10px_rgba(59,130,246,0.4)]" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                            <p className="text-[10px] text-admin-text-secondary leading-relaxed font-bold italic">
                                &quot;The Annapurna region is currently driving 40% of all inquiries this week.&quot;
                            </p>
                        </div>
                    </div>

                    <div className="admin-card p-6 bg-admin-accent/5 border-admin-accent/20">
                        <h4 className="text-xs font-black text-admin-accent uppercase tracking-[0.2em] mb-4">Quick Insights</h4>
                        <div className="flex items-center gap-4 text-admin-text-primary">
                            <div className="h-10 w-10 rounded-xl bg-admin-accent text-white flex items-center justify-center shadow-lg shadow-admin-accent/20">
                                <TrendingUp size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold">Revenue Target</p>
                                <p className="text-[10px] text-admin-text-secondary font-black uppercase tracking-widest">92% of Monthly Goal</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
