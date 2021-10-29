import type { NextPage } from 'next';
import { useWeb3React } from '@web3-react/core';
import { Alert, Typography } from '@mui/material';
import Layout from '@/components/Layout/Layout';

const Home: NextPage = () => {
  const { active } = useWeb3React();

  return (
    <Layout
      metaTitle="Welcome to NFT-platform"
      metaDescription="Get your next NFT here!"
    >
      {!active && (
        <Alert
          severity="warning"
          variant="outlined"
          sx={{ position: 'fixed', bottom: 30 }}
        >
          <Typography>
            Please connect your wallet for optimal experience
          </Typography>
        </Alert>
      )}
      <section>
        <Typography variant="h3" component="h1" sx={{ marginBottom: 3 }}>
          Latest minted Nft's
        </Typography>
        <Typography variant="subtitle1">Coming soon - Stay tuned!</Typography>
      </section>
    </Layout>
  );
};

export default Home;
