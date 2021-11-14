import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

const { mint } = currentContracts;

interface Props {
  item: NFTT;
}

const HEIGHT = 240;

const NFTListItem: React.FC<Props> = ({ item }) => {
  const [loadError, setLoadError] = useState(false);
  const { data: _data } = useSwr<TokenURIDataT[]>(
    item.tokenURI,
    fetchGenericJson,
  );
  const data = _data ? _data[0] : ({} as any);

  const renderImage = useMemo(() => {
    if (!loadError && !data.image) {
      return <Skeleton height={HEIGHT} variant="rectangular" />;
    }
    if (data.image && loadError) {
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
  }, [data.image, loadError]);

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
            sx={{ mt: 2 }}
            endIcon={<BsArrowRightShort />}
          >
            See more
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default NFTListItem;
