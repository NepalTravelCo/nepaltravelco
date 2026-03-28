import { Mountain, Users, Calendar, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default async function AdminDashboard() {
    // Mock data for now to ensure UI renders even if DB is down
    const stats = [
        { label: "Total Treks", value: "12", icon: Mountain, change: "+2 this month", color: "text-blue-600" },
        { label: "Active Bookings", value: "24", icon: Calendar, change: "+5 this week", color: "text-green-600" },
        { label: "Total Experiences", value: "5", icon: Users, change: "No change", color: "text-purple-600" },
        { label: "Pending Reviews", value: "3", icon: AlertCircle, change: "-1 today", color: "text-orange-600" },
    ]

    return (
        <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex items-end justify-between border-b pb-6 border-admin-card-border">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-admin-text-primary">Admin Dashboard</h1>
                    <p className="text-admin-text-secondary mt-1 font-medium">Overview of your trekking operations and performance.</p>
                </div>
                <div className="hidden sm:block">
                    <span className="inline-flex items-center rounded-md bg-stone-100 dark:bg-slate-800 px-3 py-1 text-xs font-bold text-admin-text-secondary ring-1 ring-inset ring-admin-border">
                        System Online
                    </span>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <div key={stat.label} className="admin-card p-6 stat-card-accent">
                            <div className="flex items-center justify-between mb-3">
                                <span className="stat-label">{stat.label}</span>
                                <div className="p-2 bg-admin-accent/5 rounded-md">
                                    <Icon className={cn("h-4 w-4", stat.color.replace('text-', 'text-'))} />
                                </div>
                            </div>
                            <div>
                                <div className="stat-value">{stat.value}</div>
                                <div className="mt-2 flex items-center text-xs font-bold">
                                    <span className="text-green-600 mr-2">{stat.change.split(' ')[0]}</span>
                                    <span className="text-admin-text-secondary">{stat.change.split(' ').slice(1).join(' ')}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8 admin-card overflow-hidden">
                    <div className="p-6 border-b border-admin-card-border flex items-center justify-between">
                        <h3 className="text-lg font-bold text-admin-text-primary">Recent Bookings</h3>
                        <button className="text-xs font-bold text-admin-accent hover:underline">View all</button>
                    </div>
                    <div className="divide-y divide-admin-card-border">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-6 hover:bg-admin-bg/50 transition-colors">
                                <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-admin-bg border border-admin-border flex items-center justify-center font-bold text-admin-text-secondary">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-admin-text-primary leading-none">Customer {i}</p>
                                        <p className="text-xs text-admin-text-secondary mt-1">Everest Base Camp • 2 guests</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-admin-text-primary">+$1,450</p>
                                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Confirmed</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-4 admin-card p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-admin-text-primary">Performance</h3>
                        <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    </div>
                    
                    <div className="space-y-6 flex-1">
                        <div className="p-4 rounded-xl bg-admin-accent/5 border border-admin-accent/10">
                            <span className="text-[10px] font-bold text-admin-accent uppercase tracking-widest mb-1 block">Trending</span>
                            <h4 className="text-md font-bold text-admin-text-primary">Annapurna Circuit</h4>
                            <p className="text-xs text-admin-text-secondary mt-1">14% increase in conversion.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-admin-bg border border-admin-border">
                                <span className="stat-label">Views</span>
                                <div className="text-lg font-bold text-admin-text-primary mt-1">24.5k</div>
                            </div>
                            <div className="p-4 rounded-xl bg-admin-bg border border-admin-border">
                                <span className="stat-label">Avg CTR</span>
                                <div className="text-lg font-bold text-admin-text-primary mt-1">12.2%</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-admin-card-border">
                        <p className="text-xs text-admin-text-secondary leading-relaxed">
                            Data is synchronized across all instances and updated in real-time.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
