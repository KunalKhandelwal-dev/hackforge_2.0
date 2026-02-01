import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const sponsors = {
  platinum: [
    { name: 'TechCorp Global', initials: 'TCG' },
    { name: 'Innovation Labs', initials: 'IL' },
  ],
  gold: [
    { name: 'CloudStack', initials: 'CS' },
    { name: 'DataFlow', initials: 'DF' },
    { name: 'CodeBase', initials: 'CB' },
  ],
  silver: [
    { name: 'DevTools', initials: 'DT' },
    { name: 'ApiNinja', initials: 'AN' },
    { name: 'ByteLogic', initials: 'BL' },
    { name: 'NetPrime', initials: 'NP' },
  ],
};

const SponsorCard = ({ sponsor, tier, index, isInView }) => {
  const sizes = {
    platinum: 'w-40 h-24 md:w-48 md:h-28',
    gold: 'w-32 h-20 md:w-40 md:h-24',
    silver: 'w-28 h-16 md:w-32 md:h-20',
  };

  const textSizes = {
    platinum: 'text-2xl md:text-3xl',
    gold: 'text-xl md:text-2xl',
    silver: 'text-lg md:text-xl',
  };

  return (
    <motion.div
      className={`${sizes[tier]} rounded-xl flex items-center justify-center cursor-pointer`}
      style={{
        backgroundColor: 'rgba(26, 11, 46, 0.4)',
        border: '1px solid rgba(124, 58, 237, 0.15)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{
        scale: 1.05,
        borderColor: 'rgba(124, 58, 237, 0.4)',
        boxShadow: '0 0 30px rgba(124, 58, 237, 0.2)',
      }}
      data-testid={`sponsor-${tier}-${index}`}
    >
      <span
        className={`${textSizes[tier]} font-bold tracking-tight`}
        style={{ fontFamily: 'Syne, sans-serif', color: '#A78BFA' }}
      >
        {sponsor.initials}
      </span>
    </motion.div>
  );
};

export const Sponsors = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="sponsors"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: '#0F0518' }}
      data-testid="sponsors-section"
    >
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: '#7C3AED' }}
          >
            Backed By The Best
          </motion.p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold"
            style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
          >
            Our <span style={{ color: '#7C3AED' }}>Sponsors</span>
          </h2>
        </motion.div>

        {/* Platinum Sponsors */}
        <div className="mb-12">
          <motion.p
            className="text-center text-sm uppercase tracking-widest mb-6"
            style={{ color: '#9CA3AF' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Platinum Partners
          </motion.p>
          <div className="flex flex-wrap justify-center gap-6">
            {sponsors.platinum.map((sponsor, index) => (
              <SponsorCard
                key={sponsor.name}
                sponsor={sponsor}
                tier="platinum"
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Gold Sponsors */}
        <div className="mb-12">
          <motion.p
            className="text-center text-sm uppercase tracking-widest mb-6"
            style={{ color: '#9CA3AF' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Gold Partners
          </motion.p>
          <div className="flex flex-wrap justify-center gap-5">
            {sponsors.gold.map((sponsor, index) => (
              <SponsorCard
                key={sponsor.name}
                sponsor={sponsor}
                tier="gold"
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Silver Sponsors */}
        <div>
          <motion.p
            className="text-center text-sm uppercase tracking-widest mb-6"
            style={{ color: '#9CA3AF' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Silver Partners
          </motion.p>
          <div className="flex flex-wrap justify-center gap-4">
            {sponsors.silver.map((sponsor, index) => (
              <SponsorCard
                key={sponsor.name}
                sponsor={sponsor}
                tier="silver"
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Become a sponsor CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>
            Interested in sponsoring HackForge 2.0?
          </p>
          <motion.a
            href="mailto:sponsors@hackforge.com"
            className="inline-block px-6 py-3 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: 'transparent',
              color: '#A78BFA',
              border: '1px solid rgba(124, 58, 237, 0.3)',
            }}
            whileHover={{
              backgroundColor: 'rgba(124, 58, 237, 0.1)',
              borderColor: 'rgba(124, 58, 237, 0.5)',
            }}
            data-testid="sponsor-cta"
          >
            Become a Sponsor
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
