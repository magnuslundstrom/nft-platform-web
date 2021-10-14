import Image from 'next/image';
import useSwr from 'swr';
import { Wrapper, ContentWrapper, Button } from './NFTItem.styles';

interface Props {
  item: NFTT;
}

const NFTItem: React.FC<Props> = ({ item }) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSwr<TokenURIDataT>(item.tokenURI, fetcher);

  return (
    <Wrapper>
      {data?.image && (
        <Image src={data?.image} height={300} width={300} objectFit="cover" objectPosition="center" />
      )}
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
