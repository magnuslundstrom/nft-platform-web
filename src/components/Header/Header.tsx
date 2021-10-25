import { useCallback } from 'react';
import Link from 'next/link';
import { useWeb3React } from '@web3-react/core';
import { Button } from '@mui/material';
import { useTheme } from '@/hooks/useTheme';
import { InjectedConnector } from '@/helpers/InjectedConnector';
import { Wrapper, Inner, Nav, ConnectButton } from './Header.styles';

const Header: React.FC = () => {
  const { active, activate, deactivate } = useWeb3React();
  const { toggleMode } = useTheme();

  const handleClick = useCallback(() => {
    if (!active) activate(InjectedConnector);
    else deactivate();
  }, [activate, active, deactivate]);

  const buttonMessage = active ? 'Disconnect' : 'Connect wallet';

  return (
    <Wrapper>
      <Inner>
        <Link href="/">NFT-platform</Link>
        <Nav>
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/mint">Mint</Link>
          {active && <Link href="/profile">Profile</Link>}
          <ConnectButton onClick={handleClick}>{buttonMessage}</ConnectButton>
          <Button variant="contained" onClick={toggleMode}>
            Toggle
          </Button>
        </Nav>
      </Inner>
    </Wrapper>
  );
};

export default Header;
