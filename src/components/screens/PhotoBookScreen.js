"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Maximize2, X, Grid, Sparkles, ArrowRight, Stars } from "lucide-react";
import Image from "next/image";

// 📸 REAL PHOTOS MAPPED (Now 22 Photos!)
const photos = [
  { id: 1, src: "/memories/img1.png", caption: "Special 💖" },
  { id: 2, src: "/memories/img2.png", caption: "Gracious 🌸" },
  { id: 3, src: "/memories/img3.jpg", caption: "Elegance 💎" },
  { id: 4, src: "/memories/img4.png", caption: "Caring 🫶" },
  { id: 5, src: "/memories/img6.png", caption: "Kind ❤️" },
  { id: 6, src: "/memories/img7.jpg", caption: "Joyful 🔥" },
  { id: 7, src: "/memories/img8.png", caption: "Genuine ✨" },
  { id: 8, src: "/memories/img9.png", caption: "Supportive 🤝" },
  { id: 9, src: "/memories/img10.jpg", caption: "Best Time ❤️" },
  { id: 10, src: "/memories/img11.jpg", caption: "Unstoppable 🔥" },
  { id: 11, src: "/memories/img2.png", caption: "Guardian 💎" },
  { id: 12, src: "/memories/img6.png", caption: "Well-Wisher 🌟" },
  { id: 13, src: "/memories/cak.gif", caption: "Uživaj u kolaču u Srbiji 🎂" },
  { id: 14, src: "/memories/ser.jpeg", caption: "Srećan rođendan! 🌟" },
  { id: 15, src: "/memories/enj.gif", caption: "🌸" },
  { id: 16, src: "/memories/cake.gif", caption: "🎂" },
];

// 🎞️ REUSABLE: The "Tape"
const WashiTape = ({ className }) => (
  <div 
    className={`absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/60 backdrop-blur-sm shadow-sm -rotate-2 z-20 pointer-events-none ${className}`}
    style={{
        maskImage: "url('https://www.transparenttextures.com/patterns/washi.png')",
        clipPath: "polygon(2% 0, 98% 0, 100% 100%, 0% 100%)",
    }}
  >
    <div className="absolute inset-0 bg-white/20 opacity-50" />
  </div>
);

// 🃏 OPTIMIZED FLIP CARD
const FlipPolaroid = ({ photo, onClick }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (!isFlipped) {
      setIsFlipped(true); 
    } else {
      onClick(photo); 
    }
  };

  return (
    // Added 'will-change-transform' to optimize rendering performance
    <div className="relative w-full aspect-3/4 perspective-1000 cursor-pointer group" onClick={handleClick}>
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-500 will-change-transform"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }} // Smoother spring to reduce jerkiness
        style={{ transformStyle: "preserve-3d" }}
      >
        
        {/* 🙈 FRONT FACE */}
        <div 
            className="absolute inset-0 backface-hidden bg-linear-to-br from-yellow-100 to-purple-100 p-4 shadow-lg border border-white/50 flex flex-col items-center justify-center text-center"
            style={{ backfaceVisibility: "hidden" }}
        >
            <WashiTape />
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply" />
            <Heart className="text-pink-400 mb-2 animate-pulse" fill="#f472b6" size={32} />
            <h3 className="font-handwriting text-2xl md:text-3xl text-gray-700 font-bold z-10 px-2">
                {photo.caption}
            </h3>
            <p className="text-gray-400 text-xs mt-4 uppercase tracking-widest font-bold">Tap to Reveal</p>
        </div>

        {/* 📸 BACK FACE */}
        <div 
            className="absolute inset-0 backface-hidden bg-white p-2 pb-8 shadow-xl border border-gray-200 transform rotate-y-180"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
             <WashiTape />
             <div className="relative w-full h-[85%] bg-gray-100 overflow-hidden shadow-inner">
                <Image 
                    src={photo.src} 
                    alt={photo.caption} 
                    fill 
                    sizes="(max-width: 768px) 50vw, 33vw" // Optimization hint
                    className="object-cover" 
                    unoptimized 
                />
             </div>
             <div className="flex items-end justify-center h-[15%]">
                <p className="text-gray-700 font-handwriting font-bold text-center text-lg leading-tight opacity-90">
                    {photo.caption}
                </p>
             </div>
        </div>

      </motion.div>
    </div>
  );
};

