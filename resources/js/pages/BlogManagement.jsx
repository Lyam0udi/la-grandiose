import { Link, useForm } from '@inertiajs/react'; // Import useForm hook 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

export default function BlogManagement({ blogs, flash }) {
    // Access the language from localStorage to match the current app language
    const language = localStorage.getItem('language') || 'fr'; // Default to 'fr' if no language is set

    const { delete: deleteBlog } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
            // Send the DELETE request to the backend using the form helper
            deleteBlog(route('blogs.destroy', id), {
                onSuccess: () => {
                    // Handle successful delete (flash success message)
                    alert('Blog deleted successfully!');
                },
                onError: () => {
                    // Handle error case
                    alert('An error occurred while deleting the blog.');
                },
            });
        }
    };

    return (
        <I18nextProvider i18n={i18n}>
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
                                    {/* Check if blogs is an array and handle pagination */}
                                    {Array.isArray(blogs.data) && blogs.data.length === 0 ? (
                                        <p className="text-lg text-center">No blogs available.</p>
                                    ) : (
                                        Array.isArray(blogs.data) && blogs.data.length > 0 ? (
                                            <table className="min-w-full table-auto border-separate border-spacing-0">
                                                <thead className="bg-gray-700 text-white">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left font-semibold">ID</th>
                                                        <th className="px-4 py-3 text-left font-semibold">Image</th> {/* Added Image column */}
                                                        <th className="px-4 py-3 text-left font-semibold">Title ({language})</th>
                                                        <th className="px-4 py-3 text-left font-semibold">Category ({language})</th>
                                                        <th className="px-4 py-3 text-left font-semibold">Slug</th>
                                                        <th className="px-4 py-3 text-left font-semibold">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white dark:bg-gray-800">
                                                    {blogs.data.map((blog) => {
                                                        const blogTranslation = blog.translations.find(
                                                            (t) => t.locale === language
                                                        );
                                                        const categoryTranslation = blog.category.translations.find(
                                                            (t) => t.locale === language
                                                        );

                                                        return (
                                                            <tr
                                                                key={blog.id}
                                                                className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                            >
                                                                <td className="px-4 py-3">{blog.id}</td>

                                                                {/* Display the image */}
                                                                <td className="px-4 py-3">
                                                                    {blog.image ? (
                                                                        <img
                                                                            src={`/storage/${blog.image}`} // Assuming image is stored in the public disk
                                                                            alt="Blog Image"
                                                                            className="w-16 h-16 object-cover rounded-md"
                                                                        />
                                                                    ) : (
                                                                        <span className="text-red-500">No image</span>
                                                                    )}
                                                                </td>

                                                                <td className="px-4 py-3">
                                                                    {blogTranslation ? (
                                                                        blogTranslation.title
                                                                    ) : (
                                                                        <span className="text-red-500">
                                                                            Translation missing ({language})
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    {categoryTranslation ? (
                                                                        categoryTranslation.name
                                                                    ) : (
                                                                        <span className="text-red-500">
                                                                            Translation missing ({language})
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="px-4 py-3">{blog.slug || 'N/A'}</td>
                                                                <td className="px-4 py-3 flex space-x-2 justify-center">
                                                                    <Link
                                                                        href={route('blogs.edit', blog.id)}
                                                                        className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600"
                                                                    >
                                                                        Edit
                                                                    </Link>
                                                                    <button
                                                                        onClick={() => handleDelete(blog.id)}
                                                                        className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p className="text-lg text-center">Blogs data is not available or invalid.</p>
                                        )
                                    )}
                                </div>

                                {/* Display pagination if available */}
                                <div className="mt-4">
                                    {blogs.links && (
                                        <div className="flex justify-center space-x-4">
                                            {/* Previous Button */}
                                            {blogs.links[0]?.url && (
                                                <Link
                                                    href={blogs.links[0].url}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                                                >
                                                    <i className="fas fa-chevron-left mr-2"></i> Previous
                                                </Link>
                                            )}

                                            {/* Page Number Buttons */}
                                            {blogs.links.slice(1, -1).map((link) => (
                                                <Link
                                                    key={link.label}
                                                    href={link.url}
                                                    className={`px-4 py-2 ${
                                                        link.active ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                                                    } rounded-md hover:bg-blue-600 hover:text-white`}
                                                >
                                                    {link.label}
                                                </Link>
                                            ))}

                                            {/* Next Button */}
                                            {blogs.links[blogs.links.length - 1]?.url && (
                                                <Link
                                                    href={blogs.links[blogs.links.length - 1].url}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                                                >
                                                    Next <i className="fas fa-chevron-right ml-2"></i>
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </I18nextProvider>
    );
}
