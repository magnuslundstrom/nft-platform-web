import { TARGET_ENV } from './env';
import mintAbi from '@/constants/abis/mint.json';
import auctionAbi from '@/constants/abis/auction.json';
import approvalForAll from '@/constants/abis/mint/events/ApprovalForAll.json';

export const contracts = {
  dev: {
    mint: {
      address: '0x89C627dE4643764Ab95bEbB9e6F75876084F1c10',
      abi: mintAbi,
      eventAbis: { approvalForAll },
      eventTopics: {},
    },
    auction: {
      address: '0x6ca92B01890dD4bA715Bcd66c2B189ae76ccB62e',
      abi: auctionAbi,
      eventAbis: {},
      eventTopics: {},
    },
  },
  staging: {
    mint: {
      address: '',
      abi: [],
      eventAbis: {},
      eventTopics: {},
    },
    auction: {
      address: '',
      abi: [],
      eventAbis: {},
      eventTopics: {},
    },
  },
  prod: {
    mint: {
      address: '',
      abi: [],
      eventAbis: {},
      eventTopics: {},
    },
    auction: {
      address: '',
      abi: [],
      eventAbis: {},
      eventTopics: {
        BuyNFT:
          '0xcb03cecf08b1873cb92c86fd3c1d1ff69848ba4cb4ab2ab18c12b3e3486fadd3',
      },
    },
  },
};

export const currentContracts = contracts[TARGET_ENV];
export const currentMintContract = currentContracts.mint;
export const currentAuctionContract = currentContracts.auction;
