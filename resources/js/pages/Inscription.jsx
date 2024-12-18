import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Inscription = ({ isDarkMode }) => {
  const { t } = useTranslation();
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

    // Validate Schoolss: Only Latin characters allowed
    if (name === 'currentSchool' && /[^a-zA-Z\s]/.test(value)) return;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section
      className={`py-16 ${
        isDarkMode ? 'bg-darkBackground text-darkText' : 'bg-lightBackground text-lightText'
      }`}
    >
      <div className="container mx-auto px-6 sm:px-12">
        <h1
          className={`text-3xl sm:text-4xl font-bold text-center mb-8 ${
            isDarkMode ? 'text-secondaryBlue' : 'text-primaryBlue'
          }`}
        >
          {t('inscription_title')}
        </h1>
        <p className="text-center mb-12">{t('inscription_description')}</p>

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
            <div key={name} className="flex flex-col">
              <label className="mb-2 font-medium">{label}</label>
              {type === 'select' ? (
                <select
                  name={name}
                  className={`w-full px-4 py-2 rounded border ${
                    isDarkMode
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
                  className={`w-full px-4 py-2 rounded border resize-none h-24 ${
                    isDarkMode
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
                  className={`w-full px-4 py-2 rounded border ${
                    isDarkMode
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
          <button
            type="submit"
            className={`col-span-1 sm:col-span-2 py-3 px-6 rounded font-bold ${
              isDarkMode
                ? 'bg-buttonPrimaryDark text-lightText hover:bg-buttonHoverDark'
                : 'bg-buttonPrimaryLight text-lightText hover:bg-buttonHoverLight'
            }`}
          >
            {t('submit_button')}
          </button>
        </form>

        {/* Cards Section */}
        <h2 className="text-2xl font-bold mb-6">{t('required_documents_title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
              className={`p-6 rounded-lg border shadow ${
                isDarkMode
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
      </div>
    </section>
  );
};

export default Inscription;
