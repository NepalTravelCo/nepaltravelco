"use client";

import { useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import GuideDetailLayout from "@/app/travel-guide/GuideDetailLayout";
import { getPublicBackendBaseUrl } from "@/lib/backend-url";

export default function PlaceDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [destination, setDestination] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const response = await fetch(`${getPublicBackendBaseUrl()}/api/destinations/${slug}`);
                if (response.ok) {
                    const data = await response.json();
                    setDestination(data);
                }
            } catch (error) {
                console.error("Error fetching destination detail:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchDestination();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
            </div>
        );
    }

    if (!destination) {
        return notFound();
    }

    return (
        <GuideDetailLayout 
            item={destination} 
            backLink="/places-to-go" 
            backText="Places to Go" 
        />
    );
}
