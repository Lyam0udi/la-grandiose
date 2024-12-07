// resources/js/App.jsx
import React, { useState, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Import i18n configuration
import Navbar from './components/Navbar';
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
    // Language State
    const [language, setLanguage] = useState(i18n.language); // Track current language

    // Dark Mode State
    const [isDarkMode, setIsDarkMode] = useState(false); // Track dark mode state

    // Handle language changes
    useEffect(() => {
        i18n.changeLanguage(language); // Update i18n language when `language` state changes
    }, [language]);

    // Sync dark mode with the root <html> element
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <I18nextProvider i18n={i18n}>
            <div className={`${isDarkMode ? 'bg-darkBackground text-white' : 'bg-lightBackground text-gray-800'}`}>
                {/* Navbar with Dark Mode and Language Switching */}
                <Navbar
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                    language={language}
                    setLanguage={setLanguage}
                />

                {/* Home Section */}
                <Home isDarkMode={isDarkMode} />

                {/* Other Sections */}
                <About />
                <WhyChooseUs />
                <Cycles />
                <Testimonials />
                <ProfessorCard />
                <GrandioseBenefits />
                <Blog />
                <Inscription />
                <ContactUs />
            </div>
        </I18nextProvider>
    );
};

export default App;
