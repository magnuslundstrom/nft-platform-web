import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import Layout from '@/components/Layout/Layout';

const Profile: NextPage = () => (
  <Layout
    metaTitle="View your profile"
    metaDescription="View your profile's NFTs!"
  >
    <Typography component="h1" variant="h3" sx={{ marginBottom: 3 }}>
      Marketplace
    </Typography>
  </Layout>
);

export default Profile;
