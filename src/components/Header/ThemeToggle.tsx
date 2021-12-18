import { IconButton } from '@mui/material';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { useTheme } from '@/hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { toggleMode, mode } = useTheme();
  return (
    <IconButton aria-label="toggle-light" onClick={toggleMode}>
      {mode === 'dark' ? <BsFillSunFill /> : <BsFillMoonFill />}
    </IconButton>
  );
};

export default ThemeToggle;
