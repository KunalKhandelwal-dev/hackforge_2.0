import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Linkedin } from 'lucide-react';

const studentMentors = [
  {
    name: 'Nitish',
    role: 'BTech 4th Year',
    image: './images/team/nitish.webp',
    linkedin: 'https://www.linkedin.com/in/nitish315',
  },
  {
    name: 'Shravya',
    role: 'BTech 3rd Year',
    image: './images/team/shravya.webp',
    linkedin: 'https://www.linkedin.com/in/shravyatrey315',
  },
  {
    name: 'Sahil',
    role: 'BTech 2nd Year',
    image: './images/team/sahil.webp',
    linkedin: 'https://www.linkedin.com/in/sahil-bhardwaj-1b1672320/',
  },
  {
    name: 'Suryansh',
    role: 'BTech 2nd Year',
    image: './images/team/suryansh.webp',
    linkedin: 'https://www.linkedin.com/in/suryansh-saini-216712292/',
  },
  {
    name: 'Pranshul Thareja',
    role: 'MCA 1st Year',
    image: './images/team/pranshul.webp',
    linkedin: 'https://www.linkedin.com/in/pranshul-threja-4a278237a/',
  },
];

const coreTeam = [
  {
    name: 'Kunal Khandelwal',
    role: 'BTech 2nd Year',
    image: './images/team/kunal.webp',
    linkedin: 'https://www.linkedin.com/in/kunal-khandelwal-62a5b1311/',
  },
  {
    name: 'Muskan Kaushik',
    role: 'BTech 2nd Year',
    image: './images/team/muskan.webp',
    linkedin: 'https://www.linkedin.com/in/kaushikmuskan29',
  },
  {
    name: 'Riya',
    role: 'BTech 2nd Year',
    image: './images/team/riya.webp',
    linkedin: 'https://www.linkedin.com/in/riya-rana-b752a6327/',
  },
  {
    name: 'Nera',
    role: 'BTech 2nd Year',
    image: './images/team/nera.webp',
    linkedin: 'https://www.linkedin.com/in/nera123',
  },
  {
    name: 'Mimansha',
    role: 'BTech 2nd Year',
    image: './images/team/mimansha.webp',
    linkedin: 'https://www.linkedin.com/in/mimansha-yadav-764434322/',
  },
  {
    name: 'Joyal',
    role: 'BTech 2nd Year',
    image: './images/team/joyal.webp',
    linkedin: 'https://www.linkedin.com/in/joyal-sandhu-a92111216',
  },
  {
    name: 'Garima',
    role: 'MCA 1st Year',
    image: './images/team/garima.webp',
    linkedin: 'https://www.linkedin.com/in/garima-malik-5b2842291',
  },
  {
    name: 'Khushi Saini',
    role: 'MCA 1st Year',
    image: './images/team/khushi.webp',
    linkedin: 'https://www.linkedin.com/in/khushi-saini-84b87b263',
  },
  {
    name: 'Jiya Sukhija',
    role: 'MCA 1st Year',
    image: './images/team/jiya.webp',
    linkedin: 'https://www.linkedin.com/in/jiya-sukhija-170603j/',
  },
  {
    name: 'Vibha',
    role: 'MCA 1st Year',
    image: './images/team/vibha.webp',
    linkedin: 'https://www.linkedin.com/in/vibha-arora-183221389/',
  },
  {
    name: 'Krishna',
    role: 'BTech 1st Year',
    image: './images/team/krishna.webp',
    linkedin: 'https://www.linkedin.com/in/krishna-gupta-890147374',
  },
  {
    name: 'Janvi',
    role: 'BTech 1st Year',
    image: './images/team/janvi.webp',
    linkedin: 'https://www.linkedin.com/in/janvi-devi-90550537a/',
  },
  {
    name: 'Lakshay',
    role: 'BTech 1st Year',
    image: './images/team/lakshay.webp',
    linkedin: 'https://www.linkedin.com/in/lakshay-mittal-699a00389',
  },
  {
    name: 'Drishti',
    role: 'BTech 1st Year',
    image: './images/team/dhristi.webp',
    linkedin: 'https://www.linkedin.com/in/drishti-jaspal-52678037a/',
  },
];

