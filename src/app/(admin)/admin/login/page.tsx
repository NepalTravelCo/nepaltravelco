
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
        <div className="flex min-h-screen w-full bg-white dark:bg-gray-950">
            {/* Left Side - Logo Area */}
            <div className="hidden lg:flex w-1/2 bg-gray-50 dark:bg-gray-900 items-center justify-center p-12 border-r border-gray-200 dark:border-gray-800">
                <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                    <Image
                        src="/Images/Logo/logo.png"
                        alt="Nepal Travel Co. Logo"
                        width={400}
                        height={400}
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-sm space-y-8">
                    <div className="space-y-2 text-center lg:text-left">
                        <div className="lg:hidden flex justify-center mb-6">
                            <Image
                                src="/Images/Logo/logo.png"
                                alt="Nepal Travel Co. Logo"
                                width={120}
                                height={120}
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Admin Login</h1>
                        <p className="text-muted-foreground">
                            Welcome back. Please enter your details to manage the portal.
                        </p>
                    </div>

                    <form action={dispatch} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="name@company.com"
                                required
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                                <a href="#" className="text-sm text-orange-600 hover:text-orange-500 font-medium">
                                    Forgot password?
                                </a>
                            </div>
                            <Input id="password" type="password" name="password" required className="h-11" />
                        </div>

                        <Button
                            className="w-full h-11 bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-all"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? 'Authenticating...' : 'Sign In to Dashboard'}
                        </Button>

                        <div
                            className="flex min-h-[1.5rem] items-center justify-center"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {errorMessage && (
                                <p className="text-sm font-medium text-red-500 bg-red-50 dark:bg-red-900/10 px-3 py-1 rounded-md">
                                    {errorMessage}
                                </p>
                            )}
                        </div>
                    </form>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} Nepal Travel Co. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}
