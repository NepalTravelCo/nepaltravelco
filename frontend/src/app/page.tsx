"use client"

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Homepage from '@/homepage-components/Homepage';
import Navigation from '@/header-component/Navigation';
import FooterSection from '@/footer-components/FooterSection';
import LoadingOverlay from '@/components/ui/LoadingOverlay';

export default function Home() {
  const [isAllLoaded, setIsAllLoaded] = useState(false);

  return (
    <main>
      <AnimatePresence>
        {!isAllLoaded && <LoadingOverlay key="global-loader" />}
      </AnimatePresence>

      <div className={isAllLoaded ? "opacity-100 transition-opacity duration-1000" : "opacity-0 h-screen overflow-hidden"}>
        <Navigation />
        <Homepage onAllLoaded={() => setIsAllLoaded(true)} />
        <FooterSection />
      </div>
    </main>
  );
}
