// resources/js/Pages/Year.jsx

import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function Year({ year }) {
    const { data, setData, post, errors, processing } = useForm({
        year: year?.year || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/year');  // This will trigger the update route defined in Laravel
    };

    return (
        <div className="p-6 bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <h2 className="text-xl font-semibold">Edit the Current Year</h2>

            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Current Year
                    </label>
                    <input
                        id="year"
                        type="number"
                        value={data.year}
                        onChange={(e) => setData('year', e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                    />
                    {errors.year && <div className="text-sm text-red-500">{errors.year}</div>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                >
                    Save Year
                </button>
            </form>
        </div>
    );
}
