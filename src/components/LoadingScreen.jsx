import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingMessages = [
  "Initializing HackForge…",
  "Loading builders…",
  "Forging ideas…",
  "Compiling innovation…",
  "Preparing the challenge…",
  "Ready to hack!",
];

export const LoadingScreen = ({ ready }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [exit, setExit] = useState(false);

  // Progress ramps naturally until ready === true
  useEffect(() => {
    if (!ready) {
      const t = setInterval(() => {
        setProgress((p) => Math.min(p + Math.random() * 6, 88));
      }, 120);
      return () => clearInterval(t);
    } else {
      // Finish with intention
      setProgress(100);
      setTimeout(() => setExit(true), 400);
    }
  }, [ready]);

  // Message cycling
  useEffect(() => {
    const msg = setInterval(() => {
      setMessageIndex((i) => (i + 1) % loadingMessages.length);
    }, 520);
    return () => clearInterval(msg);
  }, []);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "#050208" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.15, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Ambient grid */}
          <div className="absolute inset-0 grid-pattern opacity-30" />

          {/* Living glow orb */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.28) 0%, transparent 70%)",
              filter: "blur(70px)",
            }}
            animate={{
              scale: progress > 70 ? 1.4 : 1.2,
              opacity: progress > 70 ? 0.75 : 0.45,
            }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Center stack */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Title */}
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold mb-4"
              style={{ fontFamily: "Syne, sans-serif", color: "#F3F4F6" }}
              animate={{
                textShadow: [
                  "0 0 14px rgba(124,58,237,0.25)",
                  "0 0 36px rgba(124,58,237,0.6)",
                  "0 0 14px rgba(124,58,237,0.25)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              HackForge <span style={{ color: "#7C3AED" }}>2.0</span>
            </motion.h1>

            <p
  className="text-base md:text-lg uppercase mb-14 text-center"
  style={{
    letterSpacing: '0.4em',
    color: '#C4B5FD',
    fontFamily: 'JetBrains Mono, monospace',
    opacity: 0.9,
  }}
>
  BUILD<span style={{ margin: '0 0.6em', opacity: 0.5 }}>·</span>
  BREAK<span style={{ margin: '0 0.6em', opacity: 0.5 }}>·</span>
  REPEAT
</p>


            {/* Progress bar */}
            <div className="w-72 md:w-96 mx-auto">
              <div
                className="h-1 rounded-full overflow-hidden"
                style={{ backgroundColor: "rgba(124,58,237,0.22)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: "#7C3AED" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              {/* Messages */}
              <div className="mt-6 h-6 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={messageIndex}
                    className="text-sm"
                    style={{
                      color: "#A78BFA",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                  >
                    {loadingMessages[messageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Percentage */}
              <p
                className="mt-4 text-xs tracking-wider"
                style={{ color: "#6B7280", fontFamily: "JetBrains Mono, monospace" }}
              >
                {Math.round(progress)}%
              </p>
            </div>
          </motion.div>

          {/* Minimal particles */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${6 + i * 2}px`,
                height: `${6 + i * 2}px`,
                backgroundColor: "#7C3AED",
                left: `${20 + i * 18}%`,
                top: `${25 + (i % 2) * 30}%`,
              }}
              animate={{ y: [0, -28, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{
                duration: 3.2 + i * 0.6,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
