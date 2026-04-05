"use client"

import { motion } from "framer-motion"
import { Compass } from "lucide-react"

export default function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FDFBF7]"
    >
      {/* Decorative Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      {/* Central Animation */}
      <div className="relative">
        {/* Glowing Background */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-secondary/20 rounded-full blur-3xl -z-10"
        />

        <div className="flex flex-col items-center">
            {/* Animated Compass Icon */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "linear" 
                }}
                className="text-secondary mb-8"
            >
                <Compass size={64} strokeWidth={1} />
            </motion.div>

            {/* Premium Typography */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
            >
                <h2 className="font-[var(--heading-font)] text-primary text-xl font-bold tracking-[0.4em] uppercase mb-2">
                    Nepal Travel Co.
                </h2>
                <div className="flex items-center justify-center gap-2">
                    <span className="w-8 h-px bg-stone-200" />
                    <span className="text-secondary text-[10px] uppercase tracking-[0.2em] font-semibold">
                        Curating Your Journey
                    </span>
                    <span className="w-8 h-px bg-stone-200" />
                </div>
            </motion.div>
        </div>
      </div>

      {/* Progress Line */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-px bg-stone-100 overflow-hidden">
        <motion.div
            animate={{ 
                x: ["-100%", "100%"]
            }}
            transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
            }}
            className="w-full h-full bg-secondary"
        />
      </div>
    </motion.div>
  )
}
