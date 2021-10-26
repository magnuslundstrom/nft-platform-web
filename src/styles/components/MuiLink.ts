import { Theme } from '@mui/material';

export const MuiLink = (theme: Theme) => ({
  styleOverrides: {
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  },
});
