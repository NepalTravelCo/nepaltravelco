
'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Mountain, Compass, Calendar, Settings, LogOut } from "lucide-react"

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
        <div className="flex flex-col h-full w-64 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                    NepalTravel Admin
                </span>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                <nav className="px-4 space-y-2">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                                )}
                            >
                                <Icon className={cn("h-5 w-5 mr-3", isActive ? "text-primary" : "text-gray-500")} />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <form action={async () => {
                    // We need to implement sign out here, but since it's client side, we usually call server action or simple link to api.
                    // For now, let's use a simple button that will be wired up later or use NextAuth signOut
                }}>
                    <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10">
                        <LogOut className="h-5 w-5 mr-3" />
                        Sign Out
                    </button>
                </form>
            </div>
        </div>
    )
}
