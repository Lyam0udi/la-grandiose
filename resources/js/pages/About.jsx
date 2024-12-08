import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutText = ({ t }) => (
  <div className="md:w-1/2 text-center md:text-left">
    <p className="text-xl leading-relaxed mb-6">{t('about_paragraph_1')}</p>
    <p className="text-xl leading-relaxed mb-6">{t('about_paragraph_2')}</p>
    <p className="text-xl leading-relaxed">{t('about_paragraph_3')}</p>
  </div>
);

const AboutImage = () => (
  <div className="md:w-1/2 flex justify-center">
    <img
      src="/images/about-school.jpg"
      alt="School environment with students engaged in learning"
      className="rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
      loading="lazy"
    />
  </div>
);

const About = ({ isDarkMode }) => {
  const { t } = useTranslation();

  return (
    <section
      className={`about-section py-20 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} transition-colors duration-500`}
      aria-label={t('about_section_label')}
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Title Section */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 animate__animated animate__fadeIn">
          {t('about_title')}
        </h2>

        {/* About Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
          <AboutText t={t} />
          <AboutImage />
        </div>
      </div>
    </section>
  );
};

export default About;
