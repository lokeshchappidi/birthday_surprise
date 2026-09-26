"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// ✅ IMPORT CROWN ICON
import { Crown } from "lucide-react";

export default function CountdownScreen({ onComplete }) {
  const [count, setCount] = useState(3);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // 3 Seconds per number
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setShowText(true);
          // Wait 4 seconds for reading the final text
          setTimeout(onComplete, 4000); 
          return 0;
        }
        return prev - 1;
      });
    }, 3000); 
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="flex items-center justify-center h-full w-full bg-transparent z-40 relative overflow-hidden font-serif">
      
      {/* 🪐 VANTE BACKGROUND ART */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute w-125 h-125 md:w-175 md:h-175 border border-white/10 rounded-full opacity-50"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-75 h-75 md:w-112.5 md:h-112.5 border border-white/5 rounded-full opacity-30 border-dashed"
        />
      </div>

      <AnimatePresence mode="wait">
        {!showText ? (
          <motion.div
            key={count}
            initial={{ scale: 1.2, opacity: 0, filter: "blur(15px)" }} 
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}    
            exit={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}    
            transition={{ duration: 1.5, ease: "easeInOut" }}          
            className="flex flex-col items-center justify-center z-10"
          >
            {/* The Number */}
            <span className="text-white text-[12rem] md:text-[16rem] font-thin italic leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              {count}
            </span>
            
            {/* 🟣 Subtitle: PURPLE & MEDIUM SIZE */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }} 
              className="uppercase tracking-[0.8em] text-purple-300 text-base md:text-lg mt-6 ml-4 font-light drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            >
              Preparing Magic...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: "easeOut" }} 
            className="text-center px-4 z-10 relative"
          >
            {/* The Grand Title */}
            <h1 className="text-white text-5xl md:text-8xl font-serif italic mb-6 drop-shadow-2xl tracking-wide leading-tight relative">
              Happy Birthday <br/> to
              
              {/* 👑 THE CROWNED NAME CONTAINER */}
              <span className="relative inline-block ml-3">
                  {/* The Floating Crown Icon */}
                  <motion.div
                    animate={{ y: [0, -5, 0], rotate: [-10, -10, -10] }} // Slight float & tilt
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -left-4 text-purple-300 drop-shadow-[0_0_12px_rgba(192,132,252,0.8)]"
                  >
                      <Crown size={36} strokeWidth={1.5} />
                  </motion.div>
                  
                  {/* The Name */}
                  <span className="text-purple-400 drop-shadow-[0_0_15px_rgba(192,132,252,0.6)]">ALEKSANDRA</span>
              </span>
            </h1>
            
            {/* Expanding Line */}
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 100 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-px bg-white/50 mx-auto mb-6" 
            />
            
            <p className="text-stone-200 text-sm md:text-lg font-light tracking-[0.5em] uppercase opacity-80">
              The Magic for You is Ready
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🟣 BTS ACCENT */}
      <div className="absolute bottom-10 right-10 flex items-center gap-3 opacity-60">
        <div className="relative">
             <div className="w-2 h-2 rounded-full bg-purple-400 absolute inset-0 animate-ping" />
             <div className="w-2 h-2 rounded-full bg-purple-500 relative shadow-[0_0_10px_#c084fc]" />
        </div>
        <span className="text-[10px] text-stone-400 uppercase tracking-widest font-light">Borahae</span>
      </div>

    </div>
  );
}