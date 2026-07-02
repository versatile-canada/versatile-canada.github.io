/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Neutral base
        obsidian: '#060708',      // primary background
        'obsidian-2': '#0A0C10',  // slightly lifted panel
        porcelain: '#F6F6F3',     // primary light / headline white
        'porcelain-dim': '#C7C9CE',

        // Navy system (brand core)
        navy: {
          950: '#080B1A',
          900: '#0B1330',
          800: '#101A44',
          700: '#182658',
          600: '#22357A',
        },
        // Bright accent, still within the navy/blue family
        azure: {
          500: '#3457D5',
          400: '#5C7CF0',
          300: '#8CA3FF',
        },
        // Cool metallic greys — the "chrome" of the palette
        chrome: {
          100: '#EDEEF0',
          200: '#D7DBE0',
          300: '#AEB4BF',
          400: '#7C838F',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest2: '0.28em',
      },
      backgroundImage: {
        'navy-radial': 'radial-gradient(circle at 50% 20%, #182658 0%, #0B1330 45%, #060708 100%)',
        'chrome-sweep': 'linear-gradient(115deg, transparent 20%, rgba(215,219,224,0.35) 40%, rgba(140,163,255,0.25) 50%, transparent 65%)',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.45)',
        'glow-azure': '0 0 40px rgba(52,87,213,0.35)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-2%,-3%)' },
          '20%': { transform: 'translate(-4%,2%)' },
          '30%': { transform: 'translate(2%,-4%)' },
          '40%': { transform: 'translate(-2%,5%)' },
          '50%': { transform: 'translate(-4%,2%)' },
          '60%': { transform: 'translate(3%,0)' },
          '70%': { transform: 'translate(0,3%)' },
          '80%': { transform: 'translate(-3%,0)' },
          '90%': { transform: 'translate(2%,2%)' },
        },
        sweep: {
          '0%': { backgroundPosition: '-150% 0' },
          '100%': { backgroundPosition: '150% 0' },
        },
      },
      animation: {
        grain: 'grain 8s steps(8) infinite',
        sweep: 'sweep 2.4s linear infinite',
      },
    },
  },
  plugins: [],
}
