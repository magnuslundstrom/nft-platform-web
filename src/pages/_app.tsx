import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import Web3Provider from '@/contexts/Web3';
import ThemeProvider from '@/contexts/Theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </ThemeProvider>
  );
}
export default MyApp;
