import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { currentContracts } from '@/constants/contracts';
import Layout from '@/components/Layout/Layout';
import NFTList from '@/components/NFTList/NFTList';

export type StateT = {
  contractAddress: string;
  nfts: NFTT[];
};

const Profile: NextPage = () => {
  const { account, library } = useWeb3React();
  const { mint } = currentContracts;

  const [nfts, setNfts] = useState<StateT[]>([]);
  useEffect(() => {
    if (account) {
      const signer = library.getSigner(account);
      const metaContract = new ethers.Contract(mint.address, mint.abi, signer);

      metaContract.functions.getOwnedNfts(account).then((_data) => {
        const realData = _data[0];
        const tokens = realData.map((token: any) => ({
          tokenURI: token.tokenURI,
          tokenId: token.tokenId.toNumber(),
        }));
        const obj = {
          contractAddress: mint.address,
          nfts: tokens,
        };
        setNfts([obj]);
      });
    }
  }, [account, library, mint.abi, mint.address]);

  return (
    <Layout
      metaTitle="View your profile"
      metaDescription="View your profile's NFTs!"
    >
      <section>
        <Typography component="h1" variant="h3" sx={{ marginBottom: 3 }}>
          Welcome to your collection
        </Typography>
        <NFTList list={nfts} />
      </section>
    </Layout>
  );
};

export default Profile;
