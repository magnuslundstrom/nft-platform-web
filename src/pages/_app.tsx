import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import Web3Provider from '@/contexts/Web3';
import ThemeProvider from '@/contexts/Theme';
import ContractProvider from '@/contexts/Contracts';
import { FeedbackProvider } from '@/contexts/Feedback';
import { TARGET_ENV } from '@/constants/env';

function MyApp({ Component, pageProps }: AppProps) {
  console.log(TARGET_ENV);
  return (
    <ThemeProvider>
      <CssBaseline />
      <Web3Provider>
        <FeedbackProvider>
          <ContractProvider>
            <Component {...pageProps} />
          </ContractProvider>
        </FeedbackProvider>
      </Web3Provider>
    </ThemeProvider>
  );
}
export default MyApp;
