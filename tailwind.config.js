import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.jsx', // Include JSX files
        './resources/**/*.vue',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                skyBlue: '#87CEEB',  // Sky Blue
                vibrantGreen: '#32CD32',  // Vibrant Green
                normalRed: '#FF0000',  // Normal Red
                normalYellow: '#FFD700',  // Normal Yellow
                lightBackground: '#FFFFFF',
                darkBackground: '#1F2937',  // Tailwind's gray-800
            },
        },
    },
    plugins: [],
};
