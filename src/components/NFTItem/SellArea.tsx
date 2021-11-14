import { Button, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useWeb3React } from '@web3-react/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { forSaleSchema } from '@/constants/schemas/forSaleSchema';
import { AuctionContract } from '@/helpers/contracts/Auction';

interface PropsT {
  contractAddress: string;
  tokenId: string;
  forSale: boolean;
}

interface PutForSaleInputsT {
  price: number;
}

const SellArea: React.FC<PropsT> = ({ forSale, tokenId, contractAddress }) => {
  const { library, account } = useWeb3React();
  const signer = library.getSigner(account);
  const metaAuctionContract = new AuctionContract(signer);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forSaleSchema) });

  const onSubmitHandler: SubmitHandler<PutForSaleInputsT> = ({ price }) => {
    metaAuctionContract.setForSale(price, tokenId, contractAddress);
  };

  return (
    <div>
      {!forSale && (
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
      )}
      {forSale && (
        <>
          <Typography sx={{ marginTop: 3 }}>
            The NFT is currently for sale with a minPrice of...
          </Typography>
          <Button variant="contained" sx={{ marginTop: 1 }}>
            Take down for sale
          </Button>
        </>
      )}
    </div>
  );
};

export default SellArea;
