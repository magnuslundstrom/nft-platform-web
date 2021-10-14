import { InjectedConnector as Web3InjectedConnector } from '@web3-react/injected-connector';

export const InjectedConnector = new Web3InjectedConnector({
  supportedChainIds: [3],
});
