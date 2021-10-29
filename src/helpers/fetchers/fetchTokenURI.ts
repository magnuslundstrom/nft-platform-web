import { ethers } from 'ethers';
import { fetchGenericJson } from './fetchGenericJson';

export const fetchTokenURI =
  (contractAddress: string, id: string) => async (url: string) => {
    const { abi } = await fetchGenericJson(url);

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
