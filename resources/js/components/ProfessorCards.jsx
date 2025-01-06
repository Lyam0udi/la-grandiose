import React, { useState, useEffect, memo } from 'react'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

// ProfessorCard Component with React.memo to optimize performance
const ProfessorCard = memo(({ professor, isDarkMode }) => {
  const defaultImage = '/path-to-your-default-image.jpg'; // Fallback image path

  const handleImageError = (e) => {
    e.target.src = defaultImage; // Fallback when image fails
  };

  return (
    <div
      className={`relative flex-shrink-0 w-64 h-80 p-6 rounded-lg shadow-lg transition-transform duration-500 ${
        isDarkMode ? 'bg-darkCard text-darkText' : 'bg-lightCard text-lightText'
      } border ${isDarkMode ? 'border-darkBorder' : 'border-lightBorder'}`}
    >
      <img
        src={`/storage/${professor.photo}`}
        alt={professor.name}
        className="w-full h-36 rounded-md object-cover mb-4"
        onError={handleImageError}
        loading="lazy" // Lazy load images for performance
      />
      <h3 className="text-xl font-bold mb-2">{professor.name}</h3>
      <p className="text-primaryBlue font-medium mb-1">{professor.study_material}</p>
      <p className="text-sm leading-relaxed">{professor.description}</p>
    </div>
  );
});

const ProfessorCards = ({ isDarkMode, professorsData }) => {
  const { i18n } = useTranslation();
  const [professors, setProfessors] = useState([]); 

  // Update professor data based on current locale
  const getProfessorsWithLocale = (locale) => {
    if (!Array.isArray(professorsData)) return [];

    return professorsData.map((professor) => {
      const translation = professor.translations?.find((trans) => trans.locale === locale) || professor.translations?.find((trans) => trans.locale === 'en');
      
      return {
        id: professor.id,
        photo: professor.photo || '',
        name: translation ? translation.name : 'Name not available',
        study_material: translation ? translation.study_material : 'Study material not available',
        description: translation ? translation.description : 'Description not available',
      };
    });
  };

  useEffect(() => {
    const locale = i18n.language;
    setProfessors(getProfessorsWithLocale(locale));
  }, [i18n.language, professorsData]);

  // Ensure professors data is available
  if (!professors || professors.length === 0) {
    return <div className="flex justify-center items-center h-screen">No professors data available.</div>;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <section
        className={`py-16 ${isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'} transition-colors duration-500`}
      >
        <div className="container mx-auto px-6 sm:px-12">
          {/* Section Title */}
          <h2
            className={`text-3xl sm:text-4xl font-bold text-center mb-4 ${
              isDarkMode ? 'text-secondaryBlue' : 'text-primaryBlue'
            }`}
          >
            {i18n.t('professors_section_title')}
          </h2>

          {/* Brief Description Below Title */}
          <p className="text-center text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            {i18n.t('professors_section_description')}
          </p>

          {/* Swiper Carousel for Professors */}
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={40} // Increased space between elements
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            loop={true}
            centeredSlides={true} // Center slides for better visual effect
          >
            {professors.map((professor) => (
              <SwiperSlide key={professor.id}>
                <ProfessorCard professor={professor} isDarkMode={isDarkMode} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </I18nextProvider>
  );
};

export default ProfessorCards;
