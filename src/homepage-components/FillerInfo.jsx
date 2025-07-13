import React from "react";
import "./styles/FillerInfo.css";

const FillerInfo = () => {
  return (
    <div id="filler-info-body">
    
    <div className="filler-info-container">
    <section id="filler-kathmandu" className="container">
      <div className="d-flex flex-wrap align-items-center filler-wrapper">
        <div
          className="filler-img"
          style={{ backgroundImage: "url('https://i.pinimg.com/1200x/2f/2e/68/2f2e68e7b71929dcd1d838a8f5fb27a5.jpg')" }}
        ></div>
        <div className="filler-text text-white">
          <h2 className="filler-title">Explore The Valley</h2>
          <p className="filler-desc">
            Discover the cultural heart of Nepal, bustling with ancient temples,
            royal palaces, vibrant local markets, and the spirit of Himalayan heritage.
          </p>
          <a href="/explore-kathmandu" className="btn btn-light">
            Explore More
          </a>
        </div>
      </div>
    </section>
    </div>
    </div>
  );
};

export default FillerInfo;
