import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import useSWR from 'swr';
import Layout from '@/components/Layout/Layout';
import NFTItem from '@/components/NFTItem/Image';
import { fetcher } from '@/helpers/fetchers/NFTItemFetcher';

const Home: NextPage = () => {
  const router = useRouter();
  const { contractAddress, id } = router.query;
  const { data, error } = useSWR<TokenURIDataT>(
    `http://localhost:3080/smart-contract/${contractAddress}`,
    fetcher(contractAddress as string, id as string),
  );

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <Layout
      metaTitle="Welcome to NFT-platform"
      metaDescription="Get your next NFT here!"
    >
      {!data && 'loading...'}
      {data && <NFTItem item={data} />}
    </Layout>
  );
};

export default Home;
