import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}', // Add features directory if used
    // Add other paths that contain Tailwind class names
  ],
  theme: {
    extend: {
      // Add custom theme extensions here if needed
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Add the typography plugin
  ],
};

export default config; 