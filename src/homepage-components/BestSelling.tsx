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
      duration: "14 Days",
      price: "$1,299"
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/736x/86/98/b2/8698b252000d0a556352cd68053dcdc7.jpg",
      location: "Lomanthang, Mustang",
      title: "Bike Ride To Upper Mustang",
      duration: "10 Days",
      price: "$2,450"
    },
    {
      id: 3,
      image:
        "https://i.pinimg.com/736x/1d/a2/40/1da2405ab9b54c95932327cde28f4a1c.jpg",
      location: "Sauraha, Chitwan",
      title: "Safari Escape To Chitwan",
      duration: "3 Days",
      price: "$450"
    },
    {
      id: 4,
      image:
        "https://i.pinimg.com/736x/cd/4f/05/cd4f0588787d88ff975aea1b78ec6d24.jpg",
      location: "Lumbini",
      title: "Lumbini Heritage Tour",
      duration: "2 Days",
      price: "$300"
    },
  ]

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
          {travelCards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              className="group relative h-[500px] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Floating Labels */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="px-4 py-1.5 glass text-primary-900 text-xs font-bold rounded-full uppercase tracking-wider backdrop-blur-md">
                  {card.duration}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 inset-x-0 p-8 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span className="text-white/80 text-xs uppercase tracking-[0.2em] font-medium">
                    {card.location}
                  </span>
                </div>
                <h3 className="text-white font-[var(--heading-font)] text-2xl font-bold mb-4 leading-tight">
                  {card.title}
                </h3>

                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span className="text-white font-bold text-lg">{card.price}</span>
                  <span className="text-white/80 underline text-sm font-medium">View Details</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default BestSelling
