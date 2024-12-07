import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Home = ({ isDarkMode }) => {
    const { t } = useTranslation();

    const [imageIndex, setImageIndex] = useState(0);
    const images = [
        '/images/hero-bg1.jpg',
        '/images/hero-bg2.jpg',
        '/images/hero-bg3.jpg',
        '/images/hero-bg4.jpg',
        '/images/hero-bg5.jpg',
    ]; // Array of background images

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop through images
        }, 5000); // Change background every 5 seconds

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [images.length]);

    return (
        <div className={`home relative ${isDarkMode ? 'dark' : ''}`}>
            {/* Hero Section */}
            <section
                className="hero bg-cover bg-center h-screen text-white flex items-center justify-center transition-all duration-1000 ease-in-out"
                style={{
                    backgroundImage: `url(${images[imageIndex]})`, // Dynamically change background
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Dark Mode Overlay */}
                <div
                    className={`absolute inset-0 ${
                        isDarkMode ? 'bg-black opacity-50' : 'bg-black opacity-30'
                    }`}
                ></div>

                {/* Text Content */}
                <div className="text-center relative z-10 px-4">
                    <h1 className="text-5xl font-bold sm:text-4xl lg:text-6xl">{t('hero_title')}</h1>
                    <p className="mt-4 text-xl sm:text-lg lg:text-2xl">{t('hero_description')}</p>
                    <a
                        href="/inscription"
                        className="mt-6 bg-vibrantGreen text-white py-3 px-6 rounded-full hover:bg-green-700 transition-colors inline-block"
                    >
                        {t('inscription_button')}
                    </a>
                </div>

                {/* Navigation Arrows */}
                <button
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                        isDarkMode ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'
                    } p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110`}
                    onClick={() => setImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-chevron-left"
                        viewBox="0 0 16 16"
                    >
                        <path d="M11.293 12.293a1 1 0 0 0 0-1.414L7.414 8l3.879-3.879a1 1 0 0 0-1.414-1.414l-5 5a1 1 0 0 0 0 1.414l5 5a1 1 0 0 0 1.414 0z" />
                    </svg>
                </button>

                <button
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                        isDarkMode ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'
                    } p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110`}
                    onClick={() => setImageIndex((prev) => (prev + 1) % images.length)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-chevron-right"
                        viewBox="0 0 16 16"
                    >
                        <path d="M4.707 12.293a1 1 0 0 1 0-1.414L8.586 8 4.707 4.121a1 1 0 1 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0z" />
                    </svg>
                </button>
            </section>
        </div>
    );
};

export default Home;
