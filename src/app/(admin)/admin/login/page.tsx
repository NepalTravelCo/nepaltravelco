
'use client'

import { useActionState } from 'react'
import { authenticate } from '@/lib/actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { ShieldCheck, Mountain } from "lucide-react"

export default function LoginPage() {
    const [errorMessage, dispatch, isPending] = useActionState(
        authenticate,
        undefined,
    )

    return (
        <div className="flex min-h-screen w-full admin-surface overflow-hidden">
            {/* Left Side - Immersive Branding */}
            <div className="hidden lg:flex w-[40%] bg-[#0f172a] relative items-center justify-center p-12 overflow-hidden">
                {/* Abstract background elements */}
                <div className="absolute top-0 right-0 w-full h-full opacity-10">
                    <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-admin-accent blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500 blur-[100px]" />
                </div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="mb-8 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                        <Image
                            src="/Images/Logo/logo.png"
                            alt="Nepal Travel Co. Logo"
                            width={280}
                            height={280}
                            className="object-contain brightness-0 invert"
                            priority
                        />
                    </div>
                    <div className="space-y-4 max-w-sm">
                        <h2 className="text-3xl font-bold text-white tracking-tight">Curation Portal</h2>
                        <p className="text-blue-200/60 text-sm font-medium leading-relaxed">
                            Secured administrative access for Nepal Travel Co. operators and guides.
                        </p>
                    </div>
                </div>
                
                {/* Decorative Footer */}
                <div className="absolute bottom-8 left-0 w-full px-12 flex items-center justify-between text-blue-200/30 text-[10px] uppercase tracking-[0.2em] font-bold">
                    <span>Expedition Management</span>
                    <div className="h-px flex-1 mx-4 bg-white/10" />
                    <span>v2.0 EST</span>
                </div>
            </div>

            {/* Right Side - Refined Login Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative bg-admin-bg">
                <div className="w-full max-w-sm space-y-10">
                    <div className="space-y-3 text-center lg:text-left">
                        <div className="lg:hidden flex justify-center mb-8">
                            <div className="p-4 bg-admin-card border border-admin-card-border rounded-2xl shadow-sm">
                                <Image
                                    src="/Images/Logo/logo.png"
                                    alt="Nepal Travel Co. Logo"
                                    width={120}
                                    height={120}
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-admin-accent/10 border border-admin-accent/20 mb-2">
                            <ShieldCheck className="h-3.5 w-3.5 text-admin-accent" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-admin-accent">Secure Gateway</span>
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-admin-text-primary">Admin Sign In</h1>
                        <p className="text-admin-text-secondary text-sm font-medium">
                            Authorized personnel only. Please enter your credentials.
                        </p>
                    </div>

                    <form action={dispatch} className="space-y-6">
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-admin-text-secondary ml-1">Work Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="name@nepaltravel.co"
                                    required
                                    className="h-12 bg-admin-card border-admin-card-border focus:ring-admin-accent focus:border-admin-accent transition-all rounded-xl shadow-sm px-4"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-admin-text-secondary">Password</Label>
                                    <a href="#" className="text-xs text-admin-accent hover:underline font-bold">
                                        Recovery Required?
                                    </a>
                                </div>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    name="password" 
                                    required 
                                    className="h-12 bg-admin-card border-admin-card-border focus:ring-admin-accent focus:border-admin-accent transition-all rounded-xl shadow-sm px-4" 
                                />
                            </div>
                        </div>

                        <Button
                            className="w-full h-12 bg-admin-accent hover:bg-admin-accent/90 text-white font-bold rounded-xl shadow-lg shadow-admin-accent/20 transition-all active:scale-[0.98] mt-2"
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <span className="flex items-center gap-2">
                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Authenticating...
                                </span>
                            ) : 'Access Dashboard'}
                        </Button>

                        <div
                            className="flex min-h-[1.5rem] items-center justify-center"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {errorMessage && (
                                <div className="flex items-center gap-2 text-xs font-bold text-red-500 bg-red-500/5 px-4 py-2 rounded-lg border border-red-500/10 w-full animate-in fade-in slide-in-from-top-2">
                                    <div className="h-1 w-1 rounded-full bg-red-500" />
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                    </form>

                    <p className="text-center text-[10px] font-bold text-admin-text-secondary/40 uppercase tracking-[0.2em] pt-8">
                        © {new Date().getFullYear()} Nepal Travel Co. Systems
                    </p>
                </div>
            </div>
        </div>
    )
}
