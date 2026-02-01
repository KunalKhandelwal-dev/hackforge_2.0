import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

export const Hero = ({ onRegisterClick }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.6;
    }
  }, []);

  const [easterEggActive, setEasterEggActive] = useState(false);

  const triggerEasterEgg = () => {
  setEasterEggActive(true);

  // Optional: log or analytics
  console.log('🦇 Easter Egg Found!');

  setTimeout(() => {
    setEasterEggActive(false);
  }, 1200);
};


  const scrollToTracks = () => {
    const element = document.querySelector('#tracks');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Increase bats count and adjust for mobile
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

// 10 bats on mobile, 18 on desktop
const batCount = isMobile ? 10 : 18;


  const bats = useMemo(() => {
  return Array.from({ length: batCount }).map((_, i) => {
    const dir = Math.random() > 0.5 ? 'ltr' : 'rtl';

    return {
      id: `bat-${i}`,

      // RANDOM vertical position (safe range)
      top: `${5 + Math.random() * 65}%`,

      // RANDOM delay so they don’t spawn together
      delay: Math.random() * 2,

      // Long traversal
      duration: 16 + Math.random() * 18, // 16s – 34s

      scale: (isMobile ? 0.65 : 0.85) + Math.random() * 0.6,

      dir,

      pathVariant: Math.floor(Math.random() * 3),

      flapSpeed: 0.6 + Math.random() * 0.7,
    };
  });
}, [batCount, isMobile]);


  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#050208' }}
      data-testid="hero-section"
    >
      {easterEggActive && (
  <motion.div
    className="absolute inset-0 z-[20] pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.35 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    style={{
      background:
        'radial-gradient(circle at center, rgba(167,139,250,0.5), transparent 70%)',
    }}
  />
)}

      {/* Background video */}
      <video
  ref={videoRef}
  autoPlay
  loop
  muted
  playsInline
  preload="metadata"
  className="absolute inset-0 w-full h-full object-cover"
  style={{
    zIndex: 0,
    transform: 'translateZ(0)',
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    pointerEvents: 'none',
  }}
>
  <source src="/videos/bg-hero-hackforge.mp4" type="video/mp4" />
