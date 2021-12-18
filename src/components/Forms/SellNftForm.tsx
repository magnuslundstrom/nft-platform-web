import { useCallback } from 'react';
import { Button, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forSaleSchema } from '@/helpers/schemas/forSaleSchema';
import { useContract } from '@/hooks/useContract';
import { useFeedback } from '@/hooks/useFeedback';

interface PropsT {
  tokenId: string;
  mutate: () => unknown;
}

interface PutForSaleInputsT {
  price: number;
}

const SellNftForm: React.FC<PropsT> = ({ tokenId, mutate }) => {
  const { auctionContract } = useContract();
  const { flow } = useFeedback(mutate);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forSaleSchema), mode: 'onBlur' });

  const onSubmitHandler: SubmitHandler<PutForSaleInputsT> = useCallback(
    ({ price }) => {
      const { createAuction, listenForCreateAuctionOnce } = auctionContract;
      const method = createAuction.bind(auctionContract, price, tokenId);
      const listener = listenForCreateAuctionOnce.bind(
        auctionContract,
        tokenId,
      );
      const success = 'You successfully put your NFT up for auction!';
      flow({ method, listener, success });
    },
    [auctionContract, flow, tokenId],
  );

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
