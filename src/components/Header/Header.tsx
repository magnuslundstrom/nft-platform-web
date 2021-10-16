import { useCallback } from 'react';
import Link from 'next/link';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@/helpers/InjectedConnector';
import { Wrapper, Inner, Nav, ConnectButton } from './Header.styles';

interface Props {}

const Header: React.FC<Props> = () => {
  const { active, activate, deactivate } = useWeb3React();

  const handleClick = useCallback(() => {
    if (!active) activate(InjectedConnector);
    else deactivate();
  }, [active]);

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
        </Nav>
      </Inner>
    </Wrapper>
  );
};

export default Header;
