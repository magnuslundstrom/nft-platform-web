import { ethers } from 'ethers';

export const fetchTokenURI =
  (contractAddress: string, id: string) => async (url: string) => {
    const { abi } = await fetch(url).then((res) => res.json());

    const provider = ethers.getDefaultProvider('ropsten');
    const metaContract = new ethers.Contract(
      contractAddress as string,
      abi,
      provider,
    );

    const tokenURI = await metaContract.functions
      .tokenURI(id)
      .then((res) => res[0]);

    const metaData = await fetch(tokenURI).then((res) => res.json());
    return metaData[0];
  };
