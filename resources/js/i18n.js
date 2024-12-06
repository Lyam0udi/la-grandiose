// resources/js/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './i18n/en.json';
import fr from './i18n/fr.json';
import ar from './i18n/ar.json';

// Initialize i18n
i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en }, // English translations
        fr: { translation: fr }, // French translations
        ar: { translation: ar }, // Arabic translations
    },
    lng: 'fr', // Default language
    fallbackLng: 'en', // Language to fallback to if translations are missing
    interpolation: { escapeValue: false }, // Disable escaping of values
});

export default i18n;
