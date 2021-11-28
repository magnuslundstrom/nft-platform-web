import useSWR from 'swr';
import { useContract } from '@/hooks/useContract';

// maybe add pagination here in the future
export const useAuctionedNfts = () => {
  const { auctionContract } = useContract();

  const fetcher = async () => {
    const auctions = await auctionContract.getAuctions();
    return auctions;
  };

  return useSWR<AuctionedNFTT[]>('marketplace', fetcher);
};
