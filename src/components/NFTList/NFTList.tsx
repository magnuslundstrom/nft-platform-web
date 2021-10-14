import { useMemo } from 'react';
import { Wrapper } from './NFTList.styles';
import NFTItem from '@/components/NFTItem/NFTItem';

interface Props {
  list: NFTT[];
}

const NFTList: React.FC<Props> = ({ list }) => {
  const map = list.map((nft) => <NFTItem item={nft} />);

  return <Wrapper>{map}</Wrapper>;
};

export default NFTList;
