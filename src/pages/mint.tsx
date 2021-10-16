import type { NextPage } from 'next';
import { useWeb3React } from '@web3-react/core';
import { useForm } from 'react-hook-form';
import Layout from '@/components/Layout/Layout';
import Message from '@/components/Message/Message';

const Home: NextPage = () => {
  const { active } = useWeb3React();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <Layout metaTitle="Welcome to NFT-platform" metaDescription="Get your next NFT here!">
      {!active && <Message message="Please connect your wallet for the best experience" />}
      {active && (
        <section>
          <h1>Mint your own NFT using our contract!</h1>
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <input defaultValue="test" {...register('example')} type="text" />
            <input type="submit" />
          </form>
        </section>
      )}
    </Layout>
  );
};

export default Home;
