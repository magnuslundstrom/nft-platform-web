import { Button, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forSaleSchema } from '@/helpers/schemas/forSaleSchema';
import { useContract } from '@/hooks/useContract';
import { useFeedback } from '@/hooks/useFeedback';

interface PropsT {
  tokenId: string;
}

interface PutForSaleInputsT {
  price: number;
}

const SellNftForm: React.FC<PropsT> = ({ tokenId }) => {
  const { setBackdrop, setMessage } = useFeedback();
  const { auctionContract } = useContract();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forSaleSchema) });

  const onSubmitHandler: SubmitHandler<PutForSaleInputsT> = ({ price }) => {
    auctionContract
      .createAuction(price, tokenId)
      .then(() => {
        setBackdrop(true);
        auctionContract.listenForCreateAuctionOnce(tokenId, () => {
          setMessage('You successfully put your NFT up for auction!');
          setBackdrop(false);
        });
      })
      .catch(() => {
        setBackdrop(false);
        setMessage('Something went wrong');
      });
  };

  return (
    <form>
      <TextField
        variant="outlined"
        label="Price in ether"
        sx={{ marginTop: 3 }}
        {...register('price', { required: true })}
        error={!!errors?.price}
        helperText={errors?.price ? 'Input must be a number' : ''}
      />
      <Button
        variant="contained"
        sx={{ marginTop: 3, display: 'block' }}
        onClick={handleSubmit(onSubmitHandler)}
      >
        Put for sale
      </Button>
    </form>
  );
};

export default SellNftForm;
