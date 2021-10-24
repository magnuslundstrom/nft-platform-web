import {
  ImageContainer,
  Title,
  ImageWrapper,
  Image,
  HeaderWrapper,
  ContentWrapper,
} from './Image.styles';

import Attributes from './Attributes';

interface Props {
  item: TokenURIDataT;
}

const NFTItem: React.FC<Props> = ({ item }) => {
  const { description, image, name, attributes } = item;
  return (
    <ImageWrapper>
      <HeaderWrapper>
        <Title>{name}</Title>
        <p>Likes: 0</p>
      </HeaderWrapper>
      <ImageContainer>
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          objectPosition="left top"
        />
      </ImageContainer>
      <ContentWrapper>
        <h3>{description}</h3>
        <Attributes attributes={attributes} />
      </ContentWrapper>
    </ImageWrapper>
  );
};

export default NFTItem;
