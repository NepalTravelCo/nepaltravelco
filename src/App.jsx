import React from 'react'
import Connections from './routes-and-links/Connections'
import FooterSection from './footer-components/FooterSection'
import Navigation from './header-component/Navigation'
import LoadingScreen from './LoadingScreen'
import { useState, useEffect } from 'react';
import BackToTopButton from './routes-and-links/BackToTopButton'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (e.g. assets, fonts, or APIs)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust this time or use real loading logic

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  
  return (
    <>
      <Navigation />
      <Connections />
      <FooterSection />
      <BackToTopButton />
      
    </>
  );
}

export default App;