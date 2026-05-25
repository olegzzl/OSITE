import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Video, Code, ArrowUpRight, CircleDot } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../context/LanguageContext';

function CodeAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10 group-hover:opacity-30 transition-opacity duration-500">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 400, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 3,
            delay: i * 0.3,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-scarlet-500 to-transparent"
          style={{ top: `${10 + i * 12}%`, width: '200px' }}
        />
      ))}
    </div>
  );
}

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const { t } = useLanguage();

  const services = [
    {
      title: t('services.photography.title'),
      subtitle: t('services.photography.subtitle'),
      icon: Camera,
      description: t('services.photography.description'),
      features: [
        t('services.photography.features.0'),
        t('services.photography.features.1'),
        t('services.photography.features.2'),
        t('services.photography.features.3'),
      ],
      color: '#FF0033',
      key: 'photography',
    },
    {
      title: t('services.videography.title'),
      subtitle: t('services.videography.subtitle'),
      icon: Video,
      description: t('services.videography.description'),
      features: [
        t('services.videography.features.0'),
        t('services.videography.features.1'),
        t('services.videography.features.2'),
        t('services.videography.features.3'),
      ],
      color: '#FF0033',
      key: 'videography',
    },
    {
      title: t('services.webDevelopment.title'),
      subtitle: t('services.webDevelopment.subtitle'),
      icon: Code,
      description: t('services.webDevelopment.description'),
      features: [
        t('services.webDevelopment.features.0'),
        t('services.webDevelopment.features.1'),
        t('services.webDevelopment.features.2'),
        t('services.webDevelopment.features.3'),
      ],
      color: '#FF0033',
      key: 'webDevelopment',
    },
  ];

  return (
    <section id="services" className="relative py-32 px-6 bg-dark-900" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-scarlet-500 text-sm tracking-widest mb-4">{t('services.subtitle')}</p>
          <h2 className="text-5xl md:text-6xl font-bold text-white">{t('services.title')}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative overflow-hidden bg-dark-800 border border-dark-600 hover:border-scarlet-500/50 cursor-pointer ${isHovered ? 'z-10' : ''}`}
              >
                {service.key === 'webDevelopment' && <CodeAnimation />}

                <motion.div
                  animate={{ scale: isHovered ? 1.02 : 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="relative h-full p-8 md:p-10"
                >
                  <div className="flex items-start justify-between mb-8">
                    <motion.div
                      animate={{ color: isHovered ? '#FF0033' : '#fff' }}
                      className="p-3 bg-dark-700"
                    >
                      <Icon size={32} />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
                      className="flex items-center gap-1 text-scarlet-500"
                    >
                      <ArrowUpRight size={20} />
                    </motion.div>
                  </div>

                  {service.key === 'videography' && (
                    <div className="absolute top-6 right-6 flex items-center gap-2">
                      <motion.div
                        animate={{ scale: isHovered ? 1.5 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CircleDot className="text-scarlet-500" size={16} />
                      </motion.div>
                    </div>
                  )}

                  <div className="mb-6">
                    <motion.p
                      animate={{ color: isHovered ? '#FF0033' : '#rgba(255,255,255,0.4)' }}
                      className="text-xs tracking-widest mb-2"
                    >
                      {service.subtitle}
                    </motion.p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {service.title}
                    </h3>
                  </div>

                  <motion.p
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: isHovered ? 1 : 0.6 }}
                    className="text-white/60 text-sm leading-relaxed mb-8"
                  >
                    {service.description}
                  </motion.p>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 border-t border-dark-600">
                      <ul className="space-y-3">
                        {service.features.map((feature, i) => (
                          <motion.li
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: isHovered ? 0 : -20, opacity: isHovered ? 1 : 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 text-sm text-white/80"
                          >
                            <div className="w-1 h-1 bg-scarlet-500 rounded-full" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-scarlet-500`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ originX: 0 }}
                  />
                </motion.div>

                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon size={128} className="text-scarlet-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-dark-600 to-transparent" />
    </section>
  );
}
