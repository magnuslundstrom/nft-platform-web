import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';

export const useWeb3 = () => {
  const {
    library: _library,
    activate,
    active,
    account,
    deactivate,
    chainId,
  } = useWeb3React();

  const library = useMemo(() => _library, [_library]);
  const signer = useMemo(() => library?.getSigner(account), [account, library]);

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
