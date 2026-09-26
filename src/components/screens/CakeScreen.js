"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Wind, Sparkles, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

// --- 💡 HELPERS ---
const random = (min, max) => Math.random() * (max - min) + min;

// --- 🎀 BOW SVG COMPONENT ---
const PinkBowSVG = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 200 200"
    className="drop-shadow-md opacity-90"
  >
    <path
      d="M100 100 C70 60 20 60 20 100 C20 140 70 140 100 100 Z"
      fill="#fbcfe8"
    />
    <path
      d="M100 100 C130 60 180 60 180 100 C180 140 130 140 100 100 Z"
      fill="#fbcfe8"
    />
    <circle cx="100" cy="100" r="15" fill="#f472b6" />
    <path d="M100 110 L60 180 L80 180 L100 120 Z" fill="#fbcfe8" />
    <path d="M100 110 L140 180 L120 180 L100 120 Z" fill="#fbcfe8" />
  </svg>
);

// --- 🌿 SIDE VINES ---
const SideVines = ({ side }) => {
  const vines = Array.from({ length: 3 }).map((_, i) => ({
    id: i,
    height: random(30, 60),
    xOffset: random(10, 40),
    bulbs: Array.from({ length: 5 }).map((__, j) => ({
      bid: j,
      y: random(10, 90),
      color: Math.random() > 0.5 ? "#fef08a" : "#fecaca",
      blinkDelay: random(0, 5),
    })),
  }));

  return (
    <div
      className={`absolute top-0 ${
        side === "left" ? "left-0" : "right-0"
      } h-full w-32 pointer-events-none z-30 opacity-70`}
    >
      {vines.map((vine, i) => (
        <motion.div
          key={vine.id}
          initial={{ height: 0 }}
          animate={{ height: `${vine.height}%` }}
          transition={{ duration: 2, delay: i * 0.3 }}
          className={`absolute top-0 w-px bg-white/30 shadow-sm ${
            side === "left" ? "left-0" : "right-0"
          }`}
          style={{
            left: side === "left" ? `${vine.xOffset}px` : "auto",
            right: side === "right" ? `${vine.xOffset}px` : "auto",
          }}
        >
          {vine.bulbs.map((b) => (
            <motion.div
              key={b.bid}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: b.blinkDelay,
              }}
              className="absolute w-2 h-2 rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.4)]"
              style={{
                top: `${b.y}%`,
                left: "-3px",
                backgroundColor: b.color,
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
};

// --- ✨ SPARKLE ---
const Sparkle = ({ style, delay, size }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.5],
      rotate: [0, 180],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    }}
    className="absolute text-yellow-200 pointer-events-none z-20"
    style={style}
  >
    <Sparkles size={size} />
  </motion.div>
);

// --- 🎈 BALLOON ---
const Balloon = ({
  id,
  color,
  x,
  speed,
  delay,
  isFlyingAway,
}) => (
  <motion.div
    animate={
      isFlyingAway
        ? {
            y: -1000,
            opacity: 0,
            transition: {
              duration: 1.5,
              ease: "easeIn",
            },
          }
        : {
            y: "-10vh",
            opacity: 1,
          }
    }
    initial={{
      y: "110vh",
      x: `${x}vw`,
      opacity: 0,
    }}
    transition={
      !isFlyingAway
        ? {
            duration: speed,
            delay: delay,
            repeat: Infinity,
            ease: "linear",
          }
        : {}
    }
    className="absolute z-50 pointer-events-auto opacity-80"
    style={{ left: 0 }}
  >
    <svg
      width="60"
      height="70"
      viewBox="0 0 50 60"
      className="drop-shadow-md"
    >
      <path
        fill={color}
        d="M25,0 C11.193,0 0,11.193 0,25 C0,38.807 11.193,50 25,50 C38.807,50 50,38.807 50,25 C50,11.193 38.807,0 25,0 Z"
      />
      <path
        fill={color}
        d="M25,50 L22,58 L28,58 Z"
      />
      <path
        fill="none"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="2"
        d="M25,50 Q25,65 30,70"
      />
      <ellipse
        cx="15"
        cy="15"
        rx="6"
        ry="10"
        fill="rgba(255,255,255,0.4)"
        transform="rotate(-45 15 15)"
      />
    </svg>
  </motion.div>
);

// --- 🎂 MEMOIZED CAKE ---
const MemoizedCakeSVG = memo(() => (
  <div
    className="w-full h-full drop-shadow-2xl"
    dangerouslySetInnerHTML={{
      __html: CAKE_SVG_CODE,
    }}
  />
));

MemoizedCakeSVG.displayName = "MemoizedCakeSVG";

export default function CakeScreen({ onComplete }) {
  const [isLit, setIsLit] = useState(false);
  const [isWishing, setIsWishing] = useState(false);
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [audioAllowed, setAudioAllowed] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isListeningReady, setIsListeningReady] = useState(false);

  const [showCake, setShowCake] = useState(false);
  const [showCandle, setShowCandle] = useState(false);
  const [showDecor, setShowDecor] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const [balloons, setBalloons] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const rafIdRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  const isListeningReadyRef = useRef(false);
  const blowConfidenceRef = useRef(0);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // 🎬 SETUP
  useEffect(() => {
    const timer = setTimeout(() => {
      const colors = [
        "#be123c",
        "#f472b6",
        "#fbbf24",
        "#fdfaf1",
      ];

      setBalloons(
        Array.from({ length: 15 }).map((_, i) => ({
          id: i,
          color: colors[Math.floor(Math.random() * colors.length)],
          x: Math.random() * 90,
          speed: Math.random() * 5 + 12,
          delay: Math.random() * 10,
        }))
      );

      setSparkles(
        Array.from({ length: 8 }).map((_, i) => ({
          id: i,
          top: Math.random() * 60 + 20,
          left: Math.random() * 80 + 10,
          delay: Math.random() * 2,
          size: Math.random() * 15 + 10,
        }))
      );

      setShowDecor(true);

      setTimeout(() => setShowCake(true), 800);
      setTimeout(() => setShowCandle(true), 2000);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 🎤 MIC LOGIC
  const stopListening = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    if (audioContextRef.current?.state !== "closed") {
      audioContextRef.current?.close();
    }

    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }
  }, []);

  const handleBlowOut = useCallback(() => {
    if (isBlownOut) return;

    setIsBlownOut(true);
    setIsWishing(false);
    stopListening();

    const duration = 4000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 12,
        angle: 60,
        spread: 80,
        origin: {
          x: 0.2,
          y: 0.6,
        },
        colors: ["#FFD700", "#be123c", "#ffffff"],
      });

      confetti({
        particleCount: 12,
        angle: 120,
        spread: 80,
        origin: {
          x: 0.8,
          y: 0.6,
        },
        colors: ["#FFD700", "#be123c", "#ffffff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Keep the original 4-second dramatic delay
    setTimeout(() => setShowNextButton(true), 4000);
  }, [isBlownOut, stopListening]);

  const detectBlowRef = useRef();

  detectBlowRef.current = () => {
    if (isBlownOut || !analyserRef.current) return;

    analyserRef.current.getByteFrequencyData(
      dataArrayRef.current
    );

    const average =
      dataArrayRef.current.reduce((a, b) => a + b, 0) /
      dataArrayRef.current.length;

    setVolume(average);

    if (
      average > 50 &&
      isListeningReadyRef.current
    ) {
      blowConfidenceRef.current += 1;
    } else {
      blowConfidenceRef.current = Math.max(
        0,
        blowConfidenceRef.current - 1
      );
    }

    if (blowConfidenceRef.current > 5) {
      handleBlowOut();
    } else {
      rafIdRef.current = requestAnimationFrame(
        detectBlowRef.current
      );
    }
  };

  const startListening = useCallback(async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      setAudioAllowed(true);

      audioContextRef.current =
        new (window.AudioContext ||
          window.webkitAudioContext)();

      analyserRef.current =
        audioContextRef.current.createAnalyser();

      sourceRef.current =
        audioContextRef.current.createMediaStreamSource(
          stream
        );

      sourceRef.current.connect(
        analyserRef.current
      );

      analyserRef.current.fftSize = 256;

      dataArrayRef.current =
        new Uint8Array(
          analyserRef.current.frequencyBinCount
        );

      setTimeout(() => {
        isListeningReadyRef.current = true;
        setIsListeningReady(true);
      }, 2000);

      detectBlowRef.current();
    } catch (err) {
      setAudioAllowed(false);
    }
  }, []);

  const handleLightCandle = (e) => {
    e.stopPropagation();

    if (
      !isLit &&
      showCandle &&
      !isBlownOut
    ) {
      setIsLit(true);

      setTimeout(
        () => setIsWishing(true),
        1000
      );
    }
  };

  useEffect(() => {
    if (isWishing && !isBlownOut) {
      startListening();
    }

    return () => stopListening();
  }, [
    isWishing,
    isBlownOut,
    startListening,
    stopListening,
  ]);

  return (
    <div className="h-screen w-full relative overflow-hidden transition-colors duration-1000">

      {/* 🌑 SPOTLIGHT & ATMOSPHERE */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background:
              "radial-gradient(circle at 75% 40%, transparent 10%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.9) 90%)",
          }}
        />

        <div
          className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
          style={{
            background: isLit
              ? "radial-gradient(circle at center, rgba(255, 200, 0, 0.15) 0%, transparent 70%)"
              : "transparent",
            opacity: isLit ? 1 : 0,
          }}
        />
      </div>

      {/* ✨ EFFECTS */}
      <AnimatePresence>
        {isLit && !isBlownOut && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            {sparkles.map((s) => (
              <Sparkle
                key={s.id}
                {...s}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-50 pointer-events-none">
        {balloons.map((b) => (
          <Balloon
            key={b.id}
            {...b}
            isFlyingAway={isBlownOut}
          />
        ))}
      </div>

      {/* 🌿 DECORATIONS */}
      {showDecor && (
        <div className="absolute inset-0 z-40 pointer-events-none animate-fade-in-down">
          <SideVines side="left" />
          <SideVines side="right" />
        </div>
      )}

      {/* ----------------------------------------------------------- */}
      {/* 🏗️ RESPONSIVE MAGAZINE GRID LAYOUT */}
      {/* ----------------------------------------------------------- */}

      <div className="absolute inset-0 z-40 w-full h-full flex items-center justify-center p-3 md:p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 w-full h-full max-w-7xl mx-auto">

          {/* 1️⃣ LEFT SECTION: BIG TITLE & BOW */}
          <div className="hidden md:flex md:col-span-4 flex-col justify-center items-start text-left pl-6 md:pl-0 space-y-8">

            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 1.5,
              }}
            >
              <h1 className="text-6xl md:text-8xl font-sans font-black text-[#be123c] leading-[0.9] drop-shadow-lg tracking-tighter">
                MAKE
                <br />
                A WISH
              </h1>

              <div className="w-48 h-48 md:w-64 md:h-64 my-6 ml-2">
                <PinkBowSVG />
              </div>

              <p className="font-mono text-sm md:text-base text-[#fdfaf1] max-w-87.5 opacity-90 leading-relaxed drop-shadow-md"></p>
            </motion.div>
          </div>

          {/* 2️⃣ CENTER SECTION */}
          <div className="md:col-span-4 col-span-1 h-full w-full flex flex-col justify-center items-center relative">

            {/* INSTRUCTIONS */}
            <div className="absolute top-[10%] md:top-[15%] w-full flex justify-center z-50">
              <AnimatePresence mode="wait">

                {!isWishing &&
                  !isBlownOut &&
                  showCandle && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="bg-black/30 px-4 md:px-6 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg"
                    >
                      <p className="text-[#fdfaf1] text-lg sm:text-xl md:text-2xl tracking-[0.15em] uppercase font-bold drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)]">
  Tap the candle Just above the Cake
</p>
                    </motion.div>
                  )}

                {isWishing &&
                  !isBlownOut && (
                    <motion.div
                      initial={{
                        scale: 0.9,
                        opacity: 0,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="flex flex-col items-center gap-3"
                    >
                      <p className="text-[#fdfaf1] text-base md:text-lg font-medium drop-shadow-md">
                        YOU ARE GREAT!!
                      </p>

                      {audioAllowed ? (
                        <div
                          className={`flex items-center gap-2 px-4 md:px-5 py-2 rounded-full backdrop-blur-md border transition-all duration-500 ${
                            isListeningReady
                              ? "bg-rose-500/30 border-rose-400/50 shadow-lg scale-110"
                              : "bg-white/10 border-white/20"
                          }`}
                        >
                          <Mic
                            className={`text-rose-200 w-5 h-5 ${
                              volume > 10
                                ? "animate-bounce"
                                : ""
                            }`}
                          />

                          <span className="text-rose-100 text-xs font-bold tracking-wide">
                            {isListeningReady
                              ? "BLOW or TAP!"
                              : "Listening..."}
                          </span>
                        </div>
                      ) : (
                       <button 
  onClick={handleBlowOut} 
  className="flex items-center gap-3 px-8 py-4 bg-white/20 rounded-full text-white text-lg font-bold border-2 border-white/40 backdrop-blur-md hover:bg-white/30 hover:scale-105 transition-all cursor-pointer pointer-events-auto shadow-xl hover:shadow-2xl"
> 
  <Wind size={24} /> 
  Click Here to Blow - Please Click Here 
</button>
                      )}
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>

            {/* 🎂 RESPONSIVE CAKE CONTAINER */}
            <div
              className={`relative w-64 h-[52vh] max-h-[500px] md:w-96 md:h-[60vh] md:max-h-[500px] flex justify-center items-end mt-20 md:mt-16 transition-all ${
                isWishing && !isBlownOut
                  ? "cursor-pointer"
                  : ""
              }`}
              onClick={() => {
                if (isWishing && !isBlownOut) {
                  handleBlowOut();
                }
              }}
            >

              {/* 🕯️ CANDLE */}
              <AnimatePresence>
                {showCandle && (
                  <motion.div
                    key="candle"
                    initial={{
                      scale: 0,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                    }}
                    onClick={handleLightCandle}
                    className="absolute bg-gradient-to-b from-white to-gray-200 rounded-md z-30 cursor-pointer pointer-events-auto hover:brightness-110"
                    style={{
                      width: "12px",
                      height: "75px",
                      bottom: "10px",
                      left: "50%",
                      marginLeft: "-6px",
                    }}
                  >
                    <div
                      className="absolute left-0 w-full h-0.5 bg-rose-400/50"
                      style={{ top: "25%" }}
                    />

                    <div
                      className="absolute left-0 w-full h-0.5 bg-rose-400/50"
                      style={{ top: "45%" }}
                    />

                    {/* 🔥 FLAME */}
                    <AnimatePresence>
                      {isLit && !isBlownOut && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            scale: 0,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                          }}
                        >
                          <div className="absolute -top-10 -left-5 w-12.5 h-12.5 bg-orange-500/30 rounded-full blur-xl animate-pulse pointer-events-none" />

                          <div
                            className="absolute bg-orange-400 rounded-full blur-sm animate-pulse"
                            style={{
                              top: "-22px",
                              left: "50%",
                              marginLeft: "-7px",
                              width: "14px",
                              height: "36px",
                            }}
                          />

                          <div
                            className="fuego absolute bg-yellow-200 rounded-full shadow-[0_0_20px_5px_rgba(255,215,0,0.6)] origin-bottom animate-fuego"
                            style={{
                              top: "-30px",
                              left: "50%",
                              marginLeft: "-6px",
                              width: "12px",
                              height: "30px",
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 🍰 CAKE SVG */}
              <AnimatePresence>
                {showCake && (
                  <motion.div
                    key="cake"
                    initial={{
                      y: -800,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      mass: 1,
                    }}
                    className="w-full h-full z-20 scale-110 md:scale-125"
                  >
                    <MemoizedCakeSVG />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 🎉 HAPPY BIRTHDAY TEXT */}
 <motion.div
  initial={{
    opacity: 0,
    y: 20,
  }}
  animate={
    isBlownOut
      ? {
          opacity: 1,
          y: 0,
        }
      : {
          opacity: 0,
          y: 20,
        }
  }
  transition={{
    duration: 1,
  }}
  className="relative w-full text-center z-50 px-3 mt-4 md:mt-6"
>
  <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-[#fdfaf1] drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] leading-tight">
    Happyy Birthday
    <span className="block text-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.9)]">
      Aleksandra
    </span>
  </h1>
</motion.div>

            {/* ➡️ NEXT BUTTON */}
            <div className="absolute bottom-4 md:bottom-6 left-0 right-0 w-full flex justify-center z-[60] pointer-events-auto px-4">
              <AnimatePresence>
                {showNextButton && (
                  <motion.button
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      opacity: {
                        duration: 0.5,
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    onClick={onComplete}
                    className="px-6 py-3 md:px-8 md:py-3 bg-purple-600/80 backdrop-blur-md text-white rounded-full font-medium border border-purple-300/50 hover:bg-purple-600 hover:scale-110 transition-all flex items-center gap-3 shadow-lg cursor-pointer hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                  >
                    See what's next
                    <ArrowRight size={20} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 3️⃣ RIGHT SECTION: POEM */}
          <div className="hidden md:flex md:col-span-4 flex-col justify-start items-end text-right pr-10 pt-24">
            <motion.div
              initial={{
                opacity: 0,
                x: 50,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 1.5,
                delay: 0.5,
              }}
            >
              <div className="font-mono text-xs md:text-sm text-[#fdfaf1] space-y-4 opacity-90 max-w-75 leading-relaxed bg-black/20 p-6 rounded-xl backdrop-blur-sm border border-white/5 shadow-lg hover:bg-black/30 transition-colors">
                <p>
                  I hope today brings you joy and smile
                </p>

                <p className="pt-2 font-bold text-rose-300">
                  I feel so lucky to have sister like you in other Country.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE TITLE */}
      <div className="md:hidden absolute top-[5%] left-4 z-40">
        <h1 className="text-4xl font-sans font-black text-[#be123c] leading-[0.9] drop-shadow-md">
          MAKE
          <br />
          A WISH
        </h1>
      </div>

      {/* 🔥 STYLES FOR FLAME ANIMATION */}
      <style jsx global>{`
        @keyframes fuego {
          0% {
            transform: scale(1, 1);
          }

          50% {
            transform: scale(0.9, 1.1) translateY(-2px);
          }

          100% {
            transform: scale(1, 1);
          }
        }

        .animate-fuego {
          animation: fuego 0.3s infinite;
        }
      `}</style>
    </div>
  );
}

// 🎨 FIXED STATIC SVG
const CAKE_SVG_CODE = `
<svg
  version="1.1"
  id="cake"
  x="0px"
  y="0px"
  width="100%"
  height="100%"
  viewBox="0 0 200 500"
  style="enable-background:new 0 0 200 500;"
>
  <path
    fill="#f9a8d4"
    d="M173.667,427.569c-49.795,0-101.101,0-147.334,0c-3.999,0-4-16.002,0-16.002 c46.385,0,97.539,0,147.334,0C177.668,411.567,177.667,427.569,173.667,427.569z"
  />

  <path
    fill="#f43f5e"
    d="M102.242,427.569c5.348,0,14.079,0,17.462,0c0,0,17.026,0,27.504,0 c19.143,0,20.39-3.797,26.459,0c3,1.877,0,7.823,0,7.823c-2.412,2.258-58.328,0-73.667,0l0,0c-1.858,0-67.187,0-73.667,0 c0,0-4.125-4.983,0-7.823c5.201-3.58,16.085,0,23.725,0c8.841,0,20.762,0,20.762,0c3.686,0,8.597,0,19.511,0H102.242z"
  />

  <path
    fill="#f9a8d4"
    d="M173.667,451.394c-49.298,0-102.782,0-147.334,0c-3.999,0-4-16.002,0-16.002 c44.697,0,96.586,0,147.334,0C177.667,435.392,177.668,451.394,173.667,451.394z"
  />

  <path
    fill="#f43f5e"
    d="M173.667,451.394c2.875,0,2.997,9.257,0,9.131c-22.662-0.956-32.09-0.956-41.756-0.956 c-14.48,0-17.884,0-30.163,0c-2.087,0-2.068,0-3.915,0c-13.333,0-8.963,0-23.088,0c-11.668,0-34.99-0.294-48.412,1.831 c-4.109,0.65-3.01-10.006,0-10.006C37.129,451.394,149.379,451.394,173.667,451.394z"
  />

  <path
    fill="#fbcfe8"
    d="M173.667,475.571c-46.512,0-105.486,0-147.334,0c-3.999,0-4-16.002,0-16.002c43.566,0,97.96,0,147.334,0 C177.667,459.569,177.666,475.571,173.667,475.571z"
  />

  <path
    fill="#fff1f2"
    d="M111.547,415.233c-6.667-0.834-9.667,4.667-13.833,3.333c-19.649-6.291-8.158,22.176-14.5,22.334c-6.667,0.166,2.833-18-13.333-22.167c-29.544-7.615-9.667,43.833-20.167,43.833c-10.333,0,8.004-55.006-16.833-39 c-7.5,4.833-9.508-3.78-9.299-7.004c0.799-12.329,23.592-7.153,38.132-7.329c10.234-0.124,20.238-1.505,38.287-2.167 c16.642-0.61,32.903,1.125,46.213,1.5c12.438,0.351,35.058-5.579,31.863,6.451c-5.532,20.833,1.25,28.216-4.409,27.883 c-7.606-0.447-6.058-37.895-20.62-23.333c-10.167,10.166-15.972-0.747-25,12C119.547,443.568,121.798,416.515,111.547,415.233z"
  />

  <rect
    x="10"
    y="475.571"
    fill="#fff1f2"
    width="180"
    height="4"
  />
</svg>
`;