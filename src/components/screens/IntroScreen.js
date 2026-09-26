"use client";



import { motion } from "framer-motion";

import { useState } from "react";

import { Sparkles } from "lucide-react";

import Image from "next/image"; // ✅ Import Image



export default function IntroScreen({ onStart }) {

  const [isOpening, setIsOpening] = useState(false);



  const handleOpen = () => {

    if (isOpening) return;

    setIsOpening(true);

   

    // Wait for the full animation sequence

    setTimeout(() => {

      onStart();

    }, 2200);

  };



  return (

    <div className="flex flex-col items-center justify-center h-full w-full relative z-50 cursor-pointer group bg-black/40 backdrop-blur-sm" onClick={handleOpen}>

     

      {/* 🆕 THE GIF (9.gif) - Added Above Envelope */}

      <motion.div

        // Animate: Fade in on load, Fade out when opening starts

        initial={{ opacity: 0, y: -20 }}

        animate={isOpening ? { opacity: 0, y: -50 } : { opacity: 1, y: 0 }}

        transition={{ duration: 1 }}

        className="relative w-32 h-32 md:w-40 md:h-40 mb-8 z-50"

      >

        <Image

          src="/game/2.gif"

          alt="Cute Intro GIF"

          fill

          className="object-contain drop-shadow-lg"

          unoptimized // Keeps the GIF moving

        />

      </motion.div>



      {/* ✉️ THE ENVELOPE CONTAINER */}

      <motion.div

        className="relative"

        whileHover={{ scale: isOpening ? 1 : 1.05, rotate: isOpening ? 0 : 1 }}

        whileTap={{ scale: 0.98 }}

      >

       

        {/* ENVELOPE BODY */}

        <div className="relative w-72 h-48 md:w-96 md:h-64 bg-[#e0c097] rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-visible border border-[#ccb08a]">

         

          {/* Paper Texture Overlay */}

          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] rounded-lg mix-blend-multiply" />



          {/* 🔽 THE FLAP (Opens first) */}

          <motion.div

            className="absolute top-0 left-0 w-0 h-0 border-l-144der-r-[144px] border-t-100der-l-transparent border-r-transparent border-t-[#cdaa7d] origin-top md:border-l-192border-r-[192px] md:border-t-1300"

            animate={isOpening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}

            transition={{ duration: 0.8, ease: "easeInOut" }}

            style={{ filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.2))" }}

          >

             {/* Flap Texture */}

             <div className="absolute -top-25t-[144px] w-[288px] h-25url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-20 mix-blend-multiply md:-tmd:-top-32.5left-[192px] md:w-[384px] md:h-32.5" />

          </motion.div>

         

          {/* 🏷️ THE WAX SEAL (With 'S' Monogram) */}

          <motion.div

            className="absolute top-16 left-1/2 transform -translate-x-1/2 z-40 md:top-24"

            animate={isOpening ? { opacity: 0, scale: 1.5, filter: "blur(10px)" } : { opacity: 1, scale: 1 }}

            transition={{ duration: 0.4 }}

          >

            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#be123c] rounded-full shadow-[inset_0px_2px_6px_rgba(0,0,0,0.4),0px_4px_10px_rgba(0,0,0,0.3)] flex items-center justify-center border-2 border-[#9f1239]">

              <span className="font-serif text-[#fecdd3] text-2xl md:text-3xl font-bold opacity-90 drop-shadow-sm">A</span>

            </div>

          </motion.div>



          {/* ✨ MAGIC SPARKLES (Burst on open) */}

          {isOpening && (

             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-10 z-50">

               <motion.div initial={{ scale: 0 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ duration: 1 }}>

                 <Sparkles className="text-yellow-200 w-16 h-16" />

               </motion.div>

             </div>

          )}



          {/* 📄 THE LETTER INSIDE */}

          <motion.div

            className="absolute top-2 left-3 right-3 h-[90%] bg-[#fffbf0] rounded-sm shadow-sm flex flex-col gap-4 p-6 items-center justify-center border border-gray-100"

            initial={{ y: "10%", scale: 0.95, zIndex: 10 }}

            animate={isOpening ? { y: "-120%", scale: 1.05, zIndex: 40, rotate: -2 } : { y: "10%", scale: 0.95, zIndex: 10 }}

            transition={{ delay: 0.6, duration: 1.5, type: "spring", stiffness: 50 }}

          >

              <div className="w-full h-px bg-gray-200" /> {/* Fold line */}

              {/* Handwriting lines */}

              <div className="w-3/4 h-1.5 bg-gray-300 rounded-full self-start" />

              <div className="w-full h-1.5 bg-gray-300 rounded-full" />

              <div className="w-5/6 h-1.5 bg-gray-300 rounded-full self-start" />

              <div className="w-1/2 h-1.5 bg-gray-300 rounded-full self-end mt-4" />

          </motion.div>

         

          {/* 📐 BOTTOM POCKET */}

          <div className="absolute bottom-0 left-0 w-0 h-0 border-l-144 border-r-144 border-b-96 border-l-transparent border-r-transparent border-b-[#dcb78e] z-20 md:border-l-192 md:border-r-192 md:border-b-128 pointer-events-none filter drop-shadow-md"></div>

          {/* SIDE FOLDS */}

          <div className="absolute bottom-0 left-0 w-0 h-0 border-l-70 border-b-192 border-r-70 border-l-[#d4af86] border-b-transparent border-r-transparent z-20 md:border-l-96 md:border-b-256"></div>

          <div className="absolute bottom-0 right-0 w-0 h-0 border-r-70 border-b-192 border-l-70 border-r-[#d4af86] border-b-transparent border-l-transparent z-20 md:border-r-96 md:border-b-256"></div>



        </div>



        {/* 👇 INSTRUCTION TEXT */}

        <motion.p

          className="mt-16 text-white/90 font-handwriting text-2xl md:text-3xl text-center drop-shadow-lg tracking-wide"

          animate={{ opacity: isOpening ? 0 : [0.6, 1, 0.6], y: [0, 5, 0] }}

          transition={{ duration: 2, repeat: Infinity }}

        >

          {isOpening ? "" : "Tap to Open the Magic Website"}

        </motion.p>



      </motion.div>

    </div>

  );

}