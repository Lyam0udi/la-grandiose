import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next'; // Import the i18n hook
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { FaMoon, FaSun } from 'react-icons/fa'; // For theme toggle icons

const AuthenticatedLayout = ({ header, children }) => {
    const { t, i18n } = useTranslation(); // i18n hook for language management
    const user = usePage().props.auth.user;

    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode') === 'true'); // Dark mode state
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en'); // Language state
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const dropdownRefs = {
        i18n: useRef(),
        mobileMenu: useRef(),
    };

    // Handle theme toggle
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    // Change language and update localStorage
    const changeLanguage = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang); // Change language in i18n
    };

    // Save dark mode state to localStorage
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('isDarkMode', isDarkMode); // Persist the dark mode state
    }, [isDarkMode]);

    // Save language preference to localStorage
    useEffect(() => {
        localStorage.setItem('language', language); // Persist the language preference
    }, [language]);

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'}`}>
            <nav className={`border-b ${isDarkMode ? 'border-darkSecondary bg-darkBackground' : 'border-lightSecondary bg-lightBackground'}`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className={`block h-9 w-auto fill-current ${isDarkMode ? 'text-darkText' : 'text-lightText'}`} />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    isDarkMode={isDarkMode}
                                >
                                    {t('dashboard')}
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            {/* Theme Toggle Button */}
                            <button
                                onClick={toggleTheme}
                                className="text-xl px-2 py-1 rounded-md transition-all hover:bg-darkSecondary dark:hover:bg-lightSecondary"
                            >
                                {isDarkMode ? <FaSun /> : <FaMoon />}
                            </button>

                            {/* Language Dropdown */}
                            <div className="relative ms-3" ref={dropdownRefs.i18n}>
                                <Dropdown isDarkMode={isDarkMode}>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className={`inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 ${isDarkMode ? 'bg-darkSecondary text-darkText hover:text-lightText' : 'bg-lightSecondary text-lightText hover:text-darkText'}`}
                                            >
                                                {language.toUpperCase()} ▼
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content isDarkMode={isDarkMode}>
                                        {['en', 'fr', 'ar'].map((lang) => (
                                            <Dropdown.Link
                                                key={lang}
                                                onClick={() => changeLanguage(lang)}
                                                isDarkMode={isDarkMode}
                                            >
                                                {lang.toUpperCase()}
                                            </Dropdown.Link>
                                        ))}
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>

                            {/* User Dropdown */}
                            <div className="relative ms-3">
                                <Dropdown isDarkMode={isDarkMode}>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className={`inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 ${isDarkMode ? 'bg-darkSecondary text-darkText hover:text-lightText' : 'bg-lightSecondary text-lightText hover:text-darkText'}`}
                                            >
                                                {user.name}
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content isDarkMode={isDarkMode}>
                                        <Dropdown.Link href={route('profile.edit')} isDarkMode={isDarkMode}>
                                            {t('profile')}
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" isDarkMode={isDarkMode}>
                                            {t('log_out')}
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown((previousState) => !previousState)
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-darkText hover:bg-darkSecondary focus:bg-darkSecondary dark:text-lightText dark:hover:bg-lightSecondary dark:focus:bg-lightSecondary"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {showingNavigationDropdown && (
                    <div className="sm:hidden">
                        <div className="space-y-1 pb-3 pt-2">
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')} isDarkMode={isDarkMode}>
                                {t('dashboard')}
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('profile.edit')} isDarkMode={isDarkMode}>
                                {t('profile')}
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('logout')} method="post" as="button" isDarkMode={isDarkMode}>
                                {t('log_out')}
                            </ResponsiveNavLink>
                        </div>
                    </div>
                )}
            </nav>

            {header && (
                <header className={`${isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'} shadow`}>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
};

export default AuthenticatedLayout;
