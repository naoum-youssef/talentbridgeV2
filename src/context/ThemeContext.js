import React, { createContext, useState, useEffect, useContext } from 'react';

// Create context
const ThemeContext = createContext(null);

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // Get the stored theme from localStorage or default to 'light'
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem('theme');

        // Check if a theme was previously set in localStorage
        if (savedTheme) {
            return savedTheme;
        }

        // Check for user's system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        // Default to light theme
        return 'light';
    };

    const [theme, setTheme] = useState(getInitialTheme);
    const [primaryColor, setPrimaryColor] = useState(localStorage.getItem('primaryColor') || 'blue');
    const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 'medium');

    // Update localStorage and apply theme when theme changes
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);

        // Apply dark mode class to document if theme is dark
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // Update localStorage when primary color changes
    useEffect(() => {
        localStorage.setItem('primaryColor', primaryColor);
        document.documentElement.setAttribute('data-primary-color', primaryColor);

        // Apply primary color CSS variables
        const root = document.documentElement;
        const colorValues = getColorValues(primaryColor);

        Object.entries(colorValues).forEach(([key, value]) => {
            root.style.setProperty(`--color-primary-${key}`, value);
        });
    }, [primaryColor]);

    // Update localStorage when font size changes
    useEffect(() => {
        localStorage.setItem('fontSize', fontSize);
        document.documentElement.setAttribute('data-font-size', fontSize);

        // Apply font size CSS class
        const root = document.documentElement;
        root.classList.remove('text-sm', 'text-base', 'text-lg', 'text-xl');

        switch (fontSize) {
            case 'small':
                root.classList.add('text-sm');
                break;
            case 'medium':
                root.classList.add('text-base');
                break;
            case 'large':
                root.classList.add('text-lg');
                break;
            case 'x-large':
                root.classList.add('text-xl');
                break;
            default:
                root.classList.add('text-base');
        }
    }, [fontSize]);

    // Helper function to get color values based on primary color
    const getColorValues = (color) => {
        const colorMap = {
            blue: {
                '50': '#eff6ff',
                '100': '#dbeafe',
                '200': '#bfdbfe',
                '300': '#93c5fd',
                '400': '#60a5fa',
                '500': '#3b82f6',
                '600': '#2563eb',
                '700': '#1d4ed8',
                '800': '#1e40af',
                '900': '#1e3a8a',
            },
            green: {
                '50': '#f0fdf4',
                '100': '#dcfce7',
                '200': '#bbf7d0',
                '300': '#86efac',
                '400': '#4ade80',
                '500': '#22c55e',
                '600': '#16a34a',
                '700': '#15803d',
                '800': '#166534',
                '900': '#14532d',
            },
            purple: {
                '50': '#faf5ff',
                '100': '#f3e8ff',
                '200': '#e9d5ff',
                '300': '#d8b4fe',
                '400': '#c084fc',
                '500': '#a855f7',
                '600': '#9333ea',
                '700': '#7e22ce',
                '800': '#6b21a8',
                '900': '#581c87',
            },
            // Add more color options as needed
        };

        return colorMap[color] || colorMap.blue;
    };

    // Toggle between light and dark theme
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    // Context value
    const value = {
        theme,
        setTheme,
        toggleTheme,
        primaryColor,
        setPrimaryColor,
        fontSize,
        setFontSize,
        // Pre-defined color options for your UI
        colorOptions: ['blue', 'green', 'purple', 'red', 'orange', 'pink'],
        // Pre-defined font size options for your UI
        fontSizeOptions: ['small', 'medium', 'large', 'x-large']
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;