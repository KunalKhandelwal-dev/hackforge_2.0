import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Building2, Zap, Target } from 'lucide-react';
import { toast } from 'sonner';

const tracks = [
  {
    Icon: GraduationCap,
    title: 'EdTech Solutions',
    description:
      'Design innovative learning platforms, personalized education tools, and smart assessment systems that transform how students learn.',
    color: '#8B5CF6',
    lightColor: '#C4B5FD',
    gradient: 'from-purple-500/20 to-blue-500/20',
    features: ['Learning Platforms', 'Assessment Tools', 'Student Analytics'],
  },
  {
    Icon: Building2,
    title: 'Smart Campus Solutions',
    description:
      'Solve campus challenges with automation, student services, smart utilities, and digital learning systems for a connected campus.',
    color: '#A78BFA',
    lightColor: '#DDD6FE',
    gradient: 'from-purple-400/20 to-pink-500/20',
    features: ['Campus Automation', 'Student Services', 'Smart Utilities'],
  },
];

export const Tracks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleLearnMore = () => {
    toast.info('📋 Problem Statements will be released on the hackathon day!', {
      duration: 4000,
      style: {
        background: 'rgba(139, 92, 246, 0.95)',
        border: '1px solid rgba(168, 139, 250, 0.5)',
        color: '#F3F4F6',
      },
    });
  };

  return (
    <section
      id="tracks"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#0F0518' }}
      data-testid="tracks-section"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #A78BFA 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          className="text-center mb-20 md:mb-28"
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 bg-clip-text text-transparent"
            style={{
              fontFamily: 'Syne, sans-serif',
              backgroundImage: 'linear-gradient(135deg, #F3F4F6 0%, #DDD6FE 100%)',
            }}
          >
            Hackathon <span style={{ color: '#8B5CF6' }}>Tracks</span>
          </h2>

          <motion.p
            className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ color: '#CBD5E1' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Pick a track that aligns with your passion and build something amazing. Both tracks welcome innovative solutions that create real impact.
          </motion.p>
        </motion.div>

        {/* Tracks grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {tracks.map((track, index) => (
            <motion.div
              key={track.title}
              className="group relative"
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Gradient border effect on hover */}
              <div
                className="absolute inset-0 rounded-3xl p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${track.color} 0%, #A78BFA 100%)`,
                }}
              />

              <div
                className="relative h-full p-8 md:p-10 rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-500"
                style={{
                  backgroundColor: 'rgba(15, 5, 24, 0.8)',
                  border: '1px solid rgba(124, 58, 237, 0.2)',
                }}
              >
                {/* Animated gradient overlay on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${track.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Content container */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon with badge */}
                  <motion.div
                    className="mb-8 flex items-start justify-between"
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:shadow-2xl"
                      style={{
                        backgroundColor: `${track.color}20`,
                        border: `2px solid ${track.color}40`,
                      }}
                    >
                      <track.Icon size={32} style={{ color: track.color }} />
                    </div>
                    <div
                      className="px-4 py-2 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: `${track.color}15`,
                        border: `1px solid ${track.color}40`,
                        color: track.color,
                      }}
                    >
                      Featured
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3
                    className="text-2xl md:text-3xl font-black mb-4 transition-colors duration-300"
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      color: '#F3F4F6',
                    }}
                  >
                    {track.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-base leading-relaxed flex-grow mb-6"
                    style={{ color: '#CBD5E1' }}
                  >
                    {track.description}
                  </p>

                  {/* Features list */}
                  <div className="space-y-2 mb-8">
                    {track.features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.15 + idx * 0.05 }}
                      >
                        <Zap
                          size={16}
                          style={{ color: track.color }}
                        />
                        <span className="text-sm" style={{ color: '#A1A5AF' }}>
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    onClick={handleLearnMore}
                    className="w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden group/btn"
                    style={{
                      backgroundColor: track.color,
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    data-testid={`track-learn-more-${index}`}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" style={{ backgroundColor: '#000' }} />
                    <span className="relative flex items-center justify-center gap-2">
                      Learn More
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>
                </div>

                {/* Animated corner accent */}
                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${track.color}20 0%, transparent 70%)`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p style={{ color: '#64748B' }} className="text-sm md:text-base">
            Can't decide? <span style={{ color: '#8B5CF6' }} className="font-semibold">Both tracks welcome any innovative solution</span> that creates impact for education
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Tracks;