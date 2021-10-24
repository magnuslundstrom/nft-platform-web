import { Value } from './Attributes.styles';

interface Props {
  attributes: TokenURIDataT['attributes'];
}

const Attributes: React.FC<Props> = ({ attributes }) => {
  const tags = attributes.map((attr) => (
    <p key={attr.trait_type}>
      {attr.trait_type}: <Value>{attr.value}</Value>
    </p>
  ));
  return <div>{tags}</div>;
};

export default Attributes;
