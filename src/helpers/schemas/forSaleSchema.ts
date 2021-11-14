import * as yup from 'yup';

export const forSaleSchema = yup
  .object({
    price: yup.number().positive().required(),
  })
  .required();
