import { Button, TextField } from '@mui/material';
// import { useForm } from 'react-hook-form';

interface Props {
  forSale?: boolean;
}

const SellArea: React.FC<Props> = ({ forSale }) => (
  //   const { register, handleSubmit } = useForm();

  <div>
    {!forSale && (
      <>
        <TextField
          variant="outlined"
          label="Price in ether"
          sx={{ marginTop: 3 }}
        />
        <Button variant="contained" sx={{ marginTop: 3, display: 'block' }}>
          Put for sale
        </Button>
      </>
    )}
  </div>
);

export default SellArea;
