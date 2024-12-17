import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaHome } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Navbar = ({ isDarkMode, setIsDarkMode, language, setLanguage }) => {
    const { t } = useTranslation();
    const [navbarBg, setNavbarBg] = useState(isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText');
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

    const redirectToLandingPageWithHash = (id) => {
        window.location.href = `/#${id}`;
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
        const sectionColors = {
            home: { light: 'bg-lightBackground text-lightText', dark: 'bg-darkBackground text-darkText' },
            about: { light: 'bg-lightBackground text-lightText', dark: 'bg-darkBackground text-darkText' },
            cycles: { light: 'bg-lightSecondary text-lightText', dark: 'bg-darkSecondary text-darkText' },
            whychooseus: { light: 'bg-lightBackground text-lightText', dark: 'bg-darkBackground text-darkText' },
            grandiosebenefits: { light: 'bg-lightSecondary text-lightText', dark: 'bg-darkSecondary text-darkText' },
            professorCards: { light: 'bg-lightBackground text-lightText', dark: 'bg-darkBackground text-darkText' },
            testimonials: { light: 'bg-lightSecondary text-lightText', dark: 'bg-darkSecondary text-darkText' },
            contact: { light: 'bg-lightBackground text-lightText', dark: 'bg-darkBackground text-darkText' },
        };

        const observerOptions = {
            root: null,
            rootMargin: '-50px 0px -90% 0px',
            threshold: 0,
        };

        let currentSection = null;

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    if (currentSection !== sectionId) {
                        currentSection = sectionId;
                        const sectionColor = sectionColors[sectionId] || { light: 'bg-lightBackground text-lightText', dark: 'bg-darkBackground text-darkText' };
                        setNavbarBg(isDarkMode ? sectionColor.dark : sectionColor.light);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        document.addEventListener('click', closeDropdownOnClickOutside);

        return () => {
            document.removeEventListener('click', closeDropdownOnClickOutside);
            sections.forEach((section) => observer.unobserve(section));
        };
    }, [isDarkMode]);

    // Force update navbar background when theme changes
    useEffect(() => {
        // Update navbar background when theme changes
        setNavbarBg(isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText');
    }, [isDarkMode]);

    // Fix for /blog and /inscription page when theme toggles
    useEffect(() => {
        if (window.location.pathname === '/blog' || window.location.pathname === '/inscription') {
            setNavbarBg(isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText');
        }
    }, [isDarkMode]);

    return (
        <nav className={`fixed w-full top-0 z-50 shadow-lg transition-all duration-300 ${navbarBg}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="cursor-pointer" onClick={() => redirectToLandingPageWithHash('home')}>
                        <img
                            src="/images/logo.png"
                            alt="Logo"
                            loading="lazy"
                            className="w-20 sm:w-28 transition-transform duration-300 hover:scale-110"
                        />
                    </div>

                    <div className="hidden lg:flex space-x-6">
                        <a
                            href="#home"
                            className="hover:underline transition-all"
                            onClick={(e) => {
                                e.preventDefault();
                                redirectToLandingPageWithHash('home');
                            }}
                        >
                            <FaHome className={`text-xl ${isDarkMode ? 'text-darkText' : 'text-lightText'}`} />
                        </a>

                        {['about', 'cycles', 'whychooseus', 'testimonials', 'contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item}`}
                                className="hover:underline transition-all"
                                onClick={(e) => {
                                    e.preventDefault();
                                    redirectToLandingPageWithHash(item);
                                }}
                            >
                                {t(item)}
                            </a>
                        ))}

                        <div className="relative" ref={dropdownRefs.more}>
                            <button
                                onClick={() => setIsDropdownOpen((prev) => ({ ...prev, more: !prev.more }))}
                                className="hover:underline transition-all"
                                aria-haspopup="true"
                                aria-expanded={isDropdownOpen.more ? 'true' : 'false'}
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
                                        <a
                                            key={item}
                                            href={`/${item}`}
                                            className="block px-4 py-2 text-sm hover:bg-accentGreen hover:text-white"
                                        >
                                            {t(item)}
                                        </a>
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
                            aria-label="Toggle Theme"
                        >
                            {isDarkMode ? '🌙' : '☀️'}
                        </button>

                        <div className="relative" ref={dropdownRefs.i18n}>
                            <button
                                onClick={() => setIsDropdownOpen((prev) => ({ ...prev, i18n: !prev.i18n }))}
                                className={`px-3 py-1.5 rounded-md text-sm ${
                                    isDarkMode ? 'bg-darkCard text-darkText' : 'bg-lightCard text-lightText'
                                } hover:scale-110`}
                                aria-haspopup="true"
                                aria-expanded={isDropdownOpen.i18n ? 'true' : 'false'}
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

                        <div className="lg:hidden relative" ref={dropdownRefs.mobileMenu}>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`text-2xl ${isDarkMode ? 'text-darkText' : 'text-lightText'}`}
                                aria-label="Toggle mobile menu"
                            >
                                {isMobileMenuOpen ? <IoClose /> : '☰'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div
                    className={`lg:hidden p-4 ${isDarkMode ? 'bg-darkSecondary text-darkText' : 'bg-lightSecondary text-lightText'}`}
                >
                    {['home', 'about', 'cycles', 'whychooseus', 'testimonials', 'contact', 'blog', 'inscription'].map((item) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            onClick={(e) => {
                                e.preventDefault();
                                if (item === 'blog' || item === 'inscription') {
                                    window.location.href = `/${item}`;
                                } else {
                                    redirectToLandingPageWithHash(item);
                                }
                                setIsMobileMenuOpen(false);
                            }}
                            className="block py-2 text-center hover:underline"
                        >
                            {t(item)}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
