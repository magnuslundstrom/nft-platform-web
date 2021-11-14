// import { ethers } from 'ethers';
import { BaseContract, SignerOrProviderT } from './BaseContract';

export class AuctionContract extends BaseContract {
  constructor(signerOrProvider: SignerOrProviderT) {
    super(signerOrProvider, 'auction');
  }

  setForSale = (
    minPrice: number,
    tokenId: string,
    NFTContractAddress: string,
  ) => {
    //     const minPriceInWei = ethers.utils.parseEther(minPrice.toString());
    const tokenIdInNumber = parseInt(tokenId, 10);
    this.contract.createAuction(1, tokenIdInNumber, NFTContractAddress);
  };
}
