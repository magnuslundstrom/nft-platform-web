import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import Layout from '@/components/Layout/Layout';
import { useAuctionedNfts } from '@/hooks/fetchers/useAuctionedNfts';
import NFTList from '@/components/NFTList/NFTList';

const Marketplace: NextPage = () => {
  const { data } = useAuctionedNfts();

  return (
    <Layout
      metaTitle="View your profile"
      metaDescription="View your profile's NFTs!"
    >
      <Typography component="h1" variant="h3" sx={{ marginBottom: 2 }}>
        Marketplace
      </Typography>
      <Typography sx={{ marginBottom: 3 }}>
        See what's for sale and shop!
      </Typography>
      {data && <NFTList list={data} />}
    </Layout>
  );
};

export default Marketplace;
