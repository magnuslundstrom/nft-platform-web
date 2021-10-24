import Link from 'next/link';
import type { NextPage } from 'next';
import { useWeb3React } from '@web3-react/core';
import { useForm } from 'react-hook-form';
import Layout from '@/components/Layout/Layout';
import Message from '@/components/Message/Message';

const Home: NextPage = () => {
  const { active } = useWeb3React();
  const { register, handleSubmit } = useForm();

  return (
    <Layout
      metaTitle="Welcome to NFT-platform"
      metaDescription="Get your next NFT here!"
    >
      {!active && (
        <Message message="Please connect your wallet for the best experience" />
      )}
      {active && (
        <section>
          <h1>Mint your own NFT using our contract!</h1>
          <p>
            Please keep in mind that you will be using our contract when you
            mint an NFT here. If you already have your own contract, feel free
            to register it here, so you can be shown in the Marketplace. However
            you need to make sure you meta-data aligns with the way we fetch and
            display data. you can read more about that on{' '}
            <Link href="/register-contract">here</Link>.
          </p>
          <form onSubmit={handleSubmit((data) => data)}>
            <input defaultValue="test" {...register('example')} type="text" />
            <input type="submit" />
          </form>
        </section>
      )}
    </Layout>
  );
};

export default Home;
