import NextLink from 'next/link';
import { Link as MuiLink } from '@mui/material';

interface Props {
  url: string;
  marginRight?: number;
}
const Link: React.FC<Props> = ({ children, url, marginRight }) => (
  <NextLink href={url}>
    <MuiLink marginRight={marginRight ?? 3} sx={{ textDecoration: 'none' }}>
      {children}
    </MuiLink>
  </NextLink>
);

export default Link;
