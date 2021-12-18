import { useContext } from 'react';
import { ContractContext } from '@/contexts/Contracts';

export const useContract = () => {
  const { auctionContract, mintContract } = useContext(ContractContext);

  return { auctionContract, mintContract };
};
