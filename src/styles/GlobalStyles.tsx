import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  border: 0;
  scroll-behavior: smooth;
  box-sizing: border-box;
}
body {
  ${tw`bg-gray-700 font-mono`}
}

h1,
h2,
h3,
h4,
h5,
h6 {
  ${tw`text-gray-200 font-mono font-semibold`};
}

p {
  ${tw`my-3`};
}

p, a {
  ${tw`text-gray-200`};
}

a {
  ${tw`no-underline text-blue-400`}
}

button {
  background-color: transparent;
  cursor: pointer;
  ${tw`font-mono`}
}`;

export default GlobalStyles;
