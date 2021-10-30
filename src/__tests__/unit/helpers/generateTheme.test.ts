import { generateTheme } from '@/helpers/theme/generateTheme';

describe('generateTheme helper function', () => {
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
    expect(theme.palette.secondary.main).toBeTruthy();
  });
});
