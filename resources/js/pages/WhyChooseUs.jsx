import React from 'react';
import { useTranslation } from 'react-i18next';

const WhyChooseUsCard = ({ title, description }) => (
  <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 bg-opacity-90">
    <h3 className="text-lg font-bold mb-4">{title}</h3>
    <p className="text-sm leading-relaxed">{description}</p>
  </div>
);

const WhyChooseUs = ({ isDarkMode }) => {
  const { t } = useTranslation();

  const features = [
    {
      title: t('whychooseus_point1_title'),
      description: t('whychooseus_point1_description'),
    },
    {
      title: t('whychooseus_point2_title'),
      description: t('whychooseus_point2_description'),
    },
    {
      title: t('whychooseus_point3_title'),
      description: t('whychooseus_point3_description'),
    },
    {
      title: t('whychooseus_point4_title'),
      description: t('whychooseus_point4_description'),
    },
  ];

  return (
    <section
      className={`py-16 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
      } transition-colors duration-500`}
      aria-label={t('whychooseus_title')}
    >
      <div className="container mx-auto px-6 sm:px-12">
        {/* Section Title */}
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-skyBlue' : 'text-vibrantGreen'
          }`}
        >
          {t('whychooseus_title')}
        </h2>

        {/* Section Description */}
        <p className="text-center text-sm sm:text-base mb-12 max-w-3xl mx-auto">
          {t('whychooseus_description')}
        </p>

        {/* Features Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, index) => (
            <WhyChooseUsCard
              key={index}
              title={feature.title}
              description={feature.description}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
