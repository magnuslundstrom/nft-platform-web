import { MintContract } from '@/helpers/contracts/MintContract';

interface FetchNftItemOptionsT {
  contractAddress: string;
  tokenId: string;
  library: any;
}

export const fetchNftItem =
  ({ tokenId, library }: FetchNftItemOptionsT) =>
  async () => {
    const mintContract = new MintContract(library);
    const [tokenURI, ownerOf] = await Promise.all([
      mintContract.tokenURI(tokenId),
      mintContract.ownerOf(tokenId),
    ]);

    const metaData = (await fetch(tokenURI).then((res) => res.json()))[0];
    return { ownerOf, ...metaData };
  };
