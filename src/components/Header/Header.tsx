import { useCallback } from 'react';
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

const Header: React.FC = () => {
  const { active, activate, deactivate } = useWeb3React();
  const { toggleMode, mode } = useTheme();

  const handleClick = useCallback(() => {
    if (!active) activate(InjectedConnector);
    else deactivate();
  }, [activate, active, deactivate]);

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
            <NextLink href="/marketplace" passHref>
              <Link underline="hover" marginRight={3}>
                Marketplace
              </Link>
            </NextLink>
            <NextLink href="/mint" passHref>
              <Link underline="hover" marginRight={3}>
                Mint
              </Link>
            </NextLink>
            {active && (
              <NextLink href="/profile" passHref>
                <Link underline="hover" marginRight={3}>
                  Profile
                </Link>
              </NextLink>
            )}
            <Button
              variant="contained"
              onClick={handleClick}
              sx={{ marginRight: 3 }}
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
