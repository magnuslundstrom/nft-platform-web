import useSWR from 'swr';
import { useContract } from '@/hooks/useContract';

export const useFetchListNft = (tokenId: string) => {
  const { mintContract } = useContract();

  const fetcher = async () => {
    const isApproved = await mintContract.isAuctionContractApproved(tokenId);
    const ownerOf = await mintContract.ownerOf(tokenId);

    return {
      ownerOf,
      isApproved,
    };
  };

  return useSWR(`list/${tokenId}`, fetcher);
};
