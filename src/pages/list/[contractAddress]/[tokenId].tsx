import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { useWeb3 } from '@/hooks/useWeb3';
import Layout from '@/components/Layout/Layout';
import SellArea from '@/components/Forms/SellNftForm';

const ListNFTPage: NextPage = () => {
  const { active } = useWeb3();
  const router = useRouter();
  const { tokenId } = router.query;

  return (
    <Layout
      metaTitle="Welcome to NFT-platform"
      metaDescription="Get your next NFT here!"
    >
      <section>
        {active && (
          <div>
            <Typography component="h1" variant="h3" sx={{ marginBottom: 3 }}>
              List your NFT: {tokenId}
            </Typography>

            <Typography variant="subtitle2">
              In order for our Auction smart contract to be able to transfer
              your NFT you must first allow it to do so.
            </Typography>
            <SellArea tokenId={tokenId as string} />
          </div>
        )}
      </section>
    </Layout>
  );
};

export default ListNFTPage;
