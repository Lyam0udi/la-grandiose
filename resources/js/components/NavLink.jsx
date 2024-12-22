import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    isDarkMode = false,  // Receive the theme mode as a prop
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? `${isDarkMode ? 'border-indigo-600 text-gray-100 focus:border-indigo-700' : 'border-indigo-400 text-lightText focus:border-indigo-700'}`
                    : `${isDarkMode ? 'border-transparent text-gray-400 hover:border-gray-700 hover:text-gray-300 focus:border-gray-700 focus:text-gray-300' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700'}`) +
                className
            }
        >
            {children}
        </Link>
    );
}
