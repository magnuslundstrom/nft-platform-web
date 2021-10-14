import type { AppProps } from 'next/app';
import Web3Provider from '@/contexts/Web3Provider';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <Component {...pageProps} />
    </Web3Provider>
  );
}
export default MyApp;
