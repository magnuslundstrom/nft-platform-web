import { useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useWeb3 } from '@/hooks/useWeb3';
import { forSaleSchema } from '@/helpers/schemas/forSaleSchema';
import { useContract } from '@/hooks/useContract';

interface PropsT {
  tokenId: string;
}

interface PutForSaleInputsT {
  price: number;
}

const SellNftForm: React.FC<PropsT> = ({ tokenId }) => {
  const { auctionContract, mintContract } = useContract();
  const { account } = useWeb3();

  useEffect(() => {
    if (account) {
      mintContract.isApprovedForAll(account).then((res) => console.log(res));
    }
  }, [account, mintContract]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forSaleSchema) });

  const onSubmitHandler: SubmitHandler<PutForSaleInputsT> = ({ price }) => {
    auctionContract
      .createAuction(price, tokenId)
      .then(() => console.log('done'));
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
