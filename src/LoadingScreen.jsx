import React from "react";
import "./LoadingScreen.css";


const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="logo-wrapper">
        <img src='https://i.pinimg.com/736x/ab/a2/d8/aba2d88fa32a05bad7c82ee859c3f6b9.jpg' alt="Nepal Travel Co." className="loading-logo" />
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-text">Preparing your adventure...</p>
    </div>
  );
};

export default LoadingScreen;
