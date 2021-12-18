import {
  Container,
  Alert,
  Typography,
  CircularProgress,
  Box,
  Snackbar,
  Backdrop,
} from '@mui/material';
import { useWeb3 } from '@/hooks/useWeb3';
import { useFeedback } from '@/hooks/useFeedback';
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
  const { setMessage, message, backdrop, setBackdrop } = useFeedback();
  return (
    <>
      <Head metaTitle={metaTitle} metaDescription={metaDescription} />
      <Header />
      <Container
        maxWidth="xl"
        sx={{ marginTop: 4, marginBottom: 4 }}
        component="main"
      >
        {!loading && children}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress
              size={50}
              sx={{ color: 'GrayText' }}
              data-testid="layout-content-loading-spinner"
            />
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
            data-testid="connect-wallet-alert"
          >
            <Typography>
              Please connect your wallet for optimal experience
            </Typography>
          </Alert>
        )}
        {active && (
          <Snackbar
            open={!!message}
            message={message}
            autoHideDuration={6000}
            onClose={() => setMessage('')}
          />
        )}
        {active && backdrop && (
          <Backdrop
            onClick={() => setBackdrop(false)}
            open={backdrop}
            sx={{ zIndex: 100 }}
          >
            <CircularProgress size={50} sx={{ color: 'white', zIndex: 100 }} />
          </Backdrop>
        )}
      </Container>
    </>
  );
};

export default Layout;
