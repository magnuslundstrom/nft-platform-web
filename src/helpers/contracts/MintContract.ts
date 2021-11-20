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

  async approveAuctionContract(approved: boolean) {
    const result = await this.contract.setApprovalForAll(
      currentAuctionContract.address,
      approved,
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

  async listenForApprovalsOnce(callback: (approved: boolean) => void) {
    this.contract.once(
      'ApprovalForAll',
      (_owner, _operator, approved: boolean) => {
        callback(approved);
      },
    );
  }
}
