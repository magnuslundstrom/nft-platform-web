import { ethers } from 'ethers';
import { Web3ReactProvider } from '@web3-react/core';
import { TARGET_ENV } from '@/constants/env';

const OwnWeb3Provider: React.FC = ({ children }) => {
  const { Web3Provider, JsonRpcProvider } = ethers.providers;

  const getProvider = (provider: any) => {
    switch (TARGET_ENV) {
      case 'dev':
        return new JsonRpcProvider('http://localhost:7545');
      default:
        return new Web3Provider(provider);
    }
  };
  return (
    <Web3ReactProvider getLibrary={getProvider}>{children}</Web3ReactProvider>
  );
};

export default OwnWeb3Provider;
