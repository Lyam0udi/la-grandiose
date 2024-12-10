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

const App = () => {
    // Language State
    const [language, setLanguage] = useState(i18n.language);

    // Dark Mode State
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Loading State
    const [isLoading, setIsLoading] = useState(true);

    // Handle language changes
    useEffect(() => {
        i18n.changeLanguage(language);
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
            {/* Display Global Loader */}
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                    <div className="loader border-t-blue-500 border-4 border-gray-300 rounded-full w-16 h-16 animate-spin"></div>
                </div>
            )}

            <div
                className={`${
                    isDarkMode ? 'bg-darkBackground text-white' : 'bg-lightBackground text-gray-800'
                }`}
            >
                {/* Navbar with Dark Mode and Language Switching */}
                <Navbar
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                    language={language}
                    setLanguage={setLanguage}
                    isLoading={isLoading}
                />

                {/* Sections */}
                <section id="home">
                    <Home isDarkMode={isDarkMode} onLoaded={() => setIsLoading(false)} />
                </section>
                <section id="about">
                    <About isDarkMode={isDarkMode} />
                </section>
                <section id="cycles">
                    <Cycles />
                </section>
                <section id="whychooseus">
                    <WhyChooseUs isDarkMode={isDarkMode} />
                </section>
                <section id="grandiosebenefits">
                    <GrandioseBenefits isDarkMode={isDarkMode} />
                </section>
                <section id="testimonials">
                    <Testimonials isDarkMode={isDarkMode} />
                </section>
                <section id="contact">
                    <ContactUs />
                </section>
                <section id="blog">
                    <Blog />
                </section>
                <section id="inscription">
                    <Inscription />
                </section>
            </div>
        </I18nextProvider>
    );
};

export default App;
