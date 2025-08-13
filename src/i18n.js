// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import FR from './locales/fr/translation.json';
import EN from './locales/en/translation.json';
import AR from './locales/ar/translation.json';

i18n
  .use(LanguageDetector) // détecte automatiquement la langue
  .use(initReactI18next) // connecte à React
  .init({
    resources: {
        fr: {
          translation: FR,
        },
        en: {
          translation: EN,
        },
        ar: {
          translation: AR,
        }
      },
    fallbackLng: 'fr', // si langue inconnue
    interpolation: {
      escapeValue: false, // React fait déjà l’échappement
    },
    returnObjects: true
  });

export default i18n;
