export const colors = {
  primary: '#7C6EF6',
  secondary: '#FF6B8A',
  background: '#0D0D12',
  surface: '#161620',
  card: '#1C1C28',
  cardElevated: '#22222E',
  text: '#F2F2F7',
  textSecondary: '#8E8E93',
  textTertiary: '#636366',
  border: '#2C2C34',
  success: '#30D158',
  warning: '#FFD60A',
  error: '#FF453A',
  habitColors: [
    '#7C6EF6', '#FF6B8A', '#30D158', '#FF9F0A',
    '#64D2FF', '#BF5AF2', '#FF6723', '#32D74B',
  ],
};

export const darkColors = { ...colors };

export const lightColors = {
  ...colors,
  background: '#F2F2F7',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  cardElevated: '#F8F8FC',
  text: '#1C1C1E',
  textSecondary: '#8E8E93',
  textTertiary: '#AEAEB2',
  border: '#E5E5EA',
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
