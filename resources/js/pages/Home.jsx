import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const Home = ({ isDarkMode }) => {
    const { t } = useTranslation();

    const [imageIndex, setImageIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState(new Set()); // Tracks loaded images
    const [isLoading, setIsLoading] = useState(true); // Tracks current image loading state

    const images = useMemo(
        () => [
            '/images/hero-bg1.webp',
            '/images/hero-bg2.webp',
            '/images/hero-bg3.webp',
            '/images/hero-bg4.webp',
            '/images/hero-bg5.webp',
        ],
        []
    );

    const placeholderImage = '/images/placeholder.webp'; // Small lightweight placeholder

    // Preload the next image
    const preloadImage = (src) => {
        if (!loadedImages.has(src)) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                setLoadedImages((prev) => new Set(prev).add(src));
            };
        }
    };

    // Load current and adjacent images
    useEffect(() => {
        preloadImage(images[imageIndex]); // Preload current image
        preloadImage(images[(imageIndex + 1) % images.length]); // Preload next image
        preloadImage(images[(imageIndex - 1 + images.length) % images.length]); // Preload previous image

        setIsLoading(!loadedImages.has(images[imageIndex])); // Update loading state
    }, [imageIndex, images, loadedImages]);

    // Rotate images every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [images]);

    return (
        <div className={`home relative ${isDarkMode ? 'dark' : ''}`}>
            {/* Hero Section */}
            <section
                className="hero bg-cover bg-center h-screen text-white flex items-center justify-center transition-all duration-1000 ease-in-out"
                style={{
                    backgroundImage: `url(${
                        loadedImages.has(images[imageIndex]) ? images[imageIndex] : placeholderImage
                    })`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Loading Spinner */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="spinner border-t-transparent border-4 border-white rounded-full w-12 h-12 animate-spin"></div>
                    </div>
                )}

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
                <>
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
                            <path d="M4.707 12.293a1 1 0 0 1 0-1.414L8.586 8 4.707 4.121a1 1 0 1 1 1.414-1.414l5 5a1 1 0 0 1-1.414 0z" />
                        </svg>
                    </button>
                </>
            </section>
        </div>
    );
};

export default Home;
