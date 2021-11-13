import { ethers } from 'ethers';
import { currentContracts } from '@/constants/contracts';

interface FetchTokenURIOptionsT {
  contractAddress: string;
  tokenId: string;
  library: any;
}

export const fetchTokenURI =
  ({ contractAddress, tokenId, library }: FetchTokenURIOptionsT) =>
  async () => {
    if (!library) return null;
    const {
      mint: { abi },
    } = currentContracts;

    const metaContract = new ethers.Contract(
      contractAddress as string,
      abi,
      library,
    );

    const tokenURI = await metaContract.functions
      .tokenURI(tokenId)
      .then((res) => res[0]);

    const metaData = await fetch(tokenURI).then((res) => res.json());
    return metaData[0];
  };
