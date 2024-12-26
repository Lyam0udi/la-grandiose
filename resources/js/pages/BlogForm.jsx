import { useForm } from '@inertiajs/react'; 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

export default function BlogForm({ blog = null, categories, locales }) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: blog ? blog.title : '',
        content: blog ? blog.content : '',
        category_id: blog ? blog.category_id : '',
        image: null,
        translations: locales.reduce((acc, locale) => {
            acc[locale] = {
                title: '',
                content: '',
            };
            return acc;
        }, {}),
    });

    useEffect(() => {
        if (blog) {
            setData({
                title: blog.title || '',
                content: blog.content || '',
                category_id: blog.category_id || '',
                translations: locales.reduce((acc, locale) => {
                    const translation = blog.translations.find((t) => t.locale === locale);
                    acc[locale] = translation || { title: '', content: '' };
                    return acc;
                }, {}),
            });
        }
    }, [blog, locales]);

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
        if (blog) {
            put(route('blogs.update', blog.id), {
                onSuccess: () => {
                    alert('Blog updated successfully!');
                },
            });
        } else {
            post(route('blogs.store'), {
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
                                            value={data.category_id || ''}
                                            onChange={(e) => setData('category_id', e.target.value)}
                                            className="block w-full p-2 border rounded-md mt-1"
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.translations.find(
                                                        (t) => t.locale === 'en'
                                                    )?.name || 'Unnamed Category'}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category_id && (
                                            <p className="text-red-500 text-sm">{errors.category_id}</p>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <div className="mt-4">
                                        <label htmlFor="title">Title</label>
                                        <input
                                            type="text"
                                            id="title"
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
                                    {locales.map((locale) => (
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
                                            type="file"
                                            id="image"
                                            onChange={(e) => setData('image', e.target.files[0])}
                                            className="block w-full p-2 border rounded-md mt-1"
                                        />
                                        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                                    </div>

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
