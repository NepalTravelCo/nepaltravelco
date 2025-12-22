
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"
import { Mountain, Users, Calendar, AlertCircle } from "lucide-react"

export default async function AdminDashboard() {
    // Mock data for now to ensure UI renders even if DB is down
    const stats = [
        { label: "Total Treks", value: "12", icon: Mountain, change: "+2 this month", color: "text-blue-600" },
        { label: "Active Bookings", value: "24", icon: Calendar, change: "+5 this week", color: "text-green-600" },
        { label: "Total Experiences", value: "5", icon: Users, change: "No change", color: "text-purple-600" },
        { label: "Pending Reviews", value: "3", icon: AlertCircle, change: "-1 today", color: "text-orange-600" },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Overview of your travel agency performance.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <Card key={stat.label}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.label}
                                </CardTitle>
                                <Icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stat.change}
                                </p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Recent Activity Section could go here */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Placeholder for bookings list */}
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">John Doe</p>
                                    <p className="text-sm text-muted-foreground">Everest Base Camp</p>
                                </div>
                                <div className="ml-auto font-medium">+$1,200</div>
                            </div>
                            {/* ... */}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Popular Treks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Placeholder chart or list */}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
