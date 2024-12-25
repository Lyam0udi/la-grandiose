import { useForm } from '@inertiajs/react'; 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

export default function TestimonialForm({ testimonial = null, locales = ['en', 'fr', 'ar'] }) {
    const safeLocales = Array.isArray(locales) ? locales : ['en', 'fr', 'ar'];

    const { data, setData, post, put, processing, errors } = useForm({
        emoticon: testimonial ? testimonial.emoticon : '',
        is_student: testimonial ? (testimonial.is_student ? 'Student' : 'Parent') : 'Student',
        translations: safeLocales.reduce((acc, locale) => {
            acc[locale] = {
                name: testimonial ? (testimonial.translations.find(t => t.locale === locale)?.name || '') : '',
                description: testimonial ? (testimonial.translations.find(t => t.locale === locale)?.description || '') : '',
            };
            return acc;
        }, {}),
    });

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    useEffect(() => {
        // Only update the form data if `testimonial` changes (only on the first load or if `testimonial` is updated)
        if (testimonial && testimonial.id && Object.keys(data.translations).length === 0) {
            setData({
                emoticon: testimonial.emoticon || '',
                is_student: testimonial.is_student ? 'Student' : 'Parent',
                translations: safeLocales.reduce((acc, locale) => {
                    const translation = testimonial.translations.find(t => t.locale === locale);
                    acc[locale] = translation || { name: '', description: '' };
                    return acc;
                }, {}),
            });
        }
    }, [testimonial, safeLocales, setData]);

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
                data,
                onSuccess: () => {
                    alert('Testimonial updated successfully!');
                },
            });
        } else {
            post(route('testimonials.store'), {
                data,
                onSuccess: () => {
                    alert('Testimonial added successfully!');
                },
            });
        }
    };

    const handleEmojiSelect = (emoji) => {
        setData('emoticon', emoji);
        setShowEmojiPicker(false);
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
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="emoticon"
                                                value={data.emoticon}
                                                readOnly
                                                onClick={() => setShowEmojiPicker((prev) => !prev)}
                                                className="block w-full p-2 border rounded-md mt-1 cursor-pointer"
                                            />
                                            {errors.emoticon && (
                                                <p className="text-red-500 text-sm">{errors.emoticon}</p>
                                            )}
                                            {showEmojiPicker && (
                                                <div className="absolute z-10 bg-white shadow-md border rounded-md mt-1 p-2">
                                                    {['😊', '😂', '😍', '😢', '😡'].map((emoji) => (
                                                        <span
                                                            key={emoji}
                                                            onClick={() => handleEmojiSelect(emoji)}
                                                            className="cursor-pointer text-xl mx-1"
                                                        >
                                                            {emoji}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label htmlFor="is_student">Role</label>
                                        <select
                                            id="is_student"
                                            value={data.is_student}
                                            onChange={(e) => setData('is_student', e.target.value)}
                                            className="block w-full p-2 border rounded-md mt-1"
                                        >
                                            <option value="Student">Student</option>
                                            <option value="Parent">Parent</option>
                                        </select>
                                        {errors.is_student && (
                                            <p className="text-red-500 text-sm">{errors.is_student}</p>
                                        )}
                                    </div>

                                    {safeLocales.map((locale) => (
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
