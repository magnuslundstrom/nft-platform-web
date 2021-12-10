import { createContext } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '@/hooks/useWeb3';
import { AuctionContract } from '@/helpers/contracts/AuctionContract';
import { MintContract } from '@/helpers/contracts/MintContract';
import { TARGET_ENV } from '@/constants/env';

const provider =
  TARGET_ENV !== 'dev'
    ? ethers.getDefaultProvider()
    : new ethers.providers.JsonRpcProvider('http://localhost:8545');

export const ContractContext = createContext({
  auctionContract: new AuctionContract(provider),
  mintContract: new MintContract(provider),
});

const ContractProvider: React.FC = ({ children }) => {
  const { signer } = useWeb3();

  return (
    <ContractContext.Provider
      value={{
        auctionContract: new AuctionContract(signer ?? provider),
        mintContract: new MintContract(signer ?? provider),
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractProvider;
