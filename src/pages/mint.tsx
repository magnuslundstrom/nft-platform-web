import { useCallback } from 'react';
import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, TextField, Container, Box, Button } from '@mui/material';
import { mintNftSchema } from '@/helpers/schemas/mintNftSchema';
import { useWeb3 } from '@/hooks/useWeb3';
import { useContract } from '@/hooks/useContract';
import { useFetchMintNft } from '@/hooks/fetchers/useFetchMintNft';
import { useFeedback } from '@/hooks/useFeedback';
import Layout from '@/components/Layout/Layout';

const Home: NextPage = () => {
  const { active, account: _account } = useWeb3();
  const { mintContract } = useContract();
  const { data } = useFetchMintNft();
  const account = _account as string;
  const { flow } = useFeedback();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(mintNftSchema), mode: 'onBlur' });

  const onSubmit = useCallback(
    () =>
      handleSubmit((formData) => {
        const { mintNft, listenForTransferOnce } = mintContract;
        const method = mintNft.bind(mintContract, account, formData.tokenURI);

        const listener = listenForTransferOnce.bind(mintContract, account);
        const success = 'You successfully minted a new NFT. Congrats!';

        flow({ method, listener, success });
      }),
    [account, flow, handleSubmit, mintContract],
  );

  return (
    <Layout
      metaTitle="Mint your own NFT here!"
      metaDescription="Create and publish your own NFT right here!"
    >
      {active && (
        <Box component="section">
          <Typography component="h1" variant="h3" sx={{ marginBottom: 2 }}>
            Release your own art in our collection
          </Typography>
          <Typography component="p" variant="subtitle1">
            It is important that you follow a certain standard in your tokenURI
            JSON file. Please see:{' '}
            <a
              href="http://nft.josefinegade.com/metadata-3.json"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'inherit' }}
            >
              this file for inspiration
            </a>
            .{' '}
          </Typography>
          <Typography sx={{ marginBottom: 3 }} variant="subtitle1">
            Whenever you are submitting the NFT you will receive it yourself.
            You can then list it in our auction, if that is what you desire.
          </Typography>

          <Container
            maxWidth="sm"
            sx={{
              backgroundColor: 'background.paper',
              padding: 4,
              borderRadius: 2,
              marginLeft: 0,
              border: '1px solid',
              borderColor: 'gray',
            }}
          >
            <form onSubmit={onSubmit()}>
              <TextField
                defaultValue={data?.address}
                InputLabelProps={{ shrink: true }}
                sx={{ marginBottom: 3 }}
                label="Contract address"
                id="contract_address"
                variant="standard"
                helperText="Our contract address"
                disabled
                fullWidth
              />
              <TextField
                defaultValue={data?.name}
                InputLabelProps={{ shrink: true }}
                sx={{ marginBottom: 3 }}
                label="Collection name"
                id="collect_name"
                variant="standard"
                helperText="Our collection name"
                fullWidth
                disabled
              />
              <TextField
                label="Token URI"
                id="token_uri"
                variant="standard"
                fullWidth
                InputLabelProps={{ shrink: true }}
                helperText={
                  !errors.tokenURI
                    ? 'Please follow conventions described above'
                    : errors.tokenURI.message
                }
                {...register('tokenURI')}
                error={!!errors.tokenURI}
              />
              <Button variant="contained" sx={{ marginTop: 3 }} type="submit">
                Submit NFT
              </Button>
            </form>
          </Container>
        </Box>
      )}
    </Layout>
  );
};

export default Home;