// 🌡️ CUTENESS METER
const CutenessMeter = ({ level }) => (
    <div className="w-full max-w-md mx-auto mb-3 z-30 relative px-4 hidden md:block">
      <div className="flex justify-between items-end mb-2 font-bold tracking-widest uppercase">
         <div className="flex items-center gap-2 text-pink-200/90 text-base md:text-lg shadow-black drop-shadow-md">
           Timeless Memories
         </div>
         <span className="font-mono text-pink-300 text-xl md:text-2xl">{Math.round(level)}%</span>
      </div>
      <div className="relative h-6 rounded-full overflow-hidden border-2 border-white/20 shadow-inner bg-gray-900/60">
         <motion.div
           className="absolute left-0 h-full rounded-full bg-linear-to-r from-pink-500 via-rose-500 to-purple-600 shadow-[0_0_20px_#f472b6]"
           initial={{ width: "5%" }}
           animate={{ width: `${level}%` }}
           transition={{ type: "spring", stiffness: 50, damping: 15 }}
         />
         <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 rounded-t-full pointer-events-none" />
      </div>
    </div>
);

// ✨ AESTHETIC POPUP
const AestheticPopup = ({ onOpenGrid }) => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
      >
        <motion.div 
          initial={{ scale: 0.8, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
          transition={{ type: "spring", duration: 0.8 }}
          className="relative w-full max-w-sm bg-linear-to-br from-gray-900 to-black border border-pink-500/30 p-8 rounded-3xl shadow-[0_0_50px_rgba(236,72,153,0.3)] flex flex-col items-center text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse pointer-events-none"></div>
          <div className="mb-6 relative pointer-events-none">
              <div className="absolute inset-0 bg-pink-500 blur-xl opacity-40 rounded-full animate-pulse"></div>
              <Heart size={48} className="text-pink-400 relative z-10 fill-pink-500/20" />
          </div>
          <h2 className="text-pink-200 font-handwriting text-3xl mb-1 pointer-events-none">Woohoo! 🥳</h2>
          <h1 className="text-white font-black text-2xl uppercase tracking-widest mb-6 pointer-events-none">
             You are Handling this Website ✨
          </h1>
          <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenGrid}
              className="relative z-50 w-full py-4 rounded-xl font-bold uppercase tracking-wider text-white shadow-lg cursor-pointer bg-linear-to-r from-pink-500 to-purple-600 hover:from-red-500 hover:to-rose-600 flex items-center justify-center gap-2"
          >
              To See Memories Click Here <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </motion.div>
    );
};

