import { ethers } from 'ethers';
import { Web3ReactProvider } from '@web3-react/core';
import { TARGET_ENV } from '@/constants/env';

const OwnWeb3Provider: React.FC = ({ children }) => {
  const { Web3Provider } = ethers.providers;

  const getProvider = (provider: any) => {
    switch (TARGET_ENV) {
      // This doesn't seem to be necessary anyway
      // case 'dev':
      //   return new ethers.providers.JsonRpcProvider('http://localhost:8545');
      default:
        return new Web3Provider(provider);
    }
  };
  return (
    <Web3ReactProvider getLibrary={getProvider}>{children}</Web3ReactProvider>
  );
};

export default OwnWeb3Provider;
