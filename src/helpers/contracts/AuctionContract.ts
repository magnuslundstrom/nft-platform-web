import { ethers } from 'ethers';
import { BaseContract, SignerOrProviderT } from './BaseContract';
import { currentMintContract } from '@/constants/contracts';

export class AuctionContract extends BaseContract {
  constructor(signerOrProvider: SignerOrProviderT) {
    super(signerOrProvider, 'auction');

    // this.listenForNewAuctions();
  }

  async auctions(tokenId: string) {
    const result = await this.contract.auctions(tokenId);
    return result;
  }

  async createAuction(minPrice: number, tokenId: string) {
    const minPriceInWei = ethers.utils.parseEther(minPrice.toString());
    const tokenIdInNumber = parseInt(tokenId, 10);

    this.contract.createAuction(
      minPriceInWei,
      tokenIdInNumber,
      currentMintContract.address,
    );
  }

  // listenForNewAuctions = async () => {
  //   this.contract.on('event', (from: string, to: string, amount: string) => {
  //     console.log('got the event!');
  //   });
  // };
}
