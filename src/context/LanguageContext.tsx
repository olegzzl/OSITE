import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ukTranslations from '../locales/uk.json';
import ruTranslations from '../locales/ru.json';
import enTranslations from '../locales/en.json';

type Language = 'uk' | 'ru' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  uk: ukTranslations,
  ru: ruTranslations,
  en: enTranslations,
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'uk';
  });
  const [currentTranslations, setCurrentTranslations] = useState<Record<string, unknown>>(() => {
    return translations[language];
  });

  useEffect(() => {
    setCurrentTranslations(translations[language]);
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let result: unknown = currentTranslations;

    for (const k of keys) {
      const arrayMatch = k.match(/^(\d+)$/);
      if (arrayMatch && Array.isArray(result)) {
        const index = parseInt(arrayMatch[1], 10);
        result = result[index];
      } else if (result && typeof result === 'object' && k in result) {
        result = (result as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    return typeof result === 'string' ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
