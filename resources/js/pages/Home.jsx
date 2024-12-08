import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Home = ({ isDarkMode }) => {
    const { t } = useTranslation();

    const [imageIndex, setImageIndex] = useState(0);
    const [imageLoadStatus, setImageLoadStatus] = useState({});
    const [currentImage, setCurrentImage] = useState('/images/placeholder.webp'); // Initialize with placeholder
    const [isAnimating, setIsAnimating] = useState(true); // Controls auto-rotation
    const sectionRef = useRef(null);
    const timerRef = useRef(null); // Reference to the rotation interval

    const images = useMemo(() => [
        '/images/hero-bg1.webp',
        '/images/hero-bg2.webp',
        '/images/hero-bg3.webp',
        '/images/hero-bg4.webp',
        '/images/hero-bg5.webp',
    ], []);

    const placeholderImage = '/images/placeholder.webp';

    // Preload images
    const preloadImage = (src) => {
        if (!imageLoadStatus[src]) {
            const img = new Image();
            img.src = src;
            img.onload = () => setImageLoadStatus((prev) => ({ ...prev, [src]: true }));
        }
    };

    useEffect(() => {
        // Preload the current, next, and previous images
        const current = images[imageIndex];
        const next = images[(imageIndex + 1) % images.length];
        const prev = images[(imageIndex - 1 + images.length) % images.length];

        preloadImage(current);
        preloadImage(next);
        preloadImage(prev);

        // Set the current image once it's loaded; fallback to placeholder if not yet loaded
        if (imageLoadStatus[current]) {
            setCurrentImage(current);
        } else {
            setCurrentImage(placeholderImage);
        }
    }, [imageIndex, images, imageLoadStatus]);

    // Automatically rotate images every 5 seconds
    useEffect(() => {
        if (!isAnimating) return; // Skip if animation is paused

        const startTimer = () => {
            timerRef.current = setInterval(() => {
                setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 5000);
        };

        startTimer();
        return () => clearInterval(timerRef.current); // Cleanup on unmount or pause
    }, [isAnimating, images]);

    // Manual navigation without interfering with the timer
    const handleManualChange = (direction) => {
        clearInterval(timerRef.current); // Stop the auto-rotation temporarily
        setImageIndex((prevIndex) =>
            direction === 'next'
                ? (prevIndex + 1) % images.length
                : (prevIndex - 1 + images.length) % images.length
        );
        setIsAnimating(true); // Resume auto-rotation
    };

    // Pause animation when the section is out of view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsAnimating(entry.isIntersecting),
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={sectionRef}
            className={`home relative ${isDarkMode ? 'dark' : ''}`}
            style={{
                backgroundImage: `url(${currentImage})`, // Set placeholder immediately
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: isDarkMode ? '#000' : '#fff', // Fallback for old browsers
            }}
        >
            {/* Hero Section */}
            <section
                className="hero bg-cover bg-center h-screen text-white flex items-center justify-center transition-all duration-1000 ease-in-out"
            >
                {/* Loading Spinner */}
                {currentImage === placeholderImage && (
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
                <button
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                        isDarkMode ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'
                    } p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none`}
                    onClick={() => handleManualChange('prev')}
                    aria-label="Previous Image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.293 12.293a1 1 0 0 0 0-1.414L7.414 8l3.879-3.879a1 1 0 0 0-1.414-1.414l-5 5a1 1 0 0 0 1.414 0z" />
                    </svg>
                </button>

                <button
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                        isDarkMode ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'
                    } p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none`}
                    onClick={() => handleManualChange('next')}
                    aria-label="Next Image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4.707 12.293a1 1 0 0 1 0-1.414L8.586 8 4.707 4.121a1 1 0 1 1 1.414-1.414l5 5a1 1 0 0 1-1.414 0z" />
                    </svg>
                </button>
            </section>
        </div>
    );
};

export default Home;
