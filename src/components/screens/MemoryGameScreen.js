"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RefreshCcw, Trophy, Sparkles, BrainCircuit } from "lucide-react"; 
import confetti from "canvas-confetti";
import Image from "next/image"; 

const cardsData = [
  { id: 1, src: "/game/2.gif" },
  { id: 2, src: "/game/7.gif" },
  { id: 3, src: "/game/crc.gif" },
  { id: 4, src: "/game/mara.jpeg" },
  { id: 5, src: "/game/bdx.jpg" },
  { id: 6, src: "/game/atm.jpg" },
];

export default function MemoryGameScreen({ onComplete }) {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // 🔄 SHUFFLE FUNCTION
  const shuffleCards = () => {
    const shuffled = [...cardsData, ...cardsData]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, uniqueId: index }));
    
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
    setIsProcessing(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  // 🖱️ CARD CLICK HANDLER
  const handleCardClick = (card) => {
    if (
      gameWon || 
      isProcessing || 
      flippedCards.includes(card.uniqueId) || 
      matchedCards.includes(card.id)
    ) return;

    const newFlipped = [...flippedCards, card.uniqueId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      setMoves((prev) => prev + 1);

      const firstCard = cards.find(c => c.uniqueId === newFlipped[0]);
      const secondCard = card;

      if (firstCard.id === secondCard.id) {
        // ✅ IT'S A MATCH!
        setMatchedCards((prev) => [...prev, firstCard.id]);
        setFlippedCards([]);
        setIsProcessing(false);

        if (matchedCards.length + 1 === cardsData.length) {
          handleWin();
        }
      } else {
        // ❌ NO MATCH
        setTimeout(() => {
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  // 🎉 MAGICAL RAIN EFFECT
  const handleWin = () => {
    setGameWon(true);
    const duration = 4000; 
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 270, 
        spread: 180, 
        origin: { x: Math.random(), y: -0.1 }, 
        colors: ['#a78bfa', '#ffffff', '#facc15', '#f472b6'], 
        gravity: 1.0,  
        drift: (Math.random() - 0.5), 
        scalar: 1.1 
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  return (
    <div className="h-full w-full bg-transparent flex items-center justify-center relative overflow-hidden">
      
      {/* 🔮 BACKGROUND BLOOM */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-150 h-150 bg-purple-900/20 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* ----------------------------------------------------------- */}
      {/* 🏗️ MAGAZINE GRID LAYOUT */}
      {/* ----------------------------------------------------------- */}
      <div className="w-full h-full max-w-380 mx-auto p-4 z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 h-full items-center gap-2">
            
            {/* 1️⃣ LEFT SECTION: TITLE (Shifted Left & Smaller Width) */}
            <div className="md:col-span-4 flex flex-col justify-center items-start text-left space-y-6 md:pl-6 order-2 md:order-1 mt-10 md:mt-0 relative z-30">
                 <motion.div 
                    initial={{ opacity: 0, x: -50 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 1.5 }}
                 >
                    {/* 👇 GIF */}
                    <motion.div 
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="mb-6 relative w-24 h-24 lg:w-36 lg:h-36"
                    >
                        <Image 
                            src="/game/4.gif" 
                            alt="Cute Decor" 
                            fill
                            className="object-contain drop-shadow-2xl"
                            unoptimized 
                        />
                    </motion.div>

                    {/* 👇 TITLE */}
                    <h1 className="text-5xl lg:text-7xl font-sans font-black text-transparent bg-clip-text bg-linear-to-br from-purple-300 via-pink-200 to-white leading-[0.9] drop-shadow-2xl tracking-tighter">
                       FOR COLLECT <br/> MOMENTS PLAY PUZZLE GAME HERE
                    </h1>
                    
                    <div className="w-24 lg:w-32 h-1.5 bg-purple-500/50 my-6 lg:my-8 rounded-full" />

                    {/* 👇 QUOTE */}
                    <p className="font-mono text-sm lg:text-base text-purple-100 max-w-87.5 opacity-90 leading-relaxed drop-shadow-md bg-black/20 p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
                        &quot;Thank you for treating me like a younger brother. Today is all about celebrating YOU&quot; <br/>
                        <span className="text-xs lg:text-sm opacity-70 mt-3 block font-bold tracking-widest">— BEST BROTHER</span>
                    </p>

                    {/* 👇 MOVES COUNTER */}
                    {!gameWon && (
                        <div className="mt-8 lg:mt-10">
                             <p className="text-purple-300 text-xs lg:text-sm tracking-[0.3em] uppercase opacity-90 font-bold mb-2">
                                Moves Taken
                            </p>
                            <span className="text-5xl lg:text-6xl font-handwriting text-white drop-shadow-lg">{moves}</span>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* 2️⃣ CENTER SECTION: THE GAME GRID */}
            <div className="md:col-span-4 flex flex-col items-center justify-center order-1 md:order-2 z-20">
                
                <div className="md:hidden text-center mb-6">
                    <h1 className="text-4xl font-bold text-white font-handwriting drop-shadow-xl">Match the Vibe</h1>
                </div>

                {/* 🎮 GRID */}
                <div className={`
                    grid grid-cols-3 gap-3 w-full max-w-70 lg:max-w-[320px]
                    transition-all duration-1000 ease-in-out
                    ${gameWon ? "-translate-y-16 scale-95" : "translate-y-0 scale-100"}
                `}>
                    {cards.map((card) => {
                    const isFlipped = flippedCards.includes(card.uniqueId) || matchedCards.includes(card.id);
                    const isMatched = matchedCards.includes(card.id);

                    return (
                        <div 
                        key={card.uniqueId} 
                        className="relative aspect-3/4 perspective-1000 cursor-pointer group"
                        onClick={() => handleCardClick(card)}
                        >
                        <motion.div
                            className="w-full h-full relative preserve-3d transition-all duration-500 shadow-lg rounded-xl"
                            initial={false}
                            animate={{ 
                                rotateY: isFlipped ? 180 : 0,
                                scale: isMatched ? 0.95 : 1, 
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* 🟣 FRONT */}
                            <div 
                            className="absolute inset-0 backface-hidden bg-linear-to-br from-purple-900 to-indigo-950 rounded-xl shadow-inner border border-white/10 flex items-center justify-center group-hover:brightness-110 transition-all"
                            style={{ backfaceVisibility: "hidden" }}
                            >
                            <div className="absolute inset-2 border border-white/20 rounded-lg opacity-50" />
                            <Sparkles className="text-purple-300 opacity-60" size={20} />
                            </div>

                            {/* 🖼️ BACK */}
                            <div 
                            className={`absolute inset-0 backface-hidden bg-black rounded-xl overflow-hidden flex items-center justify-center border-2 ${isMatched ? "border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]" : "border-white/50"}`}
                            style={{ 
                                backfaceVisibility: "hidden", 
                                transform: "rotateY(180deg)" 
                            }}
                            >
                            <div className="relative w-full h-full">
                                <Image 
                                    src={card.src} 
                                    alt="memory" 
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                                {isMatched && (
                                    <motion.div 
                                        initial={{ opacity: 0.5 }} 
                                        animate={{ opacity: 0 }} 
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 bg-yellow-400 z-20 mix-blend-overlay" 
                                    />
                                )}
                            </div>
                            </div>
                        </motion.div>
                        </div>
                    );
                    })}
                </div>
            </div>

            {/* 3️⃣ RIGHT SECTION: SPACER */}
            <div className="hidden md:block md:col-span-4 order-3 pointer-events-none"></div>

        </div>
      </div>

      {/* 🏆 WINNER OVERLAY */}
      <AnimatePresence>
        {gameWon && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute bottom-6 left-0 w-full z-50 flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Glass Card Container */}
            <div className="bg-black/80 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center w-[90%] max-w-sm">
                
                <div className="bg-linear-to-br from-yellow-300 to-yellow-600 text-white p-3 rounded-full mb-3 shadow-[0_0_30px_rgba(250,204,21,0.5)] animate-bounce">
                  <Trophy size={28} fill="currentColor" />
                </div>

                <h2 className="text-3xl md:text-4xl font-handwriting text-white mb-6 drop-shadow-md">
                    You Won, Yeah 👑
                </h2>
                
                {/* REMOVED: Screenshot Text Section */}
                
                <div className="flex gap-3 w-full justify-center">
                    <button 
                        onClick={shuffleCards}
                        className="p-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-105 transition-all"
                    >
                        <RefreshCcw size={20} />
                    </button>

                    {/* 🌟 GLOWING GOLD BUTTON */}
                    <button
                        onClick={onComplete}
                        className="px-6 py-3 bg-linear-to-r from-yellow-500 to-amber-600 text-white rounded-full font-bold shadow-[0_0_20px_rgba(234,179,8,0.6)] hover:shadow-[0_0_35px_rgba(234,179,8,0.8)] hover:scale-105 transition-all flex items-center gap-2 text-sm uppercase tracking-wide animate-pulse"
                    >
                        wanna see more ? come on <ArrowRight size={18} />
                    </button>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}