tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        authority: { DEFAULT: '#0f172a', deep: '#020617' },
      },
      boxShadow: {
        glow: '0 0 80px -12px rgba(59, 130, 246, 0.45)',
        'glow-sm': '0 0 40px -8px rgba(59, 130, 246, 0.35)',
      },
    },
  },
};
