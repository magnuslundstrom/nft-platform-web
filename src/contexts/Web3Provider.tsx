import { ethers } from 'ethers';
import { Web3ReactProvider } from '@web3-react/core';

interface Props {}

const Web3Provider: React.FC<Props> = ({ children }) => {
  const Web3Provider = ethers.providers.Web3Provider;
  return (
    <Web3ReactProvider getLibrary={(provider) => new Web3Provider(provider)}>{children}</Web3ReactProvider>
  );
};

export default Web3Provider;
