import { useWeb3React } from '@web3-react/core';

export const useWeb3 = () => {
  const { library, activate, active, account, deactivate, chainId } =
    useWeb3React();

  const signer = library?.getSigner(account);

  return {
    account,
    activate,
    active,
    chainId,
    deactivate,
    library,
    signer,
  };
};
