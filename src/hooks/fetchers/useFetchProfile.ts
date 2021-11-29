import useSWR from 'swr';
import { useContract } from '@/hooks/useContract';

export const useFetchProfile = (account: string) => {
  const { mintContract } = useContract();

  const fetcher = async () => {
    const ownedNfts = await mintContract.getOwnedNfts(account);

    return {
      ownedNfts: ownedNfts.map((nft) => ({
        tokenId: nft.tokenId.toNumber(),
        tokenURI: nft.tokenURI,
      })),
    };
  };

  return useSWR(`profile/${account}`, fetcher);
};
