import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import Layout from '@/components/Layout/Layout';
import NFTList from '@/components/NFTList/NFTList';
import { useFetchProfile } from '@/hooks/fetchers/useFetchProfile';

const Profile: NextPage = () => {
  const router = useRouter();
  const { account: _account } = router.query;
  const { account: web3Account } = useWeb3React();

  const account = _account as string;
  const { data } = useFetchProfile(account);

  const isOwner = account === web3Account;

  return (
    <Layout
      metaTitle="View your profile"
      metaDescription="View your profile's NFTs!"
      loading={!data}
    >
      <section>
        <Typography component="h1" variant="h3" sx={{ marginBottom: 3 }}>
          {isOwner
            ? 'Welcome to your collection'
            : `Collection of user ${account}`}
        </Typography>

        <NFTList
          list={data?.ownedNfts ?? []}
          emptyListMessage="No NFT's collected"
        />
      </section>
    </Layout>
  );
};

export default Profile;
