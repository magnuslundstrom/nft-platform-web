import { ethers } from 'ethers';
import { BaseContract, SignerOrProviderT } from './BaseContract';
import { currentMintContract } from '@/constants/contracts';

export class AuctionContract extends BaseContract {
  constructor(signerOrProvider: SignerOrProviderT) {
    super(signerOrProvider, 'auction');
  }

  async auctionsMap(tokenId: string) {
    const result = await this.contract.auctionsMap(tokenId);
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

  async getAuctions() {
    const auctions = await this.contract.getAuctions();
    return auctions;
  }

  async buyNFT(tokenId: string, minPrice: string) {
    this.contract.buyNFT(tokenId, { value: minPrice });
  }
}
