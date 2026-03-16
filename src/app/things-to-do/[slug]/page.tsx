"use client";

import { useParams, notFound } from "next/navigation";
import { activities } from "../data";
import GuideDetailLayout from "@/app/travel-guide/GuideDetailLayout";

export default function ActivityDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const activity = activities.find((a) => a.slug === slug);

    if (!activity) {
        return notFound();
    }

    return (
        <GuideDetailLayout 
            item={{
                ...activity,
                // Map activity-specific fields to the generic GuideDetailLayout expected shape if needed
                altitude: undefined, // Or a generic value if appropriate
                location: "Across Nepal" // Or a generic value
            }} 
            backLink="/things-to-do" 
            backText="Things to Do" 
        />
    );
}
