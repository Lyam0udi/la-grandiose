// resources/js/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './i18n/en.json';
import fr from './i18n/fr.json';
import ar from './i18n/ar.json';

// Function to get the saved language or default to 'fr'
const getSavedLanguage = () => {
    const savedLang = localStorage.getItem('language');
    // Check if savedLang is one of the supported languages (en, fr, ar)
    const validLanguages = ['en', 'fr', 'ar'];
    return validLanguages.includes(savedLang) ? savedLang : 'fr'; // Default to 'fr' if invalid or not set
};

// Initialize i18n with resources and settings
i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        fr: { translation: fr },
        ar: { translation: ar },
    },
    lng: getSavedLanguage(), // Set the initial language
    fallbackLng: 'fr', // Fallback to French if the selected language is not available
    interpolation: {
        escapeValue: false, // Not needed for React
    },
});

export default i18n;
