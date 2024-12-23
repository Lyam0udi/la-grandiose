import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { FaTachometerAlt, FaUserGraduate, FaUsers, FaBook, FaCogs, FaChartPie } from 'react-icons/fa'; // Icons for navigation items

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(true); // Manage sidebar state

    const toggleSidebar = () => setIsExpanded((prev) => !prev);

    return (
        <div
            className={`h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 ${
                isExpanded ? 'w-64' : 'w-16'
            } transition-all duration-300`}
        >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-300 dark:border-gray-700">
                <span className={`${isExpanded ? 'block' : 'hidden'} font-bold`}>Dashboard</span>
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
                >
                    {isExpanded ? '<' : '>'}
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="mt-4 space-y-2">
                <SidebarLink to="/dashboard" icon={<FaTachometerAlt />} label="Dashboard" expanded={isExpanded} />
                <SidebarLink to="/scholar-year" icon={<FaCogs />} label="Scholar Year" expanded={isExpanded} />
                <SidebarLink to="/cycles" icon={<FaUserGraduate />} label="Cycles" expanded={isExpanded} />
                <SidebarLink to="/testimonials" icon={<FaUsers />} label="Testimonials" expanded={isExpanded} />
                <SidebarLink to="/professors" icon={<FaUsers />} label="Professors" expanded={isExpanded} />
                <SidebarLink to="/blogs" icon={<FaBook />} label="Blogs" expanded={isExpanded} />
                <SidebarLink to="/categories" icon={<FaBook />} label="Categories" expanded={isExpanded} />
                <SidebarLink to="/inscriptions" icon={<FaCogs />} label="Inscriptions" expanded={isExpanded} />
                <SidebarLink to="/graphs" icon={<FaChartPie />} label="Graphs" expanded={isExpanded} />
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
