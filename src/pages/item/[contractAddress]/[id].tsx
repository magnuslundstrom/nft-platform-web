import type { NextPage } from 'next';
import { useWeb3React } from '@web3-react/core';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useSWR from 'swr';
import { CircularProgress, Box, Typography, Grid } from '@mui/material';
import Layout from '@/components/Layout/Layout';
import { fetchTokenURI } from '@/helpers/fetchers/fetchTokenURI';
import Attributes from '@/components/NFTItem/Attributes';

const Home: NextPage = () => {
  const { library } = useWeb3React();
  const router = useRouter();
  const { contractAddress, id } = router.query;

  const fetchKey = `${contractAddress}:${id}`;

  const fetchTokenURIOptions = {
    contractAddress: contractAddress as string,
    tokenId: id as string,
    library,
  };

  const { data } = useSWR(fetchKey, fetchTokenURI(fetchTokenURIOptions));

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
            </Grid>
          </Grid>
        </Box>
      )}
    </Layout>
  );
};

export default Home;
