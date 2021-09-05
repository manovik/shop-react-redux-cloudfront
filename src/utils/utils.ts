import { Product } from "models/Product";

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatAsPrice = (price: number) => priceFormatter.format(price / 2.5);

export const countPages = (products: Product[], productsOnPage: number): number => Math.ceil(products.length / productsOnPage);
