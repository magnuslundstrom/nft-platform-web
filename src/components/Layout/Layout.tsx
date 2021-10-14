import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@/helpers/InjectedConnector';
import Header from '@/components/Header/Header';
import GlobalStyles from '@/styles/GlobalStyles';

import Head, { HeadPropsT } from './Head';
import { Wrapper } from './Layout.styles';

interface Props extends HeadPropsT {}

const Layout: React.FC<Props> = ({ children, metaTitle, metaDescription }) => {
  const { activate } = useWeb3React();

  useEffect(() => {
    activate(InjectedConnector);
  }, []);

  return (
    <>
      <GlobalStyles />
      <Head metaTitle={metaTitle} metaDescription={metaDescription} />
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Layout;
