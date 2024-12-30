import { Link, useForm } from '@inertiajs/react'; // Import useForm hook
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

export default function CategoryManagement({ categories, flash }) {
    // Access the language from localStorage to match the current app language
    const language = localStorage.getItem('language') || 'fr'; // Default to 'fr' if no language is set

    const { delete: deleteCategory } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
            // Send the DELETE request to the backend using the form helper
            deleteCategory(route('categories.destroy', id), {
                onSuccess: () => {
                    // Handle successful delete (flash success message)
                    alert('Category deleted successfully!');
                },
                onError: () => {
                    // Handle error case (e.g., if there are blogs associated)
                    alert('Category cannot be deleted because it has associated blogs.');
                },
            });
        }
    };

    return (
        <I18nextProvider i18n={i18n}>
        <AuthenticatedLayout>
            <Head title="Category Management" />
            <div className="py-6 md:py-12">
                <div className="mx-auto max-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                                <h1 className="text-2xl sm:text-3xl font-semibold text-center sm:text-left">Manage Categories</h1>
                                <Link
                                    href={route('categories.create')}
                                    className="mt-4 sm:mt-0 px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 w-full sm:w-auto"
                                >
                                    Add New Category
                                </Link>
                            </div>

                            <div className="overflow-x-auto w-full">
                                {categories.length === 0 ? (
                                    <p className="text-lg text-center">No categories available.</p>
                                ) : (
                                    <table className="min-w-full table-auto border-separate border-spacing-0">
                                        <thead className="bg-gray-700 text-white">
                                            <tr>
                                                <th className="px-4 py-3 text-left font-semibold">ID</th>
                                                <th className="px-4 py-3 text-left font-semibold">Name ({language})</th>
                                                <th className="px-4 py-3 text-left font-semibold">Slug</th>
                                                <th className="px-4 py-3 text-left font-semibold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800">
                                            {categories.map((category) => {
                                                const translation = category.translations.find(
                                                    (t) => t.locale === language
                                                );

                                                return (
                                                    <tr
                                                        key={category.id}
                                                        className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    >
                                                        <td className="px-4 py-3">{category.id}</td>
                                                        <td className="px-4 py-3">
                                                            {translation ? (
                                                                translation.name
                                                            ) : (
                                                                <span className="text-red-500">Translation missing ({language})</span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3">{category.slug || 'N/A'}</td>
                                                        <td className="px-4 py-3 flex space-x-2 justify-center">
                                                            <Link
                                                                href={route('categories.edit', category.id)}
                                                                className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(category.id)}
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
