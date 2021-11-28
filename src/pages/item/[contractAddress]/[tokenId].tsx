import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import Image from 'next/image';
import NextLink from 'next/link';
import { Box, Typography, Grid, Button } from '@mui/material';
import { currentAuctionContract } from '@/constants/contracts';
import { useWeb3 } from '@/hooks/useWeb3';
import { useContract } from '@/hooks/useContract';
import { useFetchNftItem } from '@/hooks/fetchers/useFetchNftItem';
import Dialog from '@/components/Generics/Dialog';
import Layout from '@/components/Layout/Layout';
import Attributes from '@/components/NFTItem/Attributes';

const NFTItemPage: NextPage = () => {
  const router = useRouter();
  const { account, library } = useWeb3();
  const [open, setOpen] = useState(false);
  const { auctionContract } = useContract();
  const { contractAddress: _contractAddress, tokenId: _tokenId } = router.query;

  // const balance = library?.getBalance(account).then((res) => console.log(res));
  // console.log(balance);

  const contractAddress = _contractAddress as string;
  const tokenId = _tokenId as string;

  const { data } = useFetchNftItem(tokenId);

  const handleClose = () => setOpen(false);

  const handlePurchase = () => {
    // check account balance

    auctionContract.buyNFT(tokenId, data.price);
  };

  useEffect(() => {
    if (library) {
      const test = async (cAddress: string, abi: any) => {
        const iFace = new ethers.utils.Interface(abi);
        const logs = await library.getLogs({
          address: cAddress,
        });
        console.log(logs);
        console.log(iFace);
        // const decodedEvents = logs.map(
        //   (log: any) =>
        //     iFace.decodeEventLog(
        //       'NFTBuy(uint256,address,address,uint256,uint256,uint256)',
        //       logs[0].data,
        //     ),
        //   // eslint-disable-next-line function-paren-newline
        // );
        //   const u = [
        //     `event NFTBuy(uint256 indexed refTokenId, address indexed refBuyer, address indexed refSeller, uint256 tokenId, uint256 price, uint256 timeStamp
        // )`,
        //   ];
        //   const i = new ethers.utils.Interface(u);
        //   console.log(i.parseLog(logs[0]));

        // const event = iFace.parseLog(
        //   'NFTBuy(uint256,address,address,uint256,uint256,uint256)',
        //   logs[0],
        // );
        // console.log(event);
        // return decodedEvents.map((purchase: any, idx) => (
        //   <div key={idx}>hi</div>
        // ));
      };
      console.log(
        test(currentAuctionContract.address, currentAuctionContract.abi),
      );
    }
  }, [library]);

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
            <Grid item xs={4}>
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
                <Typography component="h3" variant="h5">
                  From the collection: ...
                </Typography>
                <Typography variant="subtitle1">{data.description}</Typography>
              </Box>
              <Attributes attributes={data.attributes} />
              {data.ownerOf === account && (
                <NextLink href={`/list/${contractAddress}/${tokenId}`} passHref>
                  <Button variant="contained" sx={{ marginTop: 3 }}>
                    List NFT
                  </Button>
                </NextLink>
              )}

              {data.price !== '0.0' && (
                <>
                  <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                    Price: {data.price}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ marginTop: 2 }}
                    onClick={() => setOpen(true)}
                  >
                    Buy now
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
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
