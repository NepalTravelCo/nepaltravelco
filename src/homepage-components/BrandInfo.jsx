import React, { useState } from "react";
import "./styles/BrandInfo.css";

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

const BrandInfo = () => {
  const [startIndex, setStartIndex] = useState(0);

  const nationalParks = [
    { id: 1, name: "Sagarmatha National Park", description: "Home to Mount Everest, this park offers breathtaking Himalayan landscapes and unique Sherpa culture.", imageUrl: "https://i.pinimg.com/1200x/bb/2d/cc/bb2dcc9ca5685ef21de47c97498f8b25.jpg", badge: "25% Discount" },
    { id: 2, name: "Chitwan National Park", description: "Famous for its wildlife, including one-horned rhinos, Bengal tigers, and various bird species.", imageUrl: "https://i.pinimg.com/1200x/4f/d2/ca/4fd2ca4ed6c192e7ddd880cbb4105831.jpg", badge: "Travel Package!" },
    { id: 3, name: "Langtang National Park", description: "Beautiful landscapes, glaciers, and diverse flora & fauna close to Kathmandu.", imageUrl: "https://i.pinimg.com/736x/1e/07/37/1e07375628bd97d229c9ac1167ff8f9e.jpg", badge: "New!" },
    { id: 4, name: "Bardiya National Park", description: "A serene park with rich biodiversity and fewer tourists, ideal for wildlife spotting.", imageUrl: "https://i.pinimg.com/736x/f9/1c/eb/f91ceb5a8e78fd6afa8e5666c6476ef5.jpg", badge: "Featured" },
  ];

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % nationalParks.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + nationalParks.length) % nationalParks.length);
  };

  const visibleParks = [
    nationalParks[startIndex],
    nationalParks[(startIndex + 1) % nationalParks.length],
  ];

  return (
    <section id="np-brand-info-section" className="np-brand-info-section">
      <div className="np-background-image"></div>
      <div className="np-content-wrapper">
        <div className="np-left-section">
          <h1 className="np-heading">National Parks of Nepal</h1>
          <a className="np-button" href="#">
            View All Parks
          </a>
        </div>

        <div className="np-right-section">
          <button
            id="np-arrow-prev"
            className="np-arrow-button left"
            onClick={handlePrev}
          >
            <ArrowLeftIcon />
          </button>

          <div className="np-card-wrapper">
            {visibleParks.map((park) => (
              <div key={park.id} className="np-card">
                <div className="np-card-image-container">
                  <img
                    src={park.imageUrl || "/placeholder.svg"}
                    alt={park.name}
                    className="np-card-image"
                  />
                  <div className="np-badge left">{park.badge}</div>

                  <div className="np-card-content">
                    <h3 className="np-card-title">{park.name}</h3>
                    <p className="np-card-description">{park.description}</p>
                    <a href="#" className="np-view-offer-link">
                      View Details <ExternalLinkIcon />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            id="np-arrow-next"
            className="np-arrow-button right"
            onClick={handleNext}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
      
    </section>
  );
};

export default BrandInfo;
