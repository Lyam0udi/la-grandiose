import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const TestimonialCard = ({ testimonial, isDarkMode }) => {
  const { t } = useTranslation();  // Use the t() function for translation

  return (
    <div
      className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 mb-8 ${
        isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightCard text-lightText'
      }`}
    >
      <p className="text-lg text-center mb-4">{testimonial.description}</p>
      <div className="flex items-center justify-center space-x-4">
        <div className="text-4xl">{testimonial.emoticon}</div>
        <div>
          <h4 className="font-semibold">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">
            {testimonial.is_student
              ? t('student')
              : t('guardian')} 
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = ({ isDarkMode }) => {
  const { t, i18n } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('/api/testimonials/landing');
        const language = i18n.language;

        // Map testimonials to include translations based on the current language
        const formattedTestimonials = response.data.map((testimonial) => ({
          id: testimonial.id,
          emoticon: testimonial.emoticon,
          is_student: testimonial.is_student,
          name: testimonial.translations[language]?.name || 'Name not available',
          description: testimonial.translations[language]?.description || 'Description not available',
        }));

        setTestimonials(formattedTestimonials);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [i18n.language]); // Refetch testimonials when the language changes

  if (loading) {
    return (
      <div
        className={`py-20 ${isDarkMode ? 'bg-darkSecondary text-darkTextSecondary' : 'bg-lightSecondary text-lightTextSecondary'} transition-all duration-500`}
      >
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-center text-lg">{t('loading_message')}</p>
        </div>
      </div>
    );
  }

  return (
    <section
      className={`py-20 ${isDarkMode ? 'bg-darkSecondary text-darkTextSecondary' : 'bg-lightSecondary text-lightTextSecondary'} transition-all duration-500`}
      aria-label={t('testimonials_label')}
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Title */}
        <h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-secondaryBlue' : 'text-primaryBlue'
          }`}
        >
          {t('testimonials_title')}
        </h2>

        {/* Testimonials Single Row Layout */}
        <div className="space-y-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
