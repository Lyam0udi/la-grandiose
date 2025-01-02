import React, { useState, useEffect, Suspense } from 'react'; 
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom'; // Ensure Router wraps the app correctly
import i18n from '../i18n';
import { FaArrowUp } from 'react-icons/fa';

// Lazy load components with optimizations
const Navbar = React.lazy(() => import(/* webpackChunkName: "navbar" */ '../components/Navbar'));
const Home = React.lazy(() => import(/* webpackPrefetch: true */ '../components/Home'));
const About = React.lazy(() => import('../components/About'));
const Cycles = React.lazy(() => import('../components/Cycles'));
const ContactUs = React.lazy(() => import('../components/ContactUs'));
const WhyChooseUs = React.lazy(() => import('../components/WhyChooseUs'));
const GrandioseBenefits = React.lazy(() => import('../components/GrandioseBenefits'));
const ProfessorCards = React.lazy(() => import('../components/ProfessorCards'));
const Testimonials = React.lazy(() => import('../components/Testimonials'));
const Footer = React.lazy(() => import('../components/Footer')); // Lazy-load Footer

// Debounce utility for better performance
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

const Welcome = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('isDarkMode');
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage || i18n.language || 'fr';
    });

    const [isContentReady, setIsContentReady] = useState(false); // Track if lazy components are loaded

    // Update dark mode class on document
    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Sync system dark mode with app
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => setIsDarkMode(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Save dark mode setting to localStorage
    useEffect(() => {
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    // Change language and save preference
    useEffect(() => {
        i18n.changeLanguage(language);
        localStorage.setItem('language', language);
        document.documentElement.lang = language; // Update HTML lang attribute dynamically
    }, [language]);

    // Scroll to the correct section on hash change
    useEffect(() => {
        if (isContentReady) {
            const hash = window.location.hash;
            if (hash) {
                const target = document.querySelector(hash);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop,
                        behavior: 'smooth',
                    });
                }
            }
        }
    }, [isContentReady]);

    // Handle scroll for updating URL hash dynamically
    const handleScroll = debounce(() => {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (
                sectionId &&
                scrollPosition >= sectionTop - 100 &&
                scrollPosition < sectionTop + sectionHeight - 100
            ) {
                if (window.location.hash !== `#${sectionId}`) {
                    window.history.pushState(null, '', `#${sectionId}`);
                }
            }
        });
    }, 100);

    // Scroll-to-Top Button
    const ScrollToTopButton = ({ isDarkMode }) => {
        const [isVisible, setIsVisible] = useState(false);

        // Toggle visibility based on scroll position
        useEffect(() => {
            const handleScroll = () => {
                setIsVisible(window.scrollY > 100); // Show button after 100px scroll
            };

            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);

        // Scroll to the top smoothly
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };

        // Styling for the button
        const buttonStyle = isDarkMode
            ? 'bg-darkSecondary text-darkText hover:bg-accentGreen'
            : 'bg-lightSecondary text-lightText hover:bg-accentGreen';

        return (
            isVisible && (
                <button
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    className={`fixed bottom-4 right-4 p-3 rounded-full shadow-md transition-transform transform hover:scale-110 ${buttonStyle}`}
                >
                    <FaArrowUp />
                </button>
            )
        );
    };

    return (
        <I18nextProvider i18n={i18n}>
            {/* Wrap with Router */}
            <Router>
                {/* Main Flex Container */}
                <div className="flex flex-col min-h-screen">
                    {/* Navbar */}
                    <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} language={language} setLanguage={setLanguage} />

                    <Suspense
                        fallback={
                            <div
                                className="loading-spinner"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100vh',
                                }}
                            >
                                <p>Loading...</p>
                            </div>
                        }
                    >
                        {/* Landing Page Sections */}
                        <section id="home">
                            <Home isDarkMode={isDarkMode} />
                        </section>
                        <section id="about">
                            <About isDarkMode={isDarkMode} />
                        </section>
                        <section id="cycles">
                            <Cycles isDarkMode={isDarkMode} />
                        </section>
                        <section id="whychooseus">
                            <WhyChooseUs isDarkMode={isDarkMode} />
                        </section>
                        <section id="grandiosebenefits">
                            <GrandioseBenefits isDarkMode={isDarkMode} />
                        </section>
                        <section id="professorCards">
                            <ProfessorCards isDarkMode={isDarkMode} />
                        </section>
                        <section id="testimonials">
                            <Testimonials isDarkMode={isDarkMode} />
                        </section>
                        <section id="contact">
                            <ContactUs isDarkMode={isDarkMode} />
                        </section>
                    </Suspense>

                    {/* Scroll-to-Top Button */}
                    <ScrollToTopButton isDarkMode={isDarkMode} />

                    {/* Footer */}
                    <section className="mt-auto">
                        <Footer isDarkMode={isDarkMode} />
                    </section>
                </div>
            </Router>
        </I18nextProvider>
    );
};

export default Welcome;
