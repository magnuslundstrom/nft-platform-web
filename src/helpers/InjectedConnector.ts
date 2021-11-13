import { InjectedConnector as Web3InjectedConnector } from '@web3-react/injected-connector';
import { chains } from '@/constants/chains';

const TARGET_ENV = process.env.TARGET_ENV ?? 'dev';

export const InjectedConnector = new Web3InjectedConnector({
  supportedChainIds: chains[TARGET_ENV],
});
