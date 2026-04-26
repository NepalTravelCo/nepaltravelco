import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mountain, Plane, Footprints, Landmark, Sparkles, Compass, Map, Wind, Milestone, Utensils } from "lucide-react"
import Image from "next/image"
import { apiClient } from "@/lib/api-client"

interface TravelImage {
  src: string
  title: string
  description: string
  meta?: string
  coords?: string
}

interface Category {
  id: number
  name: string
  icon: JSX.Element
  images: TravelImage[]
}

const IconMap: Record<string, any> = {
  Mountain: <Mountain size={14} />,
  Map: <Map size={14} />,
  Compass: <Compass size={14} />,
  Wind: <Wind size={14} />,
  Milestone: <Milestone size={14} />,
  Utensils: <Utensils size={14} />,
  Trekking: <Footprints size={14} />,
  Adrenaline: <Sparkles size={14} />,
  Spiritual: <Landmark size={14} />,
  Luxury: <Plane size={14} />,
  Culture: <Landmark size={14} />
};

export default function TravelTypes({ onLoaded }: { onLoaded?: () => void }) {
  const [activeCategory, setActiveCategory] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
        try {
            const data = await apiClient<any[]>("/api/activities");
            
            if (!Array.isArray(data)) {
                console.error("Activities data is not an array:", data);
                return;
            }
                
            // Group activities by categoryId
            const grouped: Category[] = [
                { id: 0, name: "Trekking", icon: IconMap.Trekking, images: [] },
                { id: 1, name: "Adrenaline", icon: IconMap.Adrenaline, images: [] },
                { id: 2, name: "Spiritual", icon: IconMap.Spiritual, images: [] },
                { id: 3, name: "Luxury", icon: IconMap.Luxury, images: [] },
                { id: 4, name: "Culture", icon: IconMap.Culture, images: [] }
            ];

            data.forEach((activity: any) => {
                const catIndex = activity.categoryId ?? 0;
                if (grouped[catIndex]) {
                    grouped[catIndex].images.push({
                        src: activity.image,
                        title: activity.name,
                        description: activity.description,
                        meta: activity.tag,
                        coords: activity.highlights[0] || "Nepal"
                    });
                }
            });

            // Fallback for empty categories if any
            setCategories(grouped.filter(c => c.images.length > 0));
        } catch (error) {
            console.error("Error fetching homepage activities:", error);
        } finally {
            setLoading(false);
            if (onLoaded) onLoaded();
        }
    };
    fetchActivities();
  }, []);

  if (loading || categories.length === 0) return null;

  const currentCategory = categories[activeCategory]
  const currentImages = currentCategory.images

  return (
    <section className="bg-stone-50 py-24 md:py-32 overflow-hidden">
      <div className="container-max">
        
        {/* Minimalist Header & Navigation */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16 border-b border-stone-200 pb-8">
          <div className="max-w-xl">
            <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px] mb-3 block">Experiences</span>
            <h2 className="font-[var(--heading-font)] text-primary text-4xl md:text-5xl font-bold tracking-tight">
              Things to <span className="italic font-normal">do.</span>
            </h2>
          </div>

          <nav className="flex items-center gap-6 md:gap-10">
            {categories.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(idx)
                  setCurrentImageIndex(0)
                }}
                className="relative group py-2"
              >
                <div className="flex items-center gap-2">
                  <span className={`transition-transform duration-500 ${activeCategory === idx ? "scale-110 text-secondary" : "text-stone-300 group-hover:text-stone-400"}`}>
                    {cat.icon}
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                    activeCategory === idx ? "text-primary" : "text-stone-400 group-hover:text-primary"
                  }`}>
                    {cat.name}
                  </span>
                </div>
                {activeCategory === idx && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-8 left-0 right-0 h-0.5 bg-secondary"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Blended Collage Display */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Main Stage (7-8 cols) */}
            <div className="md:col-span-8 relative">
              <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-[3rem] md:rounded-[4rem] overflow-hidden bg-stone-200 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] group/main">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCategory}-${currentImageIndex}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentImages[currentImageIndex].src}
                      alt={currentImages[currentImageIndex].title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover/main:scale-110"
                      priority
                    />
                    
                    {/* Subtle Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                    
                    {/* Floating Content */}
                    <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-end pointer-events-none">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                           <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                           <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.4em]">{currentImages[currentImageIndex].meta}</span>
                        </div>
                        <h3 className="text-white font-[var(--heading-font)] text-4xl md:text-6xl font-bold mb-4 tracking-tighter leading-tight drop-shadow-sm">
                          {currentImages[currentImageIndex].title}
                        </h3>
                        <p className="text-white/80 text-sm md:text-base font-light leading-relaxed max-w-md">
                          {currentImages[currentImageIndex].description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Coordinates - Top Right */}
                    <div className="absolute top-10 right-10 flex flex-col items-end pointer-events-none opacity-40">
                       <span className="text-white text-[9px] font-bold uppercase tracking-[0.2em]">{currentImages[currentImageIndex].coords}</span>
                       <div className="w-12 h-px bg-white/30 mt-2" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Collage Accents (4-5 cols) */}
            <div className="md:col-span-4 flex flex-col gap-8 md:gap-12 relative">
               {/* Decorative Background Element */}
               <div className="absolute -inset-10 bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

               {currentImages.map((img, i) => (
                 i !== currentImageIndex && (
                   <motion.button
                     key={i}
                     layoutId={`collage-${i}`}
                     onClick={() => setCurrentImageIndex(i)}
                     className={`group relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 ${
                       i % 2 === 0 ? "self-start w-3/4 md:w-[70%] aspect-square translate-x-4" : "self-end w-3/4 md:w-[70%] aspect-square -translate-x-4"
                     }`}
                     style={{ zIndex: 10 + i }}
                   >
                      <Image
                        src={img.src}
                        alt={img.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-500" />
                      
                      {/* Very Minimal Label on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                         <div className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center">
                            <Compass size={16} className="text-secondary" />
                         </div>
                      </div>

                      {/* Small Caption */}
                      <div className="absolute bottom-6 left-8 right-8">
                        <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">{img.title}</span>
                      </div>
                   </motion.button>
                 )
               ))}
            </div>

          </div>

          {/* Simple Page Indicator */}
          <div className="hidden md:flex justify-start mt-16 gap-4">
             {currentImages.map((_, i) => (
               <button 
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className={`transition-all duration-500 ${currentImageIndex === i ? "w-16 h-1 bg-secondary" : "w-8 h-1 bg-stone-200 hover:bg-stone-300"}`}
               />
             ))}
          </div>
        </div>
      </div>
    </section>
  )
}
