import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const CycleCard = ({ cycle, isDarkMode, isReversed }) => {
  const cycleTranslation = cycle.translations.find(
    (translation) => translation.locale === 'en' // Dynamic based on current language
  ) || cycle.translations[0];

  // Handle undefined duration and age_range gracefully
  const durationText = cycle.duration ? `${cycle.duration} years` : 'N/A';
  const ageRangeText = cycle.age_range ? `${cycle.age_range} years` : 'N/A';

  return (
    <div
      className={`w-full py-10 px-6 rounded-xl shadow-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
        isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightCard text-lightText'
      } border ${isDarkMode ? 'border-darkBorder' : 'border-lightBorder'}`}
    >
      {/* Flexbox for alternating image and content */}
      <div className={`flex flex-col md:flex-row items-center ${isReversed ? 'md:flex-row-reverse' : ''}`}>
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left space-y-4 mb-6 md:mb-0">
          <h3 className="text-3xl font-bold mb-2">{cycleTranslation.name}</h3>
          <p className="text-lg text-opacity-80">{cycleTranslation.description}</p>
          <div className="mt-4 text-lg">
            <p><strong>{ageRangeText}</strong></p>
            <p><strong>Duration:</strong> {durationText}</p>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 mb-6 md:mb-0">
          <img
            src={`storage/${cycle.photo}`}
            alt={cycleTranslation.name}
            className="object-cover w-full h-72 md:h-96 lg:h-[400px] rounded-lg shadow-lg"
          />
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
  }, [i18n.language]); // Refetch when language changes

  if (loading) {
    return (
      <div
        className={`py-20 ${
          isDarkMode ? 'bg-darkSecondary text-darkTextSecondary' : 'bg-lightSecondary text-lightTextSecondary'
        } transition-all duration-500`}
      >
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="text-lg">{t('loading_message')}</p>
        </div>
      </div>
    );
  }

  return (
    <section
      className={`py-20 ${
        isDarkMode ? 'bg-darkSecondary text-darkTextSecondary' : 'bg-lightSecondary text-lightTextSecondary'
      } transition-all duration-500`}
      aria-label={t('cycles_label')}
    >
      <div className="container mx-auto px-6 md:px-12">
        <h2
          className={`text-4xl sm:text-5xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-secondaryBlue' : 'text-primaryBlue'
          }`}
        >
          {t('cycles_title')}
        </h2>

        {/* Render cycles, each in a full row */}
        <div className="space-y-12">
          {cycles.map((cycle, index) => (
            <CycleCard
              key={cycle.id}
              cycle={cycle}
              isDarkMode={isDarkMode}
              isReversed={index % 2 === 1} // Alternate the layout for each cycle
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cycles;
