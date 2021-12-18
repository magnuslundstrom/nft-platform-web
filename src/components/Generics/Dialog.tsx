import {
  Box,
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

type Props = React.ComponentProps<typeof MuiDialog> & {
  title: string;
  contentText: string;
  /** Actions */
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({
  children,
  open,
  onClose,
  title,
  contentText,
}) => (
  <MuiDialog
    open={open}
    onClose={onClose}
    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <Box>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>{children}</DialogActions>
    </Box>
  </MuiDialog>
);

export default Modal;
