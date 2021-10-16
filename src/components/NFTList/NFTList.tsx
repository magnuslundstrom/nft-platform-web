import { useMemo } from 'react';
import { Wrapper } from './NFTList.styles';
import NFTItem from '@/components/NFTItem/NFTItem';

interface Props {
  contract: string;
  list: NFTT[];
}

const NFTList: React.FC<Props> = ({ list, contract }) => {
  const map = list.map((nft) => <NFTItem item={nft} contract={contract} />);

  return <Wrapper>{map}</Wrapper>;
};

export default NFTList;
