import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { debounce } from 'lodash'; // Import debounce for optimization

export default function BlogForm({ blog = null, categories = [], locales = ['en', 'fr', 'ar'] }) {
    const safeLocales = Array.isArray(locales) ? locales : ['en', 'fr', 'ar'];

    const { data, setData, post, put, processing, errors, clearErrors } = useForm({
        slug: blog ? blog.slug : '', // Pre-fill slug if blog exists
        title: blog ? blog.title : '',
        category_id: blog ? blog.category_id : '',
        content: blog ? blog.content : '',
        image: null,
        translations: safeLocales.reduce((acc, locale) => {
            acc[locale] = {
                title: blog ? (blog.translations.find(t => t.locale === locale)?.title || '') : '',
                content: blog ? (blog.translations.find(t => t.locale === locale)?.content || '') : '',
            };
            return acc;
        }, {}),
    });

    // Track if slug is taken and suggested slug
    const [slugTaken, setSlugTaken] = useState(false);
    const [suggestedSlug, setSuggestedSlug] = useState(data.slug || '');
    const [selectedCategory, setSelectedCategory] = useState(blog ? blog.category_id : '');

    // Pre-fill data for editing
    useEffect(() => {
        if (blog && blog.id) {
            setData({
                slug: blog.slug,
                title: blog.title,
                category_id: blog.category_id,
                content: blog.content,
                translations: safeLocales.reduce((acc, locale) => {
                    const translation = blog.translations.find((t) => t.locale === locale);
                    acc[locale] = translation || { title: '', content: '' };
                    return acc;
                }, {}),
            });
            setSuggestedSlug(blog.slug); // Initialize the suggested slug
        }
    }, [blog, safeLocales]);

    // Handle input changes for translations (title, content)
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

        // If it's a new blog and the English title is changed, auto-generate slug
        if (!blog && locale === 'en') {
            const name = value.trim();
            if (name) {
                const generatedSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                setSuggestedSlug(generatedSlug); // Update slug while typing
                setData('slug', generatedSlug);  // Set the slug value to generated slug
                clearErrors('slug'); // Clear errors if slug is being updated

                // Check if the generated slug is unique while typing
                checkSlugUniqueness(generatedSlug);
            }
        } else if (blog && locale === 'en') {
            // If blog is being edited, generate slug based on the title change
            const name = value.trim();
            if (name) {
                const generatedSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                setSuggestedSlug(generatedSlug);
                setData('slug', generatedSlug);
                checkSlugUniqueness(generatedSlug); // Check uniqueness after title change
            }
        }
    };

    // Check if slug is unique in real-time (debounced)
    const checkSlugUniqueness = debounce((slug) => {
        if (!blog || data.slug !== blog.slug) {
            axios
                .get(route('blogs.checkSlug', { slug })) // Make sure to create this route
                .then(response => {
                    if (response.data.exists) {
                        setSlugTaken(true); // Slug is taken, append "-tmp"
                        setSuggestedSlug(`${slug}-tmp`); // Append temporary suffix
                        setData('slug', `${slug}-tmp`); // Update slug field
                    } else {
                        setSlugTaken(false); // Slug is available
                    }
                })
                .catch((error) => {
                    console.error('Slug uniqueness check failed:', error);
                });
        }
    }, 500); // 500ms debounce to avoid making too many requests

    // Update selected category title based on language change
    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);

        setData('category_id', categoryId);  // Update the category ID
        clearErrors('category_id');  // Clear any category-related errors
    };

    // Form submission handling
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all translation titles are provided
        let valid = true;
        safeLocales.forEach((locale) => {
            if (!data.translations[locale]?.title) {
                valid = false;
                errors[`translations.${locale}.title`] = 'This field is required';
            }
        });

        if (!valid) {
            setData({ ...data });
            return;
        }

        // Submit the form
        if (blog) {
            put(route('blogs.update', blog.id), {
                data,
                onSuccess: () => {
                    alert('Blog updated successfully!');
                },
            });
        } else {
            post(route('blogs.store'), {
                data,
                onSuccess: () => {
                    alert('Blog added successfully!');
                },
            });
        }
    };

    return (
        <I18nextProvider i18n={i18n}>
            <AuthenticatedLayout>
                <Head title={blog ? 'Edit Blog' : 'Add Blog'} />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <h1 className="text-2xl font-bold">
                                    {blog ? 'Edit Blog' : 'Add Blog'}
                                </h1>

                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    {/* Category Select */}
                                    <div className="mt-4">
                                        <label htmlFor="category_id">Category</label>
                                        <select
                                            id="category_id"
                                            value={selectedCategory}
                                            onChange={handleCategoryChange}
                                            className="block w-full p-2 border rounded-md mt-1"
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((category) => {
                                                const translatedCategory = category.translations.find(
                                                    (t) => t.locale === i18n.language
                                                );
                                                return (
                                                    <option key={category.id} value={category.id}>
                                                        {translatedCategory
                                                            ? translatedCategory.name
                                                            : category.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {errors.category_id && (
                                            <p className="text-red-500 text-sm">{errors.category_id}</p>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <div className="mt-4">
                                        <label htmlFor="title">Title</label>
                                        <input
                                            id="title"
                                            type="text"
                                            value={data.title || ''}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="block w-full p-2 border rounded-md mt-1"
                                        />
                                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                                    </div>

                                    {/* Content */}
                                    <div className="mt-4">
                                        <label htmlFor="content">Content</label>
                                        <textarea
                                            id="content"
                                            value={data.content || ''}
                                            onChange={(e) => setData('content', e.target.value)}
                                            className="block w-full p-2 border rounded-md mt-1"
                                        />
                                        {errors.content && (
                                            <p className="text-red-500 text-sm">{errors.content}</p>
                                        )}
                                    </div>

                                    {/* Translations */}
                                    {safeLocales.map((locale) => (
                                        <div key={locale} className="mt-6">
                                            <h3 className="text-lg font-semibold">{locale.toUpperCase()}</h3>
                                            <div className="mt-2">
                                                <label>Title</label>
                                                <input
                                                    type="text"
                                                    value={data.translations[locale]?.title || ''}
                                                    onChange={(e) =>
                                                        handleChange(locale, 'title', e.target.value)
                                                    }
                                                    className="block w-full p-2 border rounded-md mt-1"
                                                />
                                                {errors[`translations.${locale}.title`] && (
                                                    <p className="text-red-500 text-sm">
                                                        {errors[`translations.${locale}.title`]}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="mt-2">
                                                <label>Content</label>
                                                <textarea
                                                    value={data.translations[locale]?.content || ''}
                                                    onChange={(e) =>
                                                        handleChange(locale, 'content', e.target.value)
                                                    }
                                                    className="block w-full p-2 border rounded-md mt-1"
                                                />
                                                {errors[`translations.${locale}.content`] && (
                                                    <p className="text-red-500 text-sm">
                                                        {errors[`translations.${locale}.content`]}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    {/* Image Upload */}
                                    <div className="mt-4">
                                        <label htmlFor="image">Image</label>
                                        <input
                                            id="image"
                                            type="file"
                                            onChange={(e) => setData('image', e.target.files[0])}
                                            className="block w-full p-2 border rounded-md mt-1"
                                        />
                                        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                                    </div>

                                    {/* Slug (auto-generated) */}
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

                                    {slugTaken && (
                                        <p className="text-red-500 text-sm mt-2">Slug is already taken. It has been updated to include a temporary suffix.</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        {processing ? 'Saving...' : blog ? 'Update Blog' : 'Add Blog'}
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
