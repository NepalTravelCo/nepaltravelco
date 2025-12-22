
import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            // Redirect to /admin after login if the redirect URL is root
            if (url === baseUrl) return `${baseUrl}/admin`
            return url
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
