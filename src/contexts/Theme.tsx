import { createContext, useState, useCallback } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';

export const ThemeContext = createContext({
  mode: 'light',
  toggleMode: () => void 0 as void,
});

const ThemeProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleMode = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode]);

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
