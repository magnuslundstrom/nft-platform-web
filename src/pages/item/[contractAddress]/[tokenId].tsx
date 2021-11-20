import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import NextLink from 'next/link';
import useSWR from 'swr';
import { CircularProgress, Box, Typography, Grid, Button } from '@mui/material';
import Layout from '@/components/Layout/Layout';
import { fetchNftItem } from '@/helpers/fetchers/fetchNftItem';
import Attributes from '@/components/NFTItem/Attributes';
import { useContract } from '@/hooks/useContract';

const NFTItemPage: NextPage = () => {
  const { mintContract } = useContract();
  const router = useRouter();
  const { contractAddress: _contractAddress, tokenId: _tokenId } = router.query;

  const contractAddress = _contractAddress as string;
  const tokenId = _tokenId as string;

  const { data } = useSWR(tokenId, (_t) => fetchNftItem(_t, mintContract));

  return (
    <Layout
      metaTitle="Welcome to NFT-platform"
      metaDescription="Get your next NFT here!"
    >
      {!data && <CircularProgress size={50} sx={{ color: 'GrayText' }} />}
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
              <NextLink href={`/list/${contractAddress}/${tokenId}`} passHref>
                <Button variant="contained" sx={{ marginTop: 3 }}>
                  List NFT
                </Button>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      )}
    </Layout>
  );
};

export default NFTItemPage;
