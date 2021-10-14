import type { NextPage } from 'next';
import { useWeb3React } from '@web3-react/core';
import Layout from '@/components/Layout/Layout';
import Message from '@/components/Message/Message';
import NFTList from '@/components/NFTList/NFTList';
import { nftList } from '@/mockData/nftList';

const Profile: NextPage = () => {
  const { account } = useWeb3React();

  return (
    <Layout metaTitle="View your profile" metaDescription="View your profile's NFTs!">
      <section>
        <h1>Welcome to your collection: {account}</h1>
        <NFTList list={nftList} />
      </section>
    </Layout>
  );
};

export default Profile;
