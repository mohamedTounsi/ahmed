"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 🔁 Background images (put them in /public)
const backgrounds = [
  "/bg1.webp",
  "/bg2.webp",
  "/bg3.webp",
  "/bg4.webp",
  "/bg5.webp",
];

export default function Hero() {
  const [bgIndex, setBgIndex] = useState(0);
  const [step, setStep] = useState("intro");
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  // Background slideshow (every 1s)
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Move NO button randomly
  const moveNoButton = () => {
    const x = Math.random() * 240 - 120;
    const y = Math.random() * 180 - 90;
    setNoPos({ x, y });
  };

  // Handle mobile tap
  const handleNoClick = () => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      moveNoButton(); // teleport to a new random position
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden border-7 border-pink-200">
      {/* 🌸 Background slideshow */}
      <AnimatePresence>
        <motion.div
          key={bgIndex}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* 🌷 Pink overlay */}
      <div className="absolute inset-0 bg-pink-200/20" />

      {/* 🐱 Hello Kitty corner images */}
      <img src="/ht1.png" className="absolute top-0 left-0 h-35 w-35" />
      <img src="/ht2.png" className="absolute top-0 right-0 h-35 w-35" />
      <img src="/hb1.png" className="absolute bottom-0 left-0 h-35 w-35" />
      <img src="/hb2.png" className="absolute bottom-0 right-0 h-35 w-35" />

      {/* 💖 Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <AnimatePresence mode="wait">
          {/* INTRO */}
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <button
                onClick={() => setStep("question")}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-white px-10 py-4 text-white font-light shadow-sm"
              >
                <img src="/hk.png" alt="icon" className="w-6 h-6" />
                Click me to see the last reason
                <img src="/hk.png" alt="icon" className="w-6 h-6" />
              </button>
            </motion.div>
          )}

          {/* QUESTION */}
          {step === "question" && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6"
            >
              <h2 className="font-[cursive] text-4xl text-pink-600 text-center">
                Will you be my <span className="uppercase">girlfriend</span>? 💕
              </h2>

              <img
                src="/a1.jpg"
                alt="question"
                className="h-64 w-64 rounded-2xl border border-pink-200 object-cover shadow-xl"
              />

              <div className="relative mt-4 flex gap-6">
                {/* YES button */}
                <button
                  onClick={() => setStep("yes")}
                  className="rounded-full bg-pink-500 px-6 py-3 text-white shadow-lg transition hover:scale-105"
                >
                  Yes 💗
                </button>

                {/* NO button */}
                <motion.button
                  animate={{ x: noPos.x, y: noPos.y }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onMouseEnter={moveNoButton} // desktop hover
                  onClick={handleNoClick} // mobile tap
                  className="rounded-full bg-gray-300 px-6 py-3 text-gray-700 shadow-lg"
                >
                  No 🙈
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* YES */}
          {step === "yes" && (
            <motion.div
              key="yes"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <h2 className="font-[cursive] text-5xl text-pink-700">
                Yaaay!!! 🎀💖
              </h2>

              <img
                src="/a2.jpg"
                alt="yes"
                className="h-64 w-64 rounded-2xl border border-pink-200 object-cover shadow-xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