export default function PhotoBookScreen({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [showGrid, setShowGrid] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [cuteness, setCuteness] = useState(5);

  const nextPhoto = () => {
    // Logic automatically adjusts to photos.length (22)
    if (index < photos.length - 1) {
      setDirection(1);
      setIndex(index + 1);
      // Recalculates step based on 22 photos
      const step = 95 / (photos.length - 1); 
      setCuteness(prev => prev + step); 
    } else {
      setShowPopup(true);
      setCuteness(100);
    }
  };

  const handleOpenGrid = () => {
    setShowPopup(false);
    setShowGrid(true);
  };

  const prevPhoto = () => {
    if (index > 0) {
      setDirection(-1);
      setIndex(index - 1);
      const step = 95 / (photos.length - 1);
      setCuteness(prev => Math.max(5, prev - step));
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-transparent relative overflow-hidden">
      
      <AnimatePresence>
        {showPopup && <AestheticPopup onOpenGrid={handleOpenGrid} />}
      </AnimatePresence>

      {/* 🖼️ MODE 1: GRID VIEW (WITH FLIP CARDS) */}
      {showGrid ? (
        // Wrapper Fragment to separate Scroll Container from Fixed Button
        <>
            {/* 📜 SCROLL CONTAINER */}
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 1 }}
              className="absolute inset-0 z-30 overflow-y-auto bg-black/60 backdrop-blur-xl p-4 md:p-5 flex flex-col items-center animate-fade-in custom-scrollbar"
            >
            
            <div className="text-center mb-4 md:mb-5 mt-2 md:mt-3 z-40">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 bg-linear-to-r from-purple-500/20 to-pink-500/20 px-4 py-1.5 rounded-full border border-pink-500/30 mb-4 shadow-sm">
                        <Stars size={14} className="text-yellow-300" />
                        <span className="text-pink-100 text-xs font-bold uppercase tracking-widest">Treasure </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-handwriting text-white drop-shadow-md mb-2">
                    All Moments
                    </h2>
                </motion.div>
            </div>

            <motion.div 
                initial="hidden" animate="show"
                variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
                }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 w-full max-w-4xl pb-32" // Added pb-32 to clear button
            >
                {photos.map((photo) => (
                <motion.div
                    key={photo.id}
                    variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
                >
                    <FlipPolaroid photo={photo} onClick={setSelectedImage} />
                </motion.div>
                ))}
            </motion.div>

            </motion.div>
            
            {/* 🟢 FIXED BUTTON (NOW OUTSIDE THE SCROLL CONTAINER) */}
            <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
                <button
                    onClick={onComplete}
                    className="pointer-events-auto px-8 py-4 bg-linear-to-r from-blue-500 to-cyan-500 text-white text-xl md:text-2xl rounded-full font-bold shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_40px_rgba(59,130,246,0.8)] hover:scale-105 transition-all flex items-center gap-3 border border-white/20"
                >
                    Something Special Click Here<Heart fill="white" size={24} />
                </button>
            </div>
        </>
      ) : (
        /* 🖼️ MODE 2: SLIDESHOW */
        <div className={`w-full h-full flex flex-col items-center justify-center p-4 z-20 transition-opacity duration-500 ${showPopup ? "opacity-0" : "opacity-100"}`}>
          
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-handwriting text-white mb-2 md:mb-3 drop-shadow-md text-center"
          >
            A Great Sister From Serbia 👑 <Sparkles className="inline-block text-yellow-300" size={32} />
          </motion.h2>

          <CutenessMeter level={cuteness} />

          <div className="relative w-full max-w-md md:max-w-[360px] aspect-3/4 flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                initial={{ x: direction > 0 ? 1000 : -1000, opacity: 0, rotate: direction > 0 ? 10 : -10 }}
                animate={{ zIndex: 1, x: 0, opacity: 1, rotate: index % 2 === 0 ? 2 : -2 }} 
                exit={{ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0, rotate: direction < 0 ? 10 : -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute w-full h-full bg-linear-to-br from-yellow-50 via-white to-purple-50 p-4 pb-16 rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col items-center border border-white/60"
              >
                <WashiTape /> 

                <div 
                  className="relative w-full h-full bg-gray-100 shadow-inner overflow-hidden cursor-zoom-in group border-[0.5px] border-gray-300"
                  onClick={() => setSelectedImage(photos[index])}
                >
                    <Image 
                      src={photos[index].src} 
                      alt="Memory" 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                      unoptimized
                    />
                    <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 size={16} />
                    </div>
                </div>

                <div className="mt-6 text-center w-full">
                    <p className="text-gray-800 font-handwriting text-3xl md:text-3xl drop-shadow-sm font-bold opacity-90">
                      {photos[index].caption}
                    </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-6 mt-3 md:mt-4 z-20">
            <button 
              onClick={prevPhoto}
              disabled={index === 0}
              className={`p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all ${index === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-white/30 hover:scale-110"}`}
            >
              <ChevronLeft size={32} />
            </button>

            <span className="text-white/80 font-mono text-sm tracking-widest">
              {index + 1} / {photos.length}
            </span>

            <button 
              onClick={nextPhoto}
              className="p-4 rounded-full bg-pink-500/80 backdrop-blur-sm text-white shadow-lg border border-pink-400/50 hover:bg-pink-500 hover:scale-110 hover:shadow-pink-500/50 transition-all"
            >
              {index === photos.length - 1 ? <Grid fill="currentColor" size={32} /> : <ChevronRight size={32} />}
            </button>
          </div>
        </div>
      )}

      {/* 🔍 LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-2 md:p-4 cursor-zoom-out"
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 rounded-full p-2 transition-colors z-50">
              <X size={32} />
            </button>

            <motion.div 
              initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
              animate={{ scale: 1, rotate: 1, opacity: 1 }} 
              exit={{ scale: 0.8, rotate: 5, opacity: 0 }}
              className="relative w-full max-w-6xl bg-linear-to-br from-yellow-50 via-white to-purple-50 p-3 pb-20 md:p-5 md:pb-24 rounded-sm shadow-2xl flex flex-col border border-white/50"
              style={{ boxShadow: "0 0 100px rgba(0,0,0,0.7)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <WashiTape className="w-48 h-12 -top-6" />

              <div className="relative w-full h-[65vh] bg-gray-100 overflow-hidden shadow-inner border border-gray-200">
                 <Image 
                    src={selectedImage.src}
                    alt="Full Size Memory"
                    fill
                    className="object-contain" 
                    unoptimized
                 />
              </div>

              <div className="absolute bottom-0 left-0 w-full h-20 md:h-24 flex items-center justify-center">
                 <p className="text-gray-800 font-handwriting text-3xl md:text-5xl font-bold -rotate-1 opacity-90">
                    {selectedImage.caption}
                 </p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}