/**
 * Centralized Color Management System
 * This file defines all colors for the website.
 * No literal color values (hex, rgb, names) should exist in CSS or HTML files.
 */

const THEME_COLORS = {
    // Brand Colors
    primary: '#2634b1ff',
    primaryHover: '#e65c00',
    secondary: '#0A2342', // Deep Blue
    secondaryHover: '#1C3552',

    // Grayscale & Text
    white: '#ffffff',
    black: '#000000',
    textMain: '#1C3552',
    textMuted: '#3E5066',
    textLight: '#B8C5D6',
    textLighter: '#CEDBE8',
    textDark: '#05162B',

    // Backgrounds
    bgLight: '#F0F5FA',
    bgWhite: '#ffffff',
    bgGray: '#f9f9f9',
    bgDark: '#0A2342',
    bgDarker: '#051126', // Footer Dark
    bgGradient: 'linear-gradient(135deg, #f9f9f9 0%, #eef2f5 100%)',
    bgBlueLight: '#f8fbff',

    // UI Elements
    border: '#CEDBE8',
    borderLight: 'rgba(255, 255, 255, 0.1)',
    shadow: 'rgba(0, 0, 0, 0.05)',
    shadowDark: 'rgba(0, 0, 0, 0.15)',
    overlay: 'rgba(0, 0, 0, 0.2)',
    overlayDark: 'rgba(0, 0, 0, 0.6)',

    // Feedback
    success: '#4BB543',
    error: '#d9534f',
    star: '#FF6600',
    googleBlue: '#4285F4',

    // Specific Components
    navBg: '#ffffff',
    navText: '#0A2342',
    footerBg: '#051126',
    footerText: '#ffffff'
};

/**
 * Applies the theme colors to the document as CSS variables
 */
function applyTheme() {
    const root = document.documentElement;

    Object.entries(THEME_COLORS).forEach(([key, value]) => {
        // Convert camelCase to kebab-case (e.g., primaryHover -> --primary-hover)
        const cssVarName = `--theme-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        root.style.setProperty(cssVarName, value);
    });

    console.log('✅ Theme colors applied from color.js');
}

// Expose THEME_COLORS globally
window.THEME_COLORS = THEME_COLORS;

// Auto-apply theme when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTheme);
} else {
    applyTheme();
}

// Export for any JS that might need literal values
if (typeof module !== 'undefined' && module.exports) {
    module.exports = THEME_COLORS;
}
