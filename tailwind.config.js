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
    
    './src/**/*.{js,jsx,ts,tsx}', 
    './public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Primary brand colors
        primaryBlue: '#3B82F6', // Main brand color
        secondaryBlue: '#60A5FA', // Supporting color for hover or accents

        // Light Mode Colors
        lightBackground: '#F9FAFB', // Main background
        lightSecondary: '#FFFFFF', // Secondary section background
        lightText: '#374151', // Primary text color
        lightTextSecondary: '#6B7280', // Muted or secondary text
        lightCard: '#FFFFFF', // Card background
        lightBorder: '#E5E7EB', // Border color for light mode

        // Dark Mode Colors
        darkBackground: '#1F2937', // Main background
        darkSecondary: '#2D3748', // Secondary section background
        darkText: '#E5E7EB', // Primary text color
        darkTextSecondary: '#A0AEC0', // Muted or secondary text
        darkCard: '#2D3748', // Card background
        darkBorder: '#4A5568', // Border color for dark mode

        // Accent and utility colors
        accentYellow: '#F59E0B', // Highlight color for attention
        accentRed: '#EF4444', // Error or warning color
        accentGreen: '#10B981', // Success or confirmation color
        accentPurple: '#8B5CF6', // Optional vibrant accent

        // Gradients
        gradientLightStart: '#E0F2FE', // Starting point for light gradients
        gradientLightEnd: '#90CDF4', // Ending point for light gradients
        gradientDarkStart: '#2C5282', // Starting point for dark gradients
        gradientDarkEnd: '#1A365D', // Ending point for dark gradients

        // Button-specific colors
        buttonPrimaryLight: '#3B82F6',
        buttonPrimaryDark: '#60A5FA',
        buttonHoverLight: '#2563EB',
        buttonHoverDark: '#1D4ED8',
        buttonDisabled: '#9CA3AF', // Disabled button state

        // Section-specific overrides
        sectionLightBackground: '#F3F4F6', // Subtle contrast for sections
        sectionDarkBackground: '#1E293B', // Slightly lighter for sections in dark mode
      },
    },
  },
  plugins: [],
};
