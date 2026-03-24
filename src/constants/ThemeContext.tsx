import React, { createContext, useContext, useState, ReactNode } from 'react';
import { darkColors, lightColors, spacing, typography, borderRadius } from './theme';

type Theme = {
  colors: typeof darkColors;
  spacing: typeof spacing;
  typography: typeof typography;
  borderRadius: typeof borderRadius;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<Theme>({
  colors: darkColors,
  spacing,
  typography,
  borderRadius,
  isDark: true,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark((v) => !v);

  return (
    <ThemeContext.Provider
      value={{
        colors: isDark ? darkColors : lightColors,
        spacing,
        typography,
        borderRadius,
        isDark,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
