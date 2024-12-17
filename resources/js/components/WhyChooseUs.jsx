import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheckCircle, FaLightbulb, FaHandsHelping, FaChalkboardTeacher } from 'react-icons/fa';

const WhyChooseUsCard = ({ icon, title, description, isDarkMode }) => (
  <div
    className={`flex items-start p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 ${
      isDarkMode ? 'bg-darkCard text-darkText' : 'bg-lightCard text-lightText'
    } border ${isDarkMode ? 'border-darkBorder' : 'border-lightBorder'}`}
  >
    <div className="mr-4 text-primaryBlue text-3xl">{icon}</div>
    <div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const WhyChooseUs = ({ isDarkMode }) => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FaCheckCircle />,
      title: t('whychooseus_point1_title'),
      description: t('whychooseus_point1_description'),
    },
    {
      icon: <FaLightbulb />,
      title: t('whychooseus_point2_title'),
      description: t('whychooseus_point2_description'),
    },
    {
      icon: <FaHandsHelping />,
      title: t('whychooseus_point3_title'),
      description: t('whychooseus_point3_description'),
    },
    {
      icon: <FaChalkboardTeacher />,
      title: t('whychooseus_point4_title'),
      description: t('whychooseus_point4_description'),
    },
  ];

  return (
    <section
      className={`py-16 ${
        isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'
      } transition-colors duration-500`}
      aria-label={t('whychooseus_title')}
    >
      <div className="container mx-auto px-6 sm:px-12">
        {/* Section Title */}
        <h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-8 ${
            isDarkMode ? 'text-secondaryBlue' : 'text-primaryBlue'
          }`}
        >
          {t('whychooseus_title')}
        </h2>

        {/* Section Description */}
        <p className="text-center text-base sm:text-lg mb-12 max-w-3xl mx-auto text-lightTextSecondary">
          {t('whychooseus_description')}
        </p>

        {/* Features Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, index) => (
            <WhyChooseUsCard
              key={index}
              icon={feature.icon}
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
