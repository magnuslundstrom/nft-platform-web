import { ThemeOptions } from '@mui/material';
import { blue } from '@mui/material/colors';
import components from './components';
import { generateTheme } from '@/helpers/theme/generateTheme';

const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: 'Roboto',
  },
};

export const darkTheme = generateTheme(
  {
    palette: {
      mode: 'dark',
      primary: {
        main: blue[600],
      },
    },
    ...baseTheme,
  },
  components,
);

export const lightTheme = generateTheme(
  {
    palette: {
      mode: 'light',
    },
    ...baseTheme,
  },
  components,
);
