import { ethers } from 'ethers';
import { currentContracts } from '@/constants/contracts';

export type SignerOrProviderT = ethers.Signer | ethers.providers.Provider;

type ContractTypes = 'auction' | 'mint';

export class BaseContract {
  contract: ethers.Contract;

  constructor(signerOrProvider: SignerOrProviderT, type: ContractTypes) {
    const { address, abi } = currentContracts[type];
    this.contract = new ethers.Contract(address, abi, signerOrProvider);
  }
}
