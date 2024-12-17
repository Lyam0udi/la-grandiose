import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutText = ({ t }) => (
  <div className="md:w-1/2 px-4 text-center md:text-left">
    <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-4 md:mb-6">
      {t('about_paragraph_1')}
    </p>
    <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-4 md:mb-6">
      {t('about_paragraph_2')}
    </p>
    <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
      {t('about_paragraph_3')}
    </p>
  </div>
);

const AboutImage = () => (
  <div className="md:w-1/2 flex justify-center">
    <img
      src="/images/about-school.webp"
      alt="School environment with students engaged in learning"
      className="rounded-lg shadow-lg max-w-full h-auto transition-transform duration-300 transform hover:scale-105"
      style={{ maxHeight: '400px', width: 'auto' }}
      loading="lazy"
    />
  </div>
);

const About = ({ isDarkMode }) => {
  const { t } = useTranslation();

  return (
    <section
      className={`py-16 md:py-20 ${
        isDarkMode
          ? 'bg-sectionDarkBackground text-darkText'
          : 'bg-sectionLightBackground text-lightText'
      } transition-colors duration-500`}
      aria-label={t('about_section_label')}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 animate__animated animate__fadeIn"
          style={{ lineHeight: '1.3' }}
        >
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
