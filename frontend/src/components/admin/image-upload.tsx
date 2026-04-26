
'use client'

import { CldUploadWidget } from "next-cloudinary"
import { ImagePlus, Trash2 } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
    value: string[]
    onChange: (value: string) => void
    onRemove: (value: string) => void
    maxImages?: number
}

export function ImageUpload({
    value,
    onChange,
    onRemove,
    maxImages = 1
}: ImageUploadProps) {
    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }

    return (
        <div className="space-y-4 w-full">
            <div className="flex flex-wrap gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[150px] rounded-2xl overflow-hidden group border border-admin-card-border shadow-md">
                        <div className="absolute z-10 top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                type="button"
                                onClick={() => onRemove(url)}
                                className="p-2 bg-red-500 rounded-xl text-white hover:bg-red-600 shadow-lg transition-all active:scale-95"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Uploaded image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            {value.length < maxImages && (
                <CldUploadWidget onUpload={onUpload} uploadPreset="nepal_travel_co">
                    {({ open }) => {
                        const onClick = () => {
                            open()
                        }

                        return (
                            <button
                                type="button"
                                onClick={onClick}
                                className="relative flex flex-col items-center justify-center gap-3 w-[200px] h-[150px] rounded-2xl border-2 border-dashed border-admin-card-border bg-admin-bg/50 hover:bg-admin-bg hover:border-admin-accent/50 transition-all group"
                            >
                                <div className="p-3 rounded-full bg-admin-bg border border-admin-card-border group-hover:scale-110 transition-transform">
                                    <ImagePlus className="h-6 w-6 text-admin-accent" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-admin-text-secondary group-hover:text-admin-accent transition-colors">Upload Image</span>
                            </button>
                        )
                    }}
                </CldUploadWidget>
            )}
        </div>
    )
}
