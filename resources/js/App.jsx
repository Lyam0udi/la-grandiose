import React, { useState, useEffect, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; // Import React Router
import i18n from './i18n';
import { Helmet } from 'react-helmet';
import { FaArrowUp } from 'react-icons/fa';

// Lazy load components with optimizations
const Navbar = React.lazy(() => import(/* webpackChunkName: "navbar" */ './components/Navbar'));
const About = React.lazy(() => import('./components/About'));
const ContactUs = React.lazy(() => import('./components/ContactUs'));
const Cycles = React.lazy(() => import('./components/Cycles'));
const GrandioseBenefits = React.lazy(() => import('./components/GrandioseBenefits'));
const Home = React.lazy(() => import(/* webpackPrefetch: true */ './components/Home'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const WhyChooseUs = React.lazy(() => import('./components/WhyChooseUs'));
const ProfessorCards = React.lazy(() => import('./components/ProfessorCards'));
const Footer = React.lazy(() => import('./components/Footer'));
const Blog = React.lazy(() => import('./pages/Blog')); // Lazy-loaded Blog page
const Inscription = React.lazy(() => import('./pages/Inscription')); // Lazy-loaded Inscription page
const NotFound = React.lazy(() => import('./pages/NotFound')); // Lazy-loaded NotFound page

// Debounce utility for better performance
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('isDarkMode');
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage || i18n.language || 'en';
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

    // Attach scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


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

    const location = useLocation();
    const is404Page = location.pathname !== '/' && location.pathname !== '/blog' && location.pathname !== '/inscription';

    return (
        <I18nextProvider i18n={i18n}>
            {/* <Router> */}
            <ContentReadyTracker onReady={() => setIsContentReady(true)} />
    
            {/* SEO Meta Tags */}
            <Helmet>
                <title>La Grandiose</title>
                <meta
                    name="description"
                    content="La Grandiose est une école primaire et maternelle dédiée à offrir une éducation et un enseignement de qualité dans un environnement chaleureux et bienveillant."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Organization',
                        name: 'La Grandiose',
                        url: 'https://www.lagrandiose.com',
                        sameAs: [
                            'https://www.facebook.com/LaGrandiose',
                            'https://www.instagram.com/LaGrandiose',
                        ],
                    })}
                </script>
            </Helmet>
    
            {/* Skip to content link for accessibility */}
            {/* <a href="#home" className="skip-to-content">Skip to main content</a> */}
    
            {/* Main Flex Container */}
            <div className="flex flex-col min-h-screen">
    
                {/* Navbar */}
                {!is404Page && <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} language={language} setLanguage={setLanguage} />}
    
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
    
                <Routes>
                    {/* Main Application with Sections */}
                    <Route
                        path="/"
                        element={
                            <>
                                <section id="home" role="region" aria-labelledby="home-heading" tabIndex={0}>
                                    <h1 id="home-heading" className="sr-only">Home Section</h1>
                                    <Home isDarkMode={isDarkMode} />
                                </section>
                                <section id="about" role="region" aria-labelledby="about-heading" tabIndex={0}>
                                    <h2 id="about-heading" className="sr-only">About Section</h2>
                                    <About isDarkMode={isDarkMode} />
                                </section>
                                <section id="cycles" role="region" aria-labelledby="cycles-heading" tabIndex={0}>
                                    <h2 id="cycles-heading" className="sr-only">Cycles Section</h2>
                                    <Cycles isDarkMode={isDarkMode} />
                                </section>
                                <section id="whychooseus" role="region" aria-labelledby="whychooseus-heading" tabIndex={0}>
                                    <h2 id="whychooseus-heading" className="sr-only">Why Choose Us Section</h2>
                                    <WhyChooseUs isDarkMode={isDarkMode} />
                                </section>
                                <section id="grandiosebenefits" role="region" aria-labelledby="grandiosebenefits-heading" tabIndex={0}>
                                    <h2 id="grandiosebenefits-heading" className="sr-only">Grandiose Benefits Section</h2>
                                    <GrandioseBenefits isDarkMode={isDarkMode} />
                                </section>
                                <section id="professorCards" role="region" aria-labelledby="professorcards-heading" tabIndex={0}>
                                    <h2 id="professorcards-heading" className="sr-only">Professor Cards Section</h2>
                                    <ProfessorCards isDarkMode={isDarkMode} />
                                </section>
                                <section id="testimonials" role="region" aria-labelledby="testimonials-heading" tabIndex={0}>
                                    <h2 id="testimonials-heading" className="sr-only">Testimonials Section</h2>
                                    <Testimonials isDarkMode={isDarkMode} />
                                </section>
                                <section id="contact" role="region" aria-labelledby="contact-heading" tabIndex={0}>
                                    <h2 id="contact-heading" className="sr-only">Contact Us Section</h2>
                                    <ContactUs isDarkMode={isDarkMode} />
                                </section>
                            </>
                        }
                    />
    
                    {/* Blog Page */}
                    <Route path="/blog" element={<Blog isDarkMode={isDarkMode} />} />
    
                    {/* Inscription Page */}
                    <Route path="/inscription" element={<Inscription isDarkMode={isDarkMode} />} />
                    <Route path="*" element={<NotFound isDarkMode={isDarkMode} />} /> {/* Catch-all for 404 */}
                </Routes>
    
                {/* Scroll-to-Top Button */}
                <ScrollToTopButton isDarkMode={isDarkMode} />
                </Suspense>
    
                {/* Footer */}
                {!is404Page && (
                    <section role="region" aria-labelledby="footer-heading" tabIndex={0} className="mt-auto">
                        <h2 id="footer-heading" className="sr-only">Footer Section</h2>
                        <Footer isDarkMode={isDarkMode} />
                    </section>
                )}
            </div>
    
            {/* </Router> */}
        </I18nextProvider>
    );
    
};

const ContentReadyTracker = ({ onReady }) => {
    useEffect(() => {
        onReady(); // Notify parent that content is loaded
    }, []);
    return null;
};

export default App;
