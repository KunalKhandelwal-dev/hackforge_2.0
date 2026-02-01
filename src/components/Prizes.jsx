import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Medal, Award, Star } from 'lucide-react';

const prizes = [
  {
    position: '1st',
    title: 'Grand Champion',
    amount: 25000,
    Icon: Trophy,
    color: '#FFD700',
    perks: ['Trophy', 'Certificates', 'Internship Opportunity'],
  },
  {
    position: '2nd',
    title: 'First Runner-up',
    amount: 15000,
    Icon: Medal,
    color: '#C0C0C0',
    perks: ['Trophy', 'Certificates', 'Goodies'],
  },
  {
    position: '3rd',
    title: 'Second Runner-up',
    amount: 10000,
    Icon: Award,
    color: '#CD7F32',
    perks: ['Trophy', 'Certificates', 'Goodies'],
  },
];

const trackPrizes = [
  { track: 'Best AI Project', amount: 5000 },
  { track: 'Best UI/UX', amount: 5000 },
  { track: 'Most Innovative', amount: 5000 },
  { track: 'People\'s Choice', amount: 5000 },
];

const AnimatedNumber = ({ value, isInView }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
      {displayValue.toLocaleString()}
    </span>
  );
};

export const Prizes = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="prizes"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: '#050208' }}
      data-testid="prizes-section"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(124, 58, 237, 0.1) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: '#7C3AED' }}
          >
            What You Win
          </motion.p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold"
            style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
          >
            Prizes Worth <span style={{ color: '#7C3AED' }}>₹50,000+</span>
          </h2>
        </motion.div>

        {/* Main prizes */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {prizes.map((prize, index) => (
            <motion.div
              key={prize.position}
              className={`relative p-8 rounded-2xl text-center ${
                index === 0 ? 'md:-mt-4 md:scale-105' : ''
              }`}
              style={{
                backgroundColor: 'rgba(15, 5, 24, 0.6)',
                border: '1px solid rgba(124, 58, 237, 0.2)',
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{
                borderColor: prize.color,
                boxShadow: `0 0 40px ${prize.color}30`,
              }}
              data-testid={`prize-card-${index}`}
            >
              {/* Icon */}
              <motion.div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  backgroundColor: 'rgba(124, 58, 237, 0.1)',
                  border: `2px solid ${prize.color}50`,
                }}
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <prize.Icon size={36} style={{ color: prize.color }} />
              </motion.div>

              {/* Position badge */}
              <div
                className="inline-block px-4 py-1 rounded-full text-sm font-bold mb-4"
                style={{
                  backgroundColor: `${prize.color}15`,
                  color: prize.color,
                  border: `1px solid ${prize.color}30`,
                }}
              >
                {prize.position} Place
              </div>

              {/* Title */}
              <h3
                className="text-xl font-bold mb-4"
                style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
              >
                {prize.title}
              </h3>

              {/* Amount */}
              <div className="mb-6">
                <span className="text-sm" style={{ color: '#9CA3AF' }}>₹</span>
                <span
                  className="text-4xl font-bold"
                  style={{ color: '#7C3AED' }}
                >
                  <AnimatedNumber value={prize.amount} isInView={isInView} />
                </span>
              </div>

              {/* Perks */}
              <div className="space-y-2">
                {prize.perks.map((perk, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center gap-2 text-sm"
                    style={{ color: '#9CA3AF' }}
                  >
                    <Star size={12} style={{ color: '#7C3AED' }} />
                    {perk}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Track prizes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3
            className="text-center text-xl font-bold mb-8"
            style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
          >
            Special Category Awards
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trackPrizes.map((item, index) => (
              <motion.div
                key={item.track}
                className="p-5 rounded-xl text-center"
                style={{
                  backgroundColor: 'rgba(26, 11, 46, 0.4)',
                  border: '1px solid rgba(124, 58, 237, 0.15)',
                }}
                whileHover={{
                  borderColor: 'rgba(124, 58, 237, 0.4)',
                  y: -3,
                }}
                data-testid={`track-prize-${index}`}
              >
                <p className="text-sm mb-2" style={{ color: '#D1D5DB' }}>
                  {item.track}
                </p>
                <p className="text-2xl font-bold" style={{ color: '#A78BFA' }}>
                  ₹{item.amount.toLocaleString()}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
