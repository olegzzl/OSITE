import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Github, ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
];

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-6 bg-dark-800 border-t border-dark-600">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.a
            href="#home"
            className="text-2xl font-bold tracking-tight flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-scarlet-500 font-extrabold">O³</span>
            <span className="text-white">STUDIO</span>
            <span className="text-scarlet-500">.</span>
          </motion.a>

          <div className="flex items-center gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="p-2 bg-dark-700 border border-dark-600 text-white/60 hover:text-scarlet-500 hover:border-scarlet-500/50 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </div>

          <motion.button
            onClick={scrollToTop}
            className="p-2 border border-dark-600 text-white/60 hover:text-scarlet-500 hover:border-scarlet-500/50 transition-colors"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>

        <div className="mt-8 pt-8 border-t border-dark-600 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm">
          <p>{t('footer.copyright')}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-scarlet-500 transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-scarlet-500 transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
