import useSWR from 'swr';
import { useContract } from '@/hooks/useContract';

export const useFetchMintNft = () => {
  const { mintContract } = useContract();

  const fetcher = async () => {
    const { address } = mintContract.contract;
    const name = (await mintContract.name())[0];

    return {
      name,
      address,
    };
  };

  return useSWR('fetchMintNft', fetcher);
};
