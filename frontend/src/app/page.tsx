"use client"

import Homepage from '@/homepage-components/Homepage';
import LoadingScreen from './LoadingScreen';
import { useState, useEffect } from 'react';
import Navigation from '@/header-component/Navigation';
import FooterSection from '@/footer-components/FooterSection';

export default function Home() {

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
    <div>
      <Navigation />
      <Homepage />
      <FooterSection />
    </div>
  );
}
