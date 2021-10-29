import { Grid } from '@mui/material';
import NFTItem from '@/components/NFTList/NFTListItem';
import { StateT } from '@/pages/profile';

interface Props {
  list: StateT[];
}

const NFTList: React.FC<Props> = ({ list }) => {
  const items: any[] = [];
  list.forEach((item) => {
    const n = item.nfts.map((i) => (
      <Grid key={item.contractAddress} item xs={3}>
        {/* This should get tokenId from somewhere v */}
        <NFTItem contract={item.contractAddress} item={i} />
      </Grid>
    ));
    items.push(n);
  });

  return (
    <Grid container spacing={4}>
      {items}
    </Grid>
  );
};

export default NFTList;
