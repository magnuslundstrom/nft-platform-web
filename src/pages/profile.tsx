import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import Layout from '@/components/Layout/Layout';
import NFTList from '@/components/NFTList/NFTList';
import { mintNftAddress } from '@/constants/contracts/mintNFT/address';
import abi from '@/constants/contracts/mintNFT/abi.json';

const Profile: NextPage = () => {
  const { account, library } = useWeb3React();
  const [nfts, setNfts] = useState<NFTT[]>([]);

  useEffect(() => {
    if (account) {
      const signer = library.getSigner(account);
      const contract = new ethers.Contract(mintNftAddress, abi, signer);
      contract.functions.ownedNfts(account).then((_data) => {
        const data = _data[0];
        const tokens = data.map((token: any) => ({
          tokenURI: token.tokenURI,
          tokenId: token.tokenId.toNumber(),
        }));
        setNfts(tokens);
      });
    }
  }, [account, library]);

  return (
    <Layout metaTitle="View your profile" metaDescription="View your profile's NFTs!">
      <section>
        <h1>Welcome to your collection: {account}</h1>
        <NFTList list={nfts} />
      </section>
    </Layout>
  );
};

export default Profile;
