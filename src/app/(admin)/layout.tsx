
import "@/app/globals.css"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Admin Panel | Nepal Travel",
    description: "Administrative Dashboard",
}

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="antialiased min-h-screen bg-gray-50 dark:bg-gray-900">
                {children}
            </body>
        </html>
    )
}
