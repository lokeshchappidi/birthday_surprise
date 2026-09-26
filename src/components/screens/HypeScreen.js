"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image"; 

export default function HypeScreen({ onNext }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-transparent z-50 p-6 text-center relative overflow-hidden">
      
      {/* 🎨 Abstract Vante-style Content */}
      <motion.div 
        className="flex flex-col items-center z-10"
        initial="hidden"
        animate="visible"
      >
        
        {/* 1. TOP LINE */}
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 60, opacity: 1 }} 
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-[1.5px] bg-linear-to-b from-transparent via-stone-200 to-transparent mb-6"
        />

        {/* 2. THE GIF */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative w-36 h-36 mb-8 rounded-xl overflow-hidden border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.15)]"
        >
          <Image 
            src="/game/11.gif" 
            alt="Magic GIF"
            fill
            className="object-cover"
            unoptimized 
          />
        </motion.div>
        
        {/* 3. TEXT */}
        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0, y: 10 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <h2 className="text-stone-100 text-4xl md:text-6xl font-serif italic leading-snug drop-shadow-xl tracking-wide">
            Something beautiful <br/> 
            <span className="text-2xl md:text-4xl text-stone-200 font-normal block mt-3">
              is waiting for you...
            </span>
          </h2>
        </motion.div>
        
        {/* 4. BOTTOM LINE */}
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 60, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          className="w-[1.5px] bg-linear-to-b from-transparent via-stone-200 to-transparent mt-8 mb-12"
        />

        {/* 5. BUTTON (💜 PURPLE MAGIC INTERACTION ADDED) */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          whileHover={{ scale: 1.05, letterSpacing: "0.3em" }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="
  group relative px-10 py-4 overflow-hidden rounded-full
  bg-purple-600/80 backdrop-blur-md
  border border-purple-400/70 text-white
  shadow-[0_0_25px_rgba(168,85,247,0.45)]
  transition-all duration-500

  hover:bg-purple-600
  hover:border-purple-300
  hover:shadow-[0_0_40px_rgba(168,85,247,0.8)]
  active:bg-purple-700
  active:border-purple-300
"
        >
          {/* Shimmer Effect (Reflecting light) */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          
          <span className="relative z-10 font-medium tracking-[0.25em] uppercase text-sm md:text-base flex items-center gap-3 drop-shadow-md">
            <Sparkles size={16} className="text-purple-200 group-hover:text-white animate-pulse" />
            Click Here to Enter the Magic
            <Sparkles size={16} className="text-purple-200 group-hover:text-white animate-pulse" />
          </span>
        </motion.button>

        {/* 6. FOOTER TEXT */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1.5 }}
          className="mt-16 text-stone-200 font-serif italic text-sm md:text-base tracking-widest drop-shadow-md"
        >
          "This website has one job — celebrating YOU." 🎂
        </motion.p>

      </motion.div>
    </div>
  );
}