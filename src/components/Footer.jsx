import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Twitter, Instagram, Linkedin } from 'lucide-react';

const footerLinks = {
  about: [
    { name: 'About HackForge', href: '#about' },
    { name: 'Tracks', href: '#tracks' },
    { name: 'Prizes', href: '#prizes' },
    { name: 'Timeline', href: '#timeline' },
  ],
  resources: [
    { name: 'FAQs', href: '#faqs' },
    { name: 'Code of Conduct', href: '#' },
    { name: 'Judging Criteria', href: '#' },
    { name: 'Past Events', href: '#' },
  ],
  community: [
    { name: 'Team', href: '#team' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'Partners', href: '#' },
    { name: 'Contact Us', href: 'mailto:hackforge@geetauniversity.edu.in' },
  ],
};

const socialLinks = [
  {
    label: 'GitHub',
    href: '#',
    Icon: 'https://cdn.lordicon.com/jjxzcivr.json',
  },
  {
    label: 'Twitter',
    href: '#',
    Icon: 'https://cdn.lordicon.com/wlbymhoo.json',
  },
  {
    label: 'Instagram',
    href: '#',
    Icon: 'https://cdn.lordicon.com/tgyvxauj.json',
  },
  {
    label: 'LinkedIn',
    href: '#',
    Icon: 'https://cdn.lordicon.com/qgebwute.json',
  },
];


export const Footer = ({ onRegisterClick }) => {
  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      id="footer"
      className="relative pt-24 pb-12"
      style={{ backgroundColor: '#050208' }}
      data-testid="footer-section"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.3), transparent)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <motion.h3
              className="text-2xl font-extrabold mb-4"
              style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
              whileHover={{ scale: 1.02 }}
            >
              HackForge <span style={{ color: '#7C3AED' }}>2.0</span>
            </motion.h3>
            <p className="text-sm mb-6" style={{ color: '#9CA3AF' }}>
              A 24-hour hackathon where innovation meets execution. Build. Break. Repeat.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="mailto:hackforge@geetauniversity.edu.in"
                className="flex items-center gap-3 text-sm hover:text-white transition-colors"
                style={{ color: '#9CA3AF' }}
              >
                <lord-icon
  src="https://cdn.lordicon.com/aycieyht.json" // mail
  trigger="loop"
  colors="primary:#7C3AED,secondary:#A78BFA"
  style={{ width: '18px', height: '18px' }}
/>

                hackforge@geetauniversity.edu.in
              </a>
              <a
                href="tel:+911234567890"
                className="flex items-center gap-3 text-sm hover:text-white transition-colors"
                style={{ color: '#9CA3AF' }}
              >
                <lord-icon
  src="https://cdn.lordicon.com/srsgifqc.json" // phone
  trigger="loop"
  colors="primary:#7C3AED,secondary:#A78BFA"
  style={{ width: '18px', height: '18px' }}
/>

                +91 123 456 7890
              </a>
              <div className="flex items-start gap-3 text-sm" style={{ color: '#9CA3AF' }}>
                <lord-icon
  src="https://cdn.lordicon.com/zzcjjxew.json" // location pin
  trigger="loop"
  colors="primary:#7C3AED,secondary:#A78BFA"
  style={{ width: '18px', height: '18px' }}
/>

                <span>Geeta University, Panipat, Haryana, India</span>
              </div>
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-sm uppercase tracking-widest mb-6"
                style={{ color: '#A78BFA' }}
              >
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <motion.button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm transition-colors text-left"
                      style={{ color: '#9CA3AF' }}
                      whileHover={{ color: '#F3F4F6', x: 4 }}
                      data-testid={`footer-link-${link.name.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      {link.name}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Google Maps */}
        <div className="mb-16">
          <h4
            className="text-sm uppercase tracking-widest mb-6"
            style={{ color: '#A78BFA' }}
          >
            Find Us
          </h4>
          <div
            className="rounded-xl overflow-hidden h-64"
            style={{ border: '1px solid rgba(124, 58, 237, 0.2)' }}
          >
            <iframe
 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26256.19332660918!2d76.8773228167928!3d29.300602642448634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390dc3b5533b6d9f%3A0x1b563db61bcc0195!2sGEETA%20UNIVERSITY%2C%20NAULTHA%2C%20PANIPAT!5e1!3m2!1sen!2sin!4v1769969839896!5m2!1sen!2sin"              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(90%)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Geeta University Location"
              data-testid="footer-map"
            />
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3
            className="text-2xl md:text-3xl font-extrabold mb-4"
            style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
          >
            Ready to Build Something Amazing?
          </h3>
          <p className="text-sm mb-6" style={{ color: '#9CA3AF' }}>
            Join 100+ hackers at HackForge 2.0 | May 2026
          </p>
          <motion.button
            onClick={onRegisterClick}
            className="px-8 py-4 rounded-full text-base font-semibold"
            style={{
              backgroundColor: '#7C3AED',
              color: '#FFFFFF',
              boxShadow: '0 0 30px rgba(124, 58, 237, 0.4)',
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 50px rgba(124, 58, 237, 0.6)',
            }}
            whileTap={{ scale: 0.98 }}
            data-testid="footer-register-btn"
          >
            Register Now
          </motion.button>
        </motion.div>

        {/* Social links */}
        <div className="flex justify-center gap-4 mb-12">
          {socialLinks.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                border: '1px solid rgba(124, 58, 237, 0.2)',
              }}
              whileHover={{
                scale: 1.1,
                backgroundColor: 'rgba(124, 58, 237, 0.2)',
                borderColor: 'rgba(124, 58, 237, 0.5)',
              }}
              aria-label={label}
              data-testid={`footer-social-${label.toLowerCase()}`}
            >
              <lord-icon
  src={Icon}
  trigger="loop"
  colors="primary:#A78BFA,secondary:#7C3AED"
  style={{ width: '20px', height: '20px' }}
/>

            </motion.a>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(124, 58, 237, 0.1)' }}
        >
          <p className="text-xs" style={{ color: '#6B7280' }}>
            &copy; {new Date().getFullYear()} HackForge 2.0. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#6B7280' }}>
            Made with love by{' '}
            <span style={{ color: '#7C3AED' }}>KunalK</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
