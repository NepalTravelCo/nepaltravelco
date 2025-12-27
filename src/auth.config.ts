
import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            // If url is already /admin or a sub-path, keep it
            if (url.startsWith(baseUrl + "/admin") && !url.includes("/admin/login")) {
                return url
            }
            // Default redirect to /admin after login
            return `${baseUrl}/admin`
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnAdmin = nextUrl.pathname.startsWith("/admin")
            const isOnLogin = nextUrl.pathname.startsWith("/admin/login")

            if (isOnAdmin) {
                if (isOnLogin) return true // Allow access to login page
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            }
            return true
        },
    },
    providers: [], // Providers configured in auth.ts
} satisfies NextAuthConfig
