"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import ReachUs from "@/homepage-components/ReachUs"
import './styles/HeroExperience.css'
import BrandInfo from "@/homepage-components/BrandInfo"

export default function HeroExperience() {
  return (
    <>
    
    
    <div className="experience-overlay">
          <div className="experience-section">
            <Image
                src="/Images/Stocks/bungee.jpg" // replace with your image path
                alt="Hero Background"
                fill
                priority
                className="object-contain object-center"
            />
          </div>
    </div>
    <BrandInfo/>
    <ReachUs/>
    </>
  )
  
}
