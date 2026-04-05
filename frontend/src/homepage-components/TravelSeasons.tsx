import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"
import Image from "next/image"

interface Season {
  slug: string
  name: string
  image: string
  bestMonths: string[]
  description: string
}

export default function TravelSeasons({ onLoaded }: { onLoaded?: () => void }) {
  const [seasons, setSeasons] = useState<Season[]>([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // For mobile responsiveness
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5000'}/api/seasons`)
        if (response.ok) {
          const data = await response.json()
          if (Array.isArray(data)) {
            setSeasons(data)
          }
        } else {
          console.error("Server returned error for seasons:", response.status)
        }
      } catch (error) {
        console.error("Error fetching seasons:", error)
      } finally {
        setLoading(false)
        if (onLoaded) onLoaded()
      }
    }
    fetchSeasons()
  }, [])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (loading) return null;
  if (seasons.length === 0) {
    console.warn("No seasons data found - check seeding.");
    return null; // Still returning null if empty, but after loading is done
  }

  return (
    <section className="bg-stone-50 py-24 md:py-32 overflow-hidden min-h-[750px] md:min-h-[1000px] flex flex-col items-center justify-center relative">
      {/* Header matching the homepage style (BrandInfo) */}
      <div className="container-max w-full mb-16 md:mb-24 z-10 px-4">
        <div className="flex flex-col items-center text-center justify-center gap-4">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-secondary font-semibold tracking-[0.3em] uppercase text-xs mb-4 block"
            >
              Timing is Everything
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="font-[var(--heading-font)] text-4xl md:text-7xl font-bold text-primary leading-tight"
            >
              Seasonal <br />
              <span className="italic font-normal">Splendor of Nepal</span>
            </motion.h2>
          </div>
        </div>
      </div>

      {/* Card Deck Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-7xl h-[450px] md:h-[600px] flex items-center justify-center pt-24"
      >
        <div className="relative w-full h-full flex items-center justify-center translate-y-[-20px] md:translate-y-[-50px]">
                {seasons.map((season, idx) => {
                    const total = seasons.length
                    const center = (total - 1) / 2
                    const distance = idx - center

                    // Layout calculations for the arc
                    const xOffset = distance * (isMobile ? 70 : 165)
                    const rotation = distance * (isMobile ? 8 : 12)
                    const yOffset = Math.abs(distance) * (isMobile ? 15 : 45)
                    const zIndex = 20 - Math.abs(distance)

                    return (
                    <motion.div
                        key={season.slug}
                        className="absolute origin-bottom"
                        style={{ zIndex: hoveredIndex === idx ? 60 : zIndex }}
                        initial={{
                        x: 0,
                        y: 100,
                        rotate: 0,
                        opacity: 0,
                        scale: 0.8
                        }}
                        animate={isInView ? {
                        x: xOffset,
                        y: yOffset,
                        rotate: hoveredIndex === idx ? 0 : rotation,
                        opacity: 1,
                        scale: hoveredIndex === idx ? (isMobile ? 1.05 : 1.1) : 1,
                        } : {}}
                        transition={{
                        type: "spring",
                        stiffness: 60,
                        damping: 15,
                        delay: idx * 0.1,
                        }}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <Link href={`/seasons/${season.slug}`} className="block relative">
                            <motion.div
                                className="w-[220px] h-[340px] md:w-[320px] md:h-[480px] rounded-[40px] md:rounded-[60px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)] bg-black/10 group relative"
                                style={{ 
                                isolation: 'isolate',
                                WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                                maskImage: 'radial-gradient(white, black)',
                                backfaceVisibility: 'hidden',
                                transform: 'translateZ(0)'
                                }}
                                whileHover={{
                                y: isMobile ? -30 : -80,
                                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                                }}
                            >
                                <div className="absolute inset-0 border border-white/10 group-hover:border-white/40 transition-colors duration-500 rounded-[40px] md:rounded-[60px] z-30 pointer-events-none" />

                                <Image
                                src={season.image}
                                alt={season.name}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                                <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
                                <div className="glass px-3 py-1.5 md:px-4 md:py-2 rounded-full flex items-center gap-2 border border-white/20 backdrop-blur-md">
                                    <Calendar size={12} className="text-primary" />
                                    <span className="bg-primarytext-white text-[9px] md:text-[10px] font-bold uppercase tracking-wider">
                                    {season.name}
                                    </span>
                                </div>
                                </div>

                                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 flex flex-col justify-end text-white z-10 rounded-b-[40px] md:rounded-b-[60px]">
                                <div className="mb-0 group-hover:mb-2 transition-all duration-500">
                                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-secondary mb-1 block opacity-0 group-hover:opacity-100 transition-opacity">
                                    {season.bestMonths.join(", ")}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-bold font-[var(--heading-font)] leading-none text-white tracking-tight">
                                    {season.name}
                                    </h3>
                                </div>

                                <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                    <p className="text-[11px] md:text-sm text-stone-200 font-light leading-relaxed mb-6 line-clamp-3">
                                    {season.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white underline underline-offset-8 decoration-secondary/50 hover:decoration-secondary transition-all">
                                    <span>Explore Season</span>
                                    <ArrowRight size={14} className="text-secondary" />
                                    </div>
                                </div>
                                </div>
                            </motion.div>
                        </Link>
                    </motion.div>
                    )
                })}
            </div>
      </div>

      {/* Background decoration to add depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0%,transparent_70%)] pointer-events-none" />
    </section>
  )
}
