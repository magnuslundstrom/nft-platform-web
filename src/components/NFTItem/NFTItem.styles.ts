import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
  ${tw`shadow-md flex flex-col text-center`};
`;

export const ContentWrapper = styled.div`
  ${tw`p-10 bg-gray-800 rounded-md`}

  p {
    ${tw`text-2xl font-semibold`}
  }
`;

export const Button = styled.a`
  ${tw`bg-indigo-600 rounded-md px-6 py-2 text-base mt-8 inline-block hover:bg-indigo-700 cursor-pointer`}
`;
