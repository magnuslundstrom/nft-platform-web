import { BigNumber } from '@ethersproject/bignumber';

/* eslint-disable camelcase */

declare global {
  interface NFTT {
    tokenId: number;
    tokenURI: string;
  }

  interface AuctionedNFTT extends NFTT {
    minPrice: BigNumber;
    NFTContractAddress: string;
  }

  interface TokenURIDataT {
    attributes: {
      trait_type: string;
      value: string;
    }[];
    description: string;
    image: string;
    name: string;
  }
}
