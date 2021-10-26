/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import {
  ThemeOptions,
  ComponentNameToClassKey,
  ComponentsProps,
  ComponentsVariants,
  ComponentsOverrides,
  Theme,
  createTheme,
} from '@mui/material';
// The purpose of this helper is to allow us to use the generated properties
// from the theme

type ComponentProps<T extends keyof ComponentNameToClassKey> = {
  defaultProps?: ComponentsProps[T];
  styleOverrides?: ComponentsOverrides[T];
  variants?: ComponentsVariants[T];
};

export const generateTheme = <T extends keyof ComponentNameToClassKey>(
  baseTheme: ThemeOptions,
  components: {
    [key in T]: (theme: Theme) => ComponentProps<T>;
  },
) => {
  const theme = createTheme({
    ...baseTheme,
  });

  const generatedComponents = {} as { [key in T]: ComponentProps<T> };

  for (const key of Object.keys(components)) {
    const k = key as T;
    if (components[k] instanceof Function && components[k] !== undefined) {
      generatedComponents[k] = components![k](theme);
    }
  }
  theme.components = generatedComponents;

  return theme;
};

export const generateComponent = <T extends keyof ComponentNameToClassKey>(
  callback: (theme: Theme) => ComponentProps<T>,

  // eslint-disable-next-line arrow-body-style
) => {
  return (theme: Theme) => callback(theme);
};
