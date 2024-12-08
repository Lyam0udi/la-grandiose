import React from 'react';
import { useTranslation } from 'react-i18next';

const About = ({ isDarkMode }) => {
    const { t } = useTranslation();

    return (
        <section
            className={`about-section py-20 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} transition-colors duration-500`}
        >
            <div className="container mx-auto px-6 md:px-12">
                {/* Title Section */}
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
                    {t('about_title')}
                </h2>

                {/* About Content */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
                    {/* Left Text Section */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <p className="text-xl leading-relaxed mb-6">
                            {t('about_paragraph_1')}
                        </p>
                        <p className="text-xl leading-relaxed mb-6">
                            {t('about_paragraph_2')}
                        </p>
                        <p className="text-xl leading-relaxed">
                            {t('about_paragraph_3')}
                        </p>
                    </div>

                    {/* Right Image Section */}
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src="/images/about-school.jpg" // Ensure this path is correct and the image exists
                            alt="School Image"
                            className="rounded-lg shadow-lg"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;