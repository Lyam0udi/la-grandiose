import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { debounce } from 'lodash'; // Import debounce for optimization

export default function CategoryForm({ category = null, locales = ['en', 'fr', 'ar'] }) {
    const safeLocales = Array.isArray(locales) ? locales : ['en', 'fr', 'ar'];

    const { data, setData, post, put, processing, errors, clearErrors } = useForm({
        slug: category ? category.slug : '',  // Pre-fill slug if category exists
        translations: safeLocales.reduce((acc, locale) => {
            acc[locale] = {
                name: category ? (category.translations.find(t => t.locale === locale)?.name || '') : '',
            };
            return acc;
        }, {}),
    });

    // State to track if the slug is unique and the current slug suggestion
    const [slugTaken, setSlugTaken] = useState(false);
    const [suggestedSlug, setSuggestedSlug] = useState(data.slug || '');

    // Pre-fill data for editing
    useEffect(() => {
        if (category && category.id) {
            setData({
                slug: category.slug,
                translations: safeLocales.reduce((acc, locale) => {
                    const translation = category.translations.find((t) => t.locale === locale);
                    acc[locale] = translation || { name: '' };
                    return acc;
                }, {}),
            });
            setSuggestedSlug(category.slug);  // Initialize the suggested slug
        }
    }, [category, safeLocales]);

    // Handle input changes for translations (name)
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

        // If it's a new category and the English name is changed, auto-generate slug
        if (!category && locale === 'en') {
            const name = value.trim();
            if (name) {
                const generatedSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                setSuggestedSlug(generatedSlug);  // Update slug while typing
                setData('slug', generatedSlug);   // Set the slug value to generated slug
                clearErrors('slug'); // Clear errors if slug is being updated

                // Check if the generated slug is unique while typing
                checkSlugUniqueness(generatedSlug);
            }
        } else if (category && locale === 'en') {
            // If category is being edited, generate slug based on the category name change
            const name = value.trim();
            if (name) {
                const generatedSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                setSuggestedSlug(generatedSlug);
                setData('slug', generatedSlug);
                checkSlugUniqueness(generatedSlug);  // Check uniqueness after name change
            }
        }
    };

    // Check if slug is unique in real-time (debounced)
    const checkSlugUniqueness = debounce((slug) => {
        if (!category || data.slug !== category.slug) {
            axios
                .get(route('categories.checkSlug', { slug }))  // Make sure to create this route
                .then(response => {
                    if (response.data.exists) {
                        setSlugTaken(true);  // Slug is taken, append "-tmp"
                        setSuggestedSlug(`${slug}-tmp`);  // Append temporary suffix
                        setData('slug', `${slug}-tmp`);  // Update slug field
                    } else {
                        setSlugTaken(false);  // Slug is available
                    }
                })
                .catch((error) => {
                    console.error('Slug uniqueness check failed:', error);
                });
        }
    }, 500); // 500ms debounce to avoid making too many requests

    // Form submission handling
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all translation names are provided
        let valid = true;
        safeLocales.forEach((locale) => {
            if (!data.translations[locale]?.name) {
                valid = false;
                errors[`translations.${locale}.name`] = 'This field is required';
            }
        });

        if (!valid) {
            setData({ ...data });
            return;
        }

        // Submit the form
        if (category) {
            put(route('categories.update', category.id), {
                data,
                onSuccess: () => {
                    alert('Category updated successfully!');
                },
            });
        } else {
            post(route('categories.store'), {
                data,
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
                                    <div className="mt-4">
                                        <label htmlFor="slug" className="block text-sm font-medium">
                                            Slug (auto-generated)
                                        </label>
                                        <input
                                            id="slug"
                                            type="text"
                                            value={suggestedSlug}
                                            readOnly
                                            className="block w-full p-2 border rounded-md mt-1 bg-gray-100 cursor-not-allowed"
                                        />
                                    </div>

                                    {safeLocales.map((locale) => (
                                        <div key={locale} className="mt-6">
                                            <h3 className="text-lg font-semibold">{locale.toUpperCase()}</h3>
                                            <div className="mt-2">
                                                <label htmlFor={`name-${locale}`} className="block text-sm font-medium">
                                                    Category Name
                                                </label>
                                                <input
                                                    id={`name-${locale}`}
                                                    type="text"
                                                    value={data.translations[locale]?.name || ''}
                                                    onChange={(e) => handleChange(locale, 'name', e.target.value)}
                                                    className="block w-full p-2 border rounded-md mt-1"
                                                    required
                                                />
                                                {errors[`translations.${locale}.name`] && (
                                                    <p className="text-red-500 text-sm">
                                                        {errors[`translations.${locale}.name`]}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {slugTaken && (
                                        <p className="text-red-500 text-sm mt-2">Slug is already taken. It has been updated to include a temporary suffix.</p>
                                    )}

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
