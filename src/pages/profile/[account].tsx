import { useState, useEffect, useCallback } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Typography, Switch, Box, Snackbar } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import Layout from '@/components/Layout/Layout';
import NFTList from '@/components/NFTList/NFTList';
import { useContract } from '@/hooks/useContract';

const Profile: NextPage = () => {
  const router = useRouter();
  const { account: _account } = router.query;
  const { library } = useWeb3React();
  const [isApproved, setIsApproved] = useState(false);
  const { mintContract } = useContract();
  const [displaySnackbar, setDisplaySnackbar] = useState(false);
  const [disable, setDisable] = useState(true);
  const [nfts, setNfts] = useState<NFTT[]>([]);
  const [done, setDone] = useState(false);

  const account = _account as string;

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
    setDisable(true);
    if (account && mintContract) {
      mintContract.isApprovedForAll(account).then((res) => {
        setIsApproved(res as boolean);
        setDisable(false);
      });
    }
  }, [account, mintContract]);

  const handleOnApprove = useCallback(
    (state: boolean) => {
      setIsApproved(state);
      setDisable(true);
      setTimeout(async () => {
        await mintContract.approveAuctionContract(state).then(() => {
          const cb = () => {
            setDisplaySnackbar(true);
            setDisable(false);
          };
          mintContract.listenForApprovalsOnce(cb);
        });
      }, 300);
    },
    [mintContract],
  );

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
          <Switch
            disabled={disable}
            checked={isApproved}
            onChange={() => handleOnApprove(!isApproved)}
          />
        </Box>
        <NFTList list={nfts} />
      </section>
      <Snackbar
        open={displaySnackbar}
        autoHideDuration={6000}
        onClose={() => setDisplaySnackbar(false)}
        message={`You successfully ${
          isApproved ? 'approved' : 'disapproved'
        } our Auction Contract to handle your NFT's`}
      />
    </Layout>
  );
};

export default Profile;
