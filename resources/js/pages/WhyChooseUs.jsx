// resources/js/pages/WhyChooseUs.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const WhyChooseUs = () => {
    const { t } = useTranslation();

    return (
        <div className="why-choose-us py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold">{t('why_choose_us')}</h2>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="feature text-center">
                        <img src="/icons/quality.svg" alt="Quality" className="mx-auto mb-4 h-12" />
                        <h3 className="text-xl font-semibold">{t('quality_service')}</h3>
                        <p className="mt-2 text-gray-600">{t('quality_description')}</p>
                    </div>
                    <div className="feature text-center">
                        <img src="/icons/experience.svg" alt="Experience" className="mx-auto mb-4 h-12" />
                        <h3 className="text-xl font-semibold">{t('expert_guides')}</h3>
                        <p className="mt-2 text-gray-600">{t('expert_guides_description')}</p>
                    </div>
                    <div className="feature text-center">
                        <img src="/icons/custom_routes.svg" alt="Custom Routes" className="mx-auto mb-4 h-12" />
                        <h3 className="text-xl font-semibold">{t('custom_routes')}</h3>
                        <p className="mt-2 text-gray-600">{t('custom_routes_description')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;