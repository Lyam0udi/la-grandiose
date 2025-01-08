import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const CycleCard = ({ cycle, isDarkMode, isReversed, animationDirection }) => {
  const cycleTranslation = cycle.translations.find(
    (translation) => translation.locale === 'en'
  ) || cycle.translations[0];

  const durationText = cycle.duration ? `${cycle.duration} years` : 'N/A';
  const ageRangeText = cycle.age_range ? `${cycle.age_range} years` : 'N/A';

  return (
    <div
      className={`w-full p-8 rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:opacity-90 ${
        isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightCard text-lightText'
      } border ${isDarkMode ? 'border-darkBorder' : 'border-lightBorder'} relative`}
      style={{
        animation: `fadeInFrom${animationDirection} 1s ease-out`,
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent via-opacity-30 to-black rounded-2xl opacity-60 transition-all duration-300"></div>

      <div
        className={`flex flex-col md:flex-row ${
          isReversed ? 'md:flex-row-reverse' : ''
        } items-center justify-between md:space-x-8`}
      >
        {/* Image */}
        <div className="flex-1 mb-6 md:mb-0 relative">
          <img
            src={`storage/${cycle.photo}`}
            alt={cycleTranslation.name}
            className="object-cover w-full h-72 md:h-96 lg:h-[400px] rounded-xl shadow-md transition-all duration-500 transform hover:scale-110 hover:rotate-2"            
            />
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left space-y-6 mb-6 md:mb-0">
          <h3 className="text-4xl font-bold text-gradient mb-4">
            {cycleTranslation.name}
          </h3>
          <p className="text-lg md:text-xl text-opacity-85 mb-6">
            {cycleTranslation.description}
          </p>
          {cycleTranslation.more_details && (
            <p className="text-md md:text-lg text-opacity-75 mt-4">
              {cycleTranslation.more_details}
            </p>
          )}
          <div className="mt-6 text-lg font-medium">
            <p>
              <strong>{ageRangeText}</strong>
            </p>
            <p>
              <strong>Duration:</strong> {durationText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cycles = ({ isDarkMode }) => {
  const { t, i18n } = useTranslation();
  const [cycles, setCycles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCycles = async () => {
      try {
        const response = await axios.get('/api/cycles/landing');
        setCycles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cycles:', error);
        setLoading(false);
      }
    };

    fetchCycles();
  }, [i18n.language]);

  if (loading) {
    return (
      <div
        className={`py-20 ${
          isDarkMode
            ? 'bg-darkSecondary text-darkTextSecondary'
            : 'bg-lightSecondary text-lightTextSecondary'
        } transition-all duration-500`}
      >
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="text-lg">{t('loading_message')}</p>
          <div className="mt-6">
            <div className="animate-pulse flex space-x-4 justify-center">
              <div className="bg-gray-200 rounded-full h-5 w-32"></div>
              <div className="bg-gray-200 rounded-full h-5 w-32"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      className={`py-32 ${
        isDarkMode
          ? 'bg-darkSecondary text-darkTextSecondary'
          : 'bg-lightSecondary text-lightTextSecondary'
      } transition-all duration-500`}
      aria-label={t('cycles_label')}
    >
      <div className="container mx-auto px-6 md:px-12">
        <h2
          className={`text-5xl font-bold text-center mb-16 ${
            isDarkMode ? 'text-secondaryBlue' : 'text-primaryBlue'
          }`}
        >
          {t('cycles_title')}
        </h2>

        <div className="space-y-16">
          {cycles.map((cycle, index) => (
            <CycleCard
              key={cycle.id}
              cycle={cycle}
              isDarkMode={isDarkMode}
              isReversed={index % 2 === 1}
              animationDirection={index % 2 === 0 ? 'Left' : 'Right'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cycles;
