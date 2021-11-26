import { Grid } from '@mui/material';
import NFTItem from '@/components/NFTList/NFTListItem';

export type NFTType = Partial<AuctionedNFTT> & NFTT;
interface Props {
  list: NFTType[];
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
