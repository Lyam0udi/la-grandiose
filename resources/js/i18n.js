// resources/js/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './i18n/en.json';
import fr from './i18n/fr.json';
import ar from './i18n/ar.json';

const storedLang = localStorage.getItem('language') || 'fr'; // Check for saved language, default to French

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        fr: { translation: fr },
        ar: { translation: ar },
    },
    lng: storedLang, // Use the stored language or default to French
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
});

export default i18n;
