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
                    <div className="hidden md:flex space-x-4 items-center">
                        <a href="/" className="hover:text-secondary">{t('home')}</a>
                        <a href="/about" className="hover:text-secondary">{t('about')}</a>
                        <a href="/cycles" className="hover:text-secondary">{t('cycles')}</a>
                        <a href="/contact" className="hover:text-secondary">{t('contact')}</a>

                        {/* Dropdown Menu */}
                        <div className="relative group">
                            <button className="hover:text-secondary">{t('more')}</button>
                            <div className="absolute hidden group-hover:block bg-primary text-white shadow-md rounded-md mt-2">
                                <a href="/testimonials" className="block px-4 py-2 hover:bg-secondary">{t('testimonials')}</a>
                                <a href="/inscription" className="block px-4 py-2 hover:bg-secondary">{t('inscription')}</a>
                            </div>
                        </div>

                        {/* Language Switcher */}
                        <div className="flex space-x-2">
                            <button onClick={() => changeLanguage('en')} className="hover:text-secondary">EN</button>
                            <button onClick={() => changeLanguage('fr')} className="hover:text-secondary">FR</button>
                            <button onClick={() => changeLanguage('ar')} className="hover:text-secondary">AR</button>
                        </div>

                        {/* Theme Toggle */}
                        <button className="ml-4 hover:text-secondary">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"
                                />
                            </svg>
                        </button>
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
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <a href="/" className="block text-white hover:bg-secondary rounded">{t('home')}</a>
                        <a href="/about" className="block text-white hover:bg-secondary rounded">{t('about')}</a>
                        <a href="/cycles" className="block text-white hover:bg-secondary rounded">{t('cycles')}</a>
                        <a href="/contact" className="block text-white hover:bg-secondary rounded">{t('contact')}</a>
                        <a href="/testimonials" className="block text-white hover:bg-secondary rounded">{t('testimonials')}</a>
                        <a href="/inscription" className="block text-white hover:bg-secondary rounded">{t('inscription')}</a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
