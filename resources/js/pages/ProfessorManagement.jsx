import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ProfessorManagement({ professors }) {
    // Access the language from localStorage to match the current app language
    const language = localStorage.getItem('language') || 'fr'; // Default to 'en' if no language set

    return (
        <AuthenticatedLayout>
            <Head title="Professor Management" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-3xl font-semibold">Manage Professors</h1>
                                <Link
                                    href={route('professor.create')}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700"
                                >
                                    Add New Professor
                                </Link>
                            </div>

                            <div className="overflow-x-auto">
                                {professors.length === 0 ? (
                                    <p className="text-lg">No professors available.</p>
                                ) : (
                                    <table className="min-w-full table-auto border-separate border-spacing-0">
                                        <thead className="bg-gray-700 text-white">
                                            <tr>
                                                <th className="px-6 py-4 text-left font-semibold">ID</th>
                                                <th className="px-6 py-4 text-left font-semibold">Photo</th>
                                                <th className="px-6 py-4 text-left font-semibold">Name ({language})</th>
                                                <th className="px-6 py-4 text-left font-semibold">Study Material ({language})</th>
                                                <th className="px-6 py-4 text-left font-semibold">Description ({language})</th>
                                                <th className="px-6 py-4 text-left font-semibold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800">
                                            {professors.map((professor) => {
                                                // Fetch the translation for the current language from localStorage
                                                const translation = professor.translations.find(
                                                    (t) => t.locale === language
                                                );

                                                return (
                                                    <tr key={professor.id} className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                        <td className="px-6 py-4">{professor.id}</td>
                                                        <td className="px-6 py-4">
                                                            {professor.photo ? (
                                                                <img
                                                                    src={`/storage/${professor.photo}`}
                                                                    alt={translation?.name || 'Professor Photo'}
                                                                    className="h-16 w-16 object-cover rounded-full border"
                                                                />
                                                            ) : (
                                                                <span>No photo</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {translation ? (
                                                                translation.name
                                                            ) : (
                                                                <span className="text-red-500">Translation missing in {language}</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {translation ? (
                                                                translation.study_material
                                                            ) : (
                                                                <span className="text-red-500">Translation missing in {language}</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {translation ? (
                                                                translation.description
                                                            ) : (
                                                                <span className="text-red-500">Translation missing in {language}</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 flex space-x-2">
                                                            <Link
                                                                href={route('professor.edit', professor.id)}
                                                                className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <Link
                                                                as="button"
                                                                href={route('professor.destroy', professor.id)}
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
