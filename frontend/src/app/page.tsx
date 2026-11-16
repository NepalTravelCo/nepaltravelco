"use client"

import Homepage from '@/homepage-components/Homepage';
import Navigation from '@/header-component/Navigation';
import FooterSection from '@/footer-components/FooterSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Homepage />
      <FooterSection />
    </main>
  );
}
