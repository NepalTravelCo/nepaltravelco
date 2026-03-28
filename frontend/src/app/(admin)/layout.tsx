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
    return children
}