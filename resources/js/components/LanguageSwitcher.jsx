// resources/js/components/LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const switchLanguage = (lang) => {
        i18n.changeLanguage(lang); // Change language dynamically
        localStorage.setItem('language', lang); // Save the selected language in localStorage
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <button onClick={() => switchLanguage('fr')}>Français</button>
            <button onClick={() => switchLanguage('en')}>English</button>
            <button onClick={() => switchLanguage('ar')}>العربية</button>
        </div>
    );
};

export default LanguageSwitcher;
