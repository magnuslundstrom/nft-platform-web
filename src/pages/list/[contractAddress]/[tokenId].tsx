import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { Typography, Box, Button } from '@mui/material';
import { useContract } from '@/hooks/useContract';
import { useFeedback } from '@/hooks/useFeedback';
import { useWeb3 } from '@/hooks/useWeb3';
import Layout from '@/components/Layout/Layout';
import SellNftForm from '@/components/Forms/SellNftForm';
import { useFetchListNft } from '@/hooks/fetchers/useFetchListNft';

const ListNFTPage: NextPage = () => {
  const [approved, setApproved] = useState(false);
  const { account } = useWeb3();
  const { mintContract } = useContract();
  const router = useRouter();
  const { tokenId: _tokenId } = router.query;
  const tokenId = _tokenId as string;
  const { data } = useFetchListNft(tokenId);

  const { setMessage, setBackdrop } = useFeedback();

  const isOwner = data && data?.ownerOf === account;

  useEffect(() => {
    setApproved(!!data?.isApproved);
  }, [data?.isApproved]);

  const onApproveHandler = useCallback(() => {
    mintContract
      .approveAuctionContract(tokenId)
      ?.then(() => {
        setBackdrop(true);
        mintContract.listenForApprovalOnce(tokenId, () => {
          setBackdrop(false);
          setApproved(true);
          setMessage('You successfully approved our contract!');
        });
      })
      .catch(() => {
        setBackdrop(false);
        setApproved(false);
        setMessage('Something went wrong');
      });
  }, [mintContract, setBackdrop, setMessage, tokenId]);

  return (
    <Layout
      metaTitle="Welcome to NFT-platform"
      metaDescription="Get your next NFT here!"
      loading={!data}
    >
      <Box>
        {isOwner && (
          <Box>
            <Typography component="h1" variant="h3" sx={{ marginBottom: 3 }}>
              List your NFT (token ID: {tokenId})
            </Typography>

            <Box sx={approved ? { opacity: 0.4, pointerEvents: 'none' } : {}}>
              <Typography>
                In order for our Auction smart contract to be able to transfer
                your NFT you must first allow it to do so.
              </Typography>
              <Button
                variant="contained"
                sx={{ marginTop: 2 }}
                onClick={onApproveHandler}
              >
                Approve
              </Button>
            </Box>

            <Box sx={!approved ? { opacity: 0.4, pointerEvents: 'none' } : {}}>
              <SellNftForm tokenId={tokenId as string} />
            </Box>
          </Box>
        )}
        {!isOwner && (
          <Box>
            <Typography component="h1" variant="h3" sx={{ marginBottom: 3 }}>
              Forbidden access
            </Typography>

            <Typography variant="subtitle2">
              You are not the owner of this NFT, and can therefore not list it.
            </Typography>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default ListNFTPage;
