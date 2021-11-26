import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import Layout from '@/components/Layout/Layout';

const Home: NextPage = () => (
  <Layout
    metaTitle="Welcome to NFT-platform"
    metaDescription="Get your next NFT here!"
  >
    <section>
      <Typography variant="h3" component="h1" sx={{ marginBottom: 3 }}>
        Latest minted Nft's
      </Typography>
      <Typography variant="subtitle1">Coming soon - Stay tuned!</Typography>
    </section>
  </Layout>
);

export default Home;
