import { generateComponent } from '@/helpers/theme/generateComponent';

export const MuiAppBar = generateComponent(({ palette }) => ({
  styleOverrides: {
    root: {
      backgroundColor: palette.background.paper,
      backgroundImage: 'none',
      borderBottom: palette.mode === 'dark' ? '1px solid' : '0px',
      borderColor: palette.divider,
    },
  },
}));
