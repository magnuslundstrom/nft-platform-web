import { Wrapper } from './NFTList.styles';
import NFTItem from '@/components/NFTItem/NFTItem';
import { State } from '@/pages/profile';

interface Props {
  list: State[];
}

const NFTList: React.FC<Props> = ({ list }) => {
  const items: any[] = [];
  list.forEach((item) => {
    const n = item.nfts.map((i) => (
      <NFTItem
        contract={item.contractAddress}
        item={i}
        key={item.contractAddress}
      />
    ));
    items.push(n);
  });

  return <Wrapper>{items}</Wrapper>;
};

export default NFTList;
