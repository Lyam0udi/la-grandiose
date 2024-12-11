import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Home = ({ isDarkMode, onLoaded }) => {
    const { t } = useTranslation();

    const [imageIndex, setImageIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState({});
    const [currentImage, setCurrentImage] = useState('/images/placeholder.webp');
    const timerRef = useRef(null);
    const isManualSwitching = useRef(false);
    const touchStartX = useRef(0);

    const images = useMemo(() => [
        '/images/hero-bg1.webp',
        '/images/hero-bg2.webp',
        '/images/hero-bg3.webp',
        '/images/hero-bg4.webp',
        '/images/hero-bg5.webp',
    ], []);

    useEffect(() => {
        const preloadImages = (index) => {
            [index, (index + 1) % images.length, (index - 1 + images.length) % images.length].forEach((idx) => {
                const src = images[idx];
                if (!loadedImages[src]) {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => {
                        setLoadedImages((prev) => ({ ...prev, [src]: true }));
                    };
                }
            });
        };
        preloadImages(imageIndex);
    }, [imageIndex, images, loadedImages]);

    useEffect(() => {
        if (Object.keys(loadedImages).length === images.length && onLoaded) {
            onLoaded();
        }
    }, [loadedImages, images, onLoaded]);

    useEffect(() => {
        if (loadedImages[images[imageIndex]]) {
            setCurrentImage(images[imageIndex]);
        }
    }, [imageIndex, images, loadedImages]);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            if (!isManualSwitching.current) {
                setImageIndex((prev) => (prev + 1) % images.length);
            }
        }, 5000);
        return () => clearInterval(timerRef.current);
    }, [images]);

    const handleManualSwitch = (direction) => {
        isManualSwitching.current = true;
        setImageIndex((prev) => 
            direction === 'next'
                ? (prev + 1) % images.length
                : (prev - 1 + images.length) % images.length
        );
        setTimeout(() => (isManualSwitching.current = false), 5000);
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const diff = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(diff) > 50) {
            handleManualSwitch(diff > 0 ? 'prev' : 'next');
        }
    };

    return (
        <div
            className={`relative h-screen transition-all ${
                isDarkMode ? 'bg-gray-900' : 'bg-white'
            }`}
            style={{
                backgroundImage: `url(${currentImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'background-image 1s ease',
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Background Overlay */}
            <div
                className={`absolute inset-0 ${
                    isDarkMode
                        ? 'bg-black bg-opacity-60'
                        : 'bg-white bg-opacity-50'
                }`}
            />

            {/* Centralized Content Box */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <div
                    className={`p-8 rounded-lg shadow-lg ${
                        isDarkMode
                            ? 'bg-gray-800 bg-opacity-90 text-white'
                            : 'bg-white bg-opacity-80 text-gray-900'
                    }`}
                >
                    <h1 className="text-4xl sm:text-5xl font-extrabold">
                        {t('hero_title')}
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl">
                        {t('hero_description')}
                    </p>
                    <a
                        href="/inscription"
                        className={`mt-8 inline-block px-6 py-3 text-lg font-semibold rounded-full shadow-md transition-transform ${
                            isDarkMode
                                ? 'bg-indigo-500 text-white hover:scale-105'
                                : 'bg-indigo-600 text-white hover:scale-105'
                        }`}
                    >
                        {t('inscription_button')}
                    </a>
                </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute inset-y-0 left-4 flex items-center">
                <button
                    className={`p-2 rounded-full transition-all ${
                        isDarkMode
                            ? 'bg-gray-800 text-white hover:scale-110'
                            : 'bg-gray-300 text-gray-900 hover:scale-110'
                    }`}
                    onClick={() => handleManualSwitch('prev')}
                    aria-label={t('prev_image')}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
            </div>
            <div className="absolute inset-y-0 right-4 flex items-center">
                <button
                    className={`p-2 rounded-full transition-all ${
                        isDarkMode
                            ? 'bg-gray-800 text-white hover:scale-110'
                            : 'bg-gray-300 text-gray-900 hover:scale-110'
                    }`}
                    onClick={() => handleManualSwitch('next')}
                    aria-label={t('next_image')}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Home;
