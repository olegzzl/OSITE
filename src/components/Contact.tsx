import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="relative py-32 px-6 bg-dark-900" ref={ref}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,0,51,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,51,0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-scarlet-500 text-sm tracking-widest mb-4">{t('contact.subtitle')}</p>
          <h2 className="text-5xl md:text-6xl font-bold text-white">{t('contact.title')}</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              {t('contact.headline')}<span className="text-scarlet-500">{t('contact.headlineHighlight')}</span>
            </h3>
            <p className="text-white/60 mb-8 leading-relaxed">
              {t('contact.description')}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-dark-700 border border-dark-600 flex items-center justify-center">
                  <Mail className="text-scarlet-500" size={20} />
                </div>
                <div>
                  <p className="text-white/40 text-sm">{t('contact.info.email')}</p>
                  <a href="mailto:hello@studio.com" className="text-white hover:text-scarlet-500 transition-colors">
                    hello@studio.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-dark-700 border border-dark-600 flex items-center justify-center">
                  <Phone className="text-scarlet-500" size={20} />
                </div>
                <div>
                  <p className="text-white/40 text-sm">{t('contact.info.phone')}</p>
                  <a href="tel:+1234567890" className="text-white hover:text-scarlet-500 transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-dark-700 border border-dark-600 flex items-center justify-center">
                  <MapPin className="text-scarlet-500" size={20} />
                </div>
                <div>
                  <p className="text-white/40 text-sm">{t('contact.info.location')}</p>
                  <p className="text-white">Los Angeles, CA</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-white/40 text-sm mb-2 tracking-wider">
                  {t('contact.labels.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-800 border-2 border-dark-600 text-white px-4 py-3 outline-none transition-all duration-300 focus:border-scarlet-500 focus:shadow-[0_0_20px_rgba(255,0,51,0.3)]"
                  placeholder={t('contact.placeholders.name')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white/40 text-sm mb-2 tracking-wider">
                  {t('contact.labels.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-800 border-2 border-dark-600 text-white px-4 py-3 outline-none transition-all duration-300 focus:border-scarlet-500 focus:shadow-[0_0_20px_rgba(255,0,51,0.3)]"
                  placeholder={t('contact.placeholders.email')}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-white/40 text-sm mb-2 tracking-wider">
                {t('contact.labels.subject')}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-dark-800 border-2 border-dark-600 text-white px-4 py-3 outline-none transition-all duration-300 focus:border-scarlet-500 focus:shadow-[0_0_20px_rgba(255,0,51,0.3)]"
                placeholder={t('contact.placeholders.subject')}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-white/40 text-sm mb-2 tracking-wider">
                {t('contact.labels.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-dark-800 border-2 border-dark-600 text-white px-4 py-3 outline-none transition-all duration-300 focus:border-scarlet-500 focus:shadow-[0_0_20px_rgba(255,0,51,0.3)] resize-none"
                placeholder={t('contact.placeholders.message')}
              />
            </div>

            <motion.button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-scarlet-500 text-white font-medium tracking-wider"
              whileHover={{
                scale: 1.02,
                boxShadow: '0 0 30px rgba(255,0,51,0.6)'
              }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <Send size={20} />
                  {t('contact.send')}
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>

      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-dark-600 to-transparent" />
    </section>
  );
}
