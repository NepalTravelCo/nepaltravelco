import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Clock3, Mountain, Sparkles, Trophy } from "lucide-react"
import Navigation from "@/header-component/Navigation"
import FooterSection from "@/footer-components/FooterSection"
import { getBackendBaseUrl } from "@/lib/backend-url"

type RegionTrek = {
  id: string
  slug: string
  name: string
  image: string
  description: string
  duration: string
  difficulty: string
  altitude: number
  bestMonths?: string[]
  highlights?: string[]
}

type RegionDetail = {
  id: string
  slug: string
  name: string
  image: string
  trailCount: number
  altitude?: number
  description: string
  whyChoose?: string[]
  treks: RegionTrek[]
}

type RegionPageProps = {
  params: Promise<{ slug: string }>
}

export const dynamic = "force-dynamic"
export const revalidate = 0

async function fetchRegion(slug: string): Promise<RegionDetail | null> {
  const backendUrl = getBackendBaseUrl()
  const response = await fetch(`${backendUrl}/api/regions/${slug}`, { cache: "no-store" })
  if (!response.ok) return null
  return response.json()
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const region = await fetchRegion(slug)
    if (!region) {
      return { title: "Region Not Found" }
    }
    return {
      title: `${region.name} - Trekking Region`,
      description: region.description,
    }
  } catch {
    return { title: "Trekking Region" }
  }
}


