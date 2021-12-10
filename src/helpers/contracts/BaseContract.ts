/* eslint-disable lines-between-class-members */
import { ethers } from 'ethers';
import { currentContracts } from '@/constants/contracts';

export type SignerOrProviderT = ethers.Signer | ethers.providers.Provider;

export type ContractTypesT = 'auction' | 'mint';

export class BaseContract {
  contract: ethers.Contract;
  eventAbis: any;

  constructor(
    public signerOrProvider: SignerOrProviderT,
    type: ContractTypesT,
  ) {
    const { address, abi, eventAbis } = currentContracts[type];
    this.contract = new ethers.Contract(address, abi, signerOrProvider);

    this.eventAbis = eventAbis;
  }
}
