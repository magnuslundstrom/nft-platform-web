import useSWR from 'swr';
import { ethers } from 'ethers';
import { useContract } from '@/hooks/useContract';

export const useFetchNftItem = (tokenId: string) => {
  const FETCH_KEY = `item/${tokenId}`;
  const { mintContract, auctionContract } = useContract();

  // should probably move all calls into Promise.all
  const fetcher = async () => {
    const [tokenURI, ownerOf, collectionName] = await Promise.all([
      mintContract.tokenURI(tokenId),
      mintContract.ownerOf(tokenId),
      mintContract.name(),
    ]);

    const metaData = await fetch(tokenURI).then((res) => res.json());
    const auctionItem = await auctionContract.auctionsMap(tokenId);
    const purchaseHistory = await auctionContract.getPurchaseHistory(tokenId);
    const auctionExists = await auctionContract.auctionExists(tokenId);

    const price = ethers.utils.formatEther(auctionItem.price);
    return {
      collectionName,
      auctionExists,
      ownerOf,
      price,
      purchaseHistory,
      ...metaData,
    };
  };

  return useSWR(FETCH_KEY, fetcher);
};
