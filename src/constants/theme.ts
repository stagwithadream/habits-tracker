export const colors = {
  primary: '#6C63FF',
  secondary: '#FF6584',
  background: '#0F0F1A',
  surface: '#1A1A2E',
  card: '#16213E',
  text: '#FFFFFF',
  textSecondary: '#A0A0B2',
  border: '#2A2A3E',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  // Habit colors
  habitColors: [
    '#6C63FF', '#FF6584', '#43E97B', '#FA709A',
    '#4FACFE', '#F093FB', '#FD7238', '#37ECB2',
  ],
};

export const darkColors = {
  ...colors,
};

export const lightColors = {
  ...colors,
  background: '#F5F5FF',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#6B6B7B',
  border: '#E0E0F0',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const },
  h2: { fontSize: 22, fontWeight: '700' as const },
  h3: { fontSize: 18, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
  label: { fontSize: 13, fontWeight: '500' as const },
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};
