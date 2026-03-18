import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const Hero = ({ onRegisterClick }) => {
  const videoRef = useRef(null);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const isScrolling = useRef(false)
const scrollTimeout = useRef(null)
const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

const springX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.4 });
const springY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.4 });

const batX = useTransform(springX, [-0.5, 0.5], [12, -12]);
const batY = useTransform(springY, [-0.5, 0.5], [12, -12]);

useEffect(() => {
  const handleScroll = () => {
    isScrolling.current = true

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current)
    }

    scrollTimeout.current = setTimeout(() => {
      isScrolling.current = false
    }, 120) // scrolling stops after 120ms
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}, [])

  // Throttled mouse move handler
  useEffect(() => {
    let throttleTimer = null;

   const handleMouseMove = (e) => {
  if (isScrolling.current) return;

  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;

  mouseX.set(x);
  mouseY.set(y);
};

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Video optimization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoReady(true);
      video.playbackRate = 1.6;
      video.play().catch(() => {
        console.log('Auto-play prevented, waiting for user interaction');
      });
    };

    const handleLoadedData = () => {
      video.play().catch(() => {
        console.log('Auto-play prevented');
      });
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  const triggerEasterEgg = useCallback(() => {
    setEasterEggActive(true);
    console.log('🦇 Easter Egg Found!');
    setTimeout(() => {
      setEasterEggActive(false);
    }, 1200);
  }, []);

  const scrollToTracks = useCallback(() => {
    const element = document.querySelector('#tracks');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const batCount = isMobile ? 6 : 12; // Reduced from 10/18

  const bats = useMemo(() => {
    return Array.from({ length: batCount }).map((_, i) => {
      const dir = Math.random() > 0.5 ? 'ltr' : 'rtl';
      return {
        id: `bat-${i}`,
        top: `${5 + Math.random() * 65}%`,
        delay: Math.random() * 2,
        duration: 16 + Math.random() * 18,
        scale: (isMobile ? 0.6 : 0.8) + Math.random() * 0.5,
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

      {/* Background video - Optimized for performance */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          zIndex: 0,
          transform: 'translateZ(0)',
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          pointerEvents: 'none',
          opacity: videoReady ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out',
        }}
      >
        <source 
          src="/videos/bg-hero-hackforge.mp4" 
          type="video/mp4"
        />
      </video>

      {/* Dark overlay - Optimized */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(5, 2, 8, 0.75)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Gradient orbs - Reduced motion impact */}
      <motion.div
        className="absolute w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
          top: '10%',
          left: '50%',
          x: '-50%',
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.1, 1],
          x: ['-50%', '-48%', '-50%'],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%)',
          bottom: '10%',
          right: '10%',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.2, 1],
          y: [0, -30, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Bat animations - Optimized */}
      <style>{`
        @keyframes batSweepA {
          0% { transform: translate3d(-18vw, 0, 0) scale(0.95) rotate(-3deg); opacity: 0; }
          4% { opacity: 1; }
          100% { transform: translate3d(118vw, 0, 0) scale(0.95) rotate(-3deg); opacity: 0; }
        }
        @keyframes batSweepB {
          0% { transform: translate3d(118vw, 0, 0) scale(0.96) rotate(5deg); opacity: 0; }
          6% { opacity: 1; }
          100% { transform: translate3d(-18vw, 0, 0) scale(0.96) rotate(5deg); opacity: 0; }
        }
        @keyframes batSweepC {
          0% { transform: translate3d(-22vw, 2vh, 0) scale(0.9) rotate(-2deg); opacity: 0; }
          5% { opacity: 1; }
          100% { transform: translate3d(118vw, 2vh, 0) scale(0.9) rotate(-2deg); opacity: 0; }
        }

        @keyframes batFlapFast {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.78); }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {bats.map((b) => {
        const pathKey = b.pathVariant === 0 ? 'batSweepA' : b.pathVariant === 1 ? 'batSweepB' : 'batSweepC';
        
        return (
          <div
            key={b.id}
            style={{
              position: 'absolute',
              left: b.dir === 'ltr' ? '-12%' : '110%',
              top: b.top,
              width: 160 * b.scale,
              height: 72 * b.scale,
              zIndex: 6,
              animation:
  prefersReducedMotion || isScrolling.current
    ? 'none'
    : `${pathKey} ${b.duration}s linear ${b.delay}s infinite`,
              contain: 'layout style paint',
            }}
          >
            <motion.div
              onClick={triggerEasterEgg}
              style={{
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                pointerEvents: 'auto',
                willChange: 'transform',
                contain: 'paint',
                x: prefersReducedMotion ? 0 : batX,
  y: prefersReducedMotion ? 0 : batY,
              }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 18,
                mass: 0.5,
              }}
            >
              <svg
                viewBox="0 0 64 32"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
                style={{
                  display: 'block',
                  willChange: 'transform',
                  transformOrigin: '50% 50%',
                  animation: prefersReducedMotion
                    ? 'none'
                    : `batFlapFast ${b.flapSpeed}s ease-in-out infinite`,
                  contain: 'style paint',
                }}
              >
                <g transform="translate(0,4)">
                  <path
                    d="M2 20 C10 10 18 12 28 18 C34 22 40 22 46 18 C56 12 62 10 62 10 L60 8 C55 12 48 12 40 16 C36 18 30 18 24 14 C18 10 12 8 6 10 Z"
                    fill="rgba(16,17,20,0.98)"
                    opacity="0.98"
                  />
                  <path
                    d="M2 20 C10 10 18 12 28 18 C34 22 40 22 46 18 C56 12 62 10 62 10 L60 8 C55 12 48 12 40 16 C36 18 30 18 24 14 C18 10 12 8 6 10 Z"
                    fill="none"
                    stroke="rgba(167,139,250,0.42)"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <g style={{ pointerEvents: 'none' }}>
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

      {/* Main content */}
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
            Geeta University • 14th & 15th April 2026
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
            className="px-10 py-4 rounded-full text-base font-semibold"
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
