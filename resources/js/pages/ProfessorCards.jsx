import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const ProfessorCard = ({ professor, isDarkMode }) => (
  <div
    className={`flex-shrink-0 w-full sm:w-80 p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 ${
      isDarkMode ? 'bg-darkCard text-darkText' : 'bg-lightCard text-lightText'
    } border ${isDarkMode ? 'border-darkBorder' : 'border-lightBorder'}`}
  >
    <img
      src={professor.image}
      alt={`${professor.name} - ${professor.matter}`}
      className="rounded-lg w-full h-48 object-cover mb-4"
    />
    <h3 className="text-2xl font-semibold">{professor.name}</h3>
    <p className="text-lg text-primaryBlue mb-2">{professor.matter}</p>
    <p className="text-sm leading-relaxed">{professor.bio}</p>
  </div>
);

const ProfessorCards = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const scrollRef = useRef();

  // Professors Data (Mock Data)
  const professors = [
    {
      name: 'Dr. Emily Carter',
      matter: t('professor_matter_1'),
      bio: t('professor_bio_1'),
      image: '/images/professors/emily-carter.jpg',
    },
    {
      name: 'Dr. James Smith',
      matter: t('professor_matter_2'),
      bio: t('professor_bio_2'),
      image: '/images/professors/james-smith.jpg',
    },
    {
      name: 'Dr. Sophia Wilson',
      matter: t('professor_matter_3'),
      bio: t('professor_bio_3'),
      image: '/images/professors/sophia-wilson.jpg',
    },
    {
      name: 'Dr. Robert Brown',
      matter: t('professor_matter_4'),
      bio: t('professor_bio_4'),
      image: '/images/professors/robert-brown.jpg',
    },
    {
      name: 'Dr. Olivia Johnson',
      matter: t('professor_matter_5'),
      bio: t('professor_bio_5'),
      image: '/images/professors/olivia-johnson.jpg',
    },
    {
      name: 'Dr. William Garcia',
      matter: t('professor_matter_6'),
      bio: t('professor_bio_6'),
      image: '/images/professors/william-garcia.jpg',
    },
  ];

  const scrollNext = () => {
    if (scrollRef.current) {
      const childWidth = scrollRef.current.firstChild.offsetWidth;
      scrollRef.current.scrollBy({ left: childWidth, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      const childWidth = scrollRef.current.firstChild.offsetWidth;
      scrollRef.current.scrollBy({ left: -childWidth, behavior: 'smooth' });
    }
  };

  return (
    <section
      className={`py-16 ${
        isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'
      } transition-colors duration-500`}
      aria-label={t('professor_section_label')}
    >
      <div className="container mx-auto px-6 sm:px-12">
        {/* Section Title */}
        <h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-8 ${
            isDarkMode ? 'text-secondaryBlue' : 'text-primaryBlue'
          }`}
        >
          {t('professor_section_title')}
        </h2>

        {/* Scrollable Professor Cards */}
        <div className="relative">
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primaryBlue text-white p-3 rounded-full shadow-md hover:scale-110 transition-transform"
            aria-label={t('scroll_prev')}
          >
            ◀
          </button>
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth space-x-6 pb-4 scrollbar-hide"
          >
            {professors.map((professor, index) => (
              <div key={index} className="snap-center">
                <ProfessorCard professor={professor} isDarkMode={isDarkMode} />
              </div>
            ))}
          </div>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primaryBlue text-white p-3 rounded-full shadow-md hover:scale-110 transition-transform"
            aria-label={t('scroll_next')}
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfessorCards;