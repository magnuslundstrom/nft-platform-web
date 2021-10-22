import styled from 'styled-components';
import tw from 'twin.macro';
import NextImage from 'next/image';

export const Wrapper = styled.div`
  ${tw`shadow-md flex flex-col text-center`};
`;

export const Image = styled(NextImage)`
  ${tw`rounded-tl-md rounded-tr-md`};
`;

export const ContentWrapper = styled.div`
  ${tw`p-6 bg-gray-800 rounded-bl-md rounded-br-md`}

  p {
    ${tw`text-2xl font-semibold`}
  }
`;

export const Button = styled.a`
  ${tw`bg-indigo-600 rounded-md px-6 py-2 text-base mt-8 inline-block hover:bg-indigo-700 cursor-pointer`};
  a {
    ${tw`text-white`}
  }
`;

export const ImageWrapper = styled.div`
  ${tw`relative w-full h-60 bg-gradient-to-r from-gray-400 bg-gray-700 rounded-tl-md rounded-tr-md`}
`;

export const ErrorMessage = styled.p`
  ${tw`absolute z-10 top-1/2 left-1/2`};
  transform: translateX(-50%); ;
`;
