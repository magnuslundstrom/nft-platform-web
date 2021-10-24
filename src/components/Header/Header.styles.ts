import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.header`
  ${tw`bg-gray-800 shadow-md py-8 px-4`}
  a {
    ${tw`text-white`};
  }
`;

export const Inner = styled.header`
  ${tw`container mx-auto flex justify-between items-center`}
`;

export const Nav = styled.nav`
  a {
    ${tw`mr-8`}
  }
`;

export const ConnectButton = styled.button`
  ${tw`bg-indigo-600 text-white rounded-md px-6 py-2 text-base`}
`;
