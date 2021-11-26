import {
  Container,
  Alert,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { useWeb3 } from '@/hooks/useWeb3';
import Header from '@/components/Header/Header';
import Head, { HeadPropsT } from '@/components/Head/Head';

type Props = HeadPropsT & { loading?: boolean };

const Layout: React.FC<Props> = ({
  children,
  metaTitle,
  metaDescription,
  loading,
}) => {
  const { active } = useWeb3();
  return (
    <>
      <Head metaTitle={metaTitle} metaDescription={metaDescription} />
      <Header />
      <Container maxWidth="xl" sx={{ marginTop: 4 }} component="main">
        {!loading && children}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={50} sx={{ color: 'GrayText' }} />
          </Box>
        )}

        {!active && (
          <Alert
            severity="warning"
            variant="filled"
            sx={{
              position: 'fixed',
              bottom: 30,
              background: 'background.paper',
              boxShadow: 4,
            }}
          >
            <Typography>
              Please connect your wallet for optimal experience
            </Typography>
          </Alert>
        )}
      </Container>
    </>
  );
};

export default Layout;
