import { Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ProfessorManagement({ professors }) {
    const { locale } = usePage().props; // Current language (ar, en, fr)

    return (
        <AuthenticatedLayout>
            <Head title="Professor Management" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-bold">Manage Professors</h1>
                                <Link
                                    href={route('professor.create')}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Add New Professor
                                </Link>
                            </div>

                            <div className="mt-6">
                                {professors.length === 0 ? (
                                    <p>No professors available.</p>
                                ) : (
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr>
                                                <th className="border px-4 py-2">ID</th>
                                                <th className="border px-4 py-2">Photo</th>
                                                <th className="border px-4 py-2">Name ({locale})</th>
                                                <th className="border px-4 py-2">Study Material ({locale})</th>
                                                <th className="border px-4 py-2">Description ({locale})</th>
                                                <th className="border px-4 py-2">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {professors.map((professor) => {
                                                const translation = professor.translations.find(
                                                    (t) => t.locale === locale
                                                );

                                                return (
                                                    <tr key={professor.id}>
                                                        <td className="border px-4 py-2">{professor.id}</td>
                                                        <td className="border px-4 py-2">
                                                            {professor.photo ? (
                                                                <img
                                                                    src={`/storage/${professor.photo}`}
                                                                    alt={translation?.name || 'Professor Photo'}
                                                                    className="h-16 w-16 object-cover rounded-md"
                                                                />
                                                            ) : (
                                                                <span>No photo</span>
                                                            )}
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {translation?.name || 'No translation'}
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {translation?.study_material || 'No translation'}
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            {translation?.description || 'No translation'}
                                                        </td>
                                                        <td className="border px-4 py-2 flex space-x-2">
                                                            <Link
                                                                href={route('professor.edit', professor.id)}
                                                                className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <Link
                                                                as="button"
                                                                href={route('professor.destroy', professor.id)}
                                                                method="delete"
                                                                className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
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
