import { ThemeOptions, createTheme, Theme } from '@mui/material';
import { ComponentProps, ComponentNameKey } from './types';

export const generateTheme = <
  K extends Record<string, ComponentProps<ComponentNameKey>>,
  T extends Extract<keyof K, ComponentNameKey>,
>(
  baseTheme: ThemeOptions,
  components: {
    [key in T]: (theme: Theme) => ComponentProps<T>;
  },
) => {
  const theme = createTheme({
    ...baseTheme,
  });

  const generatedComponents = {} as { [key in T]: ComponentProps<T> };

  Object.keys(components).forEach((_key) => {
    const key = _key as T;
    generatedComponents[key] = components[key](theme);
  });

  theme.components = generatedComponents;

  return theme;
};
