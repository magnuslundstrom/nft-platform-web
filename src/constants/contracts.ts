import { TARGET_ENV } from './env';
import mintDevAbi from '@/constants/abis/mint/dev.json';
import auctionDevAbi from '@/constants/abis/auction/dev.json';

export const contracts = {
  dev: {
    mint: {
      address: '0x89C627dE4643764Ab95bEbB9e6F75876084F1c10',
      abi: mintDevAbi,
    },
    auction: {
      address: '0x6ca92B01890dD4bA715Bcd66c2B189ae76ccB62e',
      abi: auctionDevAbi,
    },
  },
  staging: {
    mint: {
      address: '',
      abi: [],
    },
    auction: {
      address: '',
      abi: [],
    },
  },
  prod: {
    mint: {
      address: '',
      abi: [],
    },
    auction: {
      address: '',
      abi: [],
    },
  },
};

export const currentContracts = contracts[TARGET_ENV];
export const currentMintContract = currentContracts.mint;
export const currentAuctionContract = currentContracts.auction;
