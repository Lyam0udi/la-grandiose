// resources/js/pages/Home.jsx
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Home = ({ isDarkMode, onLoaded }) => {
    const { t } = useTranslation();

    const [imageIndex, setImageIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState({});
    const [currentImage, setCurrentImage] = useState('/images/placeholder.webp');
    const sectionRef = useRef(null);
    const timerRef = useRef(null);

    const images = useMemo(() => [
        '/images/hero-bg1.webp',
        '/images/hero-bg2.webp',
        '/images/hero-bg3.webp',
        '/images/hero-bg4.webp',
        '/images/hero-bg5.webp',
    ], []);

    // Preload images and notify the parent when all are loaded
    useEffect(() => {
        let loadedCount = 0;

        images.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                setLoadedImages((prev) => ({ ...prev, [src]: true }));
                loadedCount++;

                // If all images are loaded, notify parent
                if (loadedCount === images.length && onLoaded) {
                    onLoaded();
                }
            };
        });
    }, [images, onLoaded]);

    useEffect(() => {
        setCurrentImage(images[imageIndex]);
    }, [imageIndex, images]);

    // Automatically rotate images every 5 seconds
    useEffect(() => {
        const startTimer = () => {
            timerRef.current = setInterval(() => {
                setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 5000);
        };

        startTimer();
        return () => clearInterval(timerRef.current);
    }, [images]);

    return (
        <div
            ref={sectionRef}
            className={`home relative ${isDarkMode ? 'dark' : ''}`}
            style={{
                backgroundImage: `url(${currentImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: isDarkMode ? '#000' : '#fff',
            }}
        >
            {/* Hero Section */}
            <section
                className="hero bg-cover bg-center h-screen text-white flex items-center justify-center transition-all duration-1000 ease-in-out"
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
            </section>
        </div>
    );
};

export default Home;
