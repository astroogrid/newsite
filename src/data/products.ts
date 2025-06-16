
// Re-export all types and data for backward compatibility
export type {
  ProductImage,
  ProductReview,
  SizeOption,
  ColorOption,
  Product
} from './types/product';

export { productReviews } from './mockData/reviews';
export { productSizes, productColors } from './mockData/options';
export { products } from './mockData/products';

export {
  getProductById,
  getProductBySlug,
  getRelatedProducts
} from './helpers/productHelpers';

export {
  categories,
  brands,
  priceRanges
} from './filters/productFilters';
