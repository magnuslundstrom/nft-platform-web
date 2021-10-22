import { ImageContainer, Title, ImageWrapper, Image } from './Image.styles';

interface Props {
  item: TokenURIDataT;
}

const NFTItem: React.FC<Props> = ({ item }) => {
  const { description, image, name } = item;
  return (
    <ImageWrapper>
      <Title>{name}</Title>
      <ImageContainer>
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          objectPosition="left top"
        />
      </ImageContainer>
      <p>{description}</p>
    </ImageWrapper>
  );
};

export default NFTItem;
