// resources/js/components/LanguageSwitcher.jsx
import React from 'react';

const LanguageSwitcher = ({ setLanguage }) => {
    const switchLanguage = (lang) => {
        setLanguage(lang); // Update language in the parent component (App.jsx)
        localStorage.setItem('language', lang); // Persist language change in localStorage
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
