import { useCallback } from 'react';
import NextLink from 'next/link';
import { useWeb3React } from '@web3-react/core';
import { Button, Link, AppBar, Container } from '@mui/material';
import { FlexBox } from '@/components/Generics/FlexBox';
import { useTheme } from '@/hooks/useTheme';
import { InjectedConnector } from '@/helpers/InjectedConnector';
import { Nav } from './Header.styles';

const Header: React.FC = () => {
  const { active, activate, deactivate } = useWeb3React();
  const { toggleMode } = useTheme();

  const handleClick = useCallback(() => {
    if (!active) activate(InjectedConnector);
    else deactivate();
  }, [activate, active, deactivate]);

  const buttonMessage = active ? 'Disconnect' : 'Connect wallet';

  return (
    <AppBar sx={{ py: 2 }} position="relative">
      <Container maxWidth="lg">
        <FlexBox>
          <NextLink href="/" passHref>
            <Link underline="hover" color="white" sx={{ fontWeight: 'bold' }}>
              NFT-Platform
            </Link>
          </NextLink>
          <Nav>
            <NextLink href="/marketplace" passHref>
              <Link underline="hover" color="white">
                Marketplace
              </Link>
            </NextLink>
            <NextLink href="/mint" passHref>
              <Link underline="hover" color="white">
                Mint
              </Link>
            </NextLink>
            {active && <NextLink href="/profile">Profile</NextLink>}
            <Button
              variant="contained"
              onClick={handleClick}
              sx={{ marginRight: 3 }}
            >
              {buttonMessage}
            </Button>
            <Button variant="contained" onClick={toggleMode}>
              Toggle
            </Button>
          </Nav>
        </FlexBox>
      </Container>
    </AppBar>
  );
};

export default Header;
