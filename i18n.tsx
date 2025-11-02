import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language } from './types';
// Fix: Use named imports to prevent "multiple default exports" error if files are concatenated.
import { enTranslations } from './locales/en.js';
import { esTranslations } from './locales/es.js';

interface I18nContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const resources: { [key in Language]: any } = {
  en: enTranslations,
  es: esTranslations,
};

const getNestedValue = (obj: any, key: string) => {
  return key.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const changeLanguage = useCallback((lang: Language) => {
    if (resources[lang]) {
      setLanguage(lang);
    }
  }, []);

  const t = useCallback((key: string) => {
    const translations = resources[language];
    return getNestedValue(translations, key);
  }, [language]);

  const value = { language, changeLanguage, t };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};