// resources/js/pages/Cycles.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Cycles = () => {
    const { t } = useTranslation();

    return (
        <div className="cycles py-16 bg-lightBackground">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold">{t('our_cycles')}</h2>
                <p className="mt-4 text-xl">{t('cycles_description')}</p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="cycle bg-white shadow-lg rounded-lg p-6">
                        <img src="/images/cycle1.jpg" alt="Cycle 1" className="w-full rounded-md" />
                        <h3 className="mt-4 text-xl font-semibold">{t('cycle_1')}</h3>
                        <p className="mt-2 text-gray-600">{t('cycle_1_description')}</p>
                    </div>
                    <div className="cycle bg-white shadow-lg rounded-lg p-6">
                        <img src="/images/cycle2.jpg" alt="Cycle 2" className="w-full rounded-md" />
                        <h3 className="mt-4 text-xl font-semibold">{t('cycle_2')}</h3>
                        <p className="mt-2 text-gray-600">{t('cycle_2_description')}</p>
                    </div>
                    <div className="cycle bg-white shadow-lg rounded-lg p-6">
                        <img src="/images/cycle3.jpg" alt="Cycle 3" className="w-full rounded-md" />
                        <h3 className="mt-4 text-xl font-semibold">{t('cycle_3')}</h3>
                        <p className="mt-2 text-gray-600">{t('cycle_3_description')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cycles;
