import { Components } from '@mui/material';

export type ComponentNameKey = keyof Components;

export type ComponentProps<T extends keyof Components> = Components[T];
