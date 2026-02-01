import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lightbulb, Users, Rocket, Trophy } from 'lucide-react';

const features = [
  {
    title: 'Innovate',
    description: 'Transform your ideas into working prototypes in just 24 hours.',
    icon: 'https://cdn.lordicon.com/nkmsrxys.json', // lightbulb / idea
  },
  {
    title: 'Collaborate',
    description: 'Team up with passionate developers, designers, and creators.',
    icon: 'https://cdn.lordicon.com/gvtjlyjf.json', // users / teamwork
  },
  {
    title: 'Launch',
    description: 'Build projects that could become your next big venture.',
    icon: 'https://cdn.lordicon.com/ilsmzilo.json', // rocket / launch
  },
  {
    title: 'Compete',
    description: 'Win exciting prizes and gain recognition for your work.',
    icon: 'https://cdn.lordicon.com/shcfcebj.json', // trophy / award
  },
];


export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: '#0F0518' }}
      data-testid="about-section"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(124, 58, 237, 0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: '#7C3AED' }}
          >
            What is HackForge?
          </motion.p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold max-w-3xl"
            style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
          >
            Where Innovation <span style={{ color: '#7C3AED' }}>Meets</span> Execution
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left column - Description */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{ color: '#D1D5DB' }}
            >
              HackForge 2.0 is a 24-hour internal hackathon organized by Geeta Technical Hub
              and the School of Computer Science & Engineering at Geeta University.
            </p>
            <p
              className="text-base md:text-lg leading-relaxed mb-8"
              style={{ color: '#9CA3AF' }}
            >
              This is not just another coding competition. It's a platform where students
              come together to ideate, build, and ship products that solve real-world problems.
              Whether you're a seasoned developer or just starting out, HackForge is your
              chance to push boundaries and create something extraordinary.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '24', label: 'Hours' },
                { value: '100+', label: 'Hackers' },
                { value: '50K+', label: 'In Prizes' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <p
                    className="text-3xl md:text-4xl font-extrabold mb-1"
                    style={{ fontFamily: 'Syne, sans-serif', color: '#7C3AED' }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs uppercase tracking-wider" style={{ color: '#9CA3AF' }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column - Feature cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-2xl"
                style={{
                  backgroundColor: 'rgba(26, 11, 46, 0.5)',
                  border: '1px solid rgba(124, 58, 237, 0.15)',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{
                  y: -5,
                  borderColor: 'rgba(124, 58, 237, 0.4)',
                  boxShadow: '0 10px 40px rgba(124, 58, 237, 0.15)',
                }}
                data-testid={`about-feature-${index}`}
              >
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'rgba(124, 58, 237, 0.15)' }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div
  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
  style={{ backgroundColor: 'rgba(124, 58, 237, 0.15)' }}
>
  <lord-icon
    src={feature.icon}
    trigger="loop"
    colors="primary:#A78BFA,secondary:#7C3AED"
    style={{
      width: '26px',
      height: '26px',
    }}
  />
</div>

                </motion.div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm" style={{ color: '#9CA3AF' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
