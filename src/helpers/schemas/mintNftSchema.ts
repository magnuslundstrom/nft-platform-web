import * as yup from 'yup';

const reg = /^http[s]?:\/\/(www\.)?(.*)?\/?(.)*\/.*.json/;

export const mintNftSchema = yup.object({
  tokenURI: yup
    .string()
    .required('TokenURI is required')
    .matches(reg, 'Make sure to provide an URL and point to a JSON file'),
});
