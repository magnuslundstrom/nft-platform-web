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

  async createAuction(price: number, tokenId: string) {
    const priceInWei = ethers.utils.parseEther(price.toString());
    const tokenIdInNumber = parseInt(tokenId, 10);

    this.contract.createAuction(
      priceInWei,
      tokenIdInNumber,
      currentMintContract.address,
    );
  }

  async getAuctions() {
    const auctions = await this.contract.getAuctions();
    return auctions;
  }

  async buyNFT(tokenId: string, price: string) {
    this.contract.buyNFT(tokenId, { value: price });
  }
}
