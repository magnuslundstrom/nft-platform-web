import { MintContract } from '@/helpers/contracts/MintContract';

// interface FetchNftItemOptionsT {
//   contractAddress: string;
//   tokenId: string;
//   library: any;
// }

export const fetchNftItem = async (
  tokenId: string,
  mintContract: MintContract,
) => {
  const [tokenURI, ownerOf] = await Promise.all([
    mintContract.tokenURI(tokenId),
    mintContract.ownerOf(tokenId),
  ]);

  const metaData = await fetch(tokenURI).then((res) => res.json());
  return { ownerOf, ...metaData };
};
