import { useContext } from 'react';
import { ThemeContext } from '@/contexts/Theme';

export const useTheme = () => {
  const { toggleMode, mode } = useContext(ThemeContext);

  return { toggleMode, mode };
};
