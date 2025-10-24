import React from "react";
import { motion } from "framer-motion";

const AnimatedBackground: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 🌌 Bầu trời */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          darkMode
            ? "bg-gradient-to-b from-[#05010a] via-[#0b1442] to-[#1a1c3b]"
            : "bg-gradient-to-b from-[#b6e0ff] via-[#dff4ff] to-[#ffffff]"
        }`}
      />

      {/* 🌙 Mặt trăng hoặc 🌞 Mặt trời */}
      <motion.div
        className="absolute rounded-full blur-2xl"
        style={{
          width: 180,
          height: 180,
          top: darkMode ? "60px" : "80px",
          right: darkMode ? "100px" : "150px",
          background: darkMode
            ? "radial-gradient(circle at 40% 40%, #fffef6 0%, #f0e6b2 25%, transparent 70%)"
            : "radial-gradient(circle at 40% 40%, #fffbe8 0%, #ffe97a 30%, transparent 70%)",
          boxShadow: darkMode
            ? "0 0 120px 40px rgba(255,255,210,0.2)"
            : "0 0 100px 50px rgba(255,250,180,0.3)",
        }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 🌟 Sao nhấp nháy */}
      {darkMode &&
        Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.7,
              filter: "blur(0.5px)",
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* ☁️ Mây bay mơ màng — mỗi đám khác nhau */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => {
          const delay = Math.random() * 10;
          const duration = 50 + Math.random() * 30; // nhanh hơn
          const cloudShape = [
            "M40 80 Q80 30 140 60 Q200 20 260 70 T340 70 L0 100 Z",
            "M30 70 Q90 40 150 55 Q210 25 270 60 T330 65 L0 100 Z",
            "M50 85 Q100 35 160 50 Q220 25 280 75 T340 75 L0 100 Z",
            "M20 75 Q70 45 130 55 Q190 30 250 65 T310 70 L0 100 Z",
            "M60 80 Q100 50 180 55 Q230 30 280 70 T340 70 L0 100 Z",
            "M40 70 Q90 25 140 50 Q200 30 260 65 T320 65 L0 100 Z",
          ][i % 6];

          return (
            <motion.div
              key={i}
              className="absolute opacity-70"
              style={{
                top: `${10 + Math.random() * 70}%`,
                left: `${-300 + Math.random() * 100}px`,
                filter: darkMode
                  ? "blur(8px) brightness(0.8)"
                  : "blur(6px) brightness(1.1)",
              }}
              animate={{
                x: ["-10%", "120%"],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
                delay,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="320"
                height="120"
                viewBox="0 0 340 100"
                fill="none"
              >
                <motion.path
                  d={cloudShape}
                  fill={darkMode ? "#cbd5e1" : "#ffffff"}
                  opacity="0.9"
                  animate={{
                    d: [
                      cloudShape,
                      cloudShape.replace("60", "55"),
                      cloudShape,
                    ],
                  }}
                  transition={{
                    duration: 8 + Math.random() * 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay,
                  }}
                />
              </svg>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimatedBackground;
