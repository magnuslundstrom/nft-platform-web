import { useMemo } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from './useWeb3';
import { AuctionContract } from '@/helpers/contracts/AuctionContract';
import { MintContract } from '@/helpers/contracts/MintContract';

export const useContract = (callable = false) => {
  const { signer, library } = useWeb3();

  const provider = useMemo(
    () =>
      library ?? new ethers.providers.JsonRpcProvider('http://localhost:8545'),
    [library],
  );

  const auctionContract = useMemo(
    () => new AuctionContract(callable ? signer : provider),
    [callable, provider, signer],
  );

  const mintContract = useMemo(
    () => new MintContract(callable ? signer : provider),
    [callable, provider, signer],
  );

  return { auctionContract, mintContract };
};
