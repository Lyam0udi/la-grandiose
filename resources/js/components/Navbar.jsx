import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = ({ isDarkMode, setIsDarkMode, language, setLanguage, isLoading }) => {
    const { t } = useTranslation();
    const [navbarBg, setNavbarBg] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu toggle

    const changeLanguage = (lang) => {
        setLanguage(lang);
        setIsDropdownOpen(false); // Close dropdown after selecting a language
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
                    <div className="cursor-pointer" onClick={() => scrollToSection('home')}>
                        <img
                            src="/images/logo.png"
                            alt="La Grandiose Logo"
                            className={`w-32 ${isDarkMode ? 'text-skyBlue' : 'text-vibrantGreen'}`}
                        />
                    </div>


                    {/* Main Menu (Desktop) */}
                    <div className={`hidden md:flex space-x-6`}>
                        <button onClick={() => scrollToSection('home')}>{t('home')}</button>
                        <button onClick={() => scrollToSection('about')}>{t('about')}</button>
                        <button onClick={() => scrollToSection('cycles')}>{t('cycles')}</button>
                        <button onClick={() => scrollToSection('whychooseus')}>{t('whychooseus')}</button>
                        <button onClick={() => scrollToSection('testimonials')}>{t('testimonials')}</button>
                        <button onClick={() => scrollToSection('contact')}>{t('contact')}</button>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center space-x-4">
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-md ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                        >
                            {isDarkMode ? '🌙' : '☀️'}
                        </button>

                        {/* Language Switcher Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`${
                                    isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
                                } px-3 py-1.5 rounded-md shadow-md flex items-center justify-between w-24 text-sm font-medium hover:bg-opacity-80 focus:outline-none transition-all`}
                            >
                                {language.toUpperCase()}
                                <span
                                    className={`ml-2 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                                >
                                    ▼
                                </span>
                            </button>

                            {isDropdownOpen && (
                                <div
                                    className={`absolute top-full mt-2 w-full rounded-md ${
                                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                                    } shadow-lg z-10`}
                                >
                                    {['en', 'fr', 'ar'].map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => changeLanguage(lang)}
                                            className={`block w-full text-left px-4 py-2 text-sm transition-all ${
                                                language === lang
                                                    ? 'bg-blue-500 text-white font-semibold'
                                                    : 'hover:bg-gray-100 text-gray-600'
                                            }`}
                                        >
                                            {lang.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`text-2xl p-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                            >
                                ☰
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div
                    className={`md:hidden p-4 ${
                        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                    }`}
                    style={{ maxWidth: '910px', margin: '0 auto' }}
                >
                    <button onClick={() => scrollToSection('home')} className="block py-2">{t('home')}</button>
                    <button onClick={() => scrollToSection('about')} className="block py-2">{t('about')}</button>
                    <button onClick={() => scrollToSection('cycles')} className="block py-2">{t('cycles')}</button>
                    <button onClick={() => scrollToSection('whychooseus')} className="block py-2">{t('whychooseus')}</button>
                    <button onClick={() => scrollToSection('testimonials')} className="block py-2">{t('testimonials')}</button>
                    <button onClick={() => scrollToSection('contact')} className="block py-2">{t('contact')}</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
