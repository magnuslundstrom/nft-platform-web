/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from 'ethers';
import moment from 'moment';
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

  async removeAuction(tokenId: string) {
    this.contract.removeAuction(tokenId, currentMintContract.address);
  }

  async listenForCreateAuctionOnce(tokenId: string, callback: () => void) {
    const filter = this.contract.filters.CreateAuction(
      ethers.utils.hexlify(parseInt(tokenId, 10)),
    );

    this.contract.once(filter, (_tokenId, _seller, _NFTContractAddress) => {
      callback();
    });
  }

  async listenForRemoveAuctionOnce(tokenId: string, callback: () => void) {
    const filter = this.contract.filters.RemoveAuction(
      ethers.utils.hexlify(parseInt(tokenId, 10)),
      null,
      null,
    );

    this.contract.once(filter, (_tokenId, _owner, _NFTContractAddress) => {
      callback();
    });
  }

  async getAuctions() {
    const auctions = await this.contract.getAuctions();
    return auctions;
  }

  async buyNFT(tokenId: string, price: string) {
    const _price = ethers.utils.parseEther(price);
    this.contract.buyNFT(tokenId, { value: _price });
  }

  async listenForPurchase(tokenId: string, callback: () => void) {
    const filter = this.contract.filters.NFTBuy(
      ethers.utils.hexlify(parseInt(tokenId, 10)),
    );

    this.contract.once(filter, () => {
      callback();
    });
  }

  async getPurchaseHistory(tokenId: string) {
    const filter = this.contract.filters.NFTBuy(
      ethers.utils.hexlify(parseInt(tokenId, 10)),
    );

    const encodedLogs = await this.contract.provider.getLogs(filter);
    const decodedLogs = encodedLogs.map((log: any) => {
      const parsedLog = this.contract.interface.parseLog(log);
      const data = parsedLog.args;
      const price = ethers.utils.formatEther(data?.price);
      const seller = data?.refSeller;
      const buyer = data?.refBuyer;
      const timeStamp = moment(
        parseInt(data?.timeStamp.toString(), 10) * 1000,
      ).format('D/M-Y, h:mm:ss');
      return {
        buyer,
        seller,
        price,
        timeStamp,
      };
    });

    return decodedLogs;
  }

  async auctionExists(tokenId: string) {
    const result = await this.contract.auctionExists(tokenId);
    return result;
  }
}
