import { useCallback, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import NextLink from 'next/link';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useWeb3 } from '@/hooks/useWeb3';
import { useContract } from '@/hooks/useContract';
import { useFeedback } from '@/hooks/useFeedback';
import { useFetchNftItem } from '@/hooks/fetchers/useFetchNftItem';
import Dialog from '@/components/Generics/Dialog';
import Layout from '@/components/Layout/Layout';
import Attributes from '@/components/NFTItem/Attributes';
import PurchaseHistory from '@/components/NFTItem/PurchaseHistory';
import Link from '@/components/Generics/Link';

const NFTItemPage: NextPage = () => {
  const router = useRouter();
  const { account } = useWeb3();
  const [open, setOpen] = useState(false);
  const { auctionContract } = useContract();
  const { contractAddress: _contractAddress, tokenId: _tokenId } = router.query;

  const contractAddress = _contractAddress as string;
  const tokenId = _tokenId as string;

  const { data, mutate } = useFetchNftItem(tokenId);
  const { flow } = useFeedback(mutate);
  const handleClose = () => setOpen(false);

  const handlePurchase = useCallback(() => {
    setOpen(false);
    const { buyNFT, listenForPurchase } = auctionContract;
    const method = buyNFT.bind(auctionContract, tokenId, data?.price);
    const listener = listenForPurchase.bind(auctionContract, tokenId);
    const success =
      'Congratulations, you successfully purchased the selected NFT!';
    flow({ method, listener, success });
  }, [auctionContract, data?.price, flow, tokenId]);

  return (
    <Layout
      metaTitle="Welcome to NFT-platform"
      metaDescription="Get your next NFT here!"
      loading={!data}
    >
      {data && (
        <Box>
          <Typography component="h1" variant="h3" sx={{ marginBottom: 3 }}>
            {data.name}
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <Box
                sx={{
                  height: 500,
                  position: 'relative',
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <Image src={data.image} layout="fill" />
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ marginBottom: 3 }}>
                <Typography
                  component="h3"
                  variant="h5"
                  sx={{ marginBottom: 1 }}
                >
                  From the collection:{' '}
                  <Typography component="span" variant="h5">
                    {data?.collectionName}
                  </Typography>
                </Typography>

                <Typography variant="subtitle2">
                  Owner:{' '}
                  <Link url={`/profile/${data?.ownerOf}`}>{data?.ownerOf}</Link>
                </Typography>
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                  {data.description}
                </Typography>
              </Box>
              <Attributes attributes={data.attributes} />
              {data.ownerOf === account && !data.auctionExists && (
                <NextLink href={`/list/${contractAddress}/${tokenId}`} passHref>
                  <Button variant="contained" sx={{ marginTop: 3 }}>
                    List NFT
                  </Button>
                </NextLink>
              )}

              {data.auctionExists && (
                <>
                  <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                    Price: {data.price} ETH
                  </Typography>
                  {account && account !== data.ownerOf && (
                    <Button
                      variant="contained"
                      sx={{ marginTop: 2 }}
                      onClick={() => setOpen(true)}
                    >
                      Buy now
                    </Button>
                  )}
                  {account && account === data.ownerOf && (
                    <NextLink
                      href={`/list/${contractAddress}/${tokenId}`}
                      passHref
                    >
                      <Button variant="contained" sx={{ marginTop: 3 }}>
                        Delist NFT
                      </Button>
                    </NextLink>
                  )}
                </>
              )}
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 3 }}>
            <Typography component="h2" variant="h4" sx={{ marginBottom: 2 }}>
              Purchase history
            </Typography>
            <PurchaseHistory tableData={data?.purchaseHistory} />
          </Box>
        </Box>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        title="Execute purchase?"
        contentText="Confirm your purchase, you will not be able to regret later."
      >
        <Box>
          <Button
            variant="outlined"
            sx={{ marginRight: 2 }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handlePurchase}>
            Confirm
          </Button>
        </Box>
      </Dialog>
    </Layout>
  );
};

export default NFTItemPage;
