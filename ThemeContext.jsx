import { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '../services/storage.js';

const ThemeContext = createContext();

const defaultTheme = {
  palette: 'glass',
  accent: 'purple',
  fontSize: '16px',
  motion: true,
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(storage.getTheme() || defaultTheme);

  useEffect(() => {
    storage.setTheme(theme);
    document.documentElement.dataset.theme = theme.palette;
    // set accent color and font size
    document.documentElement.style.setProperty('--accent', themeAccent(theme.accent));
    document.documentElement.style.fontSize = theme.fontSize;
    // set color-scheme for better browser form control rendering
    const cs = theme.palette === 'light' ? 'light' : 'dark';
    document.documentElement.style.setProperty('color-scheme', cs);
  }, [theme]);

  const updateTheme = (partial) => setTheme((prev) => ({ ...prev, ...partial }));

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const themeAccent = (accent) => {
  const mapping = {
    purple: '#7C3AED',
    blue: '#2563EB',
    pink: '#EC4899',
    orange: '#F97316',
    green: '#10B981',
  };
  return mapping[accent] || '#7C3AED';
};

export const useTheme = () => useContext(ThemeContext);
