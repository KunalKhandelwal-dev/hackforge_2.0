import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, Coffee, Code, Presentation, Trophy } from 'lucide-react';

const timelineEvents = [
  {
    time: '9:00 AM',
    title: 'Registration & Check-in',
    description: 'Arrive, register, and get your swag kit. Meet your team members.',
    icon: 'https://cdn.lordicon.com/abgtphux.json', // calendar
  },
  {
    time: '10:00 AM',
    title: 'Opening Ceremony',
    description: 'Welcome address, rules briefing, and track announcements.',
    icon: 'https://cdn.lordicon.com/ylvuooxd.json', // presentation
  },
  {
    time: '11:00 AM',
    title: 'Hacking Begins',
    description: 'The clock starts! 24 hours to build something amazing.',
    icon: 'https://cdn.lordicon.com/qhgmphtg.json', // code
  },
  {
    time: '1:00 PM',
    title: 'Lunch Break',
    description: 'Refuel with delicious food while discussing ideas.',
    icon: 'https://cdn.lordicon.com/zpxybbhl.json', // coffee
  },
  {
    time: '6:00 PM',
    title: 'Mentorship Sessions',
    description: 'Get guidance from industry experts and mentors.',
    icon: 'https://cdn.lordicon.com/aklfruoc.json', // clock
  },
  {
    time: '11:00 AM (Day 2)',
    title: 'Hacking Ends',
    description: 'Final commit! Prepare your demos and presentations.',
    icon: 'https://cdn.lordicon.com/qhgmphtg.json', // code again
  },
  {
    time: '12:00 PM',
    title: 'Project Demos',
    description: 'Present your creations to the judges and audience.',
    icon: 'https://cdn.lordicon.com/ylvuooxd.json', // presentation
  },
  {
    time: '3:00 PM',
    title: 'Awards Ceremony',
    description: 'Winners announced and prizes distributed.',
    icon: 'https://cdn.lordicon.com/odavpkmb.json', // trophy
  },
];


export const Timeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="timeline"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: '#0F0518' }}
      data-testid="timeline-section"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(124, 58, 237, 0.08) 0%, transparent 50%)',
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
            The Journey
          </motion.p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold"
            style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
          >
            Event <span style={{ color: '#7C3AED' }}>Timeline</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5"
            style={{ backgroundColor: 'rgba(124, 58, 237, 0.2)' }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          {/* Events */}
          <div className="space-y-8 md:space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                className={`relative flex items-start gap-6 md:gap-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2"
                  style={{
                    backgroundColor: '#7C3AED',
                    boxShadow: '0 0 20px rgba(124, 58, 237, 0.6)',
                  }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                />

                {/* Content card */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
                  }`}
                >
                  <motion.div
                    className="p-6 rounded-xl"
                    style={{
                      backgroundColor: 'rgba(26, 11, 46, 0.4)',
                      border: '1px solid rgba(124, 58, 237, 0.15)',
                    }}
                    whileHover={{
                      borderColor: 'rgba(124, 58, 237, 0.4)',
                      boxShadow: '0 0 25px rgba(124, 58, 237, 0.5)',
                    }}
                    data-testid={`timeline-event-${index}`}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <motion.div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(124, 58, 237, 0.15)' }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <div
  className="w-11 h-11 rounded-lg flex items-center justify-center"
  style={{
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    border: '1px solid rgba(124, 58, 237, 0.3)',
    
  }}
>
  <lord-icon
    src={event.icon}
    trigger="loop"
    delay="2000"
    colors="primary:#A78BFA,secondary:#7C3AED"
    style={{
      width: '26px',
      height: '26px',
    }}
  />
</div>

                      </motion.div>
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: '#7C3AED',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        {event.time}
                      </span>
                    </div>
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-sm" style={{ color: '#9CA3AF' }}>
                      {event.description}
                    </p>
                  </motion.div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
