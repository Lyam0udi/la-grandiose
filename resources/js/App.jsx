import React, { useState, useEffect, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Helmet } from 'react-helmet';
import i18next from 'i18next';

// Lazy load components to improve performance
const Navbar = React.lazy(() => import('./components/Navbar'));
const About = React.lazy(() => import('./pages/About'));
const ContactUs = React.lazy(() => import('./pages/ContactUs'));
const Cycles = React.lazy(() => import('./pages/Cycles'));
const GrandioseBenefits = React.lazy(() => import('./pages/GrandioseBenefits'));
const Home = React.lazy(() => import('./pages/Home'));
const Testimonials = React.lazy(() => import('./pages/Testimonials'));
const WhyChooseUs = React.lazy(() => import('./pages/WhyChooseUs'));
const ProfessorCards = React.lazy(() => import('./pages/ProfessorCards'));
const Footer = React.lazy(() => import('./pages/Footer'));

// Debounce function to optimize scroll event handling
const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('isDarkMode');
        return savedTheme ? JSON.parse(savedTheme) : false; // Default to white theme
    });

    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage || i18n.language || 'en'; // Default to English
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    useEffect(() => {
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    useEffect(() => {
        i18n.changeLanguage(language);
        localStorage.setItem('language', language);
    }, [language]);

    // Function to handle hash change and scroll to correct section
    const handleScroll = debounce(() => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY;
            const sectionId = section.getAttribute('id');

            // Ensure the section ID is valid and check if the section is in view
            if (sectionId && scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
                // Update the URL hash without triggering reload
                if (window.location.hash !== `#${sectionId}`) {
                    window.history.pushState(null, '', `#${sectionId}`);
                }
            }
        });
    }, 200);

    // Effect to handle URL hash change on page load or refresh
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                window.scrollTo({
                    top: element.offsetTop,
                    behavior: 'smooth',
                });
            }
        }
    }, []); // Empty dependency array ensures this runs once on initial load

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Only set up once, on mount

    return (
        <I18nextProvider i18n={i18n}>
            {/* <Suspense fallback={<div>Loading...</div>}> */}
                {/* SEO Meta Tags */}
                <Helmet>
                    <title>La Grandiose</title>
                    <meta name="description" content="La Grandiose est une école primaire et maternelle dédiée à offrir une éducation et un enseignement de qualité dans un environnement chaleureux et bienveillant." />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    {/* Add additional SEO meta tags as needed */}
                </Helmet>

                {/* Navbar with Dark Mode and Language Switching */}
                <Navbar
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                    language={language}
                    setLanguage={setLanguage}
                />

                {/* Sections */}
                <section id="home" tabIndex={0}>
                    <Home isDarkMode={isDarkMode} />
                </section>
                <section id="about" tabIndex={0}>
                    <About isDarkMode={isDarkMode} />
                </section>
                <section id="cycles" tabIndex={0}>
                    <Cycles isDarkMode={isDarkMode} />
                </section>
                <section id="whychooseus" tabIndex={0}>
                    <WhyChooseUs isDarkMode={isDarkMode} />
                </section>
                <section id="grandiosebenefits" tabIndex={0}>
                    <GrandioseBenefits isDarkMode={isDarkMode} />
                </section>
                <section id="professorCards" tabIndex={0}>
                    <ProfessorCards isDarkMode={isDarkMode} />
                </section>
                <section id="testimonials" tabIndex={0}>
                    <Testimonials isDarkMode={isDarkMode} />
                </section>
                <section id="contact" tabIndex={0}>
                    <ContactUs isDarkMode={isDarkMode} />
                </section>
                <section id="footer" tabIndex={0}>
                    <Footer isDarkMode={isDarkMode} />
                </section>
            {/* </Suspense> */}
        </I18nextProvider>
    );
};

export default App;
