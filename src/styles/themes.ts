import { ThemeOptions } from '@mui/material';
import { indigo } from '@mui/material/colors';
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
        main: indigo.A400,
      },
      background: {
        paper: 'rgb(0, 30, 60)',
        default: 'rgb(10, 25, 41)',
      },
      divider: 'rgb(22, 57, 92)',
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
        main: indigo.A700,
      },
    },
    ...baseTheme,
  },
  components,
);
