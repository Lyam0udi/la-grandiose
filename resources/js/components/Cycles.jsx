import React from 'react';
import { useTranslation } from 'react-i18next';

const CycleCard = ({ cycle, isDarkMode }) => (
  <div
    className={`p-6 rounded-lg shadow-lg transition-transform duration-500 transform hover:scale-105 hover:shadow-xl ${
      isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightCard text-lightText'
    } border ${
      isDarkMode ? 'border-darkBorder' : 'border-lightBorder'
    }`}
  >
    <div className="text-4xl mb-4">{cycle.icon}</div>
    <h3 className="text-2xl font-semibold mb-2">{cycle.title}</h3>
    <p className="text-lg">{cycle.description}</p>
  </div>
);

const Cycles = ({ isDarkMode }) => {
  const { t } = useTranslation();

  // List of cycles for dynamic rendering
  const cycles = [
    { icon: '⚡', title: t('cycle_1_title'), description: t('cycle_1_desc') },
    { icon: '🌱', title: t('cycle_2_title'), description: t('cycle_2_desc') },
    { icon: '🔥', title: t('cycle_3_title'), description: t('cycle_3_desc') },
    { icon: '💧', title: t('cycle_4_title'), description: t('cycle_4_desc') },
  ];

  return (
    <section
      className={`py-20 ${
        isDarkMode
          ? 'bg-darkSecondary text-darkTextSecondary'
          : 'bg-lightSecondary text-lightTextSecondary'
      } transition-all duration-500`}
      aria-label={t('cycles_label')}
    >
      <div className="container mx-auto px-6 md:px-12">
        <h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-secondaryBlue' : 'text-primaryBlue'
          }`}
        >
          {t('cycles_title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cycles.map((cycle, index) => (
            <CycleCard key={index} cycle={cycle} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cycles;
