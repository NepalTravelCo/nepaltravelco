"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { 
  motion, 
  AnimatePresence 
} from "framer-motion";
import { X, Search, MapPin, Compass, Mountain, ArrowRight, Star, History } from "lucide-react";
import Link from "next/link";

interface FullScreenSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const FullScreenSearch = ({ isOpen, onClose }: FullScreenSearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const searchableItems = useMemo(() => [
    { name: "Everest Base Camp Trek", type: "Trek", href: "/treks/everest-base-camp", icon: <Mountain size={14} /> },
    { name: "Annapurna Circuit", type: "Trek", href: "/treks/annapurna-circuit", icon: <Mountain size={14} /> },
    { name: "Langtang Valley Trek", type: "Trek", href: "/treks/langtang-valley", icon: <Mountain size={14} /> },
    { name: "Upper Mustang Bike Trip", type: "Adventure", href: "/things-to-do/mustang-bike", icon: <Mountain size={14} /> },
    { name: "Pokhara City Tour", type: "Place", href: "/places-to-go/pokhara", icon: <MapPin size={14} /> },
    { name: "Chitwan Jungle Safari", type: "Adventure", href: "/things-to-do/chitwan-safari", icon: <Compass size={14} /> },
    { name: "Kathmandu Heritage Site", type: "Place", href: "/places-to-go/kathmandu", icon: <Star size={14} /> },
    { name: "Paragliding in Pokhara", type: "Activity", href: "/things-to-do/paragliding", icon: <Compass size={14} /> },
  ], []);

  const popularSearches = ["Everest", "Annapurna", "Pokhara", "Safari", "Mustang"];

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchableItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, searchableItems]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
      setSearchQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[200] bg-[#faf9f6] flex flex-col"
        >
          {/* Header */}
          <div className="container-max flex items-center justify-between py-8 md:py-10 flex-shrink-0 relative z-20">
            <Link href="/" onClick={onClose} className="text-primary font-black tracking-[0.3em] uppercase text-xs">
              Nepal Travel Co.
            </Link>
            <button
              onClick={onClose}
              className="group flex items-center gap-3 text-stone-400 hover:text-primary transition-colors"
            >
              <span className="text-[10px] uppercase font-black tracking-widest hidden sm:block">Close Search</span>
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-stone-200 group-hover:border-primary transition-all">
                <X size={20} />
              </div>
            </button>
          </div>

          {/* Minimalist Search Area */}
          <div className="flex-1 flex flex-col pt-12 md:pt-24 px-6 relative z-10 overflow-hidden">
            <div className="w-full max-w-4xl mx-auto">
              {/* Search Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-4xl md:text-6xl font-black text-primary font-[var(--heading-font)] tracking-tighter leading-none mb-4">
                  Find Your <span className="italic font-light text-secondary">Adventure</span>
                </h2>
              </motion.div>

              {/* Functional Search Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="relative mb-12"
              >
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-300">
                  <Search size={32} strokeWidth={1.5} />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Destinations, treks or activities..."
                  className="w-full bg-transparent border-b border-stone-200 focus:border-primary py-8 pl-14 text-2xl md:text-4xl font-light text-primary outline-none transition-all placeholder:text-stone-200"
                />
              </motion.div>

              {/* Single Line Popular Searches */}
              <AnimatePresence mode="wait">
                {!searchQuery ? (
                  <motion.div
                    key="popular"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-stone-400"
                  >
                    <span className="flex items-center gap-2">
                       <History size={14} className="text-secondary" /> Popular:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => setSearchQuery(term)}
                          className="px-4 py-2 border border-stone-100 rounded-full bg-white hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-2 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-6">
                      Results for &ldquo;{searchQuery}&rdquo;
                    </p>
                    {filteredResults.length > 0 ? (
                      filteredResults.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={onClose}
                          className="group flex items-center justify-between p-6 rounded-2xl bg-white border border-stone-100 hover:border-primary hover:shadow-xl transition-all duration-300"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-stone-50 text-stone-300 group-hover:bg-primary/5 group-hover:text-primary flex items-center justify-center transition-colors">
                              {item.icon}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-primary font-bold transition-colors">{item.name}</span>
                              <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">{item.type}</span>
                            </div>
                          </div>
                          <ArrowRight size={16} className="text-stone-200 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))
                    ) : (
                      <div className="p-12 text-center text-stone-400">
                        <p className="text-lg font-light">No matches found for your exploration.</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Minimal Bottom Section */}
          <div className="py-10 flex-shrink-0 relative z-20">
            <div className="container-max flex items-center justify-between text-[10px] uppercase font-bold tracking-[0.3em] text-stone-300">
              <span className="hidden sm:block">EST. 2024</span>
              <div className="flex gap-8 mx-auto sm:mx-0">
                <span className="cursor-pointer hover:text-primary transition-colors">Instagram</span>
                <span className="cursor-pointer hover:text-primary transition-colors">Facebook</span>
              </div>
            </div>
          </div>

          <style jsx global>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #e5e7eb;
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #d1d5db;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenSearch;
