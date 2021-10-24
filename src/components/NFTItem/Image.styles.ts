import NextImage from 'next/image';
import styled from 'styled-components';
import tw from 'twin.macro';

export const ImageContainer = styled.div`
  ${tw`relative w-full h-96 shadow-lg`};
`;

export const Image = styled(NextImage)`
  ${tw`shadow-lg`}
`;

export const HeaderWrapper = styled.div`
  ${tw`p-4 flex justify-between items-center`}
`;
export const Title = styled.h1`
  ${tw`text-2xl`}
`;

export const ImageWrapper = styled.div`
  ${tw`bg-gray-800 rounded-md`}
`;

export const ContentWrapper = styled.div`
  ${tw`p-4`}
`;
