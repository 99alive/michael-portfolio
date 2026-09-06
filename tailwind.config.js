/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: '#2a2140',
        'ink-soft': '#4a4066',
        paper: '#fffaf0',
        sun: '#ffd23e',
        coral: '#ff7a88',
        sky: '#6fc6ff',
        mint: '#74e6bd',
        sakura: '#ffb0d6',
        grape: '#b18cf2',
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        brand: {
          900: '#0b0b0b',
          800: '#0f0f0f',
          700: '#111111',
          gold: '#E6B800'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
};
