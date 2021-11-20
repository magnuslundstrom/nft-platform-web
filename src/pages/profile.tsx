import { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import { Typography, Switch, Box } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import Layout from '@/components/Layout/Layout';
import NFTList from '@/components/NFTList/NFTList';
import { useContract } from '@/hooks/useContract';

const Profile: NextPage = () => {
  const { account, library } = useWeb3React();
  const [isApproved, setIsApproved] = useState(false);
  const { mintContract } = useContract(true);

  const [nfts, setNfts] = useState<NFTT[]>([]);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (account && !done) {
      mintContract.getOwnedNfts(account).then((_nfts) => {
        const mappedNfts = _nfts.map(({ tokenId, tokenURI }) => ({
          tokenId: tokenId.toNumber(),
          tokenURI,
        }));
        setNfts(mappedNfts);
      });
      setDone(true);
    }
  }, [account, done, library, mintContract]);

  useEffect(() => {
    if (account) {
      mintContract.isApprovedForAll(account).then((res) => console.log(res));
    }
  }, [account, mintContract]);

  const handleOnApprove = useCallback(() => {
    setIsApproved(!isApproved);
    mintContract
      .approveAuctionContract(!isApproved)
      .then(() => console.log('done'));
  }, [isApproved, mintContract]);

  return (
    <Layout
      metaTitle="View your profile"
      metaDescription="View your profile's NFTs!"
    >
      <section>
        <Typography component="h1" variant="h3" sx={{ marginBottom: 3 }}>
          Welcome to your collection
        </Typography>
        <Typography>
          You must allow our contract to handle your NFT's before you can sell.
        </Typography>
        <Box sx={{ my: 2 }}>
          <Switch checked={isApproved} onChange={handleOnApprove} />
        </Box>
        <NFTList list={nfts} />
      </section>
    </Layout>
  );
};

export default Profile;
