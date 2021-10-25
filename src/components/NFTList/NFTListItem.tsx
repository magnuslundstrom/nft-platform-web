import { useState } from 'react';
import useSwr from 'swr';
import { fetchGenericJson } from '@/helpers/fetchers/fetchGenericJson';
import {
  Wrapper,
  ContentWrapper,
  Button,
  Image,
  ImageWrapper,
  ErrorMessage,
} from './NFTListItem.styles';

interface Props {
  item: NFTT;
  contract: string;
}

const NFTListItem: React.FC<Props> = ({ item, contract }) => {
  const [loadError, setLoadError] = useState(false);
  const { data: _data } = useSwr<TokenURIDataT[]>(
    item.tokenURI,
    fetchGenericJson,
  );
  const data = _data ? _data[0] : ({} as any);

  return (
    <Wrapper>
      <ImageWrapper>
        {!loadError && !data.image && <ErrorMessage>Loading</ErrorMessage>}
        {data?.image && (
          <>
            {loadError && <ErrorMessage>Invalid image</ErrorMessage>}

            <Image
              src={data?.image}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              onError={() => setLoadError(true)}
            />
          </>
        )}
      </ImageWrapper>
      <ContentWrapper>
        <p>{data?.name || 'No name provided'}</p>
        <Button>
          <a href={`/item/${contract}/${item.tokenId}`}>See more</a>
        </Button>
      </ContentWrapper>
    </Wrapper>
  );
};

export default NFTListItem;
