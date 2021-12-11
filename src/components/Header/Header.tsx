import { useCallback, useMemo } from 'react';
import NextLink from 'next/link';
import { useWeb3React } from '@web3-react/core';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import {
  Button,
  Link,
  AppBar,
  Container,
  IconButton,
  Box,
} from '@mui/material';

import { FlexBox } from '@/components/Generics/FlexBox';
import { useTheme } from '@/hooks/useTheme';
import { InjectedConnector } from '@/helpers/InjectedConnector';
import {
  unauthorizedLinks,
  authorizedLinks,
  NavLinkT,
} from '@/constants/navigationLinks';

const Header: React.FC = () => {
  const { active, activate, deactivate, account } = useWeb3React();
  const { toggleMode, mode } = useTheme();

  const handleClick = useCallback(() => {
    if (!active) activate(InjectedConnector);
    else deactivate();
  }, [activate, active, deactivate]);

  const mapLinkHelper = useCallback(
    (link: NavLinkT) => {
      const { label } = link;
      let { url } = link;
      if (url === '/profile/#account') {
        url = url.replace('#account', account ?? '');
      }

      return (
        <NextLink href={url} key={url}>
          <Link underline="hover" marginRight={3}>
            {label}
          </Link>
        </NextLink>
      );
    },
    [account],
  );
  const renderLinks = useMemo(() => {
    if (!active) return unauthorizedLinks.map(mapLinkHelper);
    return authorizedLinks.map(mapLinkHelper);
  }, [active, mapLinkHelper]);

  const buttonMessage = active ? 'Disconnect' : 'Connect wallet';

  return (
    <AppBar sx={{ py: 3 }} position="relative">
      <Container maxWidth="xl">
        <FlexBox>
          <NextLink href="/" passHref>
            <Link underline="hover" sx={{ fontWeight: 'bold' }}>
              NFT-Platform
            </Link>
          </NextLink>
          <Box component="nav">
            {renderLinks}
            <Button
              variant="contained"
              onClick={handleClick}
              sx={{ marginRight: 3 }}
              data-testid="connect-button"
            >
              {buttonMessage}
            </Button>
            <IconButton aria-label="toggle-light" onClick={toggleMode}>
              {mode === 'dark' ? <BsFillSunFill /> : <BsFillMoonFill />}
            </IconButton>
          </Box>
        </FlexBox>
      </Container>
    </AppBar>
  );
};

export default Header;
