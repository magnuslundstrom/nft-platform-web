import useSWR from 'swr';
import { useContract } from '@/hooks/useContract';

export const useFetchListNft = (tokenId: string) => {
  const { mintContract, auctionContract } = useContract();

  const fetcher = async () => {
    const [isApproved, ownerOf, auctionExists] = await Promise.all([
      await mintContract.isAuctionContractApproved(tokenId),
      await mintContract.ownerOf(tokenId),
      await auctionContract.auctionExists(tokenId),
    ]);

    return {
      ownerOf,
      isApproved,
      auctionExists,
    };
  };

  return useSWR(`list/${tokenId}`, fetcher);
};
