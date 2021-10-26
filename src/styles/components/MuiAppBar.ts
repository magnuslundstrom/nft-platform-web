import { generateComponent } from '@/helpers/theme/generateComponent';

export const MuiAppBar = generateComponent((theme) => ({
  styleOverrides: {
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));
