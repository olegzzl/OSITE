import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const navItems = [
  { label: 'HOME', href: '#home' },
  { label: 'SERVICES', href: '#services' },
  { label: 'PORTFOLIO', href: '#portfolio' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('HOME');
  const { language, setLanguage, t } = useLanguage();

  const handleNavClick = (href: string, label: string) => {
    setActiveSection(label);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-600/50"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            className="text-2xl font-bold tracking-tight hoverable flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-scarlet-500 font-extrabold">O³</span>
            <span className="text-white">STUDIO</span>
            <span className="text-scarlet-500">.</span>
          </motion.a>

          <div className="hidden md:flex items-center space-x-12">
            <div className="flex items-center space-x-12">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleNavClick(item.href, item.label)}
                  className={`relative text-sm font-medium tracking-widest hoverable transition-colors ${
                    activeSection === item.label ? 'text-scarlet-500' : 'text-white/70 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('nav.' + item.label.toLowerCase())}
                  {activeSection === item.label && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-scarlet-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-scarlet-500 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Language Switcher */}
            <div className="flex items-center space-x-2 border-l border-dark-600 pl-6 ml-6">
              <button
                onClick={() => setLanguage('uk')}
                className={`px-2 py-1 text-xs font-semibold rounded transition-all duration-300 ${
                  language === 'uk'
                    ? 'bg-scarlet-500 text-white shadow-[0_0_10px_rgba(255,0,51,0.5)]'
                    : 'text-white/60 hover:text-white hover:bg-dark-700'
                }`}
              >
                UKR
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2 py-1 text-xs font-semibold rounded transition-all duration-300 ${
                  language === 'ru'
                    ? 'bg-scarlet-500 text-white shadow-[0_0_10px_rgba(255,0,51,0.5)]'
                    : 'text-white/60 hover:text-white hover:bg-dark-700'
                }`}
              >
                RUS
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-semibold rounded transition-all duration-300 ${
                  language === 'en'
                    ? 'bg-scarlet-500 text-white shadow-[0_0_10px_rgba(255,0,51,0.5)]'
                    : 'text-white/60 hover:text-white hover:bg-dark-700'
                }`}
              >
                ENG
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hoverable p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 py-4 border-t border-dark-600"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href, item.label)}
                className={`block w-full text-left py-3 text-sm font-medium tracking-widest hoverable ${
                  activeSection === item.label ? 'text-scarlet-500' : 'text-white/70'
                }`}
              >
                {t('nav.' + item.label.toLowerCase())}
              </button>
            ))}

            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-center space-x-4 mt-6 pt-6 border-t border-dark-600">
              <button
                onClick={() => setLanguage('uk')}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-all duration-300 ${
                  language === 'uk'
                    ? 'bg-scarlet-500 text-white shadow-[0_0_10px_rgba(255,0,51,0.5)]'
                    : 'text-white/60 hover:text-white hover:bg-dark-700'
                }`}
              >
                UKR
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-all duration-300 ${
                  language === 'ru'
                    ? 'bg-scarlet-500 text-white shadow-[0_0_10px_rgba(255,0,51,0.5)]'
                    : 'text-white/60 hover:text-white hover:bg-dark-700'
                }`}
              >
                RUS
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-all duration-300 ${
                  language === 'en'
                    ? 'bg-scarlet-500 text-white shadow-[0_0_10px_rgba(255,0,51,0.5)]'
                    : 'text-white/60 hover:text-white hover:bg-dark-700'
                }`}
              >
                ENG
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
