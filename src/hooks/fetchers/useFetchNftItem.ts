import useSWR from 'swr';
import { ethers } from 'ethers';
import { useContract } from '@/hooks/useContract';

export const useFetchNftItem = (tokenId: string) => {
  const { mintContract, auctionContract } = useContract();

  const fetcher = async () => {
    const [tokenURI, ownerOf] = await Promise.all([
      mintContract.tokenURI(tokenId),
      mintContract.ownerOf(tokenId),
    ]);

    const metaData = await fetch(tokenURI).then((res) => res.json());
    const auctionItem = await auctionContract.auctionsMap(tokenId);
    const purchaseHistory = await auctionContract.getPurchaseHistory(tokenId);
    const auctionExists = await auctionContract.auctionExists(tokenId);

    const price = ethers.utils.formatEther(auctionItem.price);
    return { auctionExists, ownerOf, price, purchaseHistory, ...metaData };
  };

  return useSWR(`item/${tokenId}`, fetcher);
};
