import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { MintContract } from '@/helpers/contracts/MintContract';
import Layout from '@/components/Layout/Layout';
import NFTList from '@/components/NFTList/NFTList';

const Profile: NextPage = () => {
  const { account, library } = useWeb3React();

  const [nfts, setNfts] = useState<NFTT[]>([]);
  useEffect(() => {
    if (account) {
      const signer = library.getSigner(account);
      const mintContract = new MintContract(signer);
      mintContract.getOwnedNfts(account).then((_nfts) => {
        const mappedNfts = _nfts.map(({ tokenId, tokenURI }) => ({
          tokenId: tokenId.toNumber(),
          tokenURI,
        }));
        setNfts(mappedNfts);
      });
    }
  }, [account, library]);

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
