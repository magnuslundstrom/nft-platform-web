import { ethers } from 'ethers';
import { currentMintContract } from '@/constants/contracts';
import { NFTType } from '@/components/NFTList/NFTList';

const price = ethers.BigNumber.from('1000000000000000000');

export const mockNft: NFTType = {
  tokenId: 1,
  tokenURI: 'https://nft.josefinegade.com/metadata-4.json',
  NFTContractAddress: currentMintContract.address,
  price,
};
