import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

export default function CategoryForm({ category = null, locales = [] }) {
    const { data, setData, post, put, processing, errors } = useForm({
        translations: locales.reduce((acc, locale) => {
            acc[locale] = { name: '' };
            return acc;
        }, {}),
    });

    useEffect(() => {
        if (category) {
            setData({
                translations: locales.reduce((acc, locale) => {
                    const translation = category.translations.find((t) => t.locale === locale);
                    acc[locale] = translation || { name: '' };
                    return acc;
                }, {}),
            });
        }
    }, [category, locales]);

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
        if (category) {
            put(route('categories.update', category.id), {
                onSuccess: () => {
                    alert('Category updated successfully!');
                },
            });
        } else {
            post(route('categories.store'), {
                onSuccess: () => {
                    alert('Category added successfully!');
                },
            });
        }
    };

    return (
        <I18nextProvider i18n={i18n}>
            <AuthenticatedLayout>
                <Head title={category ? 'Edit Category' : 'Add Category'} />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <h1 className="text-2xl font-bold">
                                    {category ? 'Edit Category' : 'Add Category'}
                                </h1>

                                <form onSubmit={handleSubmit}>
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
                                        </div>
                                    ))}

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        {processing ? 'Saving...' : category ? 'Update Category' : 'Add Category'}
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
