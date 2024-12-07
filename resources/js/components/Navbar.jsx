import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const { i18n, t } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <nav
            className={`${
                isDarkTheme ? 'bg-darkBackground text-white' : 'bg-lightBackground text-gray-800'
            } shadow-md`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <span
                            className={`text-2xl font-bold ${
                                isDarkTheme ? 'text-skyBlue' : 'text-vibrantGreen'
                            }`}
                        >
                            La Grandiose
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <a href="/" className="hover:text-skyBlue">{t('home')}</a>
                        <a href="/about" className="hover:text-vibrantGreen">{t('about')}</a>
                        <a href="/cycles" className="hover:text-normalRed">{t('cycles')}</a>
                        <a href="/contact" className="hover:text-normalYellow">{t('contact')}</a>

                        {/* Dropdown */}
                        <div className="relative group">
                            <button className="hover:text-skyBlue">{t('more')}</button>
                            <div
                                className={`absolute hidden group-hover:block ${
                                    isDarkTheme ? 'bg-darkBackground' : 'bg-lightBackground'
                                } text-gray-800 dark:text-white shadow-md rounded-md mt-2 z-10`}
                            >
                                <a href="/testimonials" className="block px-4 py-2 hover:bg-vibrantGreen">
                                    {t('testimonials')}
                                </a>
                                <a href="/inscription" className="block px-4 py-2 hover:bg-normalYellow">
                                    {t('inscription')}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Theme Toggle and Language Switcher */}
                    <div className="flex items-center space-x-4">
                        <button onClick={toggleTheme} className="hover:text-skyBlue">
                            {isDarkTheme ? '🌙' : '☀️'}
                        </button>

                        {/* Language Switcher */}
                        <div className="flex space-x-2">
                            <button onClick={() => changeLanguage('en')} className="hover:text-skyBlue">EN</button>
                            <button onClick={() => changeLanguage('fr')} className="hover:text-vibrantGreen">FR</button>
                            <button onClick={() => changeLanguage('ar')} className="hover:text-normalRed">AR</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
