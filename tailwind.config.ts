import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neutral-7': '#FFFFFF',
        'neutral-6': '#F4F4F4',
        'neutral-5': '#D7D7D7',
        'neutral-3': '#757575',
        'neutral-1': '#101820',
        'blue-7': '#F1F6FE',
        'blue-3': '#003594',
        'accent-blue-4': '#00A7E1',
        'accent-gold-4': '#FFB81B',
      },
      fontFamily: {
        barlow: ['Barlow', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        '64': '64px',
        '56': '56px',
        '48': '48px',
        '40': '40px',
        '32': '32px',
        '24': '24px',
        '20': '20px',
        '16': '16px',
        '14': '14px',
        '12': '12px',
      },
      lineHeight: {
        '64': '64px',
        '56': '56px',
        '48': '48px',
        '40': '40px',
        '32': '32px',
        '24': '24px',
        '20': '20px',
        '16': '16px',
      },
      letterSpacing: {
        '-1.28': '-1.28px',
        '-1.12': '-1.12px',
        '-0.96': '-0.96px',
        '-0.8': '-0.8px',
        '-0.64': '-0.64px',
        '-0.48': '-0.48px',
        '-0.4': '-0.4px',
        '-0.32': '-0.32px',
        '-0.28': '-0.28px',
        '-0.24': '-0.24px',
      },
      animation: {
        'wing-flap': 'wing-flap 0.6s ease-in-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
        'fade-in-left': 'fade-in-left 0.8s ease-out',
        'fade-in-right': 'fade-in-right 0.8s ease-out',
        'scale-in': 'scale-in 0.6s ease-out',
      },
      keyframes: {
        'wing-flap': {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '25%': { transform: 'scale(1.05) rotate(-2deg)' },
          '50%': { transform: 'scale(1.1) rotate(0deg)' },
          '75%': { transform: 'scale(1.05) rotate(2deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config; 