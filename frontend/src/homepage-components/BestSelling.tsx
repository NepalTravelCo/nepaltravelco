import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

function BestSelling() {
  const [packages, setPackages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'}/api/packages`)
        if (response.ok) {
          const data = await response.json()
          setPackages(data)
        }
      } catch (error) {
        console.error("Error fetching packages:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section className="bg-stone-50 py-24">
      <div className="container-max">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div className="max-w-3xl">
              <span className="text-secondary font-semibold tracking-widest uppercase text-xs mb-3 block">Featured Experiences</span>
              <h2 className="font-[var(--heading-font)] text-primary text-4xl md:text-5xl font-bold leading-tight">
                Traveler&apos;s <span className="italic font-normal">Favorites</span>
              </h2>
              <p className="max-w-3xl text-stone-500 text-lg leading-relaxed mt-4">
              Discover Nepal&apos;s best with handpicked journeys—scenic, cultural,
              and thoughtfully crafted for wonder.
            </p>
            </div>
            
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="min-h-[500px]">
          {loading ? (
            <div className="flex items-center justify-center h-[500px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="
                grid gap-4
                grid-cols-1 md:grid-cols-2 lg:grid-cols-4
              "
            >
              {packages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  variants={cardVariants}
                  className="group relative h-[500px] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                >
                  {/* Image */}
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Floating Labels */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="px-4 py-1.5 glass text-primary-900 text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-md">
                      {pkg.duration}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 inset-x-0 p-8 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      <span className="text-white/80 text-xs uppercase tracking-[0.2em] font-medium">
                        {pkg.location}
                      </span>
                    </div>
                    <h3 className="text-white font-[var(--heading-font)] text-2xl font-bold mb-4 leading-tight">
                      {pkg.title}
                    </h3>

                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span className="text-white font-bold text-lg">${pkg.price.toLocaleString()}</span>
                      <span className="text-white/80 underline text-sm font-medium">View Details</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default BestSelling
