import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function YearPage({ currentYear }) {
    // Initialize form with default values if currentYear is not available
    const { data, setData, post, processing, errors } = useForm({
        startYear: currentYear ? currentYear.startYear : 2024,  // Default to 2024 if no currentYear
        endYear: currentYear ? currentYear.endYear : 2025,      // Default to 2025 if no currentYear
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('year.update'), {
            onSuccess: () => {
                console.log("Year updated successfully");
            },
        });
    };

    // Update form values when currentYear prop changes (if not null)
    useEffect(() => {
        if (currentYear) {
            setData({
                startYear: currentYear.startYear,
                endYear: currentYear.endYear,
            });
        }
    }, [currentYear]);

    return (
        <AuthenticatedLayout>
            <Head title="Year Management" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3>Current Year: {data.startYear} - {data.endYear}</h3>

                            {/* Form for updating the year */}
                            <form onSubmit={handleSubmit}>
                                <div className="mt-4">
                                    <label htmlFor="startYear">Start Year</label>
                                    <input
                                        type="number"
                                        id="startYear"
                                        value={data.startYear}
                                        onChange={(e) => setData('startYear', e.target.value)} // Set start year
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-200"
                                    />
                                    {/* Error for startYear */}
                                    {errors.startYear && (
                                        <div className="text-red-500 text-sm mt-1">{errors.startYear}</div>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="endYear">End Year</label>
                                    <input
                                        type="number"
                                        id="endYear"
                                        value={data.endYear}
                                        onChange={(e) => setData('endYear', e.target.value)} // Set end year
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-200"
                                    />
                                    {/* Error for endYear */}
                                    {errors.endYear && (
                                        <div className="text-red-500 text-sm mt-1">{errors.endYear}</div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    {processing ? 'Updating...' : 'Update Year'}
                                </button>
                            </form>

                            {/* Displaying general form errors */}
                            {errors.year && (
                                <div className="text-red-500 text-sm mt-4">{errors.year}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
