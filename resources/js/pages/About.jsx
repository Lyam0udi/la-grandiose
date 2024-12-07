// resources/js/pages/About.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();

    return (
        <div className="about py-16 bg-lightBackground">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold">{t('about_us')}</h2>
                <p className="mt-4 text-xl">{t('about_description')}</p>
                <div className="mt-8">
                    <p className="text-gray-700">{t('about_details')}</p>
                </div>
            </div>
        </div>
    );
};

export default About;
