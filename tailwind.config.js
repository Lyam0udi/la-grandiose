import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.jsx',
        './resources/**/*.vue',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                skyBlue: '#87CEEB',
                vibrantGreen: '#32CD32',
                normalRed: '#FF0000',
                normalYellow: '#FFD700',
                lightBackground: '#FFFFFF',
                lightSecondary: '#F9FAFB', // New light secondary background
                lightText: '#4B5563', // Tailwind's gray-600
                darkBackground: '#1F2937', 
                darkSecondary: '#374151', // Tailwind's gray-700
                darkText: '#D1D5DB', // Tailwind's gray-300
            },
        },
    },
    plugins: [],
};
