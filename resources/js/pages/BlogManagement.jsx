import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import i18n from '../i18n';

export default function BlogManagement({ blogs, categories }) {
    const language = localStorage.getItem('language') || 'fr'; // Default to 'fr' if no language set

    return (
        <AuthenticatedLayout>
            <Head title="Blog Management" />
            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                                <h1 className="text-2xl sm:text-3xl font-semibold text-center sm:text-left">
                                    Manage Blogs
                                </h1>
                                <Link
                                    href={route('blogs.create')}
                                    className="mt-4 sm:mt-0 px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 w-full sm:w-auto"
                                >
                                    Add New Blog
                                </Link>
                            </div>

                            <div className="overflow-x-auto w-full">
                                {blogs.length === 0 ? (
                                    <p className="text-lg">No blogs available.</p>
                                ) : (
                                    <table className="min-w-full table-auto border-separate border-spacing-0">
                                        <thead className="bg-gray-700 text-white">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-semibold">ID</th>
                                                <th className="px-4 py-3 text-left font-semibold">Category</th>
                                                <th className="px-4 py-3 text-left font-semibold">Title ({language})</th>
                                                <th className="px-4 py-3 text-left font-semibold">Content ({language})</th>
                                                <th className="px-4 py-3 text-left font-semibold">Posted Date</th>
                                                <th className="px-4 py-3 text-left font-semibold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800">
                                            {blogs.map((blog) => {
                                                const translation = blog.translations.find(
                                                    (t) => t.locale === language
                                                );
                                                const category = categories.find(
                                                    (cat) => cat.id === blog.category_id
                                                );

                                                return (
                                                    <tr
                                                        key={blog.id}
                                                        className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    >
                                                        <td className="px-4 py-3">{blog.id}</td>
                                                        <td className="px-4 py-3">
                                                            {category
                                                                ? category.translations.find(
                                                                      (t) => t.locale === language
                                                                  )?.name || 'N/A'
                                                                : 'No Category'}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {translation ? (
                                                                translation.title
                                                            ) : (
                                                                <span className="text-red-500">
                                                                    Translation missing in {language}
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3 truncate max-w-xs">
                                                            {translation ? (
                                                                translation.content
                                                            ) : (
                                                                <span className="text-red-500">
                                                                    Translation missing in {language}
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {new Date(blog.posted_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-4 py-3 flex space-x-2 justify-center">
                                                            <Link
                                                                href={route('blogs.edit', blog.id)}
                                                                className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <Link
                                                                as="button"
                                                                href={route('blogs.destroy', blog.id)}
                                                                method="delete"
                                                                className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700"
                                                            >
                                                                Delete
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
