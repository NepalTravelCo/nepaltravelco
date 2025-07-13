import "./styles/BestSelling.css"

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
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      location: "Lomanthang, Mustang",
      title: "Bike Ride To Upper Mustang",
      rating: "4/5",
      popular: true,
    },
    {
      id: 3,
      image:
        "https://i.pinimg.com/736x/a1/3f/30/a13f305aaa49500143d0d60ecf4fc1a9.jpg",
      location: "Sauraha, Chitwan",
      title: "Safari Escape To Chitwan",
      rating: "4/5",
      popular: true,
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

  const renderStars = (rating) => {
    const stars = []
    const numStars = Number.parseInt(rating.split("/")[0])

    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < numStars ? "filled" : "empty"}`}>
          ★
        </span>,
      )
    }
    return stars
  }

  return (
    <div className="main-best-selling">
    <section className="best-selling-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <p className="section-subtitle">Discover Top Picks</p>
          <h2 className="section-title">TRAVELER'S FAVORITES</h2>
          <p className="section-description">
            Embark on unforgettable journeys chosen by fellow travelers. These curated experiences showcase the very
            best of Nepal—from scenic escapes to cultural immersions—crafted for comfort, adventure, and discovery.
          </p>
        </div>

        {/* Travel Cards */}
        <div className="travel-cards-container">
          {travelCards.map((card) => (
            <div key={card.id} className="travel-card">
              <div className="card-image-container">
                <img src={card.image || "/placeholder.svg"} alt={card.title} className="card-image" />
                <div className="card-overlay"></div>

                {/* Popular Badge */}
                {card.popular && <div className="popular-badge">POPULAR</div>}

                {/* Rating */}
                <div className="rating-container">
                  <span className="rating-text">{card.rating}</span>
                  <div className="stars">{renderStars(card.rating)}</div>
                </div>

                {/* Content */}
                <div className="card-content">
                  <p className="card-location">{card.location}</p>
                  <h3 className="card-title">{card.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="navigation-arrows">
          <button className="nav-arrow nav-arrow-left" aria-label="Previous">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="nav-arrow nav-arrow-right" aria-label="Next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
    </div>
  )
}

export default BestSelling
