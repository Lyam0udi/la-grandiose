// resources/js/pages/Testimonials.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
    const { t } = useTranslation();

    return (
        <div className="testimonials py-16 bg-gray-100">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold">{t('testimonials')}</h2>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="testimonial bg-white shadow-lg rounded-lg p-6">
                        <p className="text-gray-600">"{t('testimonial_1')}"</p>
                        <h4 className="mt-4 font-semibold">{t('customer_1')}</h4>
                    </div>
                    <div className="testimonial bg-white shadow-lg rounded-lg p-6">
                        <p className="text-gray-600">"{t('testimonial_2')}"</p>
                        <h4 className="mt-4 font-semibold">{t('customer_2')}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
