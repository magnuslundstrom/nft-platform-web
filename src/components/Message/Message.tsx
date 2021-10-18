import { Wrapper } from './Message.styles';

interface Props {
  message: string;
}

const Message: React.FC<Props> = ({ message }) => (
  <Wrapper>
    <p>{message}</p>
  </Wrapper>
);

export default Message;
