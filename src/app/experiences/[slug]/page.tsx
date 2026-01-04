"use client";

import { useParams } from "next/navigation";
import { experiences } from "../data";
import ExperienceDetailLayout from "../ExperienceDetailLayout";
import { notFound } from "next/navigation";

export default function ExperiencePage() {
    const params = useParams();
    const slug = params.slug as string;

    const experience = experiences.find((e) => e.slug === slug);

    if (!experience) {
        return notFound();
    }

    return <ExperienceDetailLayout experience={experience} />;
}
