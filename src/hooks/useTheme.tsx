import { useContext } from 'react';
import { useTheme as muiUseTheme } from '@mui/material/styles';
import { ThemeContext } from '@/contexts/Theme';

export const useTheme = () => {
  const theme = muiUseTheme();
  const { toggleMode, mode } = useContext(ThemeContext);

  return { toggleMode, mode, theme };
};
