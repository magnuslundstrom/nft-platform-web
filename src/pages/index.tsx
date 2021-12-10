import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import Layout from '@/components/Layout/Layout';
import { useFetchAuctionedNfts } from '@/hooks/fetchers/useFetchAuctionedNfts';
import NFTList from '@/components/NFTList/NFTList';

const Marketplace: NextPage = () => {
  const { data } = useFetchAuctionedNfts();

  return (
    <Layout
      metaTitle="View your profile"
      metaDescription="View your profile's NFTs!"
      loading={!data}
    >
      <Typography component="h1" variant="h3" sx={{ marginBottom: 2 }}>
        Marketplace
      </Typography>
      {data && (
        <NFTList
          list={data}
          emptyListMessage="Nothing for sale at the moment"
        />
      )}
    </Layout>
  );
};

export default Marketplace;
