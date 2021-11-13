import { TARGET_ENV } from './env';
import mintDevAbi from './abis/mint/dev.json';

export const contracts = {
  dev: {
    mint: {
      address: '0x89C627dE4643764Ab95bEbB9e6F75876084F1c10',
      abi: mintDevAbi,
    },
  },
  staging: {
    mint: {
      address: '',
      abi: [],
    },
  },
  prod: {
    mint: {
      address: '',
      abi: [],
    },
  },
};

export const currentContracts = contracts[TARGET_ENV];
