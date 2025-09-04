"use client"
import "./LoadingScreen.css";
import Image from "next/image";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="logo-wrapper">
        
        <Image src="/Images/Logo/logo-with-sun.png" alt="Nepal Travel Co." fill className="loading-logo" />
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-text">Preparing your adventure...</p>
    </div>
  );
};

export default LoadingScreen;
