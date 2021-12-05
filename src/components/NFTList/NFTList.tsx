import { Grid, Box, Typography } from '@mui/material';
import NFTItem from '@/components/NFTList/NFTListItem';

export type NFTType = Partial<AuctionedNFTT> & NFTT;
interface Props {
  list: NFTType[];
  emptyListMessage: string;
}

const NFTList: React.FC<Props> = ({ list, emptyListMessage }) => (
  <Box>
    {list.length > 0 && (
      <Grid container spacing={3}>
        {list.map((item) => (
          <Grid key={item.tokenId} item sm={6} md={3} xs="auto">
            <NFTItem item={item} />
          </Grid>
        ))}
      </Grid>
    )}
    {list.length === 0 && <Typography>{emptyListMessage}</Typography>}
  </Box>
);

export default NFTList;
