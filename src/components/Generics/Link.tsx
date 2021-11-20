import NextLink from 'next/link';
import { Link as MuiLink } from '@mui/material';

const Link: React.FC<{ url: string }> = ({ children, url }) => (
  <NextLink href={url}>
    <MuiLink marginRight={3}>{children}</MuiLink>
  </NextLink>
);

export default Link;
