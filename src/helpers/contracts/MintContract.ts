import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';
import { BaseContract, SignerOrProviderT } from './BaseContract';
import { currentAuctionContract } from '@/constants/contracts';

export class MintContract extends BaseContract {
  constructor(signerOrProvider: SignerOrProviderT) {
    super(signerOrProvider, 'mint');
  }

  async tokenURI(tokenId: string) {
    const tokenURI = await this.contract.functions.tokenURI(tokenId);
    return tokenURI[0];
  }

  async name() {
    const name = await this.contract.functions.name();
    return name;
  }

  async getOwnedNfts(
    address: string,
  ): Promise<{ tokenId: BigNumber; tokenURI: string }[]> {
    const ownedNfts = await this.contract.functions.getOwnedNfts(address);

    return ownedNfts[0];
  }

  async ownerOf(tokenId: string) {
    const ownerOf = await this.contract.functions.ownerOf(tokenId);
    return ownerOf[0];
  }

  async approveAuctionContract(tokenId: string) {
    const result = await this.contract.approve(
      currentAuctionContract.address,
      tokenId,
    );

    return result;
  }

  async isApprovedForAll(owner: string) {
    const result = await this.contract.isApprovedForAll(
      owner,
      currentAuctionContract.address,
    );
    return result;
  }

  async isAuctionContractApproved(tokenId: string) {
    const result = this.contract.isApprovedOrOwner(
      currentAuctionContract.address,
      tokenId,
    );
    return result;
  }

  async listenForApprovalOnce(tokenId: string, callback: () => void) {
    const filter = this.contract.filters.Approval(
      null,
      null,
      ethers.utils.hexlify(parseInt(tokenId, 10)),
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.contract.once(filter, (_owner, _operator, _tokenId: BigNumber) => {
      callback();
    });
  }
}
