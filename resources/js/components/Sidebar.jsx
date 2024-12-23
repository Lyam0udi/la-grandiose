import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next'; // Import for i18n
import {
    FaTachometerAlt,
    FaUserGraduate,
    FaUsers,
    FaBook,
    FaCogs,
    FaChartPie,
    FaChalkboardTeacher,
} from 'react-icons/fa'; // Import necessary icons

export default function Sidebar() {
    const { t } = useTranslation(); // i18n hook for translations
    const [isExpanded, setIsExpanded] = useState(true); // Manage sidebar state

    const toggleSidebar = () => setIsExpanded((prev) => !prev);

    return (
        <div
            className={`flex flex-col min-h-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 ${
                isExpanded ? 'w-64' : 'w-16'
            } transition-all duration-300`}
        >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-300 dark:border-gray-700">
                <span className={`${isExpanded ? 'block' : 'hidden'} font-bold text-lg`}>
                    {t('dashboard')}
                </span>
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
                    aria-label={isExpanded ? t('collapse_sidebar') : t('expand_sidebar')}
                >
                    {isExpanded ? '<' : '>'}
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-grow mt-4 space-y-2">
                <SidebarLink
                    to="/dashboard"
                    icon={<FaTachometerAlt />}
                    label={t('dashboard')}
                    expanded={isExpanded}
                />
                <SidebarLink
                    to="/year"
                    icon={<FaCogs />}
                    label={t('scholar_year')}
                    expanded={isExpanded}
                />
                <SidebarLink
                    to="/cycles"
                    icon={<FaUserGraduate />}
                    label={t('cycles')}
                    expanded={isExpanded}
                />
                <SidebarLink
                    to="/testimonials"
                    icon={<FaUsers />}
                    label={t('testimonials')}
                    expanded={isExpanded}
                />
                <SidebarLink
                    to="/professors"
                    icon={<FaChalkboardTeacher />}
                    label={t('professors')}
                    expanded={isExpanded}
                />
                <SidebarLink
                    to="/blogs"
                    icon={<FaBook />}
                    label={t('blogs')}
                    expanded={isExpanded}
                />
                <SidebarLink
                    to="/categories"
                    icon={<FaBook />}
                    label={t('categories')}
                    expanded={isExpanded}
                />
                <SidebarLink
                    to="/inscriptions"
                    icon={<FaCogs />}
                    label={t('inscriptions')}
                    expanded={isExpanded}
                />
                <SidebarLink
                    to="/graphs"
                    icon={<FaChartPie />}
                    label={t('graphs')}
                    expanded={isExpanded}
                />
            </nav>
        </div>
    );
}

function SidebarLink({ to, icon, label, expanded }) {
    return (
        <Link
            href={to}
            className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
        >
            <span className="text-lg">{icon}</span>
            <span className={`${expanded ? 'ml-4' : 'hidden'}`}>{label}</span>
        </Link>
    );
}
