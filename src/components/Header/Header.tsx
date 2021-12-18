import { useCallback, useMemo, useState } from 'react';
import NextLink from 'next/link';
import {
  Button,
  Link,
  AppBar,
  Container,
  IconButton,
  Box,
  useMediaQuery,
} from '@mui/material';
import { GiHamburgerMenu } from 'react-icons/gi';
import Drawer from './Drawer';
import ThemeToggle from './ThemeToggle';
import { useWeb3 } from '@/hooks/useWeb3';
import { FlexBox } from '@/components/Generics/FlexBox';
import { useTheme } from '@/hooks/useTheme';
import { InjectedConnector } from '@/helpers/InjectedConnector';
import {
  unauthorizedLinks,
  authorizedLinks,
  NavLinkT,
} from '@/constants/navigationLinks';

const Header: React.FC = () => {
  const { active, activate, deactivate, account } = useWeb3();
  const { theme } = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));
  const [openDrawer, setOpenDrawer] = useState(false);

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
    <AppBar sx={{ py: 3 }} position="relative" data-testid="header">
      <Container maxWidth="xl">
        <FlexBox>
          <NextLink href="/" passHref>
            <Link underline="hover" sx={{ fontWeight: 'bold' }}>
              NFT-Platform
            </Link>
          </NextLink>
          <Box component="nav">
            {!isMobile && <>{renderLinks}</>}
            <Button
              variant="contained"
              onClick={handleClick}
              sx={{ marginRight: 2 }}
              data-testid="connect-button"
            >
              {buttonMessage}
            </Button>
            {!isMobile && <ThemeToggle />}
            {isMobile && (
              <IconButton
                onClick={() => setOpenDrawer(true)}
                data-testid="burger-icon"
              >
                <GiHamburgerMenu />
              </IconButton>
            )}
            <Drawer
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
              message={!active ? 'Login to see all features' : ''}
            >
              {[...renderLinks, <ThemeToggle key="toggle" />]}
            </Drawer>
          </Box>
        </FlexBox>
      </Container>
    </AppBar>
  );
};

export default Header;
