
'use client'

import { useActionState } from 'react'
import { authenticate } from '@/lib/actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image" // Assuming we can use next/image

export default function LoginPage() {
    const [errorMessage, dispatch, isPending] = useActionState(
        authenticate,
        undefined,
    )

    return (
        <div className="flex min-h-screen w-full">
            {/* Left Side - Brand/Logo Area */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 items-center justify-center p-12 relative overflow-hidden">
                {/* Background pattern or image could go here */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2671&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
                <div className="relative z-10 text-white text-center">
                    <div className="mb-6 flex justify-center">
                        {/* Placeholder for Logo */}
                        <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center text-slate-900 font-bold text-3xl">
                            NT
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Nepal Travel Co.</h1>
                    <p className="text-lg text-slate-200 max-w-md mx-auto">
                        Admin Portal to manage your treks, experiences, and bookings efficiently.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
                <div className="w-full max-w-sm space-y-6">
                    <div className="text-center lg:text-left">
                        <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
                        <p className="text-muted-foreground mt-2">Enter your credentials to access the admin dashboard.</p>
                    </div>

                    <form action={dispatch} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" name="email" placeholder="admin@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                            </div>
                            <Input id="password" type="password" name="password" required />
                        </div>

                        <Button className="w-full h-11" type="submit" disabled={isPending}>
                            {isPending ? 'Authenticating...' : 'Sign In'}
                        </Button>

                        <div
                            className="flex h-8 items-end space-x-1"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {errorMessage && (
                                <p className="text-sm text-red-500">{errorMessage}</p>
                            )}
                        </div>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                        Don&apos;t have an account? Contact your super admin.
                    </p>
                </div>
            </div>
        </div>
    )
}
