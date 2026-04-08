import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getPublicBackendBaseUrl } from "@/lib/backend-url"

// Database logic has been moved to the backend.
// Frontend now acts as a client to the backend API.

import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    // adapter: PrismaAdapter(prisma), // Move to purely backend auth
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                try {
                    const response = await fetch(`${getPublicBackendBaseUrl()}/api/auth/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    if (!response.ok) return null;

                    const data = await response.json();
                    return data.user; // Returning the user object from backend
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = (user as { role?: string }).role
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string
                (session.user as { role?: string }).role = token.role as string
            }
            return session
        },
    },
    pages: {
        signIn: "/admin/login",
    },
})
