import { generateTheme } from '@/helpers/theme/generateTheme';

test('generateTheme helper function', () => {
  const theme = generateTheme(
    {
      palette: {
        primary: {
          main: '#000',
        },
      },
    },
    {},
  );

  expect(theme.palette.primary.main).toBe('#000');
});
