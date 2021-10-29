import { ThemeOptions } from '@mui/material';
import { indigo, grey } from '@mui/material/colors';
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
        main: indigo[600],
      },
      background: {
        paper: grey[900],
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
      primary: {
        main: indigo[400],
      },
    },
    ...baseTheme,
  },
  components,
);
