
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
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

                const email = credentials.email as string
                const password = credentials.password as string

                const user = await prisma.user.findUnique({
                    where: { email },
                })

                if (!user || !user.password) {
                    return null
                }

                const isPasswordValid = await bcrypt.compare(password, user.password)

                if (!isPasswordValid) {
                    return null
                }

                return user
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
