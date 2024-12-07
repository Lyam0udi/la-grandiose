// resources/js/pages/Home.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero bg-cover bg-center h-screen text-white flex items-center justify-center" style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}>
                <div className="text-center px-4">
                    <h1 className="text-5xl font-bold">{t('welcome_to_la_grandiose')}</h1>
                    <p className="mt-4 text-xl">{t('hero_subheading')}</p>
                    <a href="/inscription" className="mt-6 bg-vibrantGreen text-white py-3 px-6 rounded-full hover:bg-green-700 inline-block">
                        {t('get_started')}
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Home;