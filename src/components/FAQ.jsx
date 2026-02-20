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
    answer:
      'HackForge 2.0 is an internal hackathon open to all Geeta University students from any department and academic year.',
  },
  {
    question: 'What is the team size?',
    answer:
      'Each team must have 2–4 members. Inter-departmental teams are encouraged to promote collaboration.',
  },
  {
    question: 'When and where will the hackathon take place?',
    answer:
      'HackForge 2.0 will be held on 3–4 April 2026 on campus. The inauguration and final presentations will be in the F Block Auditorium, and the hacking space will be in C Block classrooms.',
  },
  {
    question: 'What is the duration and mode of the event?',
    answer:
      'It is a 24-hour offline hackathon where teams will build, submit, and present their projects on campus.',
  },
  {
    question: 'What themes will the hackathon focus on?',
    answer:
      'The hackathon will focus on EdTech and campus-centric solutions. Problem statements will be released at the start of the event.',
  },
  {
    question: 'How will projects be evaluated?',
    answer:
      'Projects will be judged on innovation, technical execution, impact, scalability, and presentation by a panel of faculty and industry experts.',
  },
  {
    question: 'Is there a registration fee?',
    answer:
      'Yes, the registration fee is ₹100 per participant.',
  },
  {
    question: 'What are the prizes and rewards?',
    answer:
      'The total prize pool is ₹10,000 with awards for the top three teams, certificates for all participants, and special certificates for the top 15 finalists.',
  },
  {
    question: 'Will food and facilities be provided?',
    answer:
      'Yes, meals, snacks, high-speed Wi-Fi, power backup, medical support, and a resting area will be available throughout the hackathon.',
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

  {/* New helper paragraph */}
  <motion.p
    className="mt-6 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
    style={{ color: '#9CA3AF' }} // soft gray like your tracks subtitle
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.1 }}
  >
    Quick answers to help you focus on building, not searching.
  </motion.p>
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
            href="mailto:codeforge@geetauniversity.edu.in"
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
