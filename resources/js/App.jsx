// resources/js/App.jsx
import React, { useState, useEffect } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher';
import Navbar from './components/Navbar';
import i18n from './i18n'; // Import i18n configuration
import About from './pages/About';
import Blog from './pages/Blog';
import ContactUs from './pages/ContactUs';
import Cycles from './pages/Cycles';
import GrandioseBenefits from './pages/GrandioseBenefits';
import Home from './pages/Home';
import Inscription from './pages/Inscription';
import ProfessorCard from './pages/ProfessorCard';
import Testimonials from './pages/Testimonials';
import WhyChooseUs from './pages/WhyChooseUs';

const App = () => {
    const [language, setLanguage] = useState(i18n.language); // Track current language
    const { t } = useTranslation(); // Use translation hook to get translated strings

    useEffect(() => {
        // Sync language with i18n
        i18n.changeLanguage(language);
    }, [language]); // Re-run effect when language changes

    return (
        <I18nextProvider i18n={i18n}>
            <div>
                <Navbar />
                <Home />
                <About />
                <WhyChooseUs /> 
                <Cycles />
                <Testimonials />
                <ProfessorCard />
                <GrandioseBenefits />
                <Blog />
                <Inscription />
                <ContactUs />            
                <h1>{t('welcome')}</h1> {/* Translated "welcome" message */}
                {/* <LanguageSwitcher setLanguage={setLanguage} />  */}
                {/* Pass setLanguage to switch languages */}
            </div>
        </I18nextProvider>
        
    );
};

export default App;
