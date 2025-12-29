
'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Mountain, Compass, Calendar, Settings, LogOut } from "lucide-react"

import { signOutAction } from "@/lib/actions"

const sidebarItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/treks", label: "Treks", icon: Mountain },
    { href: "/admin/experiences", label: "Experiences", icon: Compass },
    { href: "/admin/bookings", label: "Bookings", icon: Calendar },
    { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col h-full w-72 admin-sidebar">
            <div className="flex items-center px-8 h-20 border-b border-admin-card-border">
                <span className="text-xl font-bold tracking-tight text-admin-text-primary">
                    NEPAL<span className="text-admin-accent">TRAVEL</span>
                </span>
            </div>

            <div className="flex-1 overflow-y-auto py-6">
                <nav className="px-4 space-y-1">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-200",
                                    isActive
                                        ? "bg-admin-accent/10 text-admin-accent"
                                        : "text-admin-text-secondary hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-admin-text-primary"
                                )}
                            >
                                <Icon className={cn("h-5 w-5 mr-3", isActive ? "text-admin-accent" : "opacity-70")} />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-admin-card-border">
                <form action={signOutAction}>
                    <button className="flex items-center w-full px-4 py-3 text-sm font-semibold text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-all duration-200 group">
                        <LogOut className="h-4 w-4 mr-3 group-hover:-translate-x-1 transition-transform" />
                        Sign Out
                    </button>
                </form>
            </div>
        </div>
    )
}
