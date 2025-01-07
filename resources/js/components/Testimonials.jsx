import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const TestimonialCard = ({ testimonial, isDarkMode }) => (
  <div
    className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 ${
      isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightCard text-lightText'
    }`}
  >
    <p className="text-lg text-center mb-4">{testimonial.description}</p>
    <div className="flex items-center justify-center space-x-4">
      <div className="text-4xl">{testimonial.emoticon}</div>
      <div>
        <h4 className="font-semibold">{testimonial.name}</h4>
        <p className="text-sm text-gray-500">{testimonial.is_student}</p>
      </div>
    </div>
  </div>
);

const Testimonials = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('/api/testimonials/landing');
        setTestimonials(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div
        className={`py-20 ${
          isDarkMode
            ? 'bg-darkSecondary text-darkTextSecondary'
            : 'bg-lightSecondary text-lightTextSecondary'
        } transition-all duration-500`}
      >
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-center text-lg">{t('loading_message')}</p>
        </div>
      </div>
    );
  }

  return (
    <section
      className={`py-20 ${
        isDarkMode
          ? 'bg-darkSecondary text-darkTextSecondary'
          : 'bg-lightSecondary text-lightTextSecondary'
      } transition-all duration-500`}
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

        {/* Testimonials Row */}
        <div className="flex flex-wrap justify-center gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full sm:w-1/2 lg:w-1/3 flex justify-center">
              <TestimonialCard testimonial={testimonial} isDarkMode={isDarkMode} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
