import NextImage from 'next/image';
import styled from 'styled-components';
import tw from 'twin.macro';

export const ImageContainer = styled.div`
  ${tw`relative w-96 h-96`};
`;

export const Image = styled(NextImage)`
  ${tw`rounded-br-md rounded-bl-md`}
`;

export const Title = styled.h1`
  ${tw`text-2xl mb-4`}
`;

export const ImageWrapper = styled.div`
  ${tw`p-10 bg-gray-800`}
`;
