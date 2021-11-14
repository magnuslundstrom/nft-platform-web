import { Grid } from '@mui/material';
import NFTItem from '@/components/NFTList/NFTListItem';

interface Props {
  list: NFTT[];
}

const NFTList: React.FC<Props> = ({ list }) => (
  <Grid container spacing={4}>
    {list.map((item) => (
      <Grid key={item.tokenId} item xs={3}>
        <NFTItem item={item} />
      </Grid>
    ))}
  </Grid>
);

export default NFTList;
