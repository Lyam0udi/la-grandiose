import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ProfessorCard = ({ professor, isDarkMode }) => (
  <div
    className={`relative flex-shrink-0 w-64 h-80 p-4 rounded-lg shadow-lg transition-transform duration-500 ${
      isDarkMode ? 'bg-darkCard text-darkText' : 'bg-lightCard text-lightText'
    } border ${isDarkMode ? 'border-darkBorder' : 'border-lightBorder'}`}
  >
    <img
      src={professor.image}
      alt={professor.name}
      className="w-full h-36 rounded-md object-cover mb-4"
    />
    <h3 className="text-xl font-bold mb-2">{professor.name}</h3>
    <p className="text-primaryBlue font-medium mb-1">{professor.subject}</p>
    <p className="text-sm leading-relaxed">{professor.bio}</p>
  </div>
);

const ProfessorCards = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5); // Default for normal screens

  const professors = [
    {
      name: t('professor_1_name'),
      subject: t('professor_1_subject'),
      bio: t('professor_1_bio'),
      image: '/images/professors/professor1.jpg',
    },
    {
      name: t('professor_2_name'),
      subject: t('professor_2_subject'),
      bio: t('professor_2_bio'),
      image: '/images/professors/professor2.jpg',
    },
    {
      name: t('professor_3_name'),
      subject: t('professor_3_subject'),
      bio: t('professor_3_bio'),
      image: '/images/professors/professor3.jpg',
    },
    {
      name: t('professor_4_name'),
      subject: t('professor_4_subject'),
      bio: t('professor_4_bio'),
      image: '/images/professors/professor4.jpg',
    },
    {
      name: t('professor_5_name'),
      subject: t('professor_5_subject'),
      bio: t('professor_5_bio'),
      image: '/images/professors/professor5.jpg',
    },
    {
      name: t('professor_6_name'),
      subject: t('professor_6_subject'),
      bio: t('professor_6_bio'),
      image: '/images/professors/professor6.jpg',
    },
  ];

  const updateVisibleCount = () => {
    if (window.innerWidth < 640) {
      setVisibleCount(3); // Small devices
    } else {
      setVisibleCount(5); // Larger screens
    }
  };

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const getVisibleProfessors = () => {
    const length = professors.length;
    const endIndex = startIndex + visibleCount;
    return [
      ...professors.slice(startIndex % length, Math.min(endIndex, length)),
      ...professors.slice(0, Math.max(0, endIndex - length)),
    ];
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % professors.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + professors.length) % professors.length);
  };

  const visibleProfessors = getVisibleProfessors();

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`py-16 ${
        isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'
      } transition-colors duration-500`}
      aria-label={t('professors_section_title')}
    >
      <div className="container mx-auto px-6 sm:px-12">
        {/* Section Title */}
        <h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-8 ${
            isDarkMode ? 'text-secondaryBlue' : 'text-primaryBlue'
          }`}
        >
          {t('professors_section_title')}
        </h2>

        {/* Carousel */}
        <div className="relative flex justify-center items-center">
          <button
            className={`absolute left-0 p-2 rounded-full ${
              isDarkMode ? 'bg-darkCard text-darkText' : 'bg-lightCard text-lightText'
            } shadow-md hover:scale-110 transition-transform`}
            onClick={handlePrev}
          >
            &#x276E;
          </button>

          <div className="flex gap-6 overflow-hidden w-full justify-center">
            {visibleProfessors.map((professor, i) => (
              <ProfessorCard
                key={`${startIndex}-${i}`}
                professor={professor}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>

          <button
            className={`absolute right-0 p-2 rounded-full ${
              isDarkMode ? 'bg-darkCard text-darkText' : 'bg-lightCard text-lightText'
            } shadow-md hover:scale-110 transition-transform`}
            onClick={handleNext}
          >
            &#x276F;
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfessorCards;
