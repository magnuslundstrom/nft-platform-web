import type { NextPage } from 'next';
import { useWeb3React } from '@web3-react/core';
import { useForm } from 'react-hook-form';
import { Typography, TextField, Container, Box, Button } from '@mui/material';
import Layout from '@/components/Layout/Layout';

const Home: NextPage = () => {
  const { active } = useWeb3React();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Layout
      metaTitle="Welcome to NFT-platform"
      metaDescription="Get your next NFT here!"
    >
      {!active && (
        <Box component="section">
          <Typography component="h1" variant="h3" sx={{ marginBottom: 3 }}>
            Make us aware of your contract
          </Typography>

          <Container
            maxWidth="sm"
            sx={{
              backgroundColor: 'background.paper',
              padding: 4,
              borderRadius: 2,
              marginLeft: 0,
            }}
          >
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              <TextField
                label="Contract address"
                id="contract"
                variant="standard"
                defaultValue="james"
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ marginBottom: 3 }}
                error={'contract_address' in errors}
                helperText="This is required"
                {...register('contract_address', {
                  required: true,
                })}
              />
              <TextField
                label="Collection name"
                id="contract"
                variant="standard"
                defaultValue="james"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={'collection_name' in errors}
                helperText="This is required"
                {...register('collection_name', {
                  required: true,
                })}
              />
              <Button variant="contained" sx={{ marginTop: 3 }} type="submit">
                Submit
              </Button>
            </form>
          </Container>
        </Box>
      )}
    </Layout>
  );
};

export default Home;
