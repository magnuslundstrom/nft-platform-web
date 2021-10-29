import { createContext, useState, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from '@/styles/themes';

type Modes = 'light' | 'dark';

export const ThemeContext = createContext({
  mode: 'dark',
  toggleMode: () => void 0,
} as { mode: Modes; toggleMode: () => void });

const ThemeProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<Modes>('light');
  const toggleMode = () => setMode(mode === 'dark' ? 'light' : 'dark');

  const theme = useMemo(
    () => (mode === 'dark' ? darkTheme : lightTheme),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
