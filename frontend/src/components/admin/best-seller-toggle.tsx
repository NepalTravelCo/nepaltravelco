'use client'

import { useState } from "react"
import { toggleBestSeller } from "@/actions/package-actions"
import { toast } from "sonner"

interface BestSellerToggleProps {
    id: string
    initialValue: boolean
}

export function BestSellerToggle({ id, initialValue }: BestSellerToggleProps) {
    const [isBestSeller, setIsBestSeller] = useState(initialValue)
    const [loading, setLoading] = useState(false)

    const handleToggle = async () => {
        if (loading) return
        setLoading(true)
        const newValue = !isBestSeller
        
        // Optimistic UI update
        setIsBestSeller(newValue)
        
        try {
            const result = await toggleBestSeller(id, newValue)
            if (result.success) {
                toast.success(`Package status updated successfully`)
            } else {
                toast.error(result.message || "Failed to update package status")
                // Revert
                setIsBestSeller(isBestSeller)
            }
        } catch (error) {
            toast.error("Failed to update package status")
            // Revert
            setIsBestSeller(isBestSeller)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-admin-accent/20 cursor-pointer ${
                isBestSeller ? "bg-admin-accent" : "bg-admin-card-border"
            }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isBestSeller ? "translate-x-6" : "translate-x-1"
                }`}
            />
        </button>
    )
}
