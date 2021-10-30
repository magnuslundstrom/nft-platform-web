import { createTheme } from '@mui/material';
import { generateComponent } from '@/helpers/theme/generateComponent';

describe('generateComponent helper function', () => {
  test('With no overwritten theme', () => {
    const themeToBePassed = createTheme();
    const overrides = {
      styleOverrides: {
        root: {
          backgroundColor: 'TEST',
        },
      },
    };

    const genericComponent = generateComponent(() => overrides);

    const genericComponentStyles = genericComponent(themeToBePassed);
    expect(genericComponentStyles).toEqual(overrides);
  });

  test('With mode theme', () => {
    const themeToBePassed = createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#000',
        },
      },
    });

    const genericComponent = generateComponent((theme) => ({
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.main,
        },
      },
    }));

    const genericComponentStyles = genericComponent(themeToBePassed);

    expect(genericComponentStyles).toEqual({
      styleOverrides: {
        root: {
          backgroundColor: themeToBePassed.palette.primary.main,
        },
      },
    });
  });
});
