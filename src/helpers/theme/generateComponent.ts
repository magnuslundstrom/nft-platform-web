import { Theme } from '@mui/material';
import { ComponentNameKey, ComponentProps } from './types';

export const generateComponent = <T extends ComponentNameKey>(
  callback: (theme: Theme) => ComponentProps<T>,

  // eslint-disable-next-line arrow-body-style
) => {
  return (theme: Theme) => callback(theme);
};
