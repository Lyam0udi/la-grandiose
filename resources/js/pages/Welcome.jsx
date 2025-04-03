import React, { useState, useEffect, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import i18n from '../i18n';
import { FaArrowUp } from 'react-icons/fa';

// Lazy load components
const Navbar = React.lazy(() => import('../components/Navbar'));
const Home = React.lazy(() => import('../components/Home'));
const About = React.lazy(() => import('../components/About'));
const Cycles = React.lazy(() => import('../components/Cycles'));
const ContactUs = React.lazy(() => import('../components/ContactUs'));
const WhyChooseUs = React.lazy(() => import('../components/WhyChooseUs'));
const GrandioseBenefits = React.lazy(() => import('../components/GrandioseBenefits'));
const ProfessorCards = React.lazy(() => import('../components/ProfessorCards'));
const Testimonials = React.lazy(() => import('../components/Testimonials'));
const Footer = React.lazy(() => import('../components/Footer'));

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
        return localStorage.getItem('language') || i18n.language || 'fr';
    });
    
    // When language changes, update i18n and localStorage
    useEffect(() => {
        i18n.changeLanguage(language);
        localStorage.setItem('language', language);
    }, [language]);
    

    const [professorsData, setProfessorsData] = useState([]);

    // Fetch professors data
    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                const response = await fetch('/api/professors/landing');
                const data = await response.json();
                setProfessorsData(data);
            } catch (error) {
                console.error('Error fetching professors data:', error);
            }
        };

        fetchProfessors();
    }, []);

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

    // Handle scroll for updating URL hash dynamically
    useEffect(() => {
        const handleScroll = debounce(() => {
            const sections = document.querySelectorAll('section');
            const scrollPosition = window.scrollY;

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                // Update hash based on visible section
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

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to section when hash changes
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            const target = document.querySelector(hash);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth',
                });
            }
        };

        // Trigger scroll to section on initial load (if hash is present)
        if (window.location.hash) {
            handleHashChange();
        }

        // Listen to hash changes
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Scroll-to-Top Button
    const ScrollToTopButton = ({ isDarkMode }) => {
        const [isVisible, setIsVisible] = useState(false);

        useEffect(() => {
            const handleScroll = () => {
                setIsVisible(window.scrollY > 100);
            };

            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);

        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        };

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
            <Router>
                <div className="flex flex-col min-h-screen">
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
                            <ProfessorCards professorsData={professorsData} isDarkMode={isDarkMode} />
                        </section>
                        <section id="testimonials">
                            <Testimonials isDarkMode={isDarkMode} />
                        </section>
                        <section id="contact">
                            <ContactUs isDarkMode={isDarkMode} />
                        </section>
                    </Suspense>

                    <ScrollToTopButton isDarkMode={isDarkMode} />

                    <section className="mt-auto">
                        <Footer isDarkMode={isDarkMode} />
                    </section>
                </div>
            </Router>
        </I18nextProvider>
    );
};

export default Welcome;