const TeamGrid = ({ data, isInView }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {data.map((member, index) => (
      <motion.div
        key={member.name + index}
        className="group relative"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08 }}
      >
        <motion.div
          className="p-6 rounded-2xl text-center"
          style={{
            backgroundColor: 'rgba(26, 11, 46, 0.4)',
            border: '1px solid rgba(124, 58, 237, 0.15)',
          }}
          whileHover={{
            y: -6,
            borderColor: 'rgba(124, 58, 237, 0.35)',
            boxShadow: '0 8px 30px rgba(124, 58, 237, 0.12)',
          }}
        >
          {/* Avatar (fixed ratio = no layout shift) */}
          <motion.div
            className="mx-auto mb-6 w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden"
            style={{
              border: '3px solid rgba(124, 58, 237, 0.6)',
              boxShadow: '0 0 24px rgba(124, 58, 237, 0.35)',
            }}
            whileHover={{ scale: 1.06 }}
          >
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* 🔽 2×2 GRID INFO LAYOUT */}
          <div className="grid grid-cols-2 grid-rows-2 items-center gap-y-2 gap-x-2 text-left">
            {/* Name */}
            <h3
              className="col-span-2 text-center text-lg font-bold"
              style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
            >
              {member.name}
            </h3>

            {/* Role */}
            <p
              className="col-span-1 text-sm truncate"
              style={{ color: '#9CA3AF' }}
            >
              {member.role}
            </p>

            {/* LinkedIn Icon */}
            <div className="col-span-1 flex justify-end">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(124, 58, 237, 0.15)',
                  border: '1px solid rgba(124, 58, 237, 0.4)',
                }}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/qgebwute.json"
                  trigger="loop"
                  delay="2000"
                  colors="primary:#ffffff,secondary:#ffffff"
                  style={{ width: '22px', height: '22px' }}
                />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    ))}
  </div>
);

export const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="team"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: '#0F0518' }}
      data-testid="team-section"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(124, 58, 237, 0.08) 0%, transparent 50%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header - Meet The Crew (Centered) */}
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
    Meet The Crew
  </motion.p>

  <h2
    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold"
    style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
  >
    Organizing <span style={{ color: '#7C3AED' }}>Team</span>
  </h2>

  <motion.p
    className="mt-6 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed"
    style={{ color: '#9CA3AF' }}
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.1 }}
  >
    HackForge 2.0 is powered by two dedicated groups — the core team driving
    the vision, planning, and execution of the event, and the student mentors
    who supported the team and helped make this hackathon a reality.
  </motion.p>
</motion.div>


        {/* Student Mentors Section (Left-aligned) */}
        <motion.div
          className="mt-20 mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-4"
            style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
          >
            Student <span style={{ color: '#7C3AED' }}>Mentors</span>
          </h2>

          <motion.p
            className="text-sm sm:text-base leading-relaxed max-w-3xl"
            style={{ color: '#9CA3AF' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            Student mentors who supported the core team and contributed across planning,
  coordination, and on-ground execution to make HackForge possible.
          </motion.p>
        </motion.div>

        {/* Student Mentors Grid */}
        <TeamGrid data={studentMentors} isInView={isInView} />

        {/* Core Team Section (Left-aligned) */}
        <motion.div
          className="mt-20 mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-4"
            style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
          >
            Core <span style={{ color: '#7C3AED' }}>Committee</span>
          </h2>

          <motion.p
            className="text-sm sm:text-base leading-relaxed max-w-3xl"
            style={{ color: '#9CA3AF' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
             The core team behind HackForge 2.0 — leading strategy, building the platform,
  managing operations, and executing every detail from idea to launch.
          </motion.p>
        </motion.div>

        {/* Core Team Grid */}
        <TeamGrid data={coreTeam} isInView={isInView} />

        {/* GTH & SCSE Credit */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm" style={{ color: '#9CA3AF' }}>
            Organized by{' '}
            <span style={{ color: '#A78BFA' }}>Geeta Technical Hub</span> &{' '}
            <span style={{ color: '#A78BFA' }}>School of Computer Science & Engineering</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;