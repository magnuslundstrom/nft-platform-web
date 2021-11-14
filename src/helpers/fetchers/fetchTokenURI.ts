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

    // These 2 fetches could be extracted into a Promise.all
    const ownerOf = await metaContract.functions
      .ownerOf(tokenId)
      .then((res) => res[0]);

    const metaData = (await fetch(tokenURI).then((res) => res.json()))[0];
    return { ownerOf, ...metaData };
  };
