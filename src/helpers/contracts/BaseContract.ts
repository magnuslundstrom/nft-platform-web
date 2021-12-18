/* eslint-disable lines-between-class-members */
import { ethers } from 'ethers';
import { currentContracts } from '@/constants/contracts';

export type SignerOrProviderT = ethers.Signer | ethers.providers.Provider;

export type ContractTypesT = 'auction' | 'mint';

export class BaseContract {
  contract: ethers.Contract;

  constructor(
    public signerOrProvider: SignerOrProviderT,
    type: ContractTypesT,
  ) {
    const { address, abi } = currentContracts[type];
    this.contract = new ethers.Contract(address, abi, signerOrProvider);
  }
}
