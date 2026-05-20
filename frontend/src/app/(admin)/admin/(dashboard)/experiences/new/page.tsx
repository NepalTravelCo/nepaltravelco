import { ExperienceForm } from "@/components/admin/ExperienceForm"

export const dynamic = "force-dynamic"

export default function NewExperiencePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div>
                <h1 className="text-4xl font-black text-admin-text-primary tracking-tight">New Experience</h1>
                <p className="text-sm font-bold text-admin-text-secondary opacity-60 mt-1 uppercase tracking-widest">Add a new non-trek experience collection</p>
            </div>
            
            <ExperienceForm />
        </div>
    )
}
