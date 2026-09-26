"use client";

import { useState, useRef } from "react";
import Image from "next/image"; 
import { Volume2, VolumeX } from "lucide-react"; 
import { AnimatePresence, motion } from "framer-motion"; // ✅ Added Framer Motion imports

import IntroScreen from "@/components/screens/IntroScreen";
import HypeScreen from "@/components/screens/HypeScreen";
import CountdownScreen from "@/components/screens/CountdownScreen";
import CakeScreen from "@/components/screens/CakeScreen";
import MemoryGameScreen from "@/components/screens/MemoryGameScreen";
import PhotoBookScreen from "@/components/screens/PhotoBookScreen";
import LetterScreen from "@/components/screens/LetterScreen";
import GravityFlowers from "@/components/GravityFlowers"; 

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('intro');
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null); 

  // Screens that show the Saree Photo
  const wallpaperScreens = ['hype', 'countdown', 'cake', 'game', 'photos'];
  const showWallpaper = wallpaperScreens.includes(currentScreen);

  // Screens that use the solid Red background
  const roseRedScreens = ['intro', 'letter'];
  const isRoseRed = roseRedScreens.includes(currentScreen);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Audio play failed (browser blocked):", error);
      });
      setIsMuted(false);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  return (
    <main 
      className={`h-screen w-full overflow-hidden text-white relative transition-colors duration-1000 ease-in-out
        ${isRoseRed ? "bg-[#be123c]" : "bg-black"} 
      `}
    >
      {/* 🎵 HIDDEN AUDIO PLAYER */}
      <audio ref={audioRef} src="/song.mpeg" loop />

      {/* 🔊 FLOATING MUSIC BUTTON */}
      <button 
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 p-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-white/20 transition-all shadow-lg cursor-pointer"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

    {/* 🖼️ WALLPAPER LAYER */}
<div
  className={`fixed inset-0 z-0 overflow-hidden transition-opacity duration-1000 ${
    showWallpaper ? "opacity-100" : "opacity-0"
  }`}
>
  <Image
    src="/bgg2.png"
    alt="Aleksandra"
    fill
    priority
    sizes="100vw"
    className="object-cover object-center"
  />

  {/* 🌑 DIMMING OVERLAY */}
  <div className="absolute inset-0 bg-black/50" />
</div>

      {/*  PHYSICS FLOWERS */}
      {currentScreen !== 'intro' && <GravityFlowers />}

      {/* 📱 ACTIVE SCREEN CONTENT (With Magical Transitions) */}
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          {/* This motion.div wraps EVERY screen. 
              It handles the "Blur Out / Blur In" magic automatically.
          */}
          <motion.div
            key={currentScreen} // This tells Framer Motion "The screen changed, play animation!"
            initial={{ opacity: 0, filter: "blur(15px)", scale: 0.95 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(15px)", scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full"
          >
            {currentScreen === 'intro' && (
              <IntroScreen onStart={() => { startMusic(); setCurrentScreen('hype'); }} />
            )}
            
            {currentScreen === 'hype' && (
              <HypeScreen onNext={() => setCurrentScreen('countdown')} />
            )}

            {currentScreen === 'countdown' && (
              <CountdownScreen onComplete={() => setCurrentScreen('cake')} />
            )}

            {currentScreen === 'cake' && (
              <CakeScreen onComplete={() => setCurrentScreen('game')} />
            )}

            {currentScreen === 'game' && (
              <MemoryGameScreen onComplete={() => setCurrentScreen('photos')} />
            )}

            {currentScreen === 'photos' && (
              <PhotoBookScreen onComplete={() => setCurrentScreen('letter')} />
            )}

            {currentScreen === 'letter' && (
              <LetterScreen onBack={() => setCurrentScreen('intro')} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}