</video>


      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(5, 2, 8, 0.75)',
          zIndex: 1,
        }}
      />

      {/* Gradient orbs preserved */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
          top: '10%',
          left: '50%',
          x: '-50%',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: ['-50%', '-48%', '-50%'],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%)',
          bottom: '10%',
          right: '10%',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -30, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* ---------- BATS: increased count, higher opacity, quick appearance, long traversal ---------- */}
      <style>{`
        /* path variants: quick appear (opacity 1 early) but long loop duration */
        @keyframes batSweepA {
          0% { transform: translate3d(-18vw, 0, 0) scale(0.95) rotate(-3deg); opacity: 0; }
          4% { opacity: 1; transform: translate3d(-10vw, -2vh, 0) scale(1.0) rotate(-4deg); } /* quick appear */
          25% { transform: translate3d(16vw, -10vh, 0) scale(1.05) rotate(-8deg); }
          55% { transform: translate3d(110vw, -12vh, 0) scale(0.98) rotate(6deg); }
          80% { transform: translate3d(36vw, -4vh, 0) scale(1) rotate(-2deg); }
          100% { transform: translate3d(-18vw, 0, 0) scale(0.95) rotate(-3deg); opacity: 0; }
        }
        @keyframes batSweepB {
          0% { transform: translate3d(118vw, 0, 0) scale(0.96) rotate(5deg); opacity: 0; }
          6% { opacity: 1; transform: translate3d(110vw, -1vh, 0) scale(1.0) rotate(4deg); } /* quick appear */
          30% { transform: translate3d(48vw, -6vh, 0) scale(1.06) rotate(-4deg); }
          60% { transform: translate3d(-20vw, -10vh, 0) scale(0.94) rotate(-6deg); }
          88% { transform: translate3d(30vw, -2vh, 0) scale(1) rotate(2deg); }
          100% { transform: translate3d(118vw, 0, 0) scale(0.96) rotate(5deg); opacity: 0; }
        }
        @keyframes batSweepC {
          0% { transform: translate3d(-22vw, 2vh, 0) scale(0.9) rotate(-2deg); opacity: 0; }
          5% { opacity: 1; transform: translate3d(-12vw, 0vh, 0) scale(1.0) rotate(-3deg); } /* quick appear */
          35% { transform: translate3d(18vw, -12vh, 0) scale(1.08) rotate(-9deg); }
          65% { transform: translate3d(118vw, -6vh, 0) scale(0.95) rotate(4deg); }
          90% { transform: translate3d(48vw, -3vh, 0) scale(1) rotate(-1deg); }
          100% { transform: translate3d(-22vw, 2vh, 0) scale(0.9) rotate(-2deg); opacity: 0; }
        }

        /* faster wing/feather flap - scaleY */
        @keyframes batFlapFast {
          0% { transform: scaleY(1); }
          45% { transform: scaleY(0.78); }
          100% { transform: scaleY(1); }
        }

        /* feather-smoke trail */
        @keyframes trailMove {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 0.44; }
          30% { transform: translateX(-10px) translateY(-6px) scale(0.92); opacity: 0.28; }
          100% { transform: translateX(-28px) translateY(-20px) scale(0.72); opacity: 0; }
        }
        @keyframes trailMoveReverse {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 0.44; }
          30% { transform: translateX(10px) translateY(-6px) scale(0.92); opacity: 0.28; }
          100% { transform: translateX(28px) translateY(-20px) scale(0.72); opacity: 0; }
        }
      `}</style>

      {bats.map((b, idx) => {
        const scatterStrength = 40;

const scatterX = mousePosition.x * (Math.random() > 0.5 ? -1 : 1);
const scatterY = mousePosition.y * (Math.random() > 0.5 ? -1 : 1);

        const pathKey = b.pathVariant === 0 ? 'batSweepA' : b.pathVariant === 1 ? 'batSweepB' : 'batSweepC';
        const trailAnim = b.dir === 'ltr' ? 'trailMoveReverse' : 'trailMove';
        return (
          <div
  style={{
    position: 'absolute',
    left: b.dir === 'ltr' ? '-12%' : '110%',
    top: b.top,
    width: 160 * b.scale,
    height: 72 * b.scale,
    zIndex: 6,
    animation: prefersReducedMotion
      ? 'none'
      : `${pathKey} ${b.duration}s linear ${b.delay}s infinite`,
  }}
>
  <motion.div
    onClick={triggerEasterEgg}
    whileHover={{
      scale: 1.35,
      rotate: b.dir === 'ltr' ? 12 : -12,
      filter: 'drop-shadow(0 0 14px rgba(167,139,250,0.8))',
    }}
    animate={{
      x: mousePosition.x * -1,
      y: mousePosition.y * -1,
    }}
    transition={{
      type: 'spring',
      stiffness: 120,
      damping: 16,
    }}
    style={{
      width: '100%',
      height: '100%',
      cursor: 'pointer',
      pointerEvents: 'auto',
      willChange: 'transform',
    }}
  >
            <svg
              viewBox="0 0 64 32"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid meet"
              style={{
                display: 'block',
                willChange: 'transform, opacity',
                transformOrigin: '50% 50%',
                animation: prefersReducedMotion
                  ? 'none'
                  : `batFlapFast ${b.flapSpeed}s ease-in-out ${0.03 * idx}s infinite`,
              }}
            >
              <g transform="translate(0,4)">
                {/* stronger fill and increased opacity for visibility */}
                <path
                  d="M2 20 C10 10 18 12 28 18 C34 22 40 22 46 18 C56 12 62 10 62 10 L60 8 C55 12 48 12 40 16 C36 18 30 18 24 14 C18 10 12 8 6 10 Z"
                  fill="rgba(16,17,20,0.98)"
                  opacity="0.98"
                />
                {/* more pronounced purple rim stroke for contrast */}
                <path
                  d="M2 20 C10 10 18 12 28 18 C34 22 40 22 46 18 C56 12 62 10 62 10 L60 8 C55 12 48 12 40 16 C36 18 30 18 24 14 C18 10 12 8 6 10 Z"
                  fill="none"
                  stroke="rgba(167,139,250,0.42)"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {/* feather-smoke trail: increased opacity and size for visibility */}
                <g
                  style={{
                    transformOrigin: '8% 50%',
                    willChange: 'transform, opacity',
                    pointerEvents: 'none',
                    animation: prefersReducedMotion ? 'none' : `${trailAnim} ${b.duration * 0.85}s linear ${b.delay}s infinite`,
                  }}
                >
                  <ellipse cx="6" cy="18" rx="8" ry="3.8" fill="rgba(167,139,250,0.18)" />
                  <ellipse cx="0" cy="14" rx="12" ry="5" fill="rgba(167,139,250,0.14)" />
                  <ellipse cx="-10" cy="10" rx="14" ry="6" fill="rgba(167,139,250,0.11)" />
                </g>
              </g>
            </svg>
          </motion.div>
          </div>
        );
      })}

      {/* ---------- Main content (unchanged) ---------- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* Overline */}
        <motion.div
          className="mb-6 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p
            className="text-xs md:text-sm uppercase tracking-[0.35em]"
            style={{
              color: '#C4B5FD',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            24-Hour Internal Hackathon
          </p>

          <div
            className="h-px w-24"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(124,58,237,0.7), transparent)',
            }}
          />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6"
          style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.span
            animate={{
              textShadow: [
                '0 0 30px rgba(124, 58, 237, 0.3)',
                '0 0 60px rgba(124, 58, 237, 0.5)',
                '0 0 30px rgba(124, 58, 237, 0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            BUILD.
          </motion.span>{' '}
          <motion.span
            style={{ color: '#7C3AED' }}
            animate={{
              textShadow: [
                '0 0 30px rgba(124, 58, 237, 0.5)',
                '0 0 80px rgba(124, 58, 237, 0.8)',
                '0 0 30px rgba(124, 58, 237, 0.5)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            BREAK.
          </motion.span>{' '}
          <motion.span
  style={{
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
  }}
  whileHover="hover"
  whileTap="tap"
  variants={{
    hover: {
      color: '#A78BFA',
      fontFamily: 'Syne, sans-serif',
    },
    tap: {
      scale: 0.97,
      opacity: 0.85,
    },
  }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
>
  REPEAT.
  {/* underline loop */}
  <motion.span
    aria-hidden
    variants={{
      hover: { scaleX: 1 },
      tap: { scaleX: 0 },
    }}
    transition={{ duration: 0.35, ease: 'easeInOut' }}
    style={{
      position: 'absolute',
      left: 0,
      bottom: '-6px',
      height: '2px',
      width: '100%',
      background:
        'linear-gradient(90deg, transparent, #A78BFA, transparent)',
      transformOrigin: 'left',
      scaleX: 0,
    }}
  />
</motion.span>

        </motion.h1>

        {/* Subheading */}
        <motion.div
          className="max-w-3xl mx-auto mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{
              color: '#D1D5DB',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            An internal <span style={{ color: '#A78BFA', fontWeight: 500 }}>24-hour hackathon</span> by{' '}
            <span style={{ color: '#F3F4F6', fontWeight: 600 }}>
              Geeta Technical Hub
            </span>{' '}
            in collaboration with{' '}
            <span style={{ color: '#F3F4F6', fontWeight: 600 }}>
              School of Computer Science & Engineering
            </span>
          </p>

          {/* Divider */}
          <div
            className="mx-auto my-4 h-px w-20"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)',
            }}
          />

          <p
            className="text-sm uppercase tracking-[0.25em]"
            style={{
              color: '#A78BFA',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            Geeta University • May 2026
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <motion.button
            onClick={onRegisterClick}
            className="px-10 py-4 rounded-full text-base font-semibold"
            style={{
              color: '#FFFFFF',
              background:
                'linear-gradient(180deg, #8B5CF6 0%, #7C3AED 55%, #6D28D9 100%)',
              boxShadow:
                '0 10px 30px rgba(124, 58, 237, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
            }}
            whileHover={{
              boxShadow: '0 14px 40px rgba(124, 58, 237, 0.5)',
            }}
            whileTap={{ scale: 0.98 }}
            data-testid="hero-register-btn"
          >
            Register Now
          </motion.button>

          <motion.button
            onClick={scrollToTracks}
            className="px-10 py-4 rounded-full text-base font-semibold backdrop-blur-sm"
            style={{
              color: '#E5E7EB',
              backgroundColor: 'rgba(124, 58, 237, 0.08)',
              border: '1px solid rgba(124, 58, 237, 0.5)',
              boxShadow: 'inset 0 0 0 rgba(0,0,0,0)',
            }}
            whileHover={{
              backgroundColor: 'rgba(124, 58, 237, 0.14)',
              borderColor: '#7C3AED',
              color: '#FFFFFF',
            }}
            whileTap={{ scale: 0.98 }}
            data-testid="hero-explore-btn"
          >
            Explore Tracks
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;