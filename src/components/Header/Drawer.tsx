import {
  Drawer as MuiDrawer,
  Box,
  List,
  ListItem,
  Divider,
} from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode[];
  message?: string;
}

const Drawer: React.FC<Props> = ({ children, open, onClose, message }) => (
  <MuiDrawer anchor="right" open={open} onClose={onClose}>
    <Box sx={{ width: 250 }}>
      <List>
        {children.map((link, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <ListItem key={idx}>{link}</ListItem>
        ))}
      </List>

      {message && (
        <>
          <Divider sx={{ borderColor: 'text.primary' }} />
          <List>
            <ListItem>{message}</ListItem>
          </List>
        </>
      )}
    </Box>
  </MuiDrawer>
);

export default Drawer;
