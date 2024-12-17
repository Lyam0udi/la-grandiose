import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = ({ isDarkMode }) => {
  const { t } = useTranslation();

  return (
    <section
      className={`py-16 ${
        isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'
      } transition-colors duration-500`}
      aria-label={t('contactus_title')}
    >
      <div className="container mx-auto px-6 sm:px-12">
        {/* Section Title */}
        <h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-8 ${
            isDarkMode ? 'text-secondaryBlue' : 'text-primaryBlue'
          }`}
        >
          {t('contactus_title')}
        </h2>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">{t('contactus_getintouch')}</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <FaPhoneAlt className="text-primaryBlue text-2xl mr-4" />
                <div>
                  <h4 className="font-semibold">{t('contact_phone_title')}</h4>
                  <p>{t('contact_phone_description')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaEnvelope className="text-primaryBlue text-2xl mr-4" />
                <div>
                  <h4 className="font-semibold">{t('contact_email_title')}</h4>
                  <p>{t('contact_email_description')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-primaryBlue text-2xl mr-4" />
                <div>
                  <h4 className="font-semibold">{t('contact_address_title')}</h4>
                  <p>{t('contact_address_description')}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">{t('contact_map_title')}</h3>
              {/* Replace the `src` value with the actual Google Maps embed URL */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345090946!2d144.95373531550456!3d-37.816279442021704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d3b9cbdd5f8c!2sFlinders%20Street%20Station!5e0!3m2!1sen!2sau!4v1634107431471!5m2!1sen!2sau"
                title="Google Maps Location"
                className="w-full h-64 rounded-lg shadow-md border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">{t('contactus_form_title')}</h3>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {t('contact_form_name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`w-full p-3 rounded-lg shadow-sm border ${
                    isDarkMode ? 'bg-darkCard border-darkBorder text-darkText' : 'bg-lightCard border-lightBorder text-lightText'
                  }`}
                  placeholder={t('contact_form_name_placeholder')}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {t('contact_form_email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full p-3 rounded-lg shadow-sm border ${
                    isDarkMode ? 'bg-darkCard border-darkBorder text-darkText' : 'bg-lightCard border-lightBorder text-lightText'
                  }`}
                  placeholder={t('contact_form_email_placeholder')}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  {t('contact_form_message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className={`w-full p-3 rounded-lg shadow-sm border ${
                    isDarkMode ? 'bg-darkCard border-darkBorder text-darkText' : 'bg-lightCard border-lightBorder text-lightText'
                  }`}
                  placeholder={t('contact_form_message_placeholder')}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className={`w-full py-3 rounded-lg text-white font-semibold transition-transform transform hover:scale-105 ${
                  isDarkMode ? 'bg-primaryBlue' : 'bg-secondaryBlue'
                }`}
              >
                {t('contact_form_submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;