import { Box, Typography } from '@mui/material';

const AccessDenied: React.FC = () => (
  <Box>
    <Typography component="h1" variant="h3" sx={{ marginBottom: 3 }}>
      Forbidden access
    </Typography>

    <Typography variant="subtitle2">
      You are not the owner of this NFT, and can therefore not list it.
    </Typography>
  </Box>
);

export default AccessDenied;
