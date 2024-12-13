import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaHome } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Navbar = ({ isDarkMode, setIsDarkMode, language, setLanguage, isLoading }) => {
    const { t } = useTranslation();
    const [navbarBg, setNavbarBg] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState({ i18n: false, more: false });
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRefs = {
        i18n: useRef(),
        more: useRef(),
        mobileMenu: useRef(),
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
        setIsDropdownOpen((prev) => ({ ...prev, i18n: false }));
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

    const closeDropdownOnClickOutside = (e) => {
        Object.keys(dropdownRefs).forEach((key) => {
            if (dropdownRefs[key].current && !dropdownRefs[key].current.contains(e.target)) {
                setIsDropdownOpen((prev) => ({ ...prev, [key]: false }));
            }
        });

        if (dropdownRefs.mobileMenu.current && !dropdownRefs.mobileMenu.current.contains(e.target)) {
            setIsMobileMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', closeDropdownOnClickOutside);

        const observerOptions = {
            root: null,
            rootMargin: '-50px',
            threshold: 0.5,
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    switch (entry.target.id) {
                        case 'home':
                        case 'about':
                            setNavbarBg(isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText');
                            break;
                        case 'cycles':
                            setNavbarBg(isDarkMode ? 'bg-darkSecondary text-darkText' : 'bg-lightSecondary text-lightText');
                            break;
                        case 'whychooseus':
                        case 'testimonials':
                            setNavbarBg(isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText');
                            break;
                        case 'grandiosebenefits':
                            setNavbarBg(isDarkMode ? 'bg-darkCard text-darkText' : 'bg-lightCard text-lightText');
                            break;
                        default:
                            setNavbarBg(isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText');
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = document.querySelectorAll('section');
        sections.forEach((section) => observer.observe(section));

        return () => {
            document.removeEventListener('click', closeDropdownOnClickOutside);
            sections.forEach((section) => observer.unobserve(section));
        };
    }, [isDarkMode]);

    if (isLoading) {
        return null;
    }

    return (
        <nav className={`fixed w-full top-0 z-50 shadow-lg transition-all duration-300 ${navbarBg}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="cursor-pointer" onClick={() => scrollToSection('home')}>
                        <img
                            src="/images/logo.png"
                            alt="Logo"
                            loading="lazy"
                            className="w-20 sm:w-28 transition-transform duration-300 hover:scale-110"
                        />
                    </div>

                    <div className="hidden md:flex space-x-6">
                        <button
                            onClick={() => scrollToSection('home')}
                            className="hover:underline transition-all"
                        >
                            <FaHome className={`text-xl ${isDarkMode ? 'text-darkText' : 'text-lightText'}`} />
                        </button>

                        {['about', 'cycles', 'whychooseus', 'testimonials', 'contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item)}
                                className="hover:underline transition-all"
                            >
                                {t(item)}
                            </button>
                        ))}

                        <div className="relative" ref={dropdownRefs.more}>
                            <button
                                onClick={() => setIsDropdownOpen((prev) => ({ ...prev, more: !prev.more }))}
                                className="hover:underline transition-all"
                            >
                                {t('more')} ▼
                            </button>
                            {isDropdownOpen.more && (
                                <div
                                    className={`absolute top-full mt-2 right-0 rounded-md shadow-lg z-10 ${
                                        isDarkMode ? 'bg-darkSecondary text-darkText' : 'bg-lightSecondary text-lightText'
                                    }`}
                                >
                                    {['blog', 'inscription'].map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => scrollToSection(item)}
                                            className="block px-4 py-2 text-sm hover:bg-accentGreen hover:text-white"
                                        >
                                            {t(item)}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full transition-all hover:scale-110 ${
                                isDarkMode
                                    ? 'hover:bg-darkSecondary text-darkText'
                                    : 'hover:bg-lightSecondary text-lightText'
                            }`}
                        >
                            {isDarkMode ? '🌙' : '☀️'}
                        </button>

                        <div className="relative" ref={dropdownRefs.i18n}>
                            <button
                                onClick={() => setIsDropdownOpen((prev) => ({ ...prev, i18n: !prev.i18n }))}
                                className={`px-3 py-1.5 rounded-md text-sm ${
                                    isDarkMode ? 'bg-darkCard text-darkText' : 'bg-lightCard text-lightText'
                                } hover:scale-110`}
                            >
                                {language.toUpperCase()} ▼
                            </button>
                            {isDropdownOpen.i18n && (
                                <div
                                    className={`absolute top-full mt-2 w-full rounded-md shadow-lg z-10 ${
                                        isDarkMode ? 'bg-darkSecondary' : 'bg-lightSecondary'
                                    }`}
                                >
                                    {['en', 'fr', 'ar'].map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => changeLanguage(lang)}
                                            className={`block px-4 py-2 text-sm ${
                                                language === lang ? 'font-bold underline' : 'hover:bg-accentGreen'
                                            }`}
                                        >
                                            {lang.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="md:hidden relative" ref={dropdownRefs.mobileMenu}>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`text-2xl ${isDarkMode ? 'text-darkText' : 'text-lightText'}`}
                            >
                                {isMobileMenuOpen ? <IoClose /> : '☰'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div
                    className={`md:hidden p-4 ${
                        isDarkMode ? 'bg-darkSecondary text-darkText' : 'bg-lightSecondary text-lightText'
                    }`}
                >
                    {['home', 'about', 'cycles', 'whychooseus', 'testimonials', 'contact', 'blog', 'inscription'].map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                scrollToSection(item);
                                setIsMobileMenuOpen(false);
                            }}
                            className="block py-2 text-center hover:underline"
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
