export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#4F46E5',
          secondary: '#7C3AED',
          accent: '#06B6D4',
        },
      },
      boxShadow: {
        glow: '0 30px 90px rgba(79, 70, 229, 0.18)',
        soft: '0 18px 55px rgba(15, 23, 42, 0.14)',
      },
    },
  },
  plugins: [],
};
