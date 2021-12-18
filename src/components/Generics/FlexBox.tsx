import { Box } from '@mui/material';
import { SxProps } from '@mui/system';

interface Props {
  sx?: SxProps;
}

export const FlexBox: React.FC<Props> = ({ children, sx }) => {
  const standardSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...sx,
  };
  return <Box sx={standardSx}>{children}</Box>;
};
