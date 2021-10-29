import { ethers } from 'ethers';
import { Web3ReactProvider } from '@web3-react/core';

const OwnWeb3Provider: React.FC = ({ children }) => {
  const { Web3Provider } = ethers.providers;
  return (
    <Web3ReactProvider getLibrary={(provider) => new Web3Provider(provider)}>
      {children}
    </Web3ReactProvider>
  );
};

export default OwnWeb3Provider;
