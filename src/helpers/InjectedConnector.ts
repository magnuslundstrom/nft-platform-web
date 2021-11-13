import { InjectedConnector as Web3InjectedConnector } from '@web3-react/injected-connector';
import { currentChains } from '@/constants/chains';

export const InjectedConnector = new Web3InjectedConnector({
  supportedChainIds: currentChains,
});
