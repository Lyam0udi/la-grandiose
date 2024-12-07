// resources/js/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();
    
    const [imageIndex, setImageIndex] = useState(0);
    const images = [
        '/images/hero-bg1.jpg',
        '/images/hero-bg2.jpg',
        '/images/hero-bg3.jpg',
        '/images/hero-bg4.jpg',
        '/images/hero-bg5.jpg'
    ]; // Background images array

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop through images
        }, 5000); // Change background every 5 seconds

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [images.length]);

    return (
        <div className="home relative">
            {/* Hero Section with Dynamic Background Images */}
            <section
                className="hero bg-cover bg-center h-screen text-white flex items-center justify-center transition-all duration-1000 ease-in-out"
                style={{
                    backgroundImage: `url(${images[imageIndex]})`, // Dynamically change background
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-black opacity-40"></div> {/* Overlay for text readability */}
                <div className="text-center relative z-10 px-4">
                    <h1 className="text-5xl font-bold">{t('welcome_to_la_grandiose')}</h1>
                    <p className="mt-4 text-xl">{t('hero_subheading')}</p>
                    <a
                        href="/inscription"
                        className="mt-6 bg-vibrantGreen text-white py-3 px-6 rounded-full hover:bg-green-700 inline-block"
                    >
                        {t('get_started')}
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Home;