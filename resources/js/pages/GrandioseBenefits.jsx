import React from 'react';
import { useTranslation } from 'react-i18next';

const GrandioseBenefits = ({ isDarkMode }) => {
    const { t } = useTranslation();

    // List of benefits for dynamic rendering
    const benefits = [
        { icon: '🤔', title: t('benefit_1_title'), description: t('benefit_1_desc') },
        { icon: '🌍', title: t('benefit_2_title'), description: t('benefit_2_desc') },
        { icon: '🎨', title: t('benefit_3_title'), description: t('benefit_3_desc') },
        { icon: '🎓', title: t('benefit_4_title'), description: t('benefit_4_desc') },
        { icon: '💪', title: t('benefit_5_title'), description: t('benefit_5_desc') },
        { icon: '🧠', title: t('benefit_6_title'), description: t('benefit_6_desc') },
        { icon: '🔍', title: t('benefit_7_title'), description: t('benefit_7_desc') },
        { icon: '🧑‍🎓', title: t('benefit_8_title'), description: t('benefit_8_desc') },
    ];

    return (
        <section
            className={`py-20 ${isDarkMode ? 'bg-darkBg text-darkText' : 'bg-lightBg text-lightText'} transition-all duration-500`}
            aria-label={t('grandiose_benefits_label')}
        >
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 animate__animated animate__fadeIn">
                    {t('grandiose_benefits_title')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className={`bg-${isDarkMode ? 'cardBgDark' : 'cardBgLight'} p-6 rounded-lg shadow-lg transition-transform duration-500 transform hover:scale-105 hover:shadow-xl animate__animated animate__fadeIn`}
                        >
                            <div className="text-4xl mb-4">{benefit.icon}</div>
                            <h3 className="text-2xl font-semibold mb-2">{benefit.title}</h3>
                            <p className="text-lg">{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GrandioseBenefits;
