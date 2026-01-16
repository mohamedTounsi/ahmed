import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export default function RomanticProposal() {
  // Replace these with your actual image paths
  const backgroundImages = [
    "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1516214104703-3e8b93e94d60?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=800&fit=crop",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [stage, setStage] = useState("welcome"); // welcome, proposal, yes
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  // Carousel effect
  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
        setFade(true);
      }, 500);
    }, 1000);

    return () => clearInterval(fadeInterval);
  }, []);

  const handleClickText = () => {
    setStage("proposal");
  };

  const handleNoClick = () => {
    const randomX = Math.random() * (window.innerWidth - 120);
    const randomY = Math.random() * (window.innerHeight - 120);
    setNoButtonPos({ x: randomX, y: randomY });
  };

  const handleYesClick = () => {
    setStage("yes");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Animated Background Carousel */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url('${backgroundImages[currentImageIndex]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Welcome Stage */}
        {stage === "welcome" && (
          <div className="text-center animate-bounce">
            <button onClick={handleClickText} className="group relative">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-pink-400 animate-pulse" />
                <Heart className="w-6 h-6 text-pink-400 animate-pulse" />
                <Heart className="w-6 h-6 text-pink-400 animate-pulse" />
              </div>
              <h1
                className="text-5xl md:text-6xl font-bold text-pink-300 drop-shadow-lg"
                style={{
                  fontFamily: "'Quicksand', sans-serif",
                  letterSpacing: "2px",
                  textShadow: "0 0 20px rgba(236, 72, 153, 0.5)",
                }}
              >
                Click to see the
              </h1>
              <p
                className="text-4xl md:text-5xl font-bold text-pink-200 mt-2 drop-shadow-lg"
                style={{
                  fontFamily: "'Quicksand', sans-serif",
                  letterSpacing: "2px",
                  textShadow: "0 0 20px rgba(236, 72, 153, 0.5)",
                }}
              >
                final reason 💝
              </p>
              <div className="mt-6 text-pink-200 text-lg animate-pulse">
                ✨ Tap me ✨
              </div>
            </button>
          </div>
        )}

        {/* Proposal Stage */}
        {stage === "proposal" && (
          <div className="text-center animate-in fade-in duration-1000">
            <h2
              className="text-5xl md:text-6xl font-bold text-pink-300 mb-8 drop-shadow-lg"
              style={{
                fontFamily: "'Quicksand', sans-serif",
                letterSpacing: "1px",
                textShadow: "0 0 20px rgba(236, 72, 153, 0.5)",
              }}
            >
              Will you be my girlfriend? 💕
            </h2>

            {/* Proposal Image */}
            <div className="mb-8 animate-in zoom-in duration-700">
              <img
                src="https://images.unsplash.com/photo-1552821193-f70bd43ecc17?w=400&h=400&fit=crop"
                alt="couple"
                className="w-80 h-80 rounded-full object-cover shadow-2xl mx-auto border-8 border-pink-300"
              />
            </div>

            {/* Buttons Container */}
            <div className="relative flex justify-center gap-8 mt-12 h-20">
              <button
                onClick={handleYesClick}
                className="px-10 py-4 bg-pink-400 hover:bg-pink-500 text-white font-bold text-xl rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl"
                style={{
                  fontFamily: "'Quicksand', sans-serif",
                }}
              >
                YES 💕
              </button>

              {/* No Button - Runs Away */}
              <button
                onClick={handleNoClick}
                className="absolute px-10 py-4 bg-gray-400 hover:bg-gray-500 text-white font-bold text-xl rounded-full shadow-lg transition-all duration-300"
                style={{
                  fontFamily: "'Quicksand', sans-serif",
                  transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                  left: "calc(50% + 60px)",
                  top: "0",
                }}
              >
                No
              </button>
            </div>
          </div>
        )}

        {/* Yes Stage */}
        {stage === "yes" && (
          <div className="text-center animate-in fade-in duration-1000">
            {/* Celebration Image */}
            <div className="mb-8 animate-in zoom-in duration-700">
              <img
                src="https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?w=400&h=400&fit=crop"
                alt="celebration"
                className="w-80 h-80 rounded-full object-cover shadow-2xl mx-auto border-8 border-pink-300"
              />
            </div>

            <h1
              className="text-7xl md:text-8xl font-bold text-pink-300 drop-shadow-lg animate-bounce"
              style={{
                fontFamily: "'Quicksand', sans-serif",
                letterSpacing: "2px",
                textShadow: "0 0 30px rgba(236, 72, 153, 0.7)",
              }}
            >
              YAAAY! 💕✨
            </h1>

            <div
              className="mt-8 text-2xl text-pink-200"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              I love you so much! 💖
            </div>

            {/* Floating hearts */}
            <div className="fixed inset-0 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-4xl animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float ${
                      3 + Math.random() * 2
                    }s ease-in-out infinite`,
                  }}
                >
                  💕
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap');
      `}</style>
    </div>
  );
}
