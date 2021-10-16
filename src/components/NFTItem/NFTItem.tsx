import { useState } from 'react';
import useSwr from 'swr';
import { Wrapper, ContentWrapper, Button, Image, ImageWrapper, ErrorMessage } from './NFTItem.styles';

interface Props {
  item: NFTT;
}

const NFTItem: React.FC<Props> = ({ item }) => {
  const [loadError, setLoadError] = useState(false);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: _data, error } = useSwr<TokenURIDataT[]>(item.tokenURI, fetcher);
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
          <a href={`/item/contract/${item.tokenId}`}>See more</a>
        </Button>
      </ContentWrapper>
    </Wrapper>
  );
};

export default NFTItem;
