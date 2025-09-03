"use client"
import { motion } from "framer-motion"
import "./styles/BestSelling.css"
import Image from "next/image"

function BestSelling() {
  const travelCards = [
    {
      id: 1,
      image:
        "https://i.pinimg.com/736x/16/37/80/16378017612eb06c5d85821f7062cd4e.jpg",
      location: "Namche, Solukhumbu",
      title: "Everest Base Camp Trek",
      rating: "4/5",
      popular: true,
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/736x/16/37/80/16378017612eb06c5d85821f7062cd4e.jpg",
      location: "Lomanthang, Mustang",
      title: "Bike Ride To Upper Mustang",
      rating: "4/5",
      popular: false,
      trending: true,
    },
    {
      id: 3,
      image:
        "https://i.pinimg.com/736x/a1/3f/30/a13f305aaa49500143d0d60ecf4fc1a9.jpg",
      location: "Sauraha, Chitwan",
      title: "Safari Escape To Chitwan",
      rating: "4/5",
    },
    {
      id: 4,
      image:
        "https://i.pinimg.com/736x/cd/4f/05/cd4f0588787d88ff975aea1b78ec6d24.jpg",
      location: "Majadevi Temple, Lumbini",
      title: "Lumbini Heritage Tour",
      rating: "4/5",
      popular: true,
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
    <div className="main-best-selling">
      <section className="best-selling-section">
        <div className="container">
          {/* Header */}
          <div className="section-header">
            <h2 className="section-title">TRAVELER&apos;S FAVORITES</h2>
            <p className="section-description">
              Discover Nepal&apos;s best with handpicked journeys—scenic, cultural, and thoughtfully crafted for adventure, comfort, and wonder.
            </p>
          </div>

          {/* Travel Cards */}
          <div className="travel-cards-container">
            {travelCards.map((card) => (
              <motion.div
                key={card.id}
                className="travel-card"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={cardVariants}
              >
                <div className="card-image-container">
                  <Image
                      src={card.image || "/placeholder.svg"}
                      alt={card.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="card-image"
                    />
                  <div className="card-overlay"></div>
                  <div className="card-content">
                    <p className="card-location">{card.location}</p>
                    <h3 className="card-title">{card.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default BestSelling