import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Home = ({ isDarkMode, onLoaded }) => {
    const { t } = useTranslation();

    const [imageIndex, setImageIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState({});
    const [currentImage, setCurrentImage] = useState('/images/placeholder.webp');
    const sectionRef = useRef(null);
    const timerRef = useRef(null);
    const isManualSwitching = useRef(false); // Track manual interactions
    const touchStartX = useRef(0); // Track touch start position for tactile navigation

    const images = useMemo(() => [
        { default: '/images/hero-bg1.webp' },
        { default: '/images/hero-bg2.webp' },
        { default: '/images/hero-bg3.webp' },
        { default: '/images/hero-bg4.webp' },
        { default: '/images/hero-bg5.webp' },
    ], []);

    // Preload adjacent images
    useEffect(() => {
        const preloadAdjacentImages = (index) => {
            const current = images[index].default;
            const next = images[(index + 1) % images.length].default;
            const prev = images[(index - 1 + images.length) % images.length].default;

            [current, next, prev].forEach((src) => {
                if (!loadedImages[src]) {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => {
                        setLoadedImages((prev) => ({ ...prev, [src]: true }));
                    };
                }
            });
        };

        preloadAdjacentImages(imageIndex);
    }, [imageIndex, images, loadedImages]);

    // Notify the parent when all images are loaded
    useEffect(() => {
        const allImagesLoaded = images.every((src) => loadedImages[src.default]);
        if (allImagesLoaded && onLoaded) {
            onLoaded();
        }
    }, [images, loadedImages, onLoaded]);

    // Set the current image when fully loaded
    useEffect(() => {
        if (loadedImages[images[imageIndex].default]) {
            setCurrentImage(images[imageIndex].default);
        }
    }, [imageIndex, images, loadedImages]);

    // Automatic rotation every 5000ms
    useEffect(() => {
        const startTimer = () => {
            timerRef.current = setInterval(() => {
                if (!isManualSwitching.current) { // Skip rotation during manual switching
                    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                }
            }, 5000);
        };

        startTimer();
        return () => clearInterval(timerRef.current); // Cleanup on unmount
    }, [images]);

    // Manual navigation
    const handleManualChange = (direction) => {
        isManualSwitching.current = true; // Indicate manual interaction
        setImageIndex((prevIndex) =>
            direction === 'next'
                ? (prevIndex + 1) % images.length
                : (prevIndex - 1 + images.length) % images.length
        );
        setTimeout(() => (isManualSwitching.current = false), 5000); // Reset manual switching flag after 5 seconds
    };

    // Handle touch gestures for tactile navigation
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchEndX - touchStartX.current;

        if (Math.abs(diff) > 50) { // Minimum swipe distance threshold
            handleManualChange(diff > 0 ? 'prev' : 'next');
        }
    };

    return (
        <div
            ref={sectionRef}
            className={`home relative ${isDarkMode ? 'dark' : ''}`}
            style={{
                backgroundImage: `url(${currentImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: isDarkMode ? '#000' : '#fff', // Fallback background
                transition: 'background-image 1s ease-in-out',
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Hero Section */}
            <section
                className="hero bg-cover bg-center h-screen text-white flex items-center justify-center transition-all duration-1000 ease-in-out"
            >
                {/* Dark Mode Overlay */}
                <div
                    className={`absolute inset-0 ${isDarkMode ? 'bg-black opacity-50' : 'bg-black opacity-30'}`}
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

                {/* Navigation Buttons */}
                <button
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'} p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none hidden md:block`}
                    onClick={() => handleManualChange('prev')}
                    aria-label="Previous Image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.293 4.293a1 1 0 0 1 0 1.414L9.414 12l5.879 5.879a1 1 0 1 1-1.414 1.414l-6.5-6.5a1 1 0 0 1 0-1.414l6.5-6.5a1 1 0 0 1 1.414 0z" />
                    </svg>
                </button>

                <button
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'} p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none hidden md:block`}
                    onClick={() => handleManualChange('next')}
                    aria-label="Next Image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.707 4.293a1 1 0 0 0 0 1.414L14.586 12l-5.879 5.879a1 1 0 0 0 1.414 1.414l6.5-6.5a1 1 0 0 0 0-1.414l-6.5-6.5a1 1 0 0 0-1.414 0z" />
                    </svg>
                </button>

            </section>
        </div>
    );
};

export default Home;
