import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = ({ isDarkMode, setIsDarkMode, language, setLanguage, isLoading }) => {
    const { t } = useTranslation();
    const [navbarBg, setNavbarBg] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const changeLanguage = (lang) => {
        setLanguage(lang);
        setIsDropdownOpen(false);
    };

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, null, `#${id}`);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setNavbarBg(window.scrollY > 50 ? (isDarkMode ? 'bg-darkSecondary' : 'bg-lightSecondary') : '');
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isDarkMode]);

    if (isLoading) {
        return null;
    }

    return (
        <nav
            className={`fixed w-full top-0 z-50 shadow-lg transition-all duration-500 ${
                navbarBg || (isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText')
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="cursor-pointer" onClick={() => scrollToSection('home')}>
                        <img
                            src="/images/logo.png"
                            alt="La Grandiose Logo"
                            className="w-28 sm:w-32 transition-transform duration-300 hover:scale-110"
                        />
                    </div>

                    {/* Main Menu (Desktop) */}
                    <div className="hidden md:flex space-x-6">
                        {['home', 'about', 'cycles', 'whychooseus', 'testimonials', 'contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item)}
                                className="hover:text-primaryBlue dark:hover:text-accentPurple transition-all"
                            >
                                {t(item)}
                            </button>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center space-x-4">
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full focus:outline-none transition-all ${
                                isDarkMode
                                    ? 'hover:bg-darkSecondary text-darkText'
                                    : 'hover:bg-lightSecondary text-lightText'
                            }`}
                        >
                            {isDarkMode ? '🌙' : '☀️'}
                        </button>

                        {/* Language Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`flex items-center justify-between px-3 py-1.5 rounded-md shadow-md text-sm ${
                                    isDarkMode ? 'bg-darkCard text-darkText' : 'bg-lightCard text-lightText'
                                }`}
                            >
                                {language.toUpperCase()}
                                <span
                                    className={`ml-2 transition-transform ${
                                        isDropdownOpen ? 'rotate-180' : ''
                                    }`}
                                >
                                    ▼
                                </span>
                            </button>
                            {isDropdownOpen && (
                                <div
                                    className={`absolute top-full mt-2 w-full rounded-md shadow-lg z-10 ${
                                        isDarkMode ? 'bg-darkSecondary' : 'bg-lightSecondary'
                                    }`}
                                >
                                    {['en', 'fr', 'ar'].map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => changeLanguage(lang)}
                                            className={`block w-full text-left px-4 py-2 text-sm transition-all ${
                                                language === lang
                                                    ? 'bg-accentGreen text-white'
                                                    : 'hover:bg-gradientDarkEnd hover:text-lightText'
                                            }`}
                                        >
                                            {lang.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`text-2xl p-2 ${
                                    isDarkMode ? 'text-darkText' : 'text-lightText'
                                }`}
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
                        isDarkMode ? 'bg-darkSecondary text-darkText' : 'bg-lightSecondary text-lightText'
                    }`}
                >
                    {['home', 'about', 'cycles', 'whychooseus', 'testimonials', 'contact'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item)}
                            className="block py-2 text-center transition-all hover:text-accentYellow"
                        >
                            {t(item)}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
