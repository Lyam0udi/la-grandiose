import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGlobe } from 'react-icons/fa';

const Footer = ({ isDarkMode }) => {
  const { t } = useTranslation();

  const socialMediaLinks = [
    { icon: <FaGlobe />, url: 'https://example.com', alt: t('social_media_website') },
    { icon: <FaFacebookF />, url: 'https://facebook.com/example', alt: t('social_media_facebook') },
    { icon: <FaInstagram />, url: 'https://instagram.com/example', alt: t('social_media_instagram') },
    { icon: <FaLinkedinIn />, url: 'https://linkedin.com/in/example', alt: t('social_media_linkedin') },
  ];

  const sections = [
    { id: 'home', label: t('section_home') },
    { id: 'about', label: t('section_about') },
    { id: 'cycles', label: t('section_cycles') },
    { id: 'whychooseus', label: t('section_whychooseus') },
    { id: 'grandiosebenefits', label: t('section_grandiosebenefits') },
    { id: 'professorCards', label: t('section_professors') },
    { id: 'testimonials', label: t('section_testimonials') },
    { id: 'contact', label: t('section_contact') },
    { id: 'blog', label: t('section_blog') },
    { id: 'inscription', label: t('section_inscription') },
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className={`py-10 ${
        isDarkMode ? 'bg-darkSecondary text-darkText' : 'bg-lightSecondary text-lightText'
      } border-t ${
        isDarkMode ? 'border-darkBorder' : 'border-lightBorder'
      } transition-all duration-500`}
    >
      <div className="container mx-auto px-6 md:px-12">
        {/* Brand Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          {/* Updated Logo */}
          <div className="cursor-pointer" onClick={() => scrollToSection('home')}>
            <img
              src="/images/logo.png"
              alt="La Grandiose Logo"
              className="w-28 sm:w-32 transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="flex flex-wrap gap-4 text-sm justify-center">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="hover:underline focus:outline-none focus:ring-2"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Social Media & Contact Info */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            {socialMediaLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.alt}
                className={`text-2xl p-3 rounded-full border ${
                  isDarkMode ? 'border-lightText' : 'border-darkText'
                } transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-accentYellow hover:to-accentPurple hover:text-white`}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Contact Info */}
          <div className="text-sm text-center md:text-right">
            <p>
              <strong>{t('footer_address')}</strong>: 123 Main Street, City, Country
            </p>
            <p>
              <strong>{t('footer_phone')}</strong>: +123 456 789
            </p>
            <p>
              <strong>{t('footer_email')}</strong>: example@gmail.com
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 text-xs">
          <p>{t('footer_copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;