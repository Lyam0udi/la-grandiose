// resources/js/App.jsx
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';
import i18n from './i18n'; // Import the i18n configuration

const App = () => {
    return (
        <I18nextProvider i18n={i18n}>
            <div>
                <h1>{i18n.t('welcome')}</h1> {/* This will display the welcome message based on the current language */}
                <LanguageSwitcher /> {/* Render the language switcher */}
            </div>
        </I18nextProvider>
    );
};

export default App;
