import { useForm } from '@inertiajs/react'; 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

export default function CycleForm({ cycle = null, locales }) {
    const { data, setData, post, put, processing, errors } = useForm({
        photo: null,
        duration: cycle ? cycle.duration.toString() : '', // Ensure it's a string
        age_range: cycle ? cycle.age_range.toString() : '', // Ensure it's a string
        translations: locales.reduce((acc, locale) => {
            acc[locale] = {
                name: '',
                description: '',
                more_details: '',
            };
            return acc;
        }, {}),
    });

    useEffect(() => {
        if (cycle) {
            setData({
                photo: null,
                duration: cycle.duration ? cycle.duration.toString() : '', // Ensure it's a string
                age_range: cycle.age_range ? cycle.age_range.toString() : '', // Ensure it's a string
                translations: locales.reduce((acc, locale) => {
                    const translation = cycle.translations.find((t) => t.locale === locale);
                    acc[locale] = translation || { name: '', description: '', more_details: '' };
                    return acc;
                }, {}),
            });
        }
    }, [cycle, locales]);

    const handleChange = (locale, field, value) => {
        setData((prevData) => ({
            ...prevData,
            translations: {
                ...prevData.translations,
                [locale]: {
                    ...prevData.translations[locale],
                    [field]: value,
                },
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cycle) {
            put(route('cycle.update', cycle.id), {
                onSuccess: () => {
                    alert('Cycle updated successfully!');
                },
            });
        } else {
            post(route('cycle.store'), {
                onSuccess: () => {
                    alert('Cycle added successfully!');
                },
            });
        }
    };

    return (
        <I18nextProvider i18n={i18n}>
            <AuthenticatedLayout>
                <Head title={cycle ? 'Edit Cycle' : 'Add Cycle'} />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <h1 className="text-2xl font-bold">
                                    {cycle ? 'Edit Cycle' : 'Add Cycle'}
                                </h1>

                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="mt-4">
                                        <label htmlFor="photo">Photo</label>
                                        <input
                                            type="file"
                                            id="photo"
                                            onChange={(e) => setData('photo', e.target.files[0])}
                                            className="block w-full p-2 border rounded-md mt-1"
                                        />
                                        {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="duration">Duration (in years)</label>
                                        <input
                                            type="number"
                                            id="duration"
                                            value={data.duration || ''}
                                            onChange={(e) => setData('duration', e.target.value)}
                                            className="block w-full p-2 border rounded-md mt-1"
                                        />
                                        {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="age_range">Age Range</label>
                                        <input
                                            type="number"
                                            id="age_range"
                                            value={data.age_range || ''}
                                            onChange={(e) => setData('age_range', e.target.value)}
                                            className="block w-full p-2 border rounded-md mt-1"
                                        />
                                        {errors.age_range && <p className="text-red-500 text-sm">{errors.age_range}</p>}
                                    </div>

                                    {locales.map((locale) => (
                                        <div key={locale} className="mt-6">
                                            <h3 className="text-lg font-semibold">{locale.toUpperCase()}</h3>
                                            <div className="mt-2">
                                                <label>Name</label>
                                                <input
                                                    type="text"
                                                    value={data.translations[locale]?.name || ''}
                                                    onChange={(e) =>
                                                        handleChange(locale, 'name', e.target.value)
                                                    }
                                                    className="block w-full p-2 border rounded-md mt-1"
                                                />
                                                {errors[`translations.${locale}.name`] && (
                                                    <p className="text-red-500 text-sm">
                                                        {errors[`translations.${locale}.name`]}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="mt-2">
                                                <label>Description</label>
                                                <textarea
                                                    value={data.translations[locale]?.description || ''}
                                                    onChange={(e) =>
                                                        handleChange(locale, 'description', e.target.value)
                                                    }
                                                    className="block w-full p-2 border rounded-md mt-1"
                                                />
                                                {errors[`translations.${locale}.description`] && (
                                                    <p className="text-red-500 text-sm">
                                                        {errors[`translations.${locale}.description`]}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="mt-2">
                                                <label>More Details</label>
                                                <textarea
                                                    value={data.translations[locale]?.more_details || ''}
                                                    onChange={(e) =>
                                                        handleChange(locale, 'more_details', e.target.value)
                                                    }
                                                    className="block w-full p-2 border rounded-md mt-1"
                                                />
                                                {errors[`translations.${locale}.more_details`] && (
                                                    <p className="text-red-500 text-sm">
                                                        {errors[`translations.${locale}.more_details`]}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        {processing ? 'Saving...' : cycle ? 'Update Cycle' : 'Add Cycle'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </I18nextProvider>
    );
}
