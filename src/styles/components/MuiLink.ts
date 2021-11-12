import { generateComponent } from '@/helpers/theme/generateComponent';

export const MuiLink = generateComponent((theme) => ({
  styleOverrides: {
    root: {
      color: theme.palette.text.primary,
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
}));
