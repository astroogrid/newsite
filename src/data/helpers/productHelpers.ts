
import { Product } from '../types/product';
import { products } from '../mockData/products';
import { productReviews } from '../mockData/reviews';
import { productSizes, productColors } from '../mockData/options';

// Helper functions to access product data
export const getProductById = (id: number): Product | undefined => {
  const product = products.find(p => p.id === id);
  
  if (product) {
    // Ensure all products have images array
    if (!product.images) {
      product.images = [
        { id: 1, url: product.image, alt: `Primary image of ${product.name}` }
      ];
    }
    
    // Ensure all products have reviews
    if (!product.reviews) {
      product.reviews = productReviews;
    }
    
    // Ensure all products have sizes
    if (!product.sizes) {
      product.sizes = productSizes;
    }
    
    // Ensure all products have colors
    if (!product.colors) {
      product.colors = productColors;
    }
  }
  
  return product;
};

export const getProductBySlug = (slug: string): Product | undefined => {
  const product = products.find(p => p.slug === slug);
  
  if (product) {
    // Same enrichment as in getProductById
    if (!product.images) {
      product.images = [
        { id: 1, url: product.image, alt: `Primary image of ${product.name}` }
      ];
    }
    
    if (!product.reviews) {
      product.reviews = productReviews;
    }
    
    if (!product.sizes) {
      product.sizes = productSizes;
    }
    
    if (!product.colors) {
      product.colors = productColors;
    }
  }
  
  return product;
};

export const getRelatedProducts = (categoryName: string, excludeId?: number): Product[] => {
  return products
    .filter(p => p.category === categoryName && (excludeId === undefined || p.id !== excludeId))
    .slice(0, 24); // increased to show 24 related products
};
