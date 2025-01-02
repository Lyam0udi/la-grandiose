import React, { useState, useEffect, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import i18n from '../i18n';

// Lazy-load Navbar and Footer
const Navbar = React.lazy(() => import(/* webpackChunkName: "navbar" */ '../components/Navbar'));
const Footer = React.lazy(() => import('../components/Footer'));

const Inscription = () => {
  const { t } = useTranslation();
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [formData, setFormData] = useState({
    studentName: '',
    schoolLevel: '',
    currentSchool: '',
    birthDate: '',
    guardianName: '',
    phone: '',
    email: '',
    message: ''
  });

  // Handle Input Changes with Validations
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate Email: Only Latin characters allowed
    if (name === 'email' && /[^a-zA-Z0-9@._-]/.test(value)) return;

    // Validate Phone: Only numbers, +, -, (, ) are allowed
    if (name === 'phone' && /[^0-9+\-() ]/.test(value)) return;

    // Validate Names: Only Latin characters allowed
    if ((name === 'studentName' || name === 'guardianName') && /[^a-zA-Z\s]/.test(value)) return;

    // Validate Schools: Only Latin characters allowed
    if (name === 'currentSchool' && /[^a-zA-Z\s]/.test(value)) return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  // Save dark mode setting to localStorage
  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <I18nextProvider i18n={i18n}>
      {/* Wrap with Router */}
      <Router>
        {/* Main Flex Container */}
        <div className="flex flex-col min-h-screen">
          {/* Navbar */}
          <Navbar
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            language={i18n.language}
            setLanguage={i18n.changeLanguage}
          />

          <section
            className={`py-16 mt-10 ${isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'}`}
          >
            <div className="container mx-auto px-6 sm:px-12">
              {/* Title */}
              <h1
                className={`text-3xl sm:text-4xl font-bold text-center mb-8 ${isDarkMode ? 'text-secondaryBlue' : 'text-primaryBlue'}`}
              >
                {t('inscription_title')}
              </h1>
              <p className="text-center mb-12 max-w-3xl mx-auto">{t('inscription_description')}</p>

              {/* Form Section */}
              <form
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16"
                onSubmit={handleSubmit}
              >
                {/* Input Fields */}
                {[
                  {
                    label: t('student_name_label'),
                    name: 'studentName',
                    placeholder: t('student_name_placeholder'),
                    type: 'text'
                  },
                  {
                    label: t('school_level_label'),
                    name: 'schoolLevel',
                    placeholder: t('select_option'),
                    type: 'select',
                    options: [t('next_year_option')]
                  },
                  {
                    label: t('current_school_label'),
                    name: 'currentSchool',
                    placeholder: t('current_school_placeholder'),
                    type: 'text'
                  },
                  {
                    label: t('birth_date_label'),
                    name: 'birthDate',
                    placeholder: t('birth_date_label'),
                    type: 'date'
                  },
                  {
                    label: t('guardian_name_label'),
                    name: 'guardianName',
                    placeholder: t('guardian_name_placeholder'),
                    type: 'text'
                  },
                  {
                    label: t('phone_label'),
                    name: 'phone',
                    placeholder: t('phone_placeholder'),
                    type: 'text'
                  },
                  {
                    label: t('email_label'),
                    name: 'email',
                    placeholder: t('email_placeholder'),
                    type: 'email'
                  },
                  {
                    label: t('message_label'),
                    name: 'message',
                    placeholder: t('message_placeholder'),
                    type: 'textarea'
                  }
                ].map(({ label, name, placeholder, type, options }) => (
                  <div key={name} className="flex flex-col mb-6">
                    <label className="mb-2 font-medium text-lg">{label}</label>
                    {type === 'select' ? (
                      <select
                        name={name}
                        className={`w-full px-4 py-3 rounded-lg border text-lg ${isDarkMode
                          ? 'bg-darkCard border-darkBorder text-darkText placeholder-darkTextSecondary'
                          : 'bg-lightCard border-lightBorder text-lightText placeholder-lightTextSecondary'
                        }`}
                        value={formData[name]}
                        onChange={handleInputChange}
                      >
                        <option value="">{placeholder}</option>
                        {options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : type === 'textarea' ? (
                      <textarea
                        name={name}
                        className={`w-full px-4 py-3 rounded-lg border text-lg resize-none h-24 ${isDarkMode
                          ? 'bg-darkCard border-darkBorder text-darkText placeholder-darkTextSecondary'
                          : 'bg-lightCard border-lightBorder text-lightText placeholder-lightTextSecondary'
                        }`}
                        placeholder={placeholder}
                        value={formData[name]}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <input
                        name={name}
                        type={type}
                        className={`w-full px-4 py-3 rounded-lg border text-lg ${isDarkMode
                          ? 'bg-darkCard border-darkBorder text-darkText placeholder-darkTextSecondary'
                          : 'bg-lightCard border-lightBorder text-lightText placeholder-lightTextSecondary'
                        }`}
                        placeholder={placeholder}
                        value={formData[name]}
                        onChange={handleInputChange}
                      />
                    )}
                  </div>
                ))}

                <div className="col-span-1 sm:col-span-2">
                  <button
                    type="submit"
                    className={`w-full py-3 px-6 rounded-lg font-bold text-lg ${isDarkMode
                      ? 'bg-buttonPrimaryDark text-lightText hover:bg-buttonHoverDark'
                      : 'bg-buttonPrimaryLight text-lightText hover:bg-buttonHoverLight'
                    }`}
                  >
                    {t('submit_button')}
                  </button>
                </div>
              </form>

              {/* Cards Section */}
              <h2 className="text-2xl font-bold mb-6">{t('required_documents_title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  {
                    title: t('maternelle_title'),
                    content: [
                      t('maternelle_content_1'),
                      t('maternelle_content_2'),
                      t('maternelle_content_3'),
                      t('maternelle_content_4')
                    ]
                  },
                  {
                    title: t('primaire_title'),
                    content: [
                      t('primaire_content_1'),
                      t('primaire_content_2'),
                      t('primaire_content_3'),
                      t('primaire_content_4'),
                      t('primaire_content_5')
                    ]
                  }
                ].map(({ title, content }, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border shadow-md ${isDarkMode
                      ? 'bg-darkCard border-darkBorder text-darkText'
                      : 'bg-lightCard border-lightBorder text-lightText'
                    }`}
                  >
                    <h3 className="text-xl font-bold mb-4">{title}</h3>
                    <ul className="list-disc ml-6 space-y-2">
                      {content.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Contact Information Section */}
              <div className="mt-16 flex flex-col sm:flex-row">
                <div className="flex-1 mr-10">
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
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-6">{t('contact_info')}</h3>
                  <div>
                    <p>{t('contact_location')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <Suspense fallback={<div>Loading...</div>}>
            <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </Suspense>
        </div>
      </Router>
    </I18nextProvider>
  );
};

export default Inscription;
