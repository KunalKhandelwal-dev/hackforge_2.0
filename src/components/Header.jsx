import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Tracks', href: '#tracks' },
  { name: 'Prizes', href: '#prizes' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'FAQs', href: '#faqs' },
  { name: 'Team', href: '#team' },
  { name: 'Contact', href: '#footer' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'py-5'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        data-testid="header"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
            data-testid="header-logo"
          >
            <span
              className="text-xl md:text-2xl font-extrabold"
              style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6' }}
            >
              HackForge <span style={{ color: '#7C3AED' }}>2.0</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
            {navLinks.map((link) => (
              <motion.button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium transition-colors relative group"
                style={{ color: '#D1D5DB' }}
                whileHover={{ color: '#F3F4F6' }}
                data-testid={`nav-link-${link.name.toLowerCase()}`}
              >
                {link.name}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 rounded-full group-hover:w-full transition-all duration-300"
                  style={{ backgroundColor: '#7C3AED' }}
                />
              </motion.button>
            ))}
          </nav>

          {/* GTH Logo */}
          <div className="hidden lg:flex items-center">
            <motion.img
              src="/images/GTH.png"
              alt="GTH Logo"
              className="h-12 w-auto"
              animate={{
                filter: [
                  "drop-shadow(0 0 6px rgba(124,58,237,0.4))",
                  "drop-shadow(0 0 12px rgba(124,58,237,0.75))",
                  "drop-shadow(0 0 6px rgba(124,58,237,0.4))",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />




          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-lg"
            style={{ color: '#F3F4F6' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-testid="mobile-menu"
          >
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: 'rgba(5, 2, 8, 0.95)' }}
              initial={{ backdropFilter: 'blur(0px)' }}
              animate={{ backdropFilter: 'blur(20px)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              className="relative z-10 flex flex-col items-center justify-center h-full gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-2xl font-semibold"
                  style={{ color: '#F3F4F6', fontFamily: 'Syne, sans-serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ color: '#7C3AED' }}
                  data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.img
                src="/images/GTH.png"
                alt="GTH Logo"
                className="
    h-16 w-auto
    opacity-95
  "
                animate={{
                  filter: [
                    "drop-shadow(0 0 10px rgba(124,58,237,0.6))",
                    "drop-shadow(0 0 20px rgba(124,58,237,0.9))",
                    "drop-shadow(0 0 10px rgba(124,58,237,0.6))",
                  ],
                }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />



            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
