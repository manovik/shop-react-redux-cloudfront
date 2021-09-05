import * as Yup from 'yup';

export type Product = {
  count: number,
  id: string,
  image_link: string,
  price: number,
  description: string,
  title: string,
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  price: Yup.number().required(),
});
