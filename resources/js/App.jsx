import React, { useState, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Navbar from './components/Navbar';
import About from './pages/About';
import Blog from './pages/Blog';
import ContactUs from './pages/ContactUs';
import Cycles from './pages/Cycles';
import GrandioseBenefits from './pages/GrandioseBenefits';
import Home from './pages/Home';
import Inscription from './pages/Inscription';
import Testimonials from './pages/Testimonials';
import WhyChooseUs from './pages/WhyChooseUs';
import ProfessorCards from './pages/ProfessorCards';
import Footer from './pages/Footer';

const App = () => {
    // Initialize dark mode based on localStorage or default to white theme
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('isDarkMode');
        return savedTheme ? JSON.parse(savedTheme) : false; // Default to white theme
    });

    // Initialize language based on localStorage or default to a language
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage || i18n.language || 'en'; // Default to English
    });

    // Sync dark mode with the <html> element
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Save dark mode preference in localStorage
    useEffect(() => {
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    // Handle language changes and save preference in localStorage
    useEffect(() => {
        i18n.changeLanguage(language);
        localStorage.setItem('language', language);
    }, [language]);

    return (
        <I18nextProvider i18n={i18n}>
            {/* Navbar with Dark Mode and Language Switching */}
            <Navbar
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                language={language}
                setLanguage={setLanguage}
            />

            {/* Sections */}
            <section id="home">
                <Home isDarkMode={isDarkMode} />
            </section>
            <section id="about">
                <About isDarkMode={isDarkMode} />
            </section>
            <section id="cycles">
                <Cycles isDarkMode={isDarkMode} />
            </section>
            <section id="whychooseus">
                <WhyChooseUs isDarkMode={isDarkMode} />
            </section>
            <section id="grandiosebenefits">
                <GrandioseBenefits isDarkMode={isDarkMode} />
            </section>
            <section id="professorCards">
                <ProfessorCards isDarkMode={isDarkMode} />
            </section>
            <section id="testimonials">
                <Testimonials isDarkMode={isDarkMode} />
            </section>
            <section id="contact">
                <ContactUs isDarkMode={isDarkMode} />
            </section>
            <section id="footer">
                <Footer isDarkMode={isDarkMode} />
            </section>
        </I18nextProvider>
    );
};

export default App;
