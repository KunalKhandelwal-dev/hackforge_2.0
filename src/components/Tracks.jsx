import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Globe, Heart, Shield, Leaf, Gamepad2 } from 'lucide-react';

const tracks = [
  {
    Icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Build intelligent systems that learn, predict, and automate. From NLP to computer vision.',
    color: '#A78BFA',
  },
  {
    Icon: Globe,
    title: 'Web3 & Blockchain',
    description: 'Create decentralized applications, smart contracts, and innovative DeFi solutions.',
    color: '#C4B5FD',
  },
  {
    Icon: Heart,
    title: 'HealthTech',
    description: 'Develop solutions that improve healthcare access, diagnostics, and patient care.',
    color: '#7C3AED',
  },
  {
    Icon: Shield,
    title: 'Cybersecurity',
    description: 'Build tools for threat detection, encryption, and secure communication.',
    color: '#A78BFA',
  },
  {
    Icon: Leaf,
    title: 'Sustainability',
    description: 'Create technology for environmental conservation and sustainable living.',
    color: '#C4B5FD',
  },
  {
    Icon: Gamepad2,
    title: 'Open Innovation',
    description: 'Got a unique idea? Build anything that pushes boundaries and creates impact.',
    color: '#7C3AED',
  },
];

export const Tracks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="tracks"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: '#050208' }}
      data-testid="tracks-section"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(124, 58, 237, 0.08) 0%, transparent 50%)',
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
            Choose Your Path
          </motion.p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold"
            style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
          >
            Hackathon <span style={{ color: '#7C3AED' }}>Tracks</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: '#9CA3AF' }}>
            Pick a track that aligns with your passion and build something amazing
          </p>
        </motion.div>

        {/* Tracks grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, index) => (
            <motion.div
              key={track.title}
              className="group relative p-6 md:p-8 rounded-2xl overflow-hidden cursor-pointer"
              style={{
                backgroundColor: 'rgba(15, 5, 24, 0.6)',
                border: '1px solid rgba(124, 58, 237, 0.15)',
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -8,
                borderColor: track.color,
              }}
              data-testid={`track-card-${index}`}
            >
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${track.color}15 0%, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <motion.div
                className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                style={{
                  backgroundColor: 'rgba(124, 58, 237, 0.1)',
                  border: `1px solid ${track.color}30`,
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <track.Icon size={28} style={{ color: track.color }} />
              </motion.div>

              {/* Content */}
              <h3
                className="relative text-xl font-bold mb-3"
                style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
              >
                {track.title}
              </h3>
              <p className="relative text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>
                {track.description}
              </p>

              {/* Corner accent */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20"
                style={{
                  background: `linear-gradient(135deg, ${track.color}10 0%, transparent 60%)`,
                }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
