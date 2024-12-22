import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';  // i18n hook for language management
import { FaMoon, FaSun } from 'react-icons/fa';  // For theme toggle icons

export default function AuthenticatedLayout({ header, children }) {
    const { t, i18n } = useTranslation();  // i18n translation hook
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode') === 'true');  // Read dark mode from local storage
    const [language, setLanguage] = useState(i18n.language || 'en');  // Language state

    // Effect to update the class based on the dark mode state
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('isDarkMode', isDarkMode);  // Persist the state in local storage
    }, [isDarkMode]);

    // Toggle between dark and light theme
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);  // Toggle dark mode state
    };

    // Change language
    const changeLanguage = (lang) => {
        setLanguage(lang);
        i18n.changeLanguage(lang);  // Change language using i18n
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
            <nav className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-100 bg-white'}`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className={`block h-9 w-auto fill-current ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`} />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    {t('dashboard')}
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            {/* Theme Toggle Button */}
                            <button
                                onClick={toggleTheme}
                                className="text-xl px-2 py-1 rounded-md transition-all hover:text-gray-500 dark:hover:text-gray-300"
                            >
                                {isDarkMode ? <FaSun /> : <FaMoon />}
                            </button>

                            {/* Language Dropdown */}
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className={`inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 ${isDarkMode ? 'bg-gray-800 text-gray-400 hover:text-gray-300' : 'bg-white text-gray-500 hover:text-gray-700'}`}
                                            >
                                                {language.toUpperCase()} ▼
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        {['en', 'fr', 'ar'].map((lang) => (
                                            <Dropdown.Link
                                                key={lang}
                                                onClick={() => changeLanguage(lang)}
                                            >
                                                {lang.toUpperCase()}
                                            </Dropdown.Link>
                                        ))}
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>

                            {/* User Dropdown */}
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className={`inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 ${isDarkMode ? 'bg-gray-800 text-gray-400 hover:text-gray-300' : 'bg-white text-gray-500 hover:text-gray-700'}`}
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

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            {t('profile')}
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
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
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
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
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                {t('dashboard')}
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('profile.edit')}>
                                {t('profile')}
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('logout')} method="post" as="button">
                                {t('log_out')}
                            </ResponsiveNavLink>
                        </div>
                    </div>
                )}
            </nav>

            {header && (
                <header className={`${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} shadow`}>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
