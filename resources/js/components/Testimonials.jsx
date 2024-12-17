import React from 'react';
import { useTranslation } from 'react-i18next';

const TestimonialCard = ({ testimonial, isDarkMode }) => (
  <div
    className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 ${
      isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightCard text-lightText'
    }`}
  >
    <p className="text-lg text-center mb-4">{testimonial.message}</p>
    <div className="flex items-center justify-center space-x-4">
      <div className="text-xl">{testimonial.icon}</div>
      <div>
        <h4 className="font-semibold">{testimonial.name}</h4>
        <p className="text-sm text-gray-500">{testimonial.position}</p>
      </div>
    </div>
  </div>
);

const Testimonials = ({ isDarkMode }) => {
  const { t } = useTranslation();

  // Mock testimonials data (simulating backend data)
  const testimonials = [
    {
      message:
        'La Grandiose helped my child develop confidence and curiosity. I am so impressed with the results!',
      name: 'John Doe',
      position: 'Parent',
      icon: '😊',
    },
    {
      message:
        'An amazing school with a wonderful environment for learning and growth. Highly recommend it!',
      name: 'Jane Smith',
      position: 'Parent',
      icon: '🌟',
    },
    {
      message:
        'I’ve seen a huge difference in my child’s creativity and analytical thinking. La Grandiose is the best!',
      name: 'Test Test',
      position: 'Parent',
      icon: '💡',
    },
  ];

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

        {/* Testimonials Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
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
