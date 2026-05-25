import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ExternalLink } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../context/LanguageContext';

export default function Portfolio() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const categories = [
    { key: 'ALL', label: t('portfolio.filters.all') },
    { key: 'PHOTOGRAPHY', label: t('portfolio.filters.photography') },
    { key: 'VIDEOGRAPHY', label: t('portfolio.filters.videography') },
    { key: 'WEB DEV', label: t('portfolio.filters.webDev') },
  ];

  const portfolioItems = [
    {
      id: 1,
      titleKey: 'portfolio.items.urbanLandscapes',
      category: 'PHOTOGRAPHY',
      image: 'https://images.pexels.com/photos/3222590/pexels-photo-3222590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: '2024',
    },
    {
      id: 2,
      titleKey: 'portfolio.items.brandStory',
      category: 'VIDEOGRAPHY',
      image: 'https://images.pexels.com/photos/2873364/pexels-photo-2873364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: '2024',
    },
    {
      id: 3,
      titleKey: 'portfolio.items.ecommercePlatform',
      category: 'WEB DEV',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: '2024',
    },
    {
      id: 4,
      titleKey: 'portfolio.items.portraitSession',
      category: 'PHOTOGRAPHY',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: '2023',
    },
    {
      id: 5,
      titleKey: 'portfolio.items.documentaryShort',
      category: 'VIDEOGRAPHY',
      image: 'https://images.pexels.com/photos/287240/pexels-photo-287240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: '2023',
    },
    {
      id: 6,
      titleKey: 'portfolio.items.portfolioWebsite',
      category: 'WEB DEV',
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: '2024',
    },
    {
      id: 7,
      titleKey: 'portfolio.items.streetPhotography',
      category: 'PHOTOGRAPHY',
      image: 'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: '2023',
    },
    {
      id: 8,
      titleKey: 'portfolio.items.musicVideo',
      category: 'VIDEOGRAPHY',
      image: 'https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: '2024',
    },
    {
      id: 9,
      titleKey: 'portfolio.items.saasDashboard',
      category: 'WEB DEV',
      image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      year: '2024',
    },
  ];

  const filteredItems = activeFilter === 'ALL'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.key === category);
    return cat ? cat.label : category;
  };

  return (
    <section id="portfolio" className="relative py-32 px-6 bg-dark-800" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-scarlet-500 text-sm tracking-widest mb-4">{t('portfolio.subtitle')}</p>
          <h2 className="text-5xl md:text-6xl font-bold text-white">{t('portfolio.title')}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category.key}
              onClick={() => setActiveFilter(category.key)}
              className={`relative px-6 py-2 text-sm tracking-widest font-medium transition-colors ${
                activeFilter === category.key ? 'text-scarlet-500' : 'text-white/60 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
              {activeFilter === category.key && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-scarlet-500"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const isHovered = hoveredItem === item.id;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="group relative aspect-[4/3] overflow-hidden cursor-pointer"
                >
                  <motion.img
                    src={item.image}
                    alt={t(item.titleKey)}
                    className="w-full h-full object-cover"
                    style={{
                      filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
                    }}
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 0.6 }}
                  />

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                    className="absolute bottom-0 left-0 right-0 p-6"
                  >
                    <p className="text-scarlet-500 text-xs tracking-widest mb-2">{getCategoryLabel(item.category)}</p>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{t(item.titleKey)}</h3>
                    <p className="text-white/40 text-sm">{item.year}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute top-4 right-4 flex items-center gap-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="p-2 bg-white/10 backdrop-blur-md text-white"
                    >
                      <Eye size={18} />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="p-2 bg-white/10 backdrop-blur-md text-white"
                    >
                      <ExternalLink size={18} />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-scarlet-500"
                    style={{ originX: 0 }}
                  />

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: 'linear-gradient(rgba(255,0,51,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,51,0.05) 1px, transparent 1px)',
                          backgroundSize: '20px 20px',
                        }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 px-10 py-4 border border-scarlet-500 text-scarlet-500 font-medium tracking-wider"
            whileHover={{
              scale: 1.05,
              backgroundColor: '#FF0033',
              color: '#fff',
            }}
          >
            {t('portfolio.viewAll')}
            <ExternalLink size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
