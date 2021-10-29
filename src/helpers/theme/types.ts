import {
  ComponentNameToClassKey,
  ComponentsOverrides,
  ComponentsProps,
  ComponentsVariants,
} from '@mui/material';

export type ComponentNameKey = keyof ComponentNameToClassKey;

export type ComponentProps<T extends ComponentNameKey> = {
  defaultProps?: ComponentsProps[T];
  styleOverrides?: ComponentsOverrides[T];
  variants?: ComponentsVariants[T];
};
