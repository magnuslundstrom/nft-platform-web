import { generateComponent } from '@/helpers/theme/generateTheme';

export const MuiAppBar = generateComponent((theme) => ({
  styleOverrides: {
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));
