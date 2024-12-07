import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { i18n, t } = useTranslation();

    // Language Switcher
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <nav className="bg-primary text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <span className="text-2xl font-bold">La Grandiose</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-4">
                        <a href="/" className="hover:text-secondary">{t('home')}</a>
                        <a href="/about" className="hover:text-secondary">{t('about')}</a>
                        <a href="/cycles" className="hover:text-secondary">{t('cycles')}</a>
                        <a href="/inscription" className="hover:text-secondary">{t('inscription')}</a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button
                            className="text-white hover:text-secondary"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Language Switcher */}
                    <div className="hidden md:flex items-center space-x-2">
                        <button onClick={() => changeLanguage('en')} className="hover:text-secondary">EN</button>
                        <button onClick={() => changeLanguage('fr')} className="hover:text-secondary">FR</button>
                        <button onClick={() => changeLanguage('ar')} className="hover:text-secondary">AR</button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <a href="/" className="block text-white hover:bg-secondary rounded">{t('home')}</a>
                        <a href="/about" className="block text-white hover:bg-secondary rounded">{t('about')}</a>
                        <a href="/cycles" className="block text-white hover:bg-secondary rounded">{t('cycles')}</a>
                        <a href="/inscription" className="block text-white hover:bg-secondary rounded">{t('inscription')}</a>

                        {/* Language Switcher */}
                        <div className="flex items-center space-x-2 mt-4">
                            <button onClick={() => changeLanguage('en')} className="hover:text-secondary">EN</button>
                            <button onClick={() => changeLanguage('fr')} className="hover:text-secondary">FR</button>
                            <button onClick={() => changeLanguage('ar')} className="hover:text-secondary">AR</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;