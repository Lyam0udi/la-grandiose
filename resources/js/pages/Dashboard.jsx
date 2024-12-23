import { I18nextProvider } from 'react-i18next';  // Import I18nextProvider
import i18n from '../i18n';  // Import your i18n instance
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <I18nextProvider i18n={i18n}> {/* Wrap with I18nextProvider */}
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Dashboard
                    </h2>
                }
            >
                <Head title="Dashboard" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                Hello ! You're logged in!
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </I18nextProvider>
    );
}
