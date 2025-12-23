"use client"

import { motion } from "framer-motion"
import Image from "next/image"

function BestSelling() {
  const travelCards = [
    {
      id: 1,
      image:
        "https://i.pinimg.com/736x/16/37/80/16378017612eb06c5d85821f7062cd4e.jpg",
      location: "Namche, Solukhumbu",
      title: "Everest Base Camp Trek",
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/736x/16/37/80/16378017612eb06c5d85821f7062cd4e.jpg",
      location: "Lomanthang, Mustang",
      title: "Bike Ride To Upper Mustang",
    },
    {
      id: 3,
      image:
        "https://i.pinimg.com/736x/a1/3f/30/a13f305aaa49500143d0d60ecf4fc1a9.jpg",
      location: "Sauraha, Chitwan",
      title: "Safari Escape To Chitwan",
    },
    {
      id: 4,
      image:
        "https://i.pinimg.com/736x/cd/4f/05/cd4f0588787d88ff975aea1b78ec6d24.jpg",
      location: "Majadevi Temple, Lumbini",
      title: "Lumbini Heritage Tour",
    },
  ]

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section className="bg-[var(--background-color)] py-20">
      <div className="max-w-[1400px] mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-primary text-3xl md:text-4xl font-bold tracking-wide mb-4">
            TRAVELER&apos;S FAVORITES
          </h2>
          <p className="max-w-3xl mx-auto text-muted text-base md:text-lg font-body">
            Discover Nepal&apos;s best with handpicked journeys—scenic, cultural,
            and thoughtfully crafted for adventure, comfort, and wonder.
          </p>
        </div>

        {/* Cards */}
        <div
          className="
            grid gap-5
            grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
            md:grid
            max-md:flex max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory
          "
        >
          {travelCards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="
                group relative rounded-xl overflow-hidden
                bg-[var(--background-color)]
                shadow-[0_6px_18px_rgba(0,0,0,0.08)]
                transition-all duration-500 ease-out
                hover:-translate-y-3 hover:scale-[1.04]
                hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]
                cursor-pointer
                max-md:flex-shrink-0 max-md:w-full max-md:h-[500px] max-md:snap-start
              "
            >
              {/* Image */}
              <div className="relative h-[550px] max-md:h-full overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="
                    object-cover
                    transition-transform duration-700
                    group-hover:scale-110
                  "
                />

                {/* Overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-b
                    from-black/10 via-black/40 to-black/80
                    transition-opacity duration-300
                    group-hover:opacity-90
                  "
                />

                {/* Content */}
                <div
                  className="
                    absolute bottom-0 inset-x-0 p-6 z-10
                    transition-transform duration-300
                    group-hover:-translate-y-1
                  "
                >
                  <p className="text-white/90 text-sm mb-2 drop-shadow">
                    {card.location}
                  </p>
                  <h3 className="text-white font-heading text-xl md:text-2xl font-bold leading-snug drop-shadow">
                    {card.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSelling
