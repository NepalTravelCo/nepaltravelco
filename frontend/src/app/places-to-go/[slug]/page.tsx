"use client";

import { useParams, notFound } from "next/navigation";
import { destinations } from "../data";
import GuideDetailLayout from "@/app/travel-guide/GuideDetailLayout";

export default function PlaceDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const destination = destinations.find((d) => d.slug === slug);

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
