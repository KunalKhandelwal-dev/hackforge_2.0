import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Linkedin } from 'lucide-react';

const studentMentors = [
  {
    name: 'Nitish',
    role: '4th Year',
    image: './images/team/nitish.png',
    linkedin: 'https://www.linkedin.com/in/nitish315',
  },
  {
    name: 'Shravya',
    role: '3rd Year',
    image: './images/team/shravya.png',
    linkedin: 'https://www.linkedin.com/in/shravyatrey315',
  },
  {
    name: 'Sahil',
    role: '2nd Year',
    image: './images/team/sahil.png',
    linkedin: 'https://www.linkedin.com/in/sahil-bhardwaj-1b1672320/',
  },
  {
    name: 'Suryansh',
    role: '2nd Year',
    image: './images/team/suryansh.png',
    linkedin: 'https://www.linkedin.com/in/suryansh-saini-216712292/',
  },
];

const coreTeam = [
  {
    name: 'Kunal Khandelwal',
    role: '2nd Year',
    image: './images/team/kunal.png',
    linkedin: 'https://www.linkedin.com/in/kunal-khandelwal-62a5b1311/',
  },
  {
    name: 'Muskan Kaushik',
    role: '2nd Year',
    image: './images/team/muskan.png',
    linkedin: 'https://www.linkedin.com/in/kaushikmuskan29',
  },
  {
    name: 'Riya',
    role: '2nd Year',
    image: './images/team/riya.png',
    linkedin: 'https://www.linkedin.com/in/riya-rana-b752a6327/',
  },
  {
    name: 'Nera',
    role: '2nd Year',
    image: './images/team/nera.png',
    linkedin: 'https://www.linkedin.com/in/nera123',
  },
  {
    name: 'Mimansha',
    role: '2nd Year',
    image: './images/team/mimansha.png',
    linkedin: 'https://www.linkedin.com/in/mimansha-yadav-764434322/',
  },
  {
    name: 'Joyal',
    role: '2nd Year',
    image: './images/team/mimansha.png',
    linkedin: 'https://www.linkedin.com/in/mimansha-yadav-764434322/',
  },
  {
    name: 'Krishna',
    role: '1st Year',
    image: './images/team/krishna.png',
    linkedin: 'https://www.linkedin.com/in/krishna-gupta-890147374',
  },
  {
    name: 'Janvi',
    role: '1st Year',
    image: './images/team/janvi.png',
    linkedin: 'https://www.linkedin.com/in/janvi-devi-90550537',
  },
  {
    name: 'Lakshay',
    role: '1st Year',
    image: './images/team/lakshay.png',
    linkedin: 'https://www.linkedin.com/in/lakshay-mittal-699a00389',
  },
  {
    name: 'Drishti',
    role: '1st Year',
    image: './images/team/dhristi.png',
    linkedin: 'https://www.linkedin.com/in/drishti-jaspal-52678037',
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
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <motion.div
          className="p-6 rounded-2xl text-center"
          style={{
            backgroundColor: 'rgba(26, 11, 46, 0.4)',
            border: '1px solid rgba(124, 58, 237, 0.15)',
          }}
          whileHover={{
            y: -8,
            borderColor: 'rgba(124, 58, 237, 0.4)',
            boxShadow: '0 10px 40px rgba(124, 58, 237, 0.15)',
          }}
        >
          {/* Avatar */}
          <motion.div
            className="-mt-4 mx-auto rounded-full overflow-hidden mb-6 w-28 h-28 md:w-32 md:h-32"
            style={{
              border: '3px solid rgba(124, 58, 237, 0.6)',
              boxShadow: '0 0 30px rgba(124, 58, 237, 0.45)',
            }}
            whileHover={{
              scale: 1.08,
              boxShadow: '0 0 45px rgba(124, 58, 237, 0.75)',
            }}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(1.08) contrast(1.05)' }}
              loading="lazy"
            />
          </motion.div>

          <h3
            className="text-lg font-bold mb-1"
            style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
          >
            {member.name}
          </h3>

          <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>
            {member.role}
          </p>

          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center mx-auto mt-2 w-12 h-12 rounded-full"
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
              style={{ width: '26px', height: '26px' }}
            />
          </a>
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