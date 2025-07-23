"use client"
import './styles/ExploreValley.css';
import SacredTemples from '@/inner-components/SacredTemples';
import DurbarSquares from '@/inner-components/DurbarSquares';
import Festivals from '@/inner-components/Festivals';
import Hikes from '@/inner-components/Hikes';
import BrandInfo from '@/homepage-components/BrandInfo'
import ReachUs from '@/homepage-components/ReachUs'



const ExploreValley = () => {
  return (
    <>
    
    
    <div className="explore-valley-container">
        <SacredTemples />
        <DurbarSquares/>
        <Festivals/>
        <Hikes/>
    </div>
    <ReachUs />
    </>
  );
};

export default ExploreValley;