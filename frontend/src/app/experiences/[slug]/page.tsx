"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import ExperienceDetailLayout from "../ExperienceDetailLayout";

export default function ExperiencePage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [experience, setExperience] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        const fetchExperience = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/experiences/${slug}`);
                if (response.ok) {
                    const data = await response.json();
                    setExperience(data);
                } else {
                    setExperience(null);
                }
            } catch (error) {
                console.error("Error fetching experience:", error);
                setExperience(null);
            } finally {
                setLoading(false);
            }
        };
        fetchExperience();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
            </div>
        );
    }

    if (!experience) {
        return notFound();
    }

    return <ExperienceDetailLayout experience={experience} />;
}
