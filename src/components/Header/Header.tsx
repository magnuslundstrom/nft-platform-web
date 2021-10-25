import { useCallback } from 'react';
import NextLink from 'next/link';
import { useWeb3React } from '@web3-react/core';
import { Button, Link, Container } from '@mui/material';
import { useTheme } from '@/hooks/useTheme';
import { InjectedConnector } from '@/helpers/InjectedConnector';
import { Inner, Nav, ConnectButton } from './Header.styles';

const Header: React.FC = () => {
  const { active, activate, deactivate } = useWeb3React();
  const { toggleMode } = useTheme();

  const handleClick = useCallback(() => {
    if (!active) activate(InjectedConnector);
    else deactivate();
  }, [activate, active, deactivate]);

  const buttonMessage = active ? 'Disconnect' : 'Connect wallet';

  return (
    <Container maxWidth="lg">
      <Inner>
        <NextLink href="/" passHref>
          <Link underline="hover">NFT-Platform</Link>
        </NextLink>
        <Nav>
          <NextLink href="/marketplace" passHref>
            <Link underline="hover">Marketplace</Link>
          </NextLink>
          <NextLink href="/mint">Mint</NextLink>
          {active && <NextLink href="/profile">Profile</NextLink>}
          <ConnectButton onClick={handleClick}>{buttonMessage}</ConnectButton>
          <Button variant="contained" onClick={toggleMode}>
            Toggle
          </Button>
        </Nav>
      </Inner>
    </Container>
  );
};

export default Header;
