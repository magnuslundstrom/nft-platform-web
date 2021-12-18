import { Chip, Stack, Box } from '@mui/material';

interface Props {
  attributes: TokenURIDataT['attributes'];
}

const Attributes: React.FC<Props> = ({ attributes }) => {
  const tags = attributes.map((attr) => {
    const { trait_type, value } = attr;
    return (
      <Box key={trait_type}>
        <Chip variant="filled" label={`${trait_type}: ${value}`} />
      </Box>
    );
  });
  return <Stack spacing={2}>{tags}</Stack>;
};

export default Attributes;
