import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

export default function ProfessorForm({ professor = null, locales }) {
    const { data, setData, post, put, processing, errors } = useForm({
        photo: null,
        translations: locales.reduce((acc, locale) => {
            acc[locale] = {
                name: '',
                study_material: '',
                description: '',
            };
            return acc;
        }, {}),
    });

    useEffect(() => {
        if (professor) {
            setData({
                photo: null,
                translations: locales.reduce((acc, locale) => {
                    const translation = professor.translations.find((t) => t.locale === locale);
                    acc[locale] = translation || { name: '', study_material: '', description: '' };
                    return acc;
                }, {}),
            });
        }
    }, [professor, locales]);

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
        if (professor) {
            put(route('professor.update', professor.id), {
                onSuccess: () => {
                    alert('Professor updated successfully!');
                },
            });
        } else {
            post(route('professor.store'), {
                onSuccess: () => {
                    alert('Professor added successfully!');
                },
            });
        }
    };    

    return (
        <AuthenticatedLayout>
            <Head title={professor ? 'Edit Professor' : 'Add Professor'} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-bold">
                                {professor ? 'Edit Professor' : 'Add Professor'}
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
                                            <label>Study Material</label>
                                            <input
                                                type="text"
                                                value={data.translations[locale]?.study_material || ''}
                                                onChange={(e) =>
                                                    handleChange(locale, 'study_material', e.target.value)
                                                }
                                                className="block w-full p-2 border rounded-md mt-1"
                                            />
                                            {errors[`translations.${locale}.study_material`] && (
                                                <p className="text-red-500 text-sm">
                                                    {errors[`translations.${locale}.study_material`]}
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
                                    {processing ? 'Saving...' : professor ? 'Update Professor' : 'Add Professor'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
