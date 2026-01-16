"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// 🔁 Background images
const backgrounds = [
  "/bg1.webp",
  "/bg2.webp",
  "/bg3.webp",
  "/bg4.webp",
  "/bg5.webp",
];

// 🐱 Hello Kitty images
const cornerImages = ["/ht1.png", "/ht2.png", "/hb1.png", "/hb2.png"];

// Other images used in content
const contentImages = ["/hk.png", "/a1.jpg", "/a2.jpg"];

const allImages = [...backgrounds, ...cornerImages, ...contentImages];

export default function Hero() {
  const [bgIndex, setBgIndex] = useState(0);
  const [step, setStep] = useState("intro");
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Preload all images
  useEffect(() => {
    let loaded = 0;
    allImages.forEach((src) => {
      const imgPreload = new window.Image(); // ⚡ use window.Image to avoid conflict
      imgPreload.src = src;
      imgPreload.onload = () => {
        loaded += 1;
        setProgress(Math.floor((loaded / allImages.length) * 100));
        if (loaded === allImages.length) {
          setTimeout(() => setLoading(false), 300);
        }
      };
    });
  }, []);

  // Background slideshow (every 1s)
  useEffect(() => {
    if (loading) return; // do not start slideshow until loaded
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [loading]);

  // Move NO button randomly
  const moveNoButton = () => {
    const x = Math.random() * 240 - 120;
    const y = Math.random() * 180 - 90;
    setNoPos({ x, y });
  };

  // Handle mobile tap
  const handleNoClick = () => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      moveNoButton();
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-pink-200/80">
        <Image
          src="/hk.png" // your loading image
          alt="loading"
          width={100}
          height={100}
          className="animate-pulse"
        />
        <p className="mt-4 text-pink-700 text-xl font-bold">{progress}%</p>
      </div>
    );
  }

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
      <Image
        src="/ht1.png"
        width={140}
        height={140}
        alt="ht1"
        className="absolute top-0 left-0"
      />
      <Image
        src="/ht2.png"
        width={140}
        height={140}
        alt="ht2"
        className="absolute top-0 right-0"
      />
      <Image
        src="/hb1.png"
        width={140}
        height={140}
        alt="hb1"
        className="absolute bottom-0 left-0"
      />
      <Image
        src="/hb2.png"
        width={140}
        height={140}
        alt="hb2"
        className="absolute bottom-0 right-0"
      />

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
                <Image src="/hk.png" width={24} height={24} alt="icon" />
                Click me to see the last reason
                <Image src="/hk.png" width={24} height={24} alt="icon" />
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
              <h2 className=" text-4xl text-pink-600 text-center">
                Will you be my <span className="uppercase">girlfriend</span>? 💕
              </h2>

              <Image
                src="/a1.jpg"
                alt="question"
                width={256}
                height={256}
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
                  onMouseEnter={moveNoButton}
                  onClick={handleNoClick}
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
              <h2 className=" text-5xl text-pink-700">YAAAAAY!!! 🎀💖</h2>

              <Image
                src="/a2.jpg"
                alt="yes"
                width={256}
                height={256}
                className="h-64 w-64 rounded-2xl border border-pink-200 object-cover shadow-xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
