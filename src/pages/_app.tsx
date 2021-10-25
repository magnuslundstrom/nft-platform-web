import type { AppProps } from 'next/app';
import Web3Provider from '@/contexts/Web3';
import ThemeProvider from '@/contexts/Theme';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </ThemeProvider>
  );
}
export default MyApp;