export default async function RegionDetailPage({ params }: RegionPageProps) {
  const { slug } = await params
  const region = await fetchRegion(slug)

  if (!region) {
    notFound()
  }

  const regionAltitude = region.altitude || 3500
  const topTreks = (region.treks || [])
  const bestMonths = Array.from(new Set(topTreks.flatMap((trek) => trek.bestMonths || []))).slice(0, 4)
  const highlightedPoints = region.whyChoose || []
  const galleryImages = [region.image, ...topTreks.map((trek) => trek.image)].filter(Boolean).slice(0, 6)
  const signatureTreks = topTreks.map((trek) => trek.name).slice(0, 8)

  return (
    <div className="bg-stone-50 text-primary font-[var(--text-font)] min-h-screen">
      <Navigation />

      <main>
        <section className="relative min-h-[72vh] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={region.image || "/placeholder.svg"}
              alt={region.name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-black/20 to-black/40" />
          </div>

          <div className="relative container-max px-6 md:px-12 py-28 md:py-36 flex min-h-[72vh] flex-col justify-end">
            <div className="mb-7 flex flex-wrap items-center gap-3 text-white/90">
              <Link
                href="/treks"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.25em] transition-colors hover:bg-white/20"
              >
                <ArrowLeft size={14} />
                Back to Treks
              </Link>
              <span className="text-[10px] uppercase tracking-[0.35em] text-white/70">Region Detail</span>
            </div>

            <h1 className="font-[var(--heading-font)] text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tighter">
              {region.name}
            </h1>

            <p className="mt-5 max-w-3xl text-base md:text-xl text-stone-200 leading-relaxed">
              {region.description}
            </p>
          </div>
        </section>

        <section className="py-20 md:py-24 px-6 md:px-12">
          <div className="container-max">
            <div className="mb-10">
              <span className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">
                Region Overview
              </span>
              <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                Discover <span className="italic font-normal">{region.name}</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
              <article className="lg:col-span-8 rounded-[2.5rem] border border-stone-200 bg-white p-7 md:p-10 shadow-sm">
                <p className="text-stone-700 text-base md:text-lg leading-relaxed">{region.description}</p>
                <p className="mt-5 text-stone-600 text-sm md:text-base leading-relaxed">
                  Experience the unique landscapes and heritage of the {region.name} region through our curated expeditions.
                </p>
              </article>

              <aside className="lg:col-span-4 rounded-[2.5rem] border border-stone-200 bg-white p-7 md:p-8 shadow-sm">
                <h3 className="text-[10px] uppercase tracking-[0.3em] font-black text-secondary/70 mb-6">
                  Key Characteristics
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <Trophy size={18} className="text-secondary mt-1" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Trail Count</p>
                      <p className="mt-1 text-lg font-semibold text-primary">{region.trailCount || topTreks.length}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mountain size={18} className="text-secondary mt-1" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Avg Altitude</p>
                      <p className="mt-1 text-lg font-semibold text-primary">{regionAltitude.toLocaleString()}m</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock3 size={18} className="text-secondary mt-1" />
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Best Seasons</p>
                      <p className="mt-1 text-lg font-semibold text-primary">{bestMonths.length ? bestMonths.join(", ") : "Spring & Autumn"}</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {(signatureTreks.length > 0 || highlightedPoints.length > 0) && (
          <section className="py-20 md:py-24 px-6 md:px-12 bg-stone-100/60 text-primary">
            <div className="container-max">
              <div className="mb-10">
                <span className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">Highlights</span>
                <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold text-primary leading-tight">
                  Why Travelers Choose <span className="italic font-normal">This Region</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {signatureTreks.length > 0 && (
                  <article className="rounded-[2rem] border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                      <Sparkles size={22} />
                    </div>
                    <h3 className="font-[var(--heading-font)] text-2xl font-bold text-primary">Signature Treks</h3>
                    <ul className="mt-4 space-y-2.5 text-sm text-stone-600">
                      {signatureTreks.map((name) => (
                        <li key={name} className="flex items-start gap-3 leading-relaxed">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
                          {name}
                        </li>
                      ))}
                    </ul>
                  </article>
                )}

                {highlightedPoints.length > 0 && (
                  <article className="rounded-[2rem] border border-stone-200 bg-white p-6 md:p-8 shadow-sm">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                      <Sparkles size={22} />
                    </div>
                    <h3 className="font-[var(--heading-font)] text-2xl font-bold text-primary">Why Choose This Region?</h3>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">Unique selling points & attractions</p>
                    <ul className="mt-4 space-y-2.5 text-sm text-stone-600">
                      {highlightedPoints.map((point) => (
                        <li key={point} className="flex items-start gap-3 leading-relaxed">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                )}
              </div>
            </div>
          </section>
        )}

        {galleryImages.length > 0 && (
          <section className="py-20 md:py-24 px-6 md:px-12">
            <div className="container-max">
              <div className="mb-10">
                <span className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">Visual Story</span>
                <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold text-primary leading-tight">
                  {region.name} <span className="italic font-normal">Gallery</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {galleryImages.map((image, index) => (
                  <figure
                    key={index}
                    className="relative overflow-hidden rounded-[2.5rem] border border-stone-200 bg-white shadow-sm h-64 md:h-72"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${region.name} visual ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-20 md:py-24 px-6 md:px-12 bg-stone-100/60 text-primary">
          <div className="container-max">
            <div className="mb-10">
              <span className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block">
                Trek Collection
              </span>
              <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold leading-tight text-primary">
                Treks in <span className="italic font-normal">{region.name}</span>
              </h2>
            </div>

            {topTreks.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topTreks.map((trek) => (
                  <article
                    key={trek.id}
                    className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={trek.image || "/placeholder.svg"}
                        alt={trek.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>

                    <div className="p-6">
                      <h3 className="font-[var(--heading-font)] text-2xl font-bold text-primary">{trek.name}</h3>
                      <p className="mt-2 text-sm text-stone-600 line-clamp-3">{trek.description}</p>

                      <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <p className="uppercase tracking-widest text-stone-400 font-bold">Duration</p>
                          <p className="mt-1 font-semibold text-primary">{trek.duration}</p>
                        </div>
                        <div>
                          <p className="uppercase tracking-widest text-stone-400 font-bold">Difficulty</p>
                          <p className="mt-1 font-semibold text-primary">{trek.difficulty}</p>
                        </div>
                      </div>

                      <Link
                        href={`/treks/${trek.slug}`}
                        className="mt-5 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-primary hover:text-secondary transition-colors"
                      >
                        View Trek Details
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <article className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
                <p className="text-stone-600 italic">Expeditions for this region are being updated. Check back soon.</p>
              </article>
            )}
          </div>
        </section>

        <section className="py-20 md:py-24 px-6 md:px-12">
          <div className="container-max">
            <div className="rounded-[2.5rem] border border-stone-200 bg-white p-8 md:p-12 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                <div>
                  <h2 className="font-[var(--heading-font)] text-4xl md:text-5xl font-bold text-primary leading-tight">
                    Explore More of Nepal
                  </h2>
                  <p className="mt-4 text-stone-600 max-w-2xl leading-relaxed">
                    Compare this with other legendary Himalayan regions and choose your next adventure.
                  </p>
                </div>

                <Link
                  href="/treks"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-10 py-4 text-[11px] font-black uppercase tracking-[0.22em] text-white transition-all hover:bg-secondary shadow-lg shadow-primary/20"
                >
                  View All Regions
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  )
}
