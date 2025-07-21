import React from 'react';
import './styles/ExploreValley.css';
import SacredTemples from './SacredTemples';
import DurbarSquares from './DurbarSquares';
import Festivals from './Festivals';
import Hikes from './Hikes';


const ExploreValley = () => {
  return (

    <div className="explore-valley-container">
    <SacredTemples />
    <DurbarSquares/>
    <Festivals/>
    <Hikes/>

    </div>
  );
};

export default ExploreValley;