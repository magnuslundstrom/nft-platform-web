import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ethers } from 'ethers';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Skeleton,
  Box,
} from '@mui/material';
import { BsArrowRightShort } from 'react-icons/bs';
import useSwr from 'swr';
import { fetchGenericJson } from '@/helpers/fetchers/fetchGenericJson';
import { currentContracts } from '@/constants/contracts';
import { NFTType } from './NFTList';

const { mint } = currentContracts;

interface Props {
  item: NFTType;
}

const HEIGHT = 300;

const NFTListItem: React.FC<Props> = ({ item }) => {
  const [loadError, setLoadError] = useState(false);

  const { data } = useSwr<TokenURIDataT>(item.tokenURI, fetchGenericJson);

  const renderImage = useMemo(() => {
    if (!loadError && !data?.image) {
      return <Skeleton height={HEIGHT} variant="rectangular" />;
    }
    if (data?.image && loadError) {
      return (
        <Box
          sx={{
            backgroundColor: 'grey.600',
            height: HEIGHT,
            width: '100%',
          }}
        />
      );
    }
    return (
      <Box sx={{ position: 'relative', height: HEIGHT }}>
        {data?.image && (
          <>
            <Image
              src={data?.image}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              onError={() => setLoadError(true)}
            />
          </>
        )}
      </Box>
    );
  }, [data?.image, loadError]);

  return (
    <Card raised>
      {renderImage}
      <CardContent sx={{ backgroundColor: 'background.paper' }}>
        <Typography component="h3" variant="h4">
          {data?.name || 'No name provided'}
        </Typography>
        <Link passHref href={`/item/${mint.address}/${item.tokenId}`}>
          <Button
            component="button"
            variant="contained"
            sx={{ marginTop: 2 }}
            endIcon={<BsArrowRightShort />}
          >
            {item.price ? 'Buy now' : 'See more'}
          </Button>
        </Link>
        {item.price && (
          <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
            PRICE: {ethers.utils.formatEther(item?.price ?? 0)} ETH
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default NFTListItem;
