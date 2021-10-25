import { createTheme, ThemeOptions } from '@mui/material';
import { MuiTypography } from './components/MuiTypography';

const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: 'Roboto',
  },
  components: {
    MuiTypography,
  },
};

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  ...baseTheme,
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  ...baseTheme,
});
