import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Linkedin } from 'lucide-react';

const team = [
  {
    name: 'Dr. Priya Sharma',
    role: 'Faculty Coordinator',
    image: 'PS',
    linkedin: '#',
  },
  {
    name: 'Kunal Khandelwal',
    role: 'Technical Lead',
    image: './images/team/kunal.png',
    linkedin: 'https://www.linkedin.com/in/kunal-khandelwal-62a5b1311/',
  },
  {
    name: 'Ananya Singh',
    role: 'Design Lead',
    image: 'AS',
    linkedin: '#',
  },
  {
    name: 'Vikram Patel',
    role: 'Operations Head',
    image: 'VP',
    linkedin: '#',
  },
  {
    name: 'Neha Gupta',
    role: 'Sponsorship Lead',
    image: 'NG',
    linkedin: '#',
  },
  {
    name: 'Arjun Mehta',
    role: 'Marketing Lead',
    image: 'AM',
    linkedin: '#',
  },
  {
    name: 'Kavita Reddy',
    role: 'Content Lead',
    image: 'KR',
    linkedin: '#',
  },
  {
    name: 'Sanjay Kumar',
    role: 'Logistics Head',
    image: 'SK',
    linkedin: '#',
  },
];

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
            Meet The Crew
          </motion.p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold"
            style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
          >
            Organizing <span style={{ color: '#7C3AED' }}>Team</span>
          </h2>
        </motion.div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              data-testid={`team-member-${index}`}
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
  className="-mt-4 mx-auto rounded-full overflow-hidden mb-6
             w-28 h-28 md:w-32 md:h-32"
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
    style={{
      filter: 'brightness(1.08) contrast(1.05)',
    }}
  />
</motion.div>



                {/* Name */}
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
                >
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>
                  {member.role}
                </p>

                {/* LinkedIn icon */}
                <a
  href={member.linkedin}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center mx-auto mt-2
             w-12 h-12 rounded-full"
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

    style={{
      width: '26px',
      height: '26px',
    }}
  />
</a>

              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* GTH & SCSE Credit */}
        <motion.div
          className="mt-16 text-center"
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
