"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Heart, Stars, Sparkles, Crown } from "lucide-react";
import Image from "next/image";

export default function LetterScreen({ onBack }) {
  // 👇 YOUR ORIGINAL TEXT
  const mainText = `To My Sister Aleksandra,

Happy Birthday! 🎉🎂

Today is all about celebrating you and the wonderful person you are.

Thank you for being such a good sister to me. You're always kind, supportive, and full of positivity.

On your special day, I wish you happiness, success, good health, and endless opportunities. May all your dreams come true and may this year be your best one yet.

Keep smiling and keep being the amazing person you are. 🎉👑

Best Wishes From,
Your Little Brother,
Lokesh 😊`;

  const psText = "\n Ti si super! 👑";

  const finalMessagePart1 =
    "Once again, Happy Birthday, to My Sister";

  const finalMessageName = "Aleksandra";

  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isMainComplete, setIsMainComplete] = useState(false);
  const [showPS, setShowPS] = useState(false);
  const [isSealing, setIsSealing] = useState(false);
  const [isSealed, setIsSealed] = useState(false);

  const contentRef = useRef(null);

  // =========================================================
  // TYPEWRITER EFFECT
  // =========================================================
  useEffect(() => {
    if (index < mainText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + mainText[index]);
        setIndex((prev) => prev + 1);

        if (contentRef.current) {
          contentRef.current.scrollTop =
            contentRef.current.scrollHeight;
        }
      }, 30);

      return () => clearTimeout(timeout);
    } else {
      const finishTimer = setTimeout(() => {
        setIsMainComplete(true);

        setTimeout(() => {
          setShowPS(true);
        }, 1000);
      }, 0);

      return () => clearTimeout(finishTimer);
    }
  }, [index, mainText]);

  // =========================================================
  // KEEP FINAL PART OF LETTER VISIBLE
  // =========================================================
  useEffect(() => {
    if (showPS && contentRef.current) {
      const timer = setTimeout(() => {
        contentRef.current.scrollTop =
          contentRef.current.scrollHeight;
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [showPS]);

  // =========================================================
  // SEAL
  // =========================================================
  const handleSeal = () => {
    setIsSealing(true);

    setTimeout(() => {
      setIsSealed(true);
    }, 2000);
  };

  // =========================================================
  // SKIP TYPEWRITER
  // =========================================================
  const handleSkip = () => {
    if (!isMainComplete && !isSealing) {
      setDisplayedText(mainText);
      setIndex(mainText.length);

      setTimeout(() => {
        setIsMainComplete(true);
        setShowPS(true);
      }, 0);
    }
  };

  // =========================================================
  // GRAND FINALE
  // =========================================================
  if (isSealed) {
    const containerVariants = {
      hidden: {
        opacity: 1,
      },
      visible: {
        opacity: 1,
        transition: {
          delay: 0.5,
          staggerChildren: 0.2,
        },
      },
    };

    const wordVariants = {
      hidden: {
        opacity: 1,
      },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
        },
      },
    };

    const letterVariants = {
      hidden: {
        opacity: 0,
        filter: "blur(20px)",
        y: 0,
        scale: 1.5,
      },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        scale: 1,
        transition: {
          duration: 1.2,
          ease: "easeOut",
        },
      },
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full z-50 animate-fade-in relative p-4 overflow-y-auto scale-[0.80] md:scale-[0.70] origin-center">

        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

          .font-grand {
            font-family: 'Great Vibes', cursive;
          }
        `}</style>

        {/* SEALED ENVELOPE */}
        <motion.div
          initial={{
            scale: 0.8,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
          }}
          className="relative w-52 h-40 md:w-64 md:h-44 bg-linear-to-br from-pink-400 to-rose-400 rounded-lg shadow-2xl flex items-center justify-center overflow-hidden z-10 shrink-0"
        >
          <div className="absolute top-0 left-0 w-full h-full border-l-130 border-r-130 border-t-100 border-l-transparent border-r-transparent border-t-pink-300/50 mix-blend-overlay" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                delay: 0.2,
                type: "spring",
              }}
           className="w-12 h-12 md:w-14 md:h-14 bg-red-600 rounded-full border-4 border-red-800 shadow-xl flex items-center justify-center relative"
            >
              <Heart
                size={24}
                className="text-red-900 fill-red-900 drop-shadow-sm"
              />

              <div className="absolute top-2 left-2 w-4 h-4 bg-white/20 rounded-full blur-[1px]" />
            </motion.div>
          </div>
        </motion.div>

        {/* MAGICAL FINAL TEXT */}
        <motion.div
          className="text-center z-20 relative max-w-5xl px-4 mt-8 mb-4 flex flex-wrap justify-center gap-x-3 gap-y-2 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute -top-10 -left-10 animate-pulse">
            <Sparkles
              className="text-yellow-300"
              size={24}
            />
          </div>

          <div className="absolute -bottom-5 -right-10 animate-bounce">
            <Stars
              className="text-pink-300"
              size={20}
            />
          </div>

          {/* PART 1 */}
          {finalMessagePart1.split(" ").map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="inline-block whitespace-nowrap"
            >
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  variants={letterVariants}
                  className="inline-block relative text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-800"
                  style={{
                    textShadow:
                      "0px 1px 2px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          ))}

          {/* NAME + CROWN */}
          <motion.span
            variants={wordVariants}
            className="inline-flex items-center gap-2 whitespace-nowrap relative"
          >
            <motion.span
              variants={letterVariants}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 text-yellow-400 drop-shadow-lg rotate-12"
            >
              <Crown
                size={32}
                fill="#fbbf24"
                strokeWidth={1.5}
              />
            </motion.span>

            {finalMessageName.split("").map(
              (char, charIndex) => (
                <motion.span
                  key={charIndex}
                  variants={letterVariants}
                  className="inline-block relative text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800"
                  style={{
                    textShadow:
                      "0px 1px 2px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  {char}
                </motion.span>
              )
            )}
          </motion.span>
        </motion.div>

        {/* GIF */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            delay: 3.5,
            duration: 1,
            type: "spring",
          }}
          className="relative w-32 h-32 md:w-40 md:h-40 z-20 my-4 shrink-0"
        >
          <Image
            src="/game/4.gif"
            alt="Celebration"
            fill
            className="object-contain drop-shadow-xl"
            unoptimized
            priority
          />
        </motion.div>

        {/* REPLAY */}
        <motion.button
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 4.5,
            duration: 1,
          }}
          onClick={onBack}
          className="flex items-center gap-2 px-8 py-3 md:px-10 md:py-4 md:text-2xl bg-linear-to-r from-red-500 to-pink-600 text-white font-handwriting text-xl rounded-full hover:shadow-pink-500/40 hover:scale-105 transition-all font-bold uppercase tracking-widest shadow-lg z-20 mb-10"
        >
          <RefreshCw size={18} />
          To Replay Experience Click Here
        </motion.button>
      </div>
    );
  }

  // =========================================================
  // READING LETTER
  // =========================================================
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 overflow-hidden relative bg-transparent">

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

        .font-elegant {
          font-family: 'Great Vibes', cursive;
        }
      `}</style>

      {/* BACKDROP */}
      {!isSealing && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="absolute inset-0 bg-black/60 backdrop-blur-md z-10"
        />
      )}

      {/* LETTER WRAPPER */}
      <div className="relative w-full max-w-4xl h-[85vh] flex items-end justify-center perspective-1000 z-20">

        {/* LETTER PAPER */}
        <motion.div
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={
            isSealing
              ? {
                  y: 400,
                  scale: 0.9,
                  opacity: 0,
                  transition: {
                    duration: 0.8,
                  },
                }
              : {
                  y: 0,
                  scale: 1,
                  opacity: 1,
                }
          }
          className="relative w-full h-[78vh] md:h-auto md:min-h-[65vh] md:max-h-[80vh] bg-[#fffcf5] p-5 sm:p-7 md:p-12 rounded-t-lg shadow-2xl z-20 flex flex-col overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(#e5e5e5 1px, transparent 1px)",
            backgroundSize: "100% 2.5rem",
          }}
          onClick={handleSkip}
        >

          {/* =================================================
              BOUQUET
              FIXED RESPONSIVE POSITION
              ================================================= */}
          <motion.div
            initial={{
              opacity: 0,
              rotate: 6,
              y: -15,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              rotate: 4,
              y: 0,
              scale: 1,
            }}
            transition={{
              delay: 1,
              duration: 1,
              ease: "easeOut",
            }}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 w-24 h-24 sm:w-28 sm:h-28 md:w-44 md:h-44 lg:w-52 lg:h-52 bg-white p-2 shadow-lg z-30 border border-gray-100 rounded-sm"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-10 border-2 border-gray-400 rounded-full z-40 bg-transparent" />

            <div className="relative w-full h-full overflow-hidden bg-gray-50">
              <Image
                src="/bouquet.png"
                alt="Bouquet"
                fill
                sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, (max-width: 1024px) 176px, 208px"
                className="object-cover"
                unoptimized
              />
            </div>
          </motion.div>

          {/* =================================================
              SCROLLABLE LETTER CONTENT
              ================================================= */}
          <div
            ref={contentRef}
            className="flex-1 min-h-0 overflow-y-auto pr-2 sm:pr-3 custom-scrollbar pb-6 overscroll-contain"
            style={{
              scrollPaddingBottom: "30px",
              paddingTop: "9rem",
            }}
          >

            {/* MAIN LETTER */}
            <p className="text-base sm:text-lg md:text-2xl text-gray-800 leading-8 sm:leading-9 md:leading-10 font-serif whitespace-pre-wrap relative z-10 tracking-normal">
              {displayedText}

              {!isMainComplete && !isSealing && (
                <span className="inline-block w-2 h-6 ml-1 bg-pink-400 animate-pulse align-middle rounded-full" />
              )}
            </p>

            {/* PS MESSAGE */}
            {showPS && (
              <motion.p
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mt-6 text-pink-600 font-elegant text-xl sm:text-2xl md:text-3xl font-bold"
              >
                {psText}
              </motion.p>
            )}

            {/* EXTRA SPACE AFTER LETTER
                Ensures Lokesh + PS stay above button.
            */}
            <div className="h-6 shrink-0" />

          </div>

          {/* =================================================
              SEAL BUTTON
              ================================================= */}
          {showPS && !isSealing && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="shrink-0 w-full flex justify-center pt-3 pb-2 px-1 z-20 bg-[#fffcf5]"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSeal();
                }}
                className="bg-linear-to-r from-red-500 to-pink-600 text-white font-handwriting text-sm sm:text-base md:text-xl px-4 sm:px-6 md:px-8 py-3 rounded-full shadow-lg hover:shadow-pink-500/40 hover:scale-105 transition-all flex items-center justify-center gap-2 text-center leading-tight max-w-[95%]"
              >
                <span>
                  Seal This Surprise - Click Here
                </span>

                <Heart
                  size={18}
                  fill="white"
                  className="shrink-0"
                />
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* =================================================
            ENVELOPE
            ================================================= */}
        <motion.div
          className="absolute bottom-0 w-[98%] max-w-4xl h-56 md:h-72 bg-pink-400 z-30 pointer-events-none rounded-b-lg shadow-2xl"
          initial={{
            y: 300,
          }}
          animate={
            isSealing
              ? {
                  y: 0,
                }
              : {
                  y: 300,
                }
          }
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: "circOut",
          }}
        >
          <div className="absolute bottom-0 left-0 w-full h-full border-l-100 md:border-l-300 border-r-100 md:border-r-300 border-b-150 md:border-b-250 border-l-transparent border-r-transparent border-b-pink-500/80" />
        </motion.div>

      </div>
    </div>
  );
}