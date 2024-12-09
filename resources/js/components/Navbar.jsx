import React from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = ({ isDarkMode, setIsDarkMode, language, setLanguage, isLoading }) => {
    const { i18n, t } = useTranslation();

    const changeLanguage = (lang) => {
        setLanguage(lang); // Update the state in App.jsx
        i18n.changeLanguage(lang); // Reflect the change in i18next
    };

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode); // This updates App.jsx's state
    };

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Hide Navbar during loading
    if (isLoading) {
        return null;
    }

    return (
        <nav
            className={`${
                isDarkMode ? 'bg-darkBackground text-white' : 'bg-lightBackground text-gray-800'
            } shadow-md fixed w-full top-0 z-50`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div
                        className={`text-2xl font-bold cursor-pointer ${
                            isDarkMode ? 'text-skyBlue' : 'text-vibrantGreen'
                        }`}
                        onClick={() => scrollToSection('home')}
                    >
                        La Grandiose
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <button
                            onClick={() => scrollToSection('home')}
                            className="hover:text-skyBlue focus:outline-none"
                        >
                            {t('home')}
                        </button>
                        <button
                            onClick={() => scrollToSection('about')}
                            className="hover:text-vibrantGreen focus:outline-none"
                        >
                            {t('about')}
                        </button>
                        <button
                            onClick={() => scrollToSection('whychooseus')}
                            className="hover:text-vibrantGreen focus:outline-none"
                        >
                            {t('whychooseus')}
                        </button>
                        <button
                            onClick={() => scrollToSection('cycles')}
                            className="hover:text-normalRed focus:outline-none"
                        >
                            {t('cycles')}
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="hover:text-normalYellow focus:outline-none"
                        >
                            {t('contact')}
                        </button>

                        {/* Dropdown Menu */}
                        <div className="relative group">
                            <button className="hover:text-skyBlue focus:outline-none">
                                {t('more')}
                            </button>
                            <div
                                className={`absolute hidden group-hover:block ${
                                    isDarkMode ? 'bg-darkBackground' : 'bg-lightBackground'
                                } text-gray-800 dark:text-white shadow-md rounded-md mt-2`}
                            >
                                <button
                                    onClick={() => scrollToSection('testimonials')}
                                    className="block px-4 py-2 hover:bg-vibrantGreen focus:outline-none"
                                >
                                    {t('testimonials')}
                                </button>
                                <button
                                    onClick={() => scrollToSection('inscription')}
                                    className="block px-4 py-2 hover:bg-normalYellow focus:outline-none"
                                >
                                    {t('inscription')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Theme Toggle and Language Switcher */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button onClick={toggleTheme} className="hover:text-skyBlue text-lg focus:outline-none">
                            {isDarkMode ? '🌙' : '☀️'}
                        </button>

                        {/* Language Switcher */}
                        <div className="flex space-x-2">
                            <button
                                onClick={() => changeLanguage('en')}
                                className={`hover:text-skyBlue ${
                                    language === 'en' ? 'font-bold' : ''
                                } focus:outline-none`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => changeLanguage('fr')}
                                className={`hover:text-vibrantGreen ${
                                    language === 'fr' ? 'font-bold' : ''
                                } focus:outline-none`}
                            >
                                FR
                            </button>
                            <button
                                onClick={() => changeLanguage('ar')}
                                className={`hover:text-normalRed ${
                                    language === 'ar' ? 'font-bold' : ''
                                } focus:outline-none`}
                            >
                                AR
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
