import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound = ({ isDarkMode }) => {
  const { t } = useTranslation();

  useEffect(() => {
    // Set the page title for SEO purposes
    document.title = t('404') + ' - ' + t('site_name'); // Assuming 'site_name' is defined in your translations
  }, [t]);

  return (
    <section
      className={`min-h-screen flex items-center justify-center py-16 md:py-20 ${
        isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'
      } transition-colors duration-500`}
      aria-live="assertive"
    >
      <div className="container px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
        {/* Left Side: Text Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          {/* Title Section */}
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ lineHeight: '1.3' }}
            role="alert"
          >
            {t('404')}
          </h1>

          {/* Message Section */}
          <p className="text-xl mb-6">{t('oops_message')}</p>

          {/* Go Home Link */}
          <Link
            to="/"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            aria-label={t('go_home_button')}
          >
            {t('go_home')}
          </Link>
        </div>

        {/* Right Side: Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/images/404.webp" // Use the same image for all themes
            alt={t('404_image_alt')} // Assuming '404_image_alt' is defined in your translations
            className="rounded-lg shadow-lg max-w-full h-auto"
            style={{ maxWidth: '500px', width: '100%' }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
