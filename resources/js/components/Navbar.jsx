import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = ({ isDarkMode, setIsDarkMode, language, setLanguage, isLoading }) => {
    const { t } = useTranslation();
    const [navbarBg, setNavbarBg] = useState('');

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, null, `#${id}`); // Update URL
        }
    };

    // Change Navbar Background on Scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setNavbarBg(isDarkMode ? 'bg-gray-800' : 'bg-gray-100');
            } else {
                setNavbarBg('');
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isDarkMode]);

    if (isLoading) {
        return null;
    }

    return (
        <nav
            className={`fixed w-full top-0 z-50 shadow-md transition-colors duration-300 ${
                navbarBg || (isDarkMode ? 'bg-darkBackground text-white' : 'bg-lightBackground text-gray-800')
            }`}
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

                    {/* Main Menu */}
                    <div className="hidden md:flex space-x-6">
                        <button onClick={() => scrollToSection('home')}>{t('home')}</button>
                        <button onClick={() => scrollToSection('about')}>{t('about')}</button>
                        <button onClick={() => scrollToSection('cycles')}>{t('cycles')}</button>
                        <button onClick={() => scrollToSection('whychooseus')}>{t('whychooseus')}</button>
                        <button onClick={() => scrollToSection('testimonials')}>{t('testimonials')}</button>
                        <button onClick={() => scrollToSection('contact')}>{t('contact')}</button>

                        {/* More Dropdown */}
                        <div className="relative group">
                            <button>{t('more')}</button>
                            <div
                                className={`absolute hidden group-hover:block ${
                                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                                } shadow-md rounded-md mt-2`}
                            >
                                <button
                                    onClick={() => scrollToSection('blog')}
                                    className="block px-4 py-2"
                                >
                                    {t('blog')}
                                </button>
                                <button
                                    onClick={() => scrollToSection('inscription')}
                                    className="block px-4 py-2"
                                >
                                    {t('inscription')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center space-x-4">
                        {/* Dark Mode Toggle */}
                        <button onClick={toggleTheme}>{isDarkMode ? '🌙' : '☀️'}</button>

                        {/* Language Switch */}
                        <div className="flex space-x-2">
                            {['en', 'fr', 'ar'].map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => changeLanguage(lang)}
                                    className={`hover:underline ${
                                        language === lang ? 'font-bold' : ''
                                    }`}
                                >
                                    {lang.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
