"use client"

import React, { useState, useEffect } from 'react';
import { ChevronsUp } from 'lucide-react';
import './styles/btt.css';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const visible = window.scrollY > 200;
          setIsVisible((prev) => (prev !== visible ? visible : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`back-to-top-button ${isVisible ? 'visible' : 'hidden'}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ChevronsUp size={24} />
    </button>
  );
};

export default BackToTopButton;
