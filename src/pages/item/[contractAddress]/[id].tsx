import styled from 'styled-components';
import tw from 'twin.macro';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import useSWR from 'swr';
import Layout from '@/components/Layout/Layout';
import NFTItemImage from '@/components/NFTItem/Image';
import { fetchTokenURI } from '@/helpers/fetchers/fetchTokenURI';

const Grid = styled.div`
  ${tw`grid`};
  grid-template-columns: 1fr 2fr;
`;

const Home: NextPage = () => {
  const router = useRouter();
  const { contractAddress, id } = router.query;
  const { data, error } = useSWR<TokenURIDataT>(
    `http://localhost:3080/smart-contract/${contractAddress}`,
    fetchTokenURI(contractAddress as string, id as string),
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
      {data && (
        <Grid>
          <NFTItemImage item={data} />
        </Grid>
      )}
    </Layout>
  );
};

export default Home;
