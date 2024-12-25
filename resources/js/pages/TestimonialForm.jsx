import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

export default function TestimonialForm({ testimonial = null, locales }) {
    const { data, setData, post, put, processing, errors } = useForm({
        emoticon: testimonial ? testimonial.emoticon : '',
        is_parent: testimonial ? testimonial.is_parent : false,
        translations: locales.reduce((acc, locale) => {
            acc[locale] = {
                name: '',
                description: '',
            };
            return acc;
        }, {}),
    });

    useEffect(() => {
        if (testimonial) {
            setData({
                emoticon: testimonial.emoticon || '',
                is_parent: testimonial.is_parent || false,
                translations: locales.reduce((acc, locale) => {
                    const translation = testimonial.translations.find((t) => t.locale === locale);
                    acc[locale] = translation || { name: '', description: '' };
                    return acc;
                }, {}),
            });
        }
    }, [testimonial, locales]);

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
        if (testimonial) {
            put(route('testimonials.update', testimonial.id), {
                onSuccess: () => {
                    alert('Testimonial updated successfully!');
                },
            });
        } else {
            post(route('testimonials.store'), {
                onSuccess: () => {
                    alert('Testimonial added successfully!');
                },
            });
        }
    };

    return (
        <I18nextProvider i18n={i18n}>
            <AuthenticatedLayout>
                <Head title={testimonial ? 'Edit Testimonial' : 'Add Testimonial'} />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <h1 className="text-2xl font-bold">
                                    {testimonial ? 'Edit Testimonial' : 'Add Testimonial'}
                                </h1>

                                <form onSubmit={handleSubmit}>
                                    <div className="mt-4">
                                        <label htmlFor="emoticon">Emoticon</label>
                                        <input
                                            type="text"
                                            id="emoticon"
                                            value={data.emoticon || ''}
                                            onChange={(e) => setData('emoticon', e.target.value)}
                                            className="block w-full p-2 border rounded-md mt-1"
                                        />
                                        {errors.emoticon && (
                                            <p className="text-red-500 text-sm">{errors.emoticon}</p>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <label>
                                            Parent or Student
                                            <input
                                                type="checkbox"
                                                checked={data.is_parent}
                                                onChange={(e) => setData('is_parent', e.target.checked)}
                                                className="ml-2"
                                            />
                                            <span className="ml-2">{data.is_parent ? 'Parent' : 'Student'}</span>
                                        </label>
                                        {errors.is_parent && (
                                            <p className="text-red-500 text-sm">{errors.is_parent}</p>
                                        )}
                                    </div>

                                    {locales.map((locale) => (
                                        <div key={locale} className="mt-6">
                                            <h3 className="text-lg font-semibold">
                                                {locale.toUpperCase()} Translation
                                            </h3>
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
                                        </div>
                                    ))}

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        {processing ? 'Saving...' : testimonial ? 'Update Testimonial' : 'Add Testimonial'}
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
