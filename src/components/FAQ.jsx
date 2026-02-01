import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

const faqs = [
  {
    question: 'Who can participate in HackForge 2.0?',
    answer: 'HackForge 2.0 is an internal hackathon open to all students of Geeta University. Whether you\'re from Computer Science, Electronics, or any other department, you\'re welcome to participate!',
  },
  {
    question: 'Do I need a team to participate?',
    answer: 'Teams can have 2-4 members. If you don\'t have a team, don\'t worry! We\'ll have a team formation session where you can find like-minded participants to team up with.',
  },
  {
    question: 'What should I bring?',
    answer: 'Bring your laptop, charger, and any hardware you might need for your project. We\'ll provide food, snacks, and a comfortable hacking environment.',
  },
  {
    question: 'Do I need prior hackathon experience?',
    answer: 'Not at all! HackForge welcomes participants of all skill levels. We\'ll have mentors to guide you through the process and workshops to help you learn new skills.',
  },
  {
    question: 'What can I build?',
    answer: 'You can build anything within the given tracks - AI/ML projects, Web3 applications, HealthTech solutions, or any innovative idea. The only limit is your imagination!',
  },
  {
    question: 'Will there be food and refreshments?',
    answer: 'Yes! We\'ll provide meals, snacks, and beverages throughout the 24-hour hackathon. Caffeine lovers, we\'ve got you covered!',
  },
  {
    question: 'How will projects be judged?',
    answer: 'Projects will be evaluated based on innovation, technical complexity, design, presentation, and real-world applicability. Our panel of judges includes industry experts and faculty members.',
  },
  {
    question: 'Is there any registration fee?',
    answer: 'No, participation is completely free for all Geeta University students. Just register, show up, and start building!',
  },
];

export const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="faqs"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: '#050208' }}
      data-testid="faq-section"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative max-w-4xl mx-auto px-6 md:px-12">
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
            Got Questions?
          </motion.p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold"
            style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
          >
            Frequently Asked <span style={{ color: '#7C3AED' }}>Questions</span>
          </h2>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl overflow-hidden border-0"
                style={{
                  backgroundColor: 'rgba(26, 11, 46, 0.4)',
                  border: '1px solid rgba(124, 58, 237, 0.15)',
                }}
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger
                  className="px-6 py-5 hover:no-underline text-left"
                  style={{ color: '#F3F4F6' }}
                >
                  <span
                    className="font-semibold text-base"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent
                  className="px-6 pb-5"
                  style={{ color: '#9CA3AF' }}
                >
                  <p className="text-sm leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>
            Still have questions?
          </p>
          <motion.a
            href="mailto:hackforge@geetauniversity.edu.in"
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
            data-testid="faq-contact-btn"
          >
            Contact Us
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
