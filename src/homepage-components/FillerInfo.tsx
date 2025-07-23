"use client"
import "./styles/FillerInfo.css";
import Link from "next/link";

const FillerInfo = () => {
  return (
    <div id="filler-info-body">
    
    <div className="filler-info-container">
    <section id="filler-kathmandu" className="container">
      <div className="d-flex flex-wrap align-items-center filler-wrapper">
        <div
          className="filler-img"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/2104882/pexels-photo-2104882.jpeg')" }}
        ></div>
        <div className="filler-text">
          <h2 className="filler-title">Explore The Valley</h2>
          <p className="filler-desc">
            Discover the cultural heart of Nepal, bustling with ancient temples,
            royal palaces, vibrant local markets, and the spirit of Himalayan heritage.
          </p>
          <Link href="/explore-valley" className="btn btn-light" id="explore-btn">
            Explore More
          </Link>
        </div>
      </div>
    </section>
    </div>
    </div>
  );
};

export default FillerInfo;
