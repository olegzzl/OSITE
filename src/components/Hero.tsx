import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Play, Camera, Code, Video } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const [text, setText] = useState('');
  const fullText = t('hero.headline');
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    'https://images.pexels.com/photos/2865765/pexels-photo-2865765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  ];

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [fullText]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 opacity-20">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: idx === currentImage ? 0.3 : 0.1 }}
            transition={{ duration: 1.5 }}
            className="relative h-full overflow-hidden"
          >
            <img
              src={img}
              alt={`Slide ${idx}`}
              className="w-full h-full object-cover"
            />
            {idx === currentImage && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                className="absolute inset-0 border-l-4 border-scarlet-500"
                style={{ originX: 0 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 bg-scarlet-500 rounded-full"
        />
        <span className="text-xs text-white/60 tracking-widest">REC</span>
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-6 text-white/50 text-sm tracking-widest mb-6">
            <span className="flex items-center gap-2">
              <Camera size={16} />
              {t('hero.photography')}
            </span>
            <span className="w-1 h-1 bg-scarlet-500 rounded-full" />
            <span className="flex items-center gap-2">
              <Video size={16} />
              {t('hero.videography')}
            </span>
            <span className="w-1 h-1 bg-scarlet-500 rounded-full" />
            <span className="flex items-center gap-2">
              <Code size={16} />
              {t('hero.webDev')}
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-none mb-6"
        >
          <span className="text-white">{text}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-scarlet-500"
          >
            |
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-12"
        >
          {t('hero.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="flex items-center justify-center gap-6"
        >
          <motion.a
            href="#portfolio"
            className="relative group flex items-center gap-3 px-8 py-4 bg-scarlet-500 text-white font-medium tracking-wider overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,0,51,0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={20} />
            {t('hero.viewWork')}
            <motion.div
              className="absolute inset-0 border-2 border-scarlet-500"
              initial={{ scale: 1, opacity: 0 }}
              whileHover={{ scale: 1.1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          <motion.a
            href="#contact"
            className="group flex items-center gap-3 px-8 py-4 border border-white/20 text-white font-medium tracking-wider"
            whileHover={{ scale: 1.05, borderColor: '#FF0033' }}
            whileTap={{ scale: 0.95 }}
          >
            {t('hero.getInTouch')}
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 2.5, duration: 1 },
          y: { delay: 2.5, duration: 2, repeat: Infinity, repeatType: 'reverse' }
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ArrowDown className="text-white/30" size={32} />
      </motion.div>

      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-scarlet-500 via-transparent to-scarlet-500" />
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-scarlet-500 via-transparent to-scarlet-500" />
    </section>
  );
}
