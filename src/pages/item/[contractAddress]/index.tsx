import type { NextPage } from 'next';
import { useWeb3React } from '@web3-react/core';
import Layout from '@/components/Layout/Layout';
import Message from '@/components/Message/Message';

const Home: NextPage = () => {
  const { active } = useWeb3React();

  return (
    <Layout
      metaTitle="Welcome to NFT-platform"
      metaDescription="Get your next NFT here!"
    >
      {!active && (
        <Message message="Please connect your wallet for the best experience" />
      )}
      <section>
        <h1>Latest minted Nft'sss</h1>
      </section>
    </Layout>
  );
};

export default Home;
