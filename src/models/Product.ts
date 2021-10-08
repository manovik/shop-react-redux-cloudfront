import * as Yup from 'yup';

export type Product = {
  count: number,
  id?: string,
  image_link: string,
  price: number,
  description: string,
  title: string,
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  price: Yup.number().required(),
  count: Yup.number().required(),
  image_link: Yup.string().required(),
});
