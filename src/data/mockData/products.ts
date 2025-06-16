
import { Product } from '../types/product';
import { loadAllProducts } from '../loaders/productLoader';
import { productReviews } from './reviews';
import { productSizes, productColors } from './options';

export const products: Product[] = loadAllProducts().map(p => ({
  ...p,
  reviews: productReviews,
  sizes: productSizes,
  colors: productColors
})) as Product[];